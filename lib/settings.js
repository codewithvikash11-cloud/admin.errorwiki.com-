import { databases, Query, DATABASE_ID, getCollection } from './appwrite';
import { ID } from 'node-appwrite';

const { col: COLLECTION_ID } = getCollection('settings');

export const settings = {
    getAll: async () => {
        try {
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.limit(100)
            ]);
            // Convert array of key-value docs to object
            const settingMap = {};
            documents.forEach(doc => {
                settingMap[doc.key] = doc.value;
            });
            return settingMap;
        } catch (error) {
            if (error.code !== 404) {
                console.error('Appwrite getAll settings error:', error);
            }
            return {};
        }
    },
    get: async (key) => {
        try {
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('key', key),
            ]);
            if (documents.length === 0) return null;
            return documents[0].value;
        } catch (error) {
            console.error(`Appwrite get setting ${key} error:`, error);
            return null;
        }
    },
    set: async (key, value) => {
        try {
            // Check if exists
            const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('key', key),
            ]);

            if (documents.length > 0) {
                // Update
                const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documents[0].$id, {
                    value: String(value)
                });
                return doc;
            } else {
                // Create
                const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                    key: key,
                    value: String(value)
                });
                return doc;
            }
        } catch (error) {
            console.error(`Appwrite set setting ${key} error:`, error);
            throw error;
        }
    },
    setMany: async (settingsObj) => {
        try {
            for (const [key, value] of Object.entries(settingsObj)) {
                await settings.set(key, value);
            }
            return true;
        } catch (error) {
            console.error('Appwrite setMany settings error:', error);
            throw error;
        }
    }
};
