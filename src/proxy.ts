import { NextRequest, NextResponse } from 'next/server';

// Validate and parse NEXT_PUBLIC_SITE_URL at module load time.
// If unset (dev / preview), allowedOrigins is null and the domain check is skipped —
// only the presence of origin/referer is enforced on state-changing requests.
const allowedOriginRaw = process.env.NEXT_PUBLIC_SITE_URL;
let allowedOrigins: string[] | null = null;

if (allowedOriginRaw) {
  try {
    const primaryOrigin = new URL(allowedOriginRaw).origin;
    // Allow localhost variations for development
    allowedOrigins = [primaryOrigin];
    if (primaryOrigin === 'http://localhost:3000') {
      allowedOrigins.push('http://127.0.0.1:3000');
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
  // Check origin header if present
  if (origin) {
    try {
      const originNormalized = new URL(origin).origin;
      if (allowedOrigins !== null && !allowedOrigins.includes(originNormalized)) {
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
      if (allowedOrigins !== null && !allowedOrigins.includes(refererOrigin)) {
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
