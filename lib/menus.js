import { databases, Query, DATABASE_ID, getCollection } from './appwrite';
import { ID } from 'node-appwrite';

const { col: COLLECTION_ID } = getCollection('menus');

export const menus = {
    getAll: async () => {
        try {
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.orderAsc('order')
            ]);
            return documents.map(doc => ({
                id: doc.$id,
                ...doc
            }));
        } catch (error) {
            console.error('Appwrite getAll menus error:', error);
            return [];
        }
    },
    create: async (data) => {
        try {
            const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite create menu error:', error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
            return { id: doc.$id, ...doc };
        } catch (error) {
            console.error('Appwrite update menu error:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
            return true;
        } catch (error) {
            console.error('Appwrite delete menu error:', error);
            return false;
        }
    },
    reorder: async (items) => {
        // items: [{ id: '...', order: 1 }, ...]
        try {
            for (const item of items) {
                await databases.updateDocument(DATABASE_ID, COLLECTION_ID, item.id, {
                    order: item.order
                });
            }
            return true;
        } catch (error) {
            console.error('Appwrite reorder menus error:', error);
            return false;
        }
    }
};
