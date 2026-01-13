'use server';

import { menus } from '@/lib/menus';
import { revalidatePath } from 'next/cache';

export async function createMenu(data) {
    await menus.create(data);
    revalidatePath('/admin/menu');
}

export async function updateMenu(id, data) {
    await menus.update(id, data);
    revalidatePath('/admin/menu');
}

export async function deleteMenu(id) {
    await menus.delete(id);
    revalidatePath('/admin/menu');
}

export async function reorderMenus(items) {
    await menus.reorder(items);
    revalidatePath('/admin/menu');
}

export async function getMenus() {
    return await menus.getAll();
}

