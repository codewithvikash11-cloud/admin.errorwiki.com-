'use server';

import { storage, ID, Permission, Role } from '@/lib/appwrite'; // Ensure lib/appwrite exports storage
import { revalidatePath } from 'next/cache';

const BUCKET_ID = 'media';

// --- Actions ---

export async function getFiles() {
    try {
        const { files } = await storage.listFiles(BUCKET_ID);
        return files.map(file => ({
            id: file.$id,
            name: file.name,
            url: storage.getFileView(BUCKET_ID, file.$id).href, // View URL
            preview: storage.getFilePreview(BUCKET_ID, file.$id, 300, 300).href, // Thumbnail
            mimeType: file.mimeType,
            size: file.sizeOriginal,
            createdAt: file.$createdAt
        }));
    } catch (error) {
        console.error('getFiles error:', error);
        return [];
    }
}

export async function uploadFile(formData) {
    try {
        const file = formData.get('file');

        if (!file) {
            throw new Error('No file provided');
        }

        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            file
        );

        revalidatePath('/admin/media');
        return { success: true, file: response };
    } catch (error) {
        console.error('uploadFile error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteFile(fileId) {
    try {
        await storage.deleteFile(BUCKET_ID, fileId);
        revalidatePath('/admin/media');
        return { success: true };
    } catch (error) {
        console.error('deleteFile error:', error);
        return { success: false, error: error.message };
    }
}
