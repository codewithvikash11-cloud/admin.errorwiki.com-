// MOCK Admin Service (No Backend)

export const adminService = {
    // --- USERS ---
    getUsers: async (limit = 100, offset = 0, search = '') => {
        return Promise.resolve({
            users: [
                { id: '1', name: 'Admin User', email: 'admin@errorwiki.com', role: 'admin', status: 'active', joinedAt: new Date().toISOString() },
                { id: '2', name: 'Test Visitor', email: 'visitor@example.com', role: 'viewer', status: 'active', joinedAt: new Date().toISOString() }
            ],
            total: 2
        });
    },

    updateUserStatus: async () => Promise.resolve(true),
    updateUserRole: async () => Promise.resolve(true),

    // --- LOGS ---
    logSecurityEvent: async () => Promise.resolve(),
    getSecurityLogs: async () => Promise.resolve([
        { id: '1', type: 'INFO', message: 'System startup', timestamp: new Date().toISOString() }
    ]),

    // --- SETTINGS ---
    getSettings: async () => Promise.resolve({
        siteName: 'ErrorWiki',
        siteDescription: 'Admin Panel',
        maintenanceMode: false,
        theme: 'dark'
    }),
    updateSettings: async () => Promise.resolve(true),

    // --- ANALYTICS ---
    getStats: async () => Promise.resolve({
        totalUsers: 2,
        totalPosts: 5,
        pendingPosts: 0,
        systemHealth: 'Good',
        avgTrust: 100
    })
};
