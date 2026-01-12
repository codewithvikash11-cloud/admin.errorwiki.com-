// MOCK Media Service
export const media = {
    upload: async () => Promise.resolve({ $id: 'img_1', url: 'https://placehold.co/600x400' }),
    list: async () => Promise.resolve([
        { $id: '1', name: 'Mock Image.png', url: 'https://placehold.co/600x400', size: 1024, type: 'image/png' }
    ]),
    delete: async () => Promise.resolve(true),
    getPreview: () => 'https://placehold.co/100x100',
    getView: () => 'https://placehold.co/600x400'
};
