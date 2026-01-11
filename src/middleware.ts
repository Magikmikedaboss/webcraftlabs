import csrf from 'edge-csrf';
import { NextRequest, NextResponse } from 'next/server';

const csrfProtect = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  // Only protect /api/contact
  if (request.nextUrl.pathname === '/api/contact') {
    const response = NextResponse.next();
    const csrfError = await csrfProtect(request, response);
    if (csrfError) {
      return NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
    }
    // Optionally, check Origin/Referer headers here
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    if (
      (origin && origin !== allowedOrigin) ||
      (referer && !referer.startsWith(allowedOrigin))
    ) {
      return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
    }
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact'],
};
