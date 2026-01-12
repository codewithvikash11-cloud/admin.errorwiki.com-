// MOCK Posts Service (No Backend)

export const posts = {
    getAll: async (status = null) => {
        return Promise.resolve([
            { id: '1', $id: '1', title: 'Welcome to ErrorWiki', slug: 'welcome', status: 'published', viewCount: 120, createdAt: new Date().toISOString() },
            { id: '2', $id: '2', title: 'Getting Started', slug: 'getting-started', status: 'draft', viewCount: 0, createdAt: new Date().toISOString() }
        ]);
    },
    getPostBySlug: async (slug) => {
        return Promise.resolve({
            id: '1',
            $id: '1',
            title: 'Welcome to ErrorWiki',
            content: '# Hello World\nThis is a mock post.',
            slug: slug,
            status: 'published',
            description: 'A mock post description.',
            createdAt: new Date().toISOString(),
            authorName: 'Admin'
        });
    },
    createPost: async (data) => Promise.resolve({ id: 'new_id', $id: 'new_id', ...data }),
    updatePost: async (slug, data) => Promise.resolve({ id: '1', $id: '1', ...data }),
    deletePost: async (slug) => Promise.resolve(true),
    toggleVote: async () => Promise.resolve({ likes: 1, dislikes: 0 }),
    incrementView: async () => Promise.resolve(true)
};

// Aliases for compatibility if needed
export const getPosts = posts.getAll;
export const getPostBySlug = posts.getPostBySlug;
export const createPost = posts.createPost;
export const updatePost = posts.updatePost;
export const deletePost = posts.deletePost;
export const toggleVote = posts.toggleVote;
