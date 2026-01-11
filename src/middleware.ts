import createMiddleware from 'edge-csrf';
import { NextRequest, NextResponse } from 'next/server';

const csrfMiddleware = createMiddleware({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  // Check Origin/Referer headers BEFORE CSRF middleware
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
  } catch (error) {
    // Invalid URL format in headers
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }
  
  // Apply CSRF protection AFTER origin validation
  const response = NextResponse.next();
  const csrfError = await csrfMiddleware(request, response);
  if (csrfError) {
    return NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
  }
  
  return response;
}

export const config = {
  matcher: ['/api/contact'],
};
