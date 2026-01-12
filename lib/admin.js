
/**
 * Admin Authentication Logic
 * 
 * Verifies if a user is an admin based on their email address.
 * Uses strict equality check against an allowlist.
 */

const ADMIN_EMAILS = [
    'rahul@roviotech.com', // Replace with actual admin emails
    'admin@roviotech.com',
    'demo@roviotech.com',
    'testuser6153@example.com'
];

/**
 * Checks if the given email belongs to an admin.
 * @param {string} email 
 * @returns {boolean}
 */
export function isAdmin(email) {
    if (!email) return false;

    //Check environment variable first
    const envAdmins = process.env.NEXT_PUBLIC_ADMIN_EMAILS
        ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map(e => e.trim())
        : [];

    const allAdmins = [...new Set([...ADMIN_EMAILS, ...envAdmins])];

    return allAdmins.includes(email);
}

/**
 * Server-side check helper (if needed later)
 */
export function verifyAdminAccess(user) {
    if (!user || !user.email) return false;
    return isAdmin(user.email);
}
