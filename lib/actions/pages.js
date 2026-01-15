'use server';

import { pages } from '@/lib/pages';
import { revalidatePath } from 'next/cache';

export async function getPages() {
    try {
        return await pages.getAll();
    } catch (e) {
        return [];
    }
}

export async function createPage(data) {
    try {
        const result = await pages.create(data);
        revalidatePath('/admin/pages');
        return { success: true, page: result };
    } catch (error) {
        return { success: false, error: 'Failed to create page' };
    }
}

export async function updatePage(id, data) {
    try {
        const result = await pages.update(id, data);
        revalidatePath('/admin/pages');
        revalidatePath(`/pages/${result.slug}`);
        return { success: true, page: result };
    } catch (error) {
        return { success: false, error: 'Failed to update page' };
    }
}

export async function deletePage(id) {
    try {
        await pages.delete(id);
        revalidatePath('/admin/pages');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete page' };
    }
}

export async function getPage(id) {
    try {
        return await pages.getById(id);
    } catch (error) {
        return null;
    }
}

export async function getPageBySlug(slug) {
    try {
        return await pages.getBySlug(slug); // Ensure "page-" prefix is handled if needed, or caller handles it
    } catch (error) {
        return null;
    }
}

