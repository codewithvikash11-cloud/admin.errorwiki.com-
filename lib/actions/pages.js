'use server';

import { databases, Query, DATABASE_ID, getCollection } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

const { col: COLLECTION_ID } = getCollection('pages');

// --- Helper: Transform Appwrite Doc to Page Object ---
const transformPage = (doc) => ({
    id: doc.$id,
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    status: doc.isPublished ? 'published' : 'draft', // Map back to UI status
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    publishedAt: doc.publishedAt,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt
});

// --- Actions ---

export async function getPages() {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('$updatedAt')
        ]);
        return documents.map(transformPage);
    } catch (error) {
        console.error('getPages error:', error);
        return [];
    }
}

export async function getPage(id) {
    try {
        const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        return transformPage(doc);
    } catch (error) {
        return null;
    }
}

export async function createPage(data) {
    try {
        const isPublished = data.status === 'published';
        const payload = {
            title: data.title,
            slug: data.slug,
            content: data.content || '',
            isPublished: isPublished,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            publishedAt: isPublished ? new Date().toISOString() : null
        };

        const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
        revalidatePath('/admin/pages');
        return { success: true, page: transformPage(doc) };
    } catch (error) {
        console.error('createPage error:', error);
        return { success: false, error: error.message };
    }
}

export async function updatePage(id, data) {
    try {
        const isPublished = data.status === 'published';
        const payload = {
            title: data.title,
            slug: data.slug,
            content: data.content,
            isPublished: isPublished,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            // Update publishedAt only when switching to published for the first time? 
            // Or just update it if provided. For now, simplistic:
            publishedAt: (isPublished && !data.publishedAt) ? new Date().toISOString() : data.publishedAt
        };

        const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
        revalidatePath('/admin/pages');
        return { success: true, page: transformPage(doc) };
    } catch (error) {
        console.error('updatePage error:', error);
        return { success: false, error: error.message };
    }
}

export async function deletePage(id) {
    try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        revalidatePath('/admin/pages');
        return { success: true };
    } catch (error) {
        console.error('deletePage error:', error);
        return { success: false, error: error.message };
    }
}
