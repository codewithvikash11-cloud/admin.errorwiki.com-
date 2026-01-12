"use server";

import { createAdminClient, Query } from '@/lib/appwrite-server';

// --- Dashboard Stats ---
export async function getAdminStats() {
    try {
        const { databases, users } = createAdminClient();
        const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const postsId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID;

        // Parallel Fetch
        const [usersList, postsList, pendingList] = await Promise.all([
            users.list(),
            databases.listDocuments(dbId, postsId),
            databases.listDocuments(dbId, postsId, [
                Query.equal('status', 'pending')
            ])
        ]);

        return {
            totalUsers: usersList.total,
            activeUsers: usersList.users.filter(u => u.status).length, // Rough active check
            totalPosts: postsList.total,
            pendingReviews: pendingList.total,
            systemHealth: 'Excellent' // Placeholder logic for now
        };
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return {
            totalUsers: 0,
            activeUsers: 0,
            totalPosts: 0,
            pendingReviews: 0,
            systemHealth: 'Error'
        };
    }
}

// --- User Management ---
export async function getAdminUsers(limit = 20, offset = 0) {
    try {
        const { users, databases } = createAdminClient();

        // 1. Get Auth Users
        const userList = await users.list([
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc('$createdAt')
        ]);

        // 2. Get Profile Data (Trust Score, Role)
        const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        // Since we can't do a "join", we map or fetch profiles individually or list them.
        // Efficient way: List profiles where userId in [ids]... but Appwrite "contains" query is limited.
        // For Admin List, better to list Profiles and then fetch User names? 
        // Or just list Users and try to fetch profile.
        // Let's assume we fetch Profiles primarily as they dictate role/trust.

        const profilesList = await databases.listDocuments(dbId, 'profiles', [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc('$createdAt')
        ]);

        // Merge logic: Profile is the source of truth for "Admin/Mod".
        // Use userList to get Email/Name if missing in Profile.

        // Map profiles to detailed objects
        const detailedUsers = await Promise.all(profilesList.documents.map(async (profile) => {
            try {
                const userAuth = await users.get(profile.userId);
                return {
                    id: profile.userId,
                    name: profile.name || userAuth.name,
                    email: profile.email || userAuth.email,
                    role: profile.role,
                    trustScore: profile.trustScore,
                    status: profile.isBanned ? 'banned' : (userAuth.status ? 'active' : 'inactive'),
                    joinedAt: userAuth.$createdAt
                };
            } catch (e) {
                // User might be deleted from Auth but profile remains?
                return {
                    id: profile.userId,
                    name: profile.name || 'Unknown',
                    email: profile.email || 'N/A',
                    role: profile.role,
                    trustScore: profile.trustScore,
                    status: 'error',
                    joinedAt: profile.$createdAt
                };
            }
        }));

        return detailedUsers;

    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

export async function updateUserStatus(userId, action) {
    const { users, databases } = createAdminClient();
    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

    try {
        // 1. Auth Status
        if (action === 'ban') {
            await users.updateStatus(userId, false); // Block login
            // Update Profile
            // attributes: { isBanned: true }
            // Need to find profile doc id? Assuming userId == docId or unique index. 
            // In setup we just said userId is attribute. 
            // We need to query profile by userId.
            const profileQuery = await databases.listDocuments(dbId, 'profiles', [Query.equal('userId', userId)]);
            if (profileQuery.documents.length > 0) {
                await databases.updateDocument(dbId, 'profiles', profileQuery.documents[0].$id, {
                    isBanned: true,
                    trustScore: 0
                });
            }
        } else if (action === 'unban') {
            await users.updateStatus(userId, true);
            const profileQuery = await databases.listDocuments(dbId, 'profiles', [Query.equal('userId', userId)]);
            if (profileQuery.documents.length > 0) {
                await databases.updateDocument(dbId, 'profiles', profileQuery.documents[0].$id, {
                    isBanned: false,
                    trustScore: 10 // Reset to low positive
                });
            }
        }
        return { success: true };
    } catch (e) {
        console.error("Update Status Failed:", e);
        return { success: false, error: e.message };
    }
}
