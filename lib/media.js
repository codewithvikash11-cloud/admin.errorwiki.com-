// MOCK Media Service
export const mediaService = {
    uploadFile: async () => Promise.resolve({ $id: 'img_1', url: 'https://placehold.co/600x400' }),
    listFiles: async () => Promise.resolve([
        { $id: '1', name: 'Mock Image.png', url: 'https://placehold.co/600x400', size: 1024, type: 'image/png', mimeType: 'image/png', sizeOriginal: 1024 }
    ]),
    deleteFile: async () => Promise.resolve(true),
    getFileView: () => 'https://placehold.co/600x400'
};
