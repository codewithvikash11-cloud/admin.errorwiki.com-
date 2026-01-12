"use server";

import { createAdminClient, Query, ID } from '@/lib/appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

// P A G E S
export async function getAllPages() {
    try {
        const { databases } = createAdminClient();
        const result = await databases.listDocuments(DB_ID, 'pages', [
            Query.orderAsc('title')
        ]);
        return result.documents;
    } catch (e) {
        console.error('Get Pages Error:', e);
        return [];
    }
}

export async function createPage(data) {
    try {
        const { databases } = createAdminClient();
        const doc = await databases.createDocument(DB_ID, 'pages', ID.unique(), {
            title: data.title,
            slug: data.slug,
            isPublished: false,
            seoTitle: data.title,
            seoDescription: ''
        });
        return { success: true, id: doc.$id };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// S E C T I O N S
export async function getPageSections(pageId) {
    try {
        const { databases } = createAdminClient();
        const result = await databases.listDocuments(DB_ID, 'page_sections', [
            Query.equal('pageId', pageId),
            Query.orderAsc('order')
        ]);
        return result.documents.map(doc => ({
            ...doc,
            content: JSON.parse(doc.content || '{}'),
            config: JSON.parse(doc.config || '{}')
        }));
    } catch (e) {
        return [];
    }
}
