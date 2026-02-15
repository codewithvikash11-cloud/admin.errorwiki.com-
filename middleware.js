import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request) {
    // 1. Check if route is protected (Starts with /admin)
    const path = request.nextUrl.pathname;
    const isProtectedRoute = path.startsWith('/admin');
    const isLoginPage = path === '/admin/login';

    if (isProtectedRoute && !isLoginPage) {
        // 2. Verify Session
        const session = await verifySession();

        if (!session?.userId) {
            // 3. Redirect to Login if invalid
            return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
        }
    }

    if (isLoginPage) {
        // Redirect to dashboard if already logged in
        const session = await verifySession();
        if (session?.userId) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
