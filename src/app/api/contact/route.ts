import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  project: z.string().min(2, 'Project must be at least 2 characters'),
  website: z.string().optional(), // honeypot
});

// CSRF protection is now handled by edge-csrf middleware in src/middleware.ts
export async function POST(req: NextRequest) {

  // ⚠️ Rate limiting by IP (dev-only - see rateLimit.ts for production alternatives)
  const xff = req.headers.get('x-forwarded-for');
  const ip = xff ? xff.split(',')[0].trim() : 'unknown';
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
  // Sanitize fields (not used, so skip assignment)

  // TODO: Save to database or send email

  return NextResponse.json({ ok: true });
}
