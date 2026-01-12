"use server";

import { createAdminClient, Query } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const CONTENT_COLLECTION = 'site_content';

export async function getContent(section) {
    try {
        const { databases } = createAdminClient();
        const queries = section ? [Query.equal('section', section)] : [];

        const result = await databases.listDocuments(DB_ID, CONTENT_COLLECTION, queries);

        // Transform to Key-Value map for easy consumption
        const contentMap = {};
        result.documents.forEach(doc => {
            contentMap[doc.key] = {
                id: doc.$id,
                value: doc.value,
                type: doc.type,
                section: doc.section
            };
        });
        return contentMap;

    } catch (error) {
        console.error("Get Content Error:", error);
        return {};
    }
}

export async function updateContent(docId, value) {
    try {
        const { databases } = createAdminClient();
        await databases.updateDocument(DB_ID, CONTENT_COLLECTION, docId, {
            value: value
        });
        return { success: true };
    } catch (error) {
        console.error("Update Content Error:", error);
        return { success: false, error: 'Update Failed' };
    }
}

// Initial Seeder (Call once if empty)
export async function seedInitialContent() {
    const { databases } = createAdminClient();

    // Check if content exists
    const existing = await databases.listDocuments(DB_ID, CONTENT_COLLECTION, [Query.limit(1)]);
    if (existing.total > 0) return { success: true, message: 'Already seeded' };

    const initialData = [
        { key: 'hero_title', value: 'Fix Your Code. Fast.', section: 'home', type: 'text' },
        { key: 'hero_subtitle', value: 'The ultimate AI-powered toolkit for developers. Fix bugs, format code, and optimize performance in seconds.', section: 'home', type: 'text' },
        { key: 'hero_cta_primary', value: 'Start Fixing Now', section: 'home', type: 'text' },
        { key: 'hero_cta_secondary', value: 'View Documentation', section: 'home', type: 'text' },
        { key: 'announcement_bar', value: '🚀 New Feature: AI Security Scanner is now live!', section: 'global', type: 'text' },
    ];

    for (const item of initialData) {
        await databases.createDocument(DB_ID, CONTENT_COLLECTION, 'unique()', item);
    }

    return { success: true };
}
