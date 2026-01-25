// Sanitize name for email subject to prevent header injection
function sanitizeName(name: string): string {
  // Remove CR, LF, trim, and limit length
  return name.replace(/[\r\n]+/g, '').trim().slice(0, 100);
}
// Simple HTML escape utility
function escapeHtml(str: string): string {
  return str.replace(/[&<>'"]/g, (tag) => {
    const chars: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return chars[tag] || tag;
  });
}
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  project: z.string().min(2, 'Project must be at least 2 characters'),
  notes: z.string().optional(),
  website: z.string().optional(), // honeypot
});

// CSRF protection is handled by origin/referer validation in src/middleware.ts
export async function POST(req: NextRequest) {

  // ⚠️ Rate limiting by IP (dev-only - see rateLimit.ts for production alternatives)
  // Try multiple sources to get client IP
  const xff = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip'); // Cloudflare
  const trueClientIp = req.headers.get('true-client-ip'); // Akamai
  
  let ip: string | null = null;
  if (xff) {
    ip = xff.split(',')[0].trim();
  } else if (realIp) {
    ip = realIp.trim();
  } else if (cfConnectingIp) {
    ip = cfConnectingIp.trim();
  } else if (trueClientIp) {
    ip = trueClientIp.trim();
  }
  
  // If no IP could be determined, reject in production or apply strict limits
  if (!ip) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unable to verify request origin. Please ensure your network connection is configured correctly.' },
        { status: 400 }
      );
    }
    // In development, use a special identifier with stricter rate limit
    ip = 'dev-unknown';
  }
  
  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    const headers: Record<string, string> = {};
    if (rateLimitResult.retryAfter) {
      headers['Retry-After'] = String(rateLimitResult.retryAfter);
    }
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers }
    );
  }

  // Parse and validate body
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }
  // Honeypot check
  if (data.website && data.website.trim() !== '') {
    return NextResponse.json({ error: 'Bot detected. Submission rejected.' }, { status: 400 });
  }
  // Zod validation
  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    const errorMsg = result.error.issues.map((e: z.ZodIssue) => e.message).join(' ');
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }

  // Log submission for debugging (PII redacted)
  console.log('[Contact Form] New submission:', {
    project: result.data.project ? 'present' : 'none',
    notes: result.data.notes ? 'present' : 'none',
    timestamp: new Date().toISOString(),
    // Optionally, add a non-identifying fingerprint if needed
  });

  // Send email notification
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"WebCraft Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      // Sanitize name to prevent header injection
      subject: `New Contact Form: ${sanitizeName(result.data.name)}`,
      // Escape all user fields before interpolation
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(result.data.name || '')}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(result.data.email || '')}">${escapeHtml(result.data.email || '')}</a></p>
            <p style="margin: 10px 0;"><strong>Project:</strong> ${escapeHtml(result.data.project || '')}</p>
            ${result.data.notes ? `<p style="margin: 10px 0;"><strong>Notes:</strong><br/>${escapeHtml(result.data.notes || '').replace(/\n/g, '<br/>')}</p>` : ''}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Quick Actions:</strong><br/>
              To contact the submitter, use their email address shown above (<a href="mailto:${escapeHtml(result.data.email || '')}">${escapeHtml(result.data.email || '')}</a>).<br/>
              Replies to this email will go to the site address (${process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@webcraftlabz.com'}).
            </p>
          </div>
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            Submitted: ${new Date().toLocaleString()}<br/>
            IP: ${escapeHtml(ip || '')}
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${result.data.name}
Email: ${result.data.email}
Project: ${result.data.project}
${result.data.notes ? `Notes: ${result.data.notes}` : ''}

Submitted: ${new Date().toLocaleString()}
IP: ${ip}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('[Contact Form] Email sent successfully');
  } catch (emailError) {
    const msg = typeof emailError === 'object' && emailError && 'message' in emailError ? (emailError as unknown as { message?: string }).message ?? 'Unknown error' : 'Unknown error';
    const code = typeof emailError === 'object' && emailError && 'code' in emailError ? (emailError as unknown as { code?: string }).code ?? 'N/A' : 'N/A';
    console.warn(`[Contact Form] Email send failed: ${msg} (code:${code})`);
    // Don't fail the request if email fails - log it and continue
    // In production, you might want to queue this for retry
  }

  return NextResponse.json({ ok: true });
}
