"use server";

import { createAdminClient, Query, ID } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID; // Posts Collection

// --- FETCHING ---
export async function getAllPosts(limit = 20, offset = 0, status) {
    try {
        const { databases } = createAdminClient();
        const queries = [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc('$createdAt')
        ];
        if (status) queries.push(Query.equal('status', status));

        const result = await databases.listDocuments(DB_ID, TABLE_ID, queries);

        return {
            posts: result.documents.map(doc => ({
                id: doc.$id,
                title: doc.title,
                slug: doc.slug,
                status: doc.status,
                authorId: doc.authorId,
                createdAt: doc.$createdAt,
                views: doc.views || 0,
                // Simple stats
            })),
            total: result.total
        };
    } catch (error) {
        console.error("Fetch Posts Error:", error);
        return { posts: [], total: 0 };
    }
}

export async function getPostById(id) {
    try {
        const { databases } = createAdminClient();
        return await databases.getDocument(DB_ID, TABLE_ID, id);
    } catch (error) {
        return null;
    }
}

// --- MUTATIONS ---
export async function createAdminPost(data) {
    try {
        const { databases } = createAdminClient();
        // Generate slug from title if missing
        const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const doc = await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), {
            title: data.title,
            slug: slug,
            content: data.content,
            description: data.description,
            status: 'approved', // Admin posts are auto-approved
            authorId: 'admin',      // Flag as admin author
            language: data.language || 'markdown',
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription
        });
        return { success: true, id: doc.$id };
    } catch (error) {
        console.error("Create Post Error:", error);
        return { success: false, error: error.message };
    }
}

export async function updateAdminPost(id, data) {
    try {
        const { databases } = createAdminClient();
        await databases.updateDocument(DB_ID, TABLE_ID, id, data);
        return { success: true };
    } catch (error) {
        console.error("Update Post Error:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteAdminPost(id) {
    try {
        const { databases } = createAdminClient();
        await databases.deleteDocument(DB_ID, TABLE_ID, id);
        return { success: true };
    } catch (error) {
        console.error("Delete Post Error:", error);
        return { success: false, error: error.message };
    }
}
