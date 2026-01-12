// MOCK Comments Service
export const comments = {
    getAll: async () => Promise.resolve([]),
    create: async () => Promise.resolve({ $id: 'mock_comment', content: 'Mock Comment' }),
    delete: async () => Promise.resolve(true)
};
