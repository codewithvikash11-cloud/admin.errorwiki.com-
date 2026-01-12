import { Client, Databases, Users, Storage, Query, ID } from 'node-appwrite';

// Helper to create a unified Admin Client
const createAdminClient = () => {
    const client = new Client();

    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const apiKey = process.env.APPWRITE_API_KEY;

    if (!endpoint || !projectId || !apiKey) {
        throw new Error("Appwrite configuration missing on server.");
    }

    client
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setKey(apiKey);

    return {
        get databases() {
            return new Databases(client);
        },
        get users() {
            return new Users(client);
        },
        get storage() {
            return new Storage(client);
        }
    };
};

export { createAdminClient, Query, ID };
