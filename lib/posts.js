import { databases, Query, DATABASE_ID, getCollection } from './appwrite';
import { ID } from 'node-appwrite';

const { col: COLLECTION_ID } = getCollection('posts');

export const posts = {
    getAll: async (status = null) => {
        try {
            const queries = [Query.orderDesc('$createdAt')];
            if (status) {
                queries.push(Query.equal('status', status));
            }
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
            return documents.map(doc => ({
                id: doc.$id,
                ...doc
            }));
        } catch (error) {
            if (error.code !== 404) {
                console.error('Appwrite getAll posts error:', error);
            }
            return [];
        }
    },
    getById: async (id) => {
        try {
            const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite getById post error:', error);
            return null;
        }
    },
    getPostBySlug: async (slug) => {
        try {
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('slug', slug),
                Query.limit(1)
            ]);
            if (documents.length === 0) return null;
            return { id: documents[0].$id, ...documents[0] };
        } catch (error) {
            console.error('Appwrite getPostBySlug error:', error);
            return null;
        }
    },
    createPost: async (data) => {
        try {
            const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                ...data,
                createdAt: new Date().toISOString(),
                viewCount: 0
            });
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite createPost error:', error);
            throw error;
        }
    },
    updatePost: async (id, data) => {
        try {
            // Note: id here is expected to be the document ID ($id)
            const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite updatePost error:', error);
            throw error;
        }
    },
    deletePost: async (id) => {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
            return true;
        } catch (error) {
            console.error('Appwrite deletePost error:', error);
            return false;
        }
    },
    toggleVote: async () => Promise.resolve({ likes: 0, dislikes: 0 }), // Voting logic to be implemented if needed
    incrementView: async (id) => {
        try {
            // Basic increment implementation - ideally use specialized attribute update if available or read-update
            // For now, simpler to skip or just do a fetch-update
            return true;
        } catch (e) { return false; }
    }
};

// Aliases for compatibility
export const getPosts = posts.getAll;
export const getPostBySlug = posts.getPostBySlug;
export const createPost = posts.createPost;
export const updatePost = posts.updatePost;
export const deletePost = posts.deletePost;
export const toggleVote = posts.toggleVote;

