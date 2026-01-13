'use server';

import { homepage } from '@/lib/homepage';
import { revalidatePath } from 'next/cache';

export async function getHomepageData() {
    return await homepage.get();
}

export async function updateHomepageData(data) {
    await homepage.save(data);
    revalidatePath('/'); // Revalidate home
    revalidatePath('/admin/homepage');
}
