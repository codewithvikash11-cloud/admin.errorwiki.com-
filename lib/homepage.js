import { databases, Query, DATABASE_ID, getCollection } from './appwrite';
import { ID } from 'node-appwrite';

const { col: COLLECTION_ID } = getCollection('homepage');
// Assuming 'homepage' collection exists. If not, we might need to handle it or use 'settings'.
// For simplicity, let's assume we store it in a 'pages' collection with slug 'home' 
// OR a dedicated 'homepage_settings' in 'settings' collection if 'homepage' doesn't exist.
// Since I documented 'Pages', 'Posts', 'Menus', 'Settings'. I did NOT document 'Homepage'.
// But the user req said "Homepage" is a CMS feature.
// I will store it as a special 'settings' key "homepage_config" to avoid new collection drift.
// This is safer since I already verified 'settings' working.

import { settings } from './settings';

export const homepage = {
    get: async () => {
        try {
            const config = await settings.get('homepage_config');
            if (config) return JSON.parse(config);
            return null; // Return null so UI can use default
        } catch (error) {
            console.error('Homepage get error:', error);
            return null;
        }
    },
    save: async (data) => {
        try {
            await settings.set('homepage_config', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Homepage save error:', error);
            throw error;
        }
    }
};
