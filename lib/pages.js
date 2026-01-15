import { databases, Query, DATABASE_ID, getCollection } from './appwrite';
import { ID } from 'node-appwrite';

const { col: COLLECTION_ID } = getCollection('pages');

export const pages = {
    getAll: async (status = null) => {
        try {
            const queries = [Query.orderDesc('publishedAt')];
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
                console.error('Appwrite getAll pages error:', error);
            }
            return [];
        }
    },
    getBySlug: async (slug) => {
        try {
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('slug', slug),
                Query.limit(1)
            ]);
            if (documents.length === 0) return null;
            return { id: documents[0].$id, ...documents[0] };
        } catch (error) {
            console.error('Appwrite getBySlug page error:', error);
            return null;
        }
    },
    getById: async (id) => {
        try {
            const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite getById page error:', error);
            return null;
        }
    },
    create: async (data) => {
        try {
            const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                ...data,
                publishedAt: new Date().toISOString()
            });
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite create page error:', error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite update page error:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
            return true;
        } catch (error) {
            console.error('Appwrite delete page error:', error);
            return false;
        }
    }
};

