// MOCK Pages Service
export const pages = {
    getAll: async () => Promise.resolve([
        { $id: '1', title: 'Home', slug: 'home', status: 'published', viewCount: 1000 },
        { $id: '2', title: 'About', slug: 'about', status: 'published', viewCount: 500 }
    ]),
    getBySlug: async (slug) => Promise.resolve({ $id: '1', title: 'Mock Page', slug, content: 'Mock Content', status: 'published' }),
    create: async (data) => Promise.resolve({ $id: 'new_page', ...data }),
    update: async (id, data) => Promise.resolve({ $id: id, ...data }),
    delete: async () => Promise.resolve(true)
};
