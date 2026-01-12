import { databases, appwriteConfig, Query, ID } from './appwrite';

const { databaseId, collectionId } = appwriteConfig;

// Helper to map Appwrite document to our Post shape
const mapDocumentToPost = (doc) => {
    return {
        id: doc.$id,
        slug: doc.slug,
        title: doc.title,
        content: doc.content,
        code: doc.code || '',
        language: doc.language,
        status: doc.status,
        description: doc.description || '',
        seoTitle: doc.seoTitle || '',
        seoDescription: doc.seoDescription || '',
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
        userId: doc.authorId || doc.userId || '', // Prefer authorId
        authorId: doc.authorId || doc.userId || '',
        authorName: doc.authorName || 'Anonymous',
        likes: doc.likedBy ? doc.likedBy.length : 0,
        dislikes: doc.dislikedBy ? doc.dislikedBy.length : 0,
        likedBy: doc.likedBy || [],
        dislikedBy: doc.dislikedBy || []
    };
};

export async function getPosts(limit = 100, status = null, userId = null) {
    if (!databaseId || !collectionId) return [];

    // Note: Appwrite requires an index on every field used in queries (including sorting).
    // If you haven't created an index for 'createdAt' (DESC), this will fail.
    const baseQueries = [Query.orderDesc('$createdAt'), Query.limit(limit)];
    if (status) {
        baseQueries.push(Query.equal('status', status));
    }

    try {
        // 1. Try with userId filter if provided
        const fullQueries = [...baseQueries];
        if (userId) {
            fullQueries.push(Query.equal('userId', userId));
        }

        const response = await databases.listDocuments(
            databaseId,
            collectionId,
            fullQueries
        );
        return response.documents.map(mapDocumentToPost);
    } catch (error) {
        console.warn("Primary query failed (likely missing index on userId). Falling back...", error.message);

        // 2. Fallback: If filtering by userId fails (missing index), try without it.
        // DANGER: This returns ALL posts. We must filter in memory.
        // This is inefficient but prevents "White Screen of Death".
        try {
            // Fallback: Fetch without sorting to bypass missing index error
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.limit(limit)] // No orderDesc('$createdAt')
            );
            const allPosts = response.documents.map(mapDocumentToPost);

            if (userId) {
                // Manual filter
                return allPosts.filter(p => p.userId === userId);
            }
            return allPosts;
        } catch (fallbackError) {
            console.error("Fallback query failed too:", fallbackError);
            return [];
        }
    }
}

export async function getPostBySlug(slug) {
    try {
        if (!databaseId || !collectionId) return null;
        const response = await databases.listDocuments(
            databaseId,
            collectionId,
            [Query.equal('slug', slug), Query.limit(1)]
        );
        if (response.documents.length === 0) return null;
        return mapDocumentToPost(response.documents[0]);
    } catch (error) {
        console.error(`Error fetching post by slug ${slug}:`, error);
        return null;
    }
}

export async function createPost(postData) {
    const documentId = ID.unique();

    // Schema requires authorId and authorName.
    // Map userId -> authorId if needed for consistency.
    const authorId = postData.authorId || postData.userId;
    const authorName = postData.authorName || 'Anonymous';

    if (!authorId) throw new Error("Missing authorId: User must be logged in.");

    const fullData = {
        slug: postData.slug,
        title: postData.title,
        content: postData.content,
        code: postData.code,
        language: postData.language,
        status: postData.status,
        description: postData.description,
        seoTitle: postData.seoTitle,
        seoDescription: postData.seoDescription,
        // REQUIRED FIELDS
        authorId: authorId,
        authorName: authorName,
        userId: authorId, // Send both to keep `userId` index happy if it exists
        createdAt: new Date().toISOString()
    };

    try {
        const response = await databases.createDocument(
            databaseId,
            collectionId,
            documentId,
            fullData
        );
        return mapDocumentToPost(response);
    } catch (error) {
        console.error("Error creating post:", error);
        // Do not fallback/strip required attributes.
        throw error;
    }
}

export async function toggleVote(slug, userId, type) {
    try {
        // Simple implementation: Fetch, modify arrays, update.
        // Race condition possible but acceptable for this scale.
        const post = await getPostBySlug(slug);
        if (!post) throw new Error("Post not found");

        // We need the raw document arrays, `post` has them as `likedBy` because of mapper.
        let likedBy = post.likedBy;
        let dislikedBy = post.dislikedBy;

        // Remove from both first to reset
        likedBy = likedBy.filter(id => id !== userId);
        dislikedBy = dislikedBy.filter(id => id !== userId);

        if (type === 'like') {
            likedBy.push(userId);
        } else if (type === 'dislike') {
            dislikedBy.push(userId);
        }
        // If type is 'none' (unvote), we just removed them.

        const response = await databases.updateDocument(
            databaseId,
            collectionId,
            post.id,
            {
                likedBy,
                dislikedBy
            }
        );
        return mapDocumentToPost(response);
    } catch (error) {
        console.error("Error voting:", error);
        throw error;
    }
}

export async function updatePost(slug, updates) {
    try {
        // First find the doc ID by slug
        const current = await getPostBySlug(slug);
        if (!current || !current.id) throw new Error("Post not found");

        const cleanUpdates = { ...updates };
        delete cleanUpdates.id;
        delete cleanUpdates.$id;
        delete cleanUpdates.$createdAt;
        delete cleanUpdates.$updatedAt;

        try {
            // 1. Try full update
            const response = await databases.updateDocument(
                databaseId,
                collectionId,
                current.id,
                cleanUpdates
            );
            return mapDocumentToPost(response);
        } catch (error) {
            if (error.code === 400) {
                // 2. Retry without extra metadata if schema is old
                console.warn("Update failed. Retrying without userId/authorName...");
                delete cleanUpdates.userId;
                delete cleanUpdates.authorName;
                const response = await databases.updateDocument(
                    databaseId,
                    collectionId,
                    current.id,
                    cleanUpdates
                );
                return mapDocumentToPost(response);
            }
            throw error;
        }
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}

export async function deletePost(slug) {
    try {
        const current = await getPostBySlug(slug);
        if (!current || !current.id) return; // Already gone or not found

        await databases.deleteDocument(
            databaseId,
            collectionId,
            current.id
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}

// Deprecated: Compatibility shim solely for "bulk save" if called incorrectly
// But we should try to remove usage of this. 
export async function savePosts(posts) {
    console.warn("savePosts (bulk) is deprecated with Appwrite. Use create/updatePost.");
    // No-op or throw to force refactor
}
