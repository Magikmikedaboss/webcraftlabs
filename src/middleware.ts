import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // CSRF Protection via Origin/Referer validation
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const method = request.method;
  const allowedOriginRaw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // For state-changing methods (POST/PUT/DELETE), require at least one header
  const isStateChanging = ['POST', 'PUT', 'DELETE'].includes(method);
  if (isStateChanging && !origin && !referer) {
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }
  
  try {
    // Normalize the allowed origin
    const allowedOriginNormalized = new URL(allowedOriginRaw).origin;
    
    // Check origin header if present
    if (origin) {
      const originNormalized = new URL(origin).origin;
      if (originNormalized !== allowedOriginNormalized) {
        return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
      }
    }
    
    // Check referer header if present
    if (referer) {
      const refererOrigin = new URL(referer).origin;
      if (refererOrigin !== allowedOriginNormalized) {
        return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
      }
    }
  } catch {
    // Invalid URL format in headers
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }
  
  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact'],
};
