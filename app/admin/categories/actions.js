"use server";
import { revalidatePath } from 'next/cache';
import { createCategory, deleteCategory } from '@/lib/actions/categories';

export async function createCategoryAction(formData) {
    const name = formData.get('name');
    if (!name) return { success: false, error: 'Name is required' };

    const result = await createCategory(name);
    return result;
}

export async function deleteCategoryAction(id) {
    if (!id) return { success: false, error: 'ID is required' };
    return await deleteCategory(id);
}
