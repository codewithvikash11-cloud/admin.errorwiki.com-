"use server";
// MOCK Content Actions
export async function updateContent() { return { success: true }; }
export async function getContent() { return { success: true, content: "Mock Content" }; }
