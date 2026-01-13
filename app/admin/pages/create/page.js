'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPage } from '@/lib/actions/pages';
import { useAuth } from '@/context/AuthContext';
import { Save, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

const DEFAULT_TEMPLATE = {
    title: "New Page",
    description: "Page Description",
    sections: []
};

export default function CreatePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [jsonContent, setJsonContent] = useState(JSON.stringify(DEFAULT_TEMPLATE, null, 4));
    const [error, setError] = useState(null);

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        if (!slug) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    };

    const handleSave = async () => {
        if (!title || !slug) {
            setError("Title and Slug are required.");
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            // Validate JSON
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
                status: 'published',
                seoTitle: title,
                seoDescription: 'Page created via Admin Panel'
            };

            const result = await createPage(payload);
            if (result.success) {
                alert("Page Created!");
                router.push('/admin/pages');
            } else {
                throw new Error(result.error);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-surface rounded-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-black text-text-primary uppercase">Create Page</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Create Page
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
                                onChange={handleTitleChange}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary"
                                placeholder="e.g. Terms of Service"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary font-mono text-sm"
                                placeholder="terms-of-service"
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
