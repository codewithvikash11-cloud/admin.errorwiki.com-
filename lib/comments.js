import { createAdminClient, Query } from './appwrite-server';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COMMENTS_COLLECTION_ID = process.env.APPWRITE_COMMENTS_COLLECTION_ID || 'comments';

export const commentsService = {
    getComments: async (status = 'pending', limit = 50) => {
        try {
            const { databases } = createAdminClient();
            const queries = [
                Query.limit(limit),
                Query.orderDesc('$createdAt')
            ];

            if (status !== 'all') {
                queries.push(Query.equal('status', status));
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                COMMENTS_COLLECTION_ID,
                queries
            );

            return response.documents.map(doc => ({
                id: doc.$id,
                content: doc.content,
                author: doc.authorName || 'Anonymous',
                status: doc.status, // approved, pending, rejected, spam
                postId: doc.postId,
                postTitle: doc.postTitle, // Denormalized for easy display
                createdAt: doc.$createdAt
            }));

        } catch (error) {
            console.warn("Comments Fetch Error (Collection might be missing):", error.message);
            return [];
        }
    },

    updateStatus: async (commentId, status) => {
        try {
            const { databases } = createAdminClient();
            await databases.updateDocument(
                DATABASE_ID,
                COMMENTS_COLLECTION_ID,
                commentId,
                { status }
            );
            return true;
        } catch (error) {
            console.error("Update Comment Error:", error);
            throw error;
        }
    },

    deleteComment: async (commentId) => {
        try {
            const { databases } = createAdminClient();
            await databases.deleteDocument(
                DATABASE_ID,
                COMMENTS_COLLECTION_ID,
                commentId
            );
            return true;
        } catch (error) {
            console.error("Delete Comment Error:", error);
            throw error;
        }
    }
};
