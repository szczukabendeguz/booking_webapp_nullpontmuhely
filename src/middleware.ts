import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the request is for the admin section
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the session cookie
        const session = request.cookies.get('admin_session');

        // If no session, redirect to login
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
