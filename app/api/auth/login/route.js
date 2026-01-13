import { createSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Securely check credentials against Environment Variables
        // In production, these should be set in Vercel project settings
        const validEmail = process.env.ADMIN_EMAIL || 'admin@errorwiki.com';
        const validPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

        if (email === validEmail && password === validPassword) {
            // Create session
            // We use the email as the userId for simplicity in this single-admin setup
            await createSession(email);

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid email or password' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
