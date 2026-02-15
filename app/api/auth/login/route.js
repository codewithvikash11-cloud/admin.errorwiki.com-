import { createSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import { Client, Account } from 'node-appwrite';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // 1. Initialize Transient Client (acting as user, NO API KEY)
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

        const account = new Account(client);

        try {
            // 2. Attempt to create session with Appwrite
            // If this succeeds, the credentials are valid
            const session = await account.createEmailPasswordSession(email, password);

            // 3. Create Internal Session (JWT Cookie)
            // We use the Appwrite User ID
            await createSession(session.userId);

            return NextResponse.json({ success: true });

        } catch (appwriteError) {
            console.error("Appwrite Auth Failed:", appwriteError.message);
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error("Login Route Error:", error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
