"use server";

import { createAdminClient, Query } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const POSTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID;

export async function getPendingPosts() {
    try {
        const { databases } = createAdminClient();
        const result = await databases.listDocuments(DB_ID, POSTS_COLLECTION, [
            Query.equal('status', 'pending'),
            Query.orderDesc('$createdAt')
        ]);

        return result.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            slug: doc.slug,
            authorId: doc.authorId,
            aiScore: doc.aiScore || 0,
            plagiarismScore: doc.plagiarismScore || 0,
            submittedAt: doc.$createdAt,
            preview: (doc.description || doc.content).substring(0, 150) + "..."
        }));
    } catch (e) {
        console.error("Get Pending Failed:", e);
        return [];
    }
}

export async function reviewPost(postId, action, reason) {
    try {
        const { databases } = createAdminClient();

        const status = action === 'approve' ? 'approved' : 'rejected';

        await databases.updateDocument(DB_ID, POSTS_COLLECTION, postId, {
            status: status
        });

        // Log the decision
        await databases.createDocument(DB_ID, 'logs', 'unique()', {
            action: `Content ${status.toUpperCase()}`,
            severity: 'info',
            details: `Post ID: ${postId}. Reason: ${reason || 'Admin Review'}`,
            userId: 'admin' // In real app, get current admin ID
        });

        return { success: true };
    } catch (e) {
        console.error("Review Action Failed:", e);
        return { success: false, error: e.message };
    }
}
