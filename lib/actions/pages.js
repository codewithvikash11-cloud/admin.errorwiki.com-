"use server";
// MOCK Pages Actions
export async function createPage(data) { return { success: true, page: data }; }
export async function updatePage(id, data) { return { success: true, page: data }; }
export async function deletePage(id) { return { success: true }; }
