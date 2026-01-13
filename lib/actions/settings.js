'use server';

import { settings } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

export async function updateSettings(data) {
    await settings.setMany(data);
    revalidatePath('/admin/settings');
}

export async function getSettings() {
    return await settings.getAll();
}

