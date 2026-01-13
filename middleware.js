import { NextResponse } from 'next/server';
import { decrypt } from './lib/session';

export async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/admin/login';
    const isAdminPath = path.startsWith('/admin');

    // Decrypt the session from the cookie
    const cookie = req.cookies.get('admin_session')?.value;
    const session = await decrypt(cookie);

    // If trying to access admin routes (except login) and not logged in
    if (isAdminPath && !isPublicPath && !session?.userId) {
        return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }

    // If logged in and trying to access login page, redirect to dashboard
    if (isPublicPath && session?.userId) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
