"use server";
// MOCK Admin Actions
export async function getStats() {
    return {
        users: 10,
        posts: 5,
        views: 100
    };
}
export async function getLogs() { return []; }
