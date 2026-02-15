import { Client, Databases, Query } from 'node-appwrite';

// Appwrite Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY; // Secret API Key for server-side actions
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'errorwiki_db';

if (!API_KEY) {
    console.warn("Appwrite API Key is missing. Database operations will fail.");
}

// Initialize Admin Client (Server-side only)
const client = new Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

// Helper to get collection config
const getCollection = (collectionName) => {
    return { db: DATABASE_ID, col: collectionName };
};

export { client, databases, storage, Query, DATABASE_ID, getCollection, ID, Permission, Role };
