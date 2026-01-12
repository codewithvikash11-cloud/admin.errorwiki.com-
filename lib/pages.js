import { databases, appwriteConfig, Query, ID } from './appwrite';

const { databaseId } = appwriteConfig;
const collectionId = process.env.APPWRITE_PAGES_COLLECTION_ID || 'pages';

// Map Appwrite Doc to Page Object
const mapDocumentToPage = (doc) => ({
    id: doc.$id,
    slug: doc.slug,
    title: doc.title,
    content: doc.content,
    status: doc.status || 'published',
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    isSystem: doc.isSystem || false,
    updatedAt: doc.$updatedAt
});

export const pagesService = {
    getPages: async () => {
        if (!databaseId) return [];
        try {
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.orderDesc('$createdAt')]
            );
            return response.documents.map(mapDocumentToPage);
        } catch (error) {
            console.warn("Pages Fetch Error:", error.message);
            return [];
        }
    },

    getPageBySlug: async (slug) => {
        if (!databaseId) return null;
        try {
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.equal('slug', slug), Query.limit(1)]
            );
            if (response.documents.length === 0) return null;
            return mapDocumentToPage(response.documents[0]);
        } catch (error) {
            console.error("Get Page Error:", error);
            return null;
        }
    },

    createPage: async (data) => {
        try {
            const response = await databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                {
                    ...data,
                    createdAt: new Date().toISOString()
                }
            );
            return mapDocumentToPage(response);
        } catch (error) {
            throw error;
        }
    },

    updatePage: async (slug, data) => {
        const page = await pagesService.getPageBySlug(slug);
        if (!page) throw new Error("Page not found");

        const response = await databases.updateDocument(
            databaseId,
            collectionId,
            page.id,
            data
        );
        return mapDocumentToPage(response);
    },

    deletePage: async (slug) => {
        const page = await pagesService.getPageBySlug(slug);
        if (page) {
            await databases.deleteDocument(databaseId, collectionId, page.id);
        }
    }
};
