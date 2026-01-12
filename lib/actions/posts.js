"use server";
// MOCK Posts Actions
export async function createPost(data) { return { success: true, post: data }; }
export async function updatePost(id, data) { return { success: true, post: data }; }
export async function deletePost(id) { return { success: true }; }
