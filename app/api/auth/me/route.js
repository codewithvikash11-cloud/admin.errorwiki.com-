import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await verifySession();

    if (!session) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: session.userId });
}
