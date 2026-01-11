import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get('session');

    if (pathname.startsWith('/admin') && !sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === '/login' && sessionCookie) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
