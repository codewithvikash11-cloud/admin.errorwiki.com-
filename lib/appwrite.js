
import { Client, Databases, Account, Query } from 'appwrite';

const client = new Client();
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (endpoint && projectId) {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);

    // client.setKey(apiKey); // Web SDK does not support setKey, only node-appwrite does
} else {
    console.warn("Appwrite environment variables are missing.");
}

export const databases = new Databases(client);
export const account = new Account(client);
export { Query, ID } from 'appwrite';

export const appwriteConfig = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    collectionId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID,
};
