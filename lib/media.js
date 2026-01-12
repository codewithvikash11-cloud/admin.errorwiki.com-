import { createAdminClient, ID, Query } from './appwrite-server';

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'media';

export const mediaService = {
    listFiles: async (limit = 50, offset = 0) => {
        try {
            const { storage } = createAdminClient();
            const response = await storage.listFiles(
                BUCKET_ID,
                [Query.limit(limit), Query.offset(offset), Query.orderDesc('$createdAt')]
            );
            return response.files;
        } catch (error) {
            console.error("Media List Error:", error);
            // If bucket doesn't exist, generic empty return
            return [];
        }
    },

    uploadFile: async (file) => {
        try {
            const { storage } = createAdminClient();
            // file must be an InputFile object for node-appwrite
            const response = await storage.createFile(
                BUCKET_ID,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Media Upload Error:", error);
            throw error;
        }
    },

    deleteFile: async (fileId) => {
        try {
            const { storage } = createAdminClient();
            await storage.deleteFile(BUCKET_ID, fileId);
            return true;
        } catch (error) {
            console.error("Delete Media Error:", error);
            throw error;
        }
    },

    getFileView: (fileId) => {
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
        // Construct standard Appwrite View URL
        return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${projectId}`;
    }
};
