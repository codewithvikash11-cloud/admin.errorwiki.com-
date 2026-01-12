// MOCK Appwrite Server SDK
export const Client = class { setEndpoint() { return this; } setProject() { return this; } setKey() { return this; } };
export const Databases = class { listDocuments() { return { documents: [], total: 0 }; } };
export const Users = class { list() { return { users: [], total: 0 }; } };
export const Storage = class { listFiles() { return { files: [], total: 0 }; } };
export const Query = {
    equal: () => 'mock_query',
    orderDesc: () => 'mock_query',
    limit: () => 'mock_query',
    search: () => 'mock_query',
    offset: () => 'mock_query'
};
export const ID = { unique: () => 'mock_id' };
export const createAdminClient = () => ({
    users: { list: async () => ({ total: 0, users: [] }) },
    databases: { listDocuments: async () => ({ total: 0, documents: [] }) },
    storage: { listFiles: async () => ({ total: 0, files: [] }) }
});
