'use server';

import { databases, Query, DATABASE_ID, getCollection } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

const { col: COLLECTION_ID } = getCollection('menus');

// --- Helper: Transform Appwrite Doc to Menu Object ---
const transformMenu = (doc) => ({
    id: doc.$id,
    label: doc.label,
    path: doc.path,
    type: doc.type, // 'header', 'footer', 'both'
    order: doc.order || 0,
    parentId: doc.parentId || null,
    isExternal: doc.isExternal || false,
    isOpenNewTab: doc.isOpenNewTab || false,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt
});

// --- Actions ---

export async function getMenus(type = 'header') {
    try {
        const queries = [
            Query.orderAsc('order')
        ];

        // If type is specific, filter by it OR 'both'
        // Appwrite doesn't support OR in simple list queries easily without advanced syntax or multiple queries.
        // For simplicity, we'll fetch all and filter in memory, or just fetch all.
        // Actually, let's fetch all and filter in JS since navigation menus are small.
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(100),
            Query.orderAsc('order')
        ]);

        const allMenus = documents.map(transformMenu);

        if (type === 'all') return allMenus;

        return allMenus.filter(m => m.type === type || m.type === 'both');
    } catch (error) {
        console.error('getMenus error:', error);
        return [];
    }
}

export async function createMenu(data) {
    try {
        const payload = {
            label: data.label,
            path: data.path,
            type: data.type || 'header',
            order: parseInt(data.order) || 0,
            parentId: data.parentId || null,
            isExternal: data.isExternal || false,
            isOpenNewTab: data.isOpenNewTab || false
        };

        const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
        revalidatePath('/admin/menus');
        return { success: true, menu: transformMenu(doc) };
    } catch (error) {
        console.error('createMenu error:', error);
        return { success: false, error: error.message };
    }
}

export async function updateMenu(id, data) {
    try {
        const payload = {
            label: data.label,
            path: data.path,
            type: data.type,
            order: parseInt(data.order),
            parentId: data.parentId,
            isExternal: data.isExternal,
            isOpenNewTab: data.isOpenNewTab
        };

        const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
        revalidatePath('/admin/menus');
        return { success: true, menu: transformMenu(doc) };
    } catch (error) {
        console.error('updateMenu error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteMenu(id) {
    try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        revalidatePath('/admin/menus');
        return { success: true };
    } catch (error) {
        console.error('deleteMenu error:', error);
        return { success: false, error: error.message };
    }
}
