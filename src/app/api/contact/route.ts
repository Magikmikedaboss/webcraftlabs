import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

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

  // Log submission for debugging (remove in production once email/DB is set up)
  console.log('[Contact Form] New submission:', {
    name: result.data.name,
    email: result.data.email,
    project: result.data.project,
    notes: result.data.notes || '(none)',
    timestamp: new Date().toISOString(),
    ip,
  });

  // TODO: Implement data persistence and notification
  // Options when ready:
  // 1. Send email via Resend, SendGrid, or Nodemailer
  // 2. Save to database (Postgres, MongoDB, etc.)
  // 3. Send to Slack/Discord webhook for notifications
  // Note: Validated data is in result.data - no additional sanitization needed for email/DB
  //       since Zod validation already ensures string types and format

  return NextResponse.json({ ok: true });
}
