"use server";

import { databases, Query, DATABASE_ID } from '@/lib/appwrite'; // Admin repo uses lib/appwrite.js
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

const COLLECTION_ID = 'categories';

export async function getCategories() {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderAsc('name')
        ]);
        return documents.map(doc => ({
            id: doc.$id,
            ...doc
        }));
    } catch (error) {
        return [];
    }
}

export async function createCategory(name) {
    try {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            name,
            slug,
            count: 0
        });
        revalidatePath('/admin/categories');
        return { success: true, category: doc };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteCategory(id) {
    try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        revalidatePath('/admin/categories');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete' };
    }
}
