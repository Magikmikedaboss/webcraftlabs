import { NextRequest, NextResponse } from 'next/server';

// Validate and parse NEXT_PUBLIC_SITE_URL at module load time
const allowedOriginRaw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
let allowedOrigin: string;

try {
  allowedOrigin = new URL(allowedOriginRaw).origin;
} catch (err) {
  const errorMsg = `FATAL: Invalid NEXT_PUBLIC_SITE_URL configuration: "${allowedOriginRaw}". Must be a valid URL.`;
  console.error(errorMsg, err);
  throw new Error(errorMsg);
}

export async function middleware(request: NextRequest) {
  // CSRF Protection via Origin/Referer validation
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const method = request.method;
  
  // For state-changing methods (POST/PUT/DELETE), require at least one header
  const isStateChanging = ['POST', 'PUT', 'DELETE'].includes(method);
  if (isStateChanging && !origin && !referer) {
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }
  
  // Check origin header if present
  if (origin) {
    try {
      const originNormalized = new URL(origin).origin;
      if (originNormalized !== allowedOrigin) {
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
      if (refererOrigin !== allowedOrigin) {
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
  matcher: ['/api/contact'],
};
