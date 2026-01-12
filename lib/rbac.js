export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    CONTRIBUTOR: 'contributor',
    USER: 'user',
    BANNED: 'banned'
};

export const PERMISSIONS = {
    // CMS
    MANAGE_PAGES: 'manage_pages',
    MANAGE_CONTENT: 'manage_content',

    // Modules
    MANAGE_TOOLS: 'manage_tools',
    MANAGE_DOCS: 'manage_docs',
    MANAGE_SNIPPETS: 'manage_snippets',

    // User Management
    MANAGE_USERS: 'manage_users',
    BAN_USERS: 'ban_users',

    // System
    VIEW_LOGS: 'view_logs',
    MANAGE_SETTINGS: 'manage_settings',
    ACCESS_ADMIN: 'access_admin'
};

const ROLE_PERMISSIONS = {
    [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS), // Everything

    [ROLES.ADMIN]: [
        PERMISSIONS.ACCESS_ADMIN,
        PERMISSIONS.MANAGE_PAGES,
        PERMISSIONS.MANAGE_CONTENT,
        PERMISSIONS.MANAGE_TOOLS,
        PERMISSIONS.MANAGE_DOCS,
        PERMISSIONS.MANAGE_SNIPPETS,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.BAN_USERS,
        PERMISSIONS.VIEW_LOGS
        // No Settings
    ],

    [ROLES.MODERATOR]: [
        PERMISSIONS.ACCESS_ADMIN,
        PERMISSIONS.MANAGE_SNIPPETS,
        PERMISSIONS.BAN_USERS, // Can ban spammers
        PERMISSIONS.VIEW_LOGS
    ],

    [ROLES.CONTRIBUTOR]: [
        PERMISSIONS.ACCESS_ADMIN,
        PERMISSIONS.MANAGE_SNIPPETS
        // Can only submit/edit own content usually
    ]
};

/**
 * Checks if a role has a specific permission
 * @param {string} role 
 * @param {string} permission 
 */
export function hasPermission(role, permission) {
    if (!role) return false;
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
}

/**
 * Validates access for Admin Layout
 */
export function canAccessAdmin(role) {
    return hasPermission(role, PERMISSIONS.ACCESS_ADMIN);
}
