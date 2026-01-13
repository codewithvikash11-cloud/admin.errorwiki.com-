'use server';

import { posts } from '@/lib/posts';
import { revalidatePath } from 'next/cache';

export async function getPost(id) {
    try {
        return await posts.getById(id);
    } catch (e) {
        return null;
    }
}

export async function getPostBySlug(slug) {
    try {
        return await posts.getPostBySlug(slug);
    } catch (e) {
        return null;
    }
}

try {
    const result = await posts.createPost(data);
    revalidatePath('/admin/posts');
    return { success: true, post: result };
} catch (error) {
    return { success: false, error: 'Failed to create post' };
}
}

export async function updatePost(id, data) {
    try {
        const result = await posts.updatePost(id, data);
        revalidatePath('/admin/posts');
        revalidatePath(`/posts/${result.slug}`);
        return { success: true, post: result };
    } catch (error) {
        return { success: false, error: 'Failed to update post' };
    }
}

export async function deletePost(id) {
    try {
        await posts.deletePost(id);
        revalidatePath('/admin/posts');
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete post' };
    }
}

