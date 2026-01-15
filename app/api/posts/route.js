import { NextResponse } from 'next/server';
import { posts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = searchParams.get('limit');

        // Allow fetching all if no status specified, or filter by status
        // The service might need adjustment if it strictly requires 'status' or not.
        // Looking at lib/posts.js: getAll(status)

        let allPosts = await posts.getAll(status || 'published');

        if (limit) {
            allPosts = allPosts.slice(0, parseInt(limit));
        }

        return NextResponse.json(allPosts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
