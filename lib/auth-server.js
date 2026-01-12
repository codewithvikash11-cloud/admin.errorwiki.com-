// MOCK Auth Server Utilities
export const auth = {
    getUser: async () => Promise.resolve({ $id: 'mock_user', name: 'Admin', email: 'admin@errorwiki.com' }),
    verifySession: async () => Promise.resolve(true)
};
