'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updatePage, deletePage } from '@/lib/actions/pages'; // Fix import
import { pages as pagesService } from '@/lib/pages'; // We need to fetch initial data. Can we use Server Action? Or lib directly if compatible?
// Since this is client component, we need a way to fetch data. 
// Ideally we pass data from Server Component wrapper. But this is the page.js.
// We can use a Server Action to 'get' data too, or just fetch from an API route.
// Let's assume we can add a 'getPage' action to lib/actions/pages.js or use the one we have? 
// Actually lib/actions/pages.js only has Create/Update/Delete.
// I will add 'getPage' to lib/actions/pages.js later.
// For now I'll stub the fetch or use the one I'm about to add.

import { Save, ArrowLeft, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { getPage } from '@/lib/actions/pages'; // I will add this

export default function EditPage() {
    const router = useRouter();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [page, setPage] = useState(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [jsonContent, setJsonContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            // We need a server action to get the page by ID
            // I'll assume getPage(id) exists in actions
            const data = await getPage(id);
            if (!data) throw new Error("Page not found");

            setPage(data);
            setTitle(data.title);
            setSlug(data.slug);
            setJsonContent(data.content);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        try {
            JSON.parse(jsonContent);
        } catch (e) {
            setError("Invalid JSON content.");
            setIsSaving(false);
            return;
        }

        try {
            const payload = {
                title,
                slug,
                content: jsonContent,
                status: 'published'
            };

            const result = await updatePage(id, payload);
            if (result.success) {
                alert("Page Updated!");
                router.refresh();
            } else {
                throw new Error(result.error);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-12 text-center animate-pulse">Loading...</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-surface rounded-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-black text-text-primary uppercase">Edit Page</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span className="font-medium">{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                    <div className="bg-panel border border-border rounded-xl p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Page Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-panel border border-border rounded-xl flex flex-col h-[600px]">
                        <div className="bg-surface border-b border-border px-4 py-2 text-xs font-bold text-text-secondary uppercase">
                            Page Content (JSON)
                        </div>
                        <textarea
                            value={jsonContent}
                            onChange={(e) => setJsonContent(e.target.value)}
                            className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 resize-none focus:outline-none"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
