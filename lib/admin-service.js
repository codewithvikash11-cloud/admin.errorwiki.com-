import { createAdminClient, Query, ID } from './appwrite-server';

// Configuration for Collections (Env vars preferred, fallbacks provided)
const CONFIG = {
    DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    LOGS_COLLECTION_ID: process.env.APPWRITE_LOGS_COLLECTION_ID || 'security_logs',
    SETTINGS_COLLECTION_ID: process.env.APPWRITE_SETTINGS_COLLECTION_ID || 'site_settings'
};

export const adminService = {
    // --- USERS ---
    getUsers: async (limit = 100, offset = 0, search = '') => {
        try {
            const { users } = createAdminClient();
            const queries = [Query.limit(limit), Query.offset(offset)];
            if (search) {
                queries.push(Query.search('name', search));
            }
            // Sort by most recent
            queries.push(Query.orderDesc('$createdAt'));

            const response = await users.list(queries);
            return {
                users: response.users.map(u => ({
                    id: u.$id,
                    name: u.name,
                    email: u.email,
                    role: u.prefs?.role || 'viewer', // Use prefs for roles
                    trustScore: u.prefs?.trustScore || 100,
                    status: u.status ? 'active' : 'banned',
                    joinedAt: u.$createdAt,
                    lastAccessedAt: u.accessedAt
                })),
                total: response.total
            };
        } catch (error) {
            console.error("Failed to fetch users:", error);
            return { users: [], total: 0 };
        }
    },

    updateUserStatus: async (userId, status, trustScoreChange = 0) => {
        try {
            const { users } = createAdminClient();

            // 1. Update Status (Block/Unblock)
            const isActive = status === 'active';
            await users.updateStatus(userId, isActive);

            // 2. Update Trust Score & Role in Prefs
            if (trustScoreChange !== 0) {
                const user = await users.get(userId);
                const currentScore = user.prefs?.trustScore || 100;
                const newScore = Math.max(0, Math.min(100, currentScore + trustScoreChange));

                await users.updatePrefs(userId, {
                    ...user.prefs,
                    trustScore: newScore
                });
            }

            return true;
        } catch (error) {
            console.error("Failed to update user:", error);
            throw error;
        }
    },

    updateUserRole: async (userId, role) => {
        try {
            const { users } = createAdminClient();
            const user = await users.get(userId);
            await users.updatePrefs(userId, {
                ...user.prefs,
                role: role // 'admin', 'editor', 'author', 'viewer'
            });
            return true;
        } catch (error) {
            console.error("Failed to update user role:", error);
            throw error;
        }
    },

    // --- LOGS ---
    logSecurityEvent: async (report) => {
        try {
            const { databases } = createAdminClient();
            if (!CONFIG.DATABASE_ID) return;

            await databases.createDocument(
                CONFIG.DATABASE_ID,
                CONFIG.LOGS_COLLECTION_ID,
                ID.unique(),
                {
                    timestamp: new Date().toISOString(),
                    type: report.type || 'INFO',
                    message: report.message,
                    metadata: JSON.stringify(report.metadata || {}),
                    ip: report.ip || 'unknown',
                    userId: report.userId || null
                }
            );
        } catch (error) {
            console.warn("Failed to log security event (Check Collection IDs):", error.message);
        }
    },

    getSecurityLogs: async (limit = 50) => {
        try {
            const { databases } = createAdminClient();
            if (!CONFIG.DATABASE_ID) return [];

            const response = await databases.listDocuments(
                CONFIG.DATABASE_ID,
                CONFIG.LOGS_COLLECTION_ID,
                [Query.orderDesc('$createdAt'), Query.limit(limit)]
            );

            return response.documents.map(doc => ({
                id: doc.$id,
                timestamp: doc.timestamp,
                type: doc.type,
                message: doc.message,
                metadata: JSON.parse(doc.metadata || '{}'),
                ip: doc.ip,
                userId: doc.userId
            }));
        } catch (error) {
            console.warn("Failed to fetch logs:", error.message);
            return [];
        }
    },

    // --- SETTINGS ---
    getSettings: async () => {
        try {
            const { databases } = createAdminClient();
            if (!CONFIG.DATABASE_ID) return {};

            // We assume a single document holds global settings
            // Try to find it, or return defaults
            const response = await databases.listDocuments(
                CONFIG.DATABASE_ID,
                CONFIG.SETTINGS_COLLECTION_ID,
                [Query.limit(1)]
            );

            if (response.documents.length > 0) {
                return response.documents[0];
            }
            return {
                siteName: 'Rovio Tech',
                siteDescription: 'The Ultimate Developer Platform',
                maintenanceMode: false,
                registrationEnabled: true,
                theme: 'dark'
            };
        } catch (error) {
            console.warn("Fetch Settings Error:", error.message);
            return {};
        }
    },

    updateSettings: async (settings) => {
        try {
            const { databases } = createAdminClient();
            // Check if settings doc exists
            const existing = await adminService.getSettings();

            if (existing.$id) {
                await databases.updateDocument(
                    CONFIG.DATABASE_ID,
                    CONFIG.SETTINGS_COLLECTION_ID,
                    existing.$id,
                    settings
                );
            } else {
                // Create new
                await databases.createDocument(
                    CONFIG.DATABASE_ID,
                    CONFIG.SETTINGS_COLLECTION_ID,
                    ID.unique(),
                    settings
                );
            }
            return true;
        } catch (error) {
            console.error("Update Settings Error:", error);
            throw error;
        }
    },

    // --- ANALYTICS ---
    getStats: async () => {
        try {
            const { users, databases } = createAdminClient();

            // Parallel fetches for speed
            const [usersList, postsList] = await Promise.all([
                users.list([Query.limit(0)]), // Just for total count
                databases.listDocuments(
                    CONFIG.DATABASE_ID,
                    process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID, // Main Posts Collection
                    [Query.limit(0)]
                )
            ]);

            return {
                totalUsers: usersList.total,
                totalPosts: postsList.total,
                pendingPosts: 0, // Need detailed query
                systemHealth: 'Good', // dynamic later
                avgTrust: 98 // placeholder until deep scan
            };
        } catch (error) {
            console.error("Failed to fetch stats:", error);
            // Return safe fallback
            return {
                totalUsers: 0,
                totalPosts: 0,
                pendingPosts: 0,
                systemHealth: 'Unknown',
                avgTrust: 0
            };
        }
    }
};
