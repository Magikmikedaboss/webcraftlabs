import { NextRequest, NextResponse } from 'next/server';

// Validate and parse NEXT_PUBLIC_SITE_URL at module load time.
// When unset (preview/dev), allowedOrigins is null and the guard falls back to
// request.nextUrl.origin at request time — only same-origin requests are accepted.
// Set NEXT_PUBLIC_SITE_URL in production for an explicit allowlist.
const allowedOriginRaw = process.env.NEXT_PUBLIC_SITE_URL;
let allowedOrigins: string[] | null = null;

if (allowedOriginRaw) {
  try {
    const parsed = new URL(allowedOriginRaw);
    const primaryOrigin = parsed.origin;
    // Allow localhost variations for development (any port)
    allowedOrigins = [primaryOrigin];
    const port = parsed.port ? `:${parsed.port}` : '';
    if (parsed.hostname === 'localhost') {
      allowedOrigins.push(`http://127.0.0.1${port}`);
    } else if (parsed.hostname === '127.0.0.1') {
      allowedOrigins.push(`http://localhost${port}`);
    }
  } catch (err) {
    const errorMsg = `FATAL: Invalid NEXT_PUBLIC_SITE_URL configuration: "${allowedOriginRaw}". Must be a valid URL.`;
    console.error(errorMsg, err);
    throw new Error(errorMsg);
  }
}

export async function proxy(request: NextRequest) {
  // CSRF Protection via Origin/Referer validation
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const method = request.method;
  
  // For state-changing methods (POST/PUT/DELETE/PATCH), require at least one header
  const isStateChanging = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
  if (isStateChanging && !origin && !referer) {
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }  
  // When no explicit allowlist is configured, fall back to the server's own origin
  // so preview deployments work without bypassing the CSRF guard entirely.
  const effectiveOrigins = allowedOrigins ?? [request.nextUrl.origin];

  // Check origin header if present
  if (origin) {
    try {
      const originNormalized = new URL(origin).origin;
      if (!effectiveOrigins.includes(originNormalized)) {
        return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
      }
    } catch {
      // Invalid URL format in origin header from request
      return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
    }
  }

  // Check referer header if present
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (!effectiveOrigins.includes(refererOrigin)) {
        return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
      }
    } catch {
      // Invalid URL format in referer header from request
      return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
    }
  }
  
  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact', '/api/contact/:path*'],
};
