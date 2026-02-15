'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Globe, LayoutTemplate, Type } from 'lucide-react';
import { toast } from 'sonner';
import { createPage, updatePage } from '@/lib/actions/pages';
import Builder from './page-builder/Builder';

export default function PageEditor({ initialData = null }) {
    const router = useRouter();
    const isEditing = !!initialData;
    const [loading, setLoading] = useState(false);

    // Form State
    const [editorMode, setEditorMode] = useState('rich-text'); // 'rich-text' | 'builder'
    const [builderSections, setBuilderSections] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                slug: initialData.slug || '',
                content: initialData.content || '',
                status: initialData.status || 'draft',
                seoTitle: initialData.seoTitle || '',
                seoDescription: initialData.seoDescription || ''
            });

            // Detect Builder Content
            if (initialData.content && initialData.content.trim().startsWith('[')) {
                try {
                    const parsed = JSON.parse(initialData.content);
                    if (Array.isArray(parsed)) {
                        setBuilderSections(parsed);
                        setEditorMode('builder');
                    }
                } catch (e) {
                    console.log("Content is not JSON, defaulting to Rich Text");
                }
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updates = { [name]: value };
            if (name === 'title' && !isEditing && (!prev.slug || prev.slug === slugify(prev.title))) {
                updates.slug = slugify(value);
            }
            return { ...prev, ...updates };
        });
    };

    const slugify = (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare payload
        const payload = { ...formData };
        if (editorMode === 'builder') {
            payload.content = JSON.stringify(builderSections);
        }

        try {
            let res;
            if (isEditing) {
                res = await updatePage(initialData.id, payload);
            } else {
                res = await createPage(payload);
            }

            if (res.success) {
                toast.success(`Page ${isEditing ? 'updated' : 'created'} successfully!`);
                router.push('/admin/pages');
            } else {
                toast.error(res.error || 'Something went wrong');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between sticky top-0 bg-[#050505] z-10 py-4 border-b border-border-primary mb-6">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-2 hover:bg-surface-hover rounded-xl text-text-secondary transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-text-primary tracking-tight">
                            {isEditing ? 'Edit Page' : 'Create New Page'}
                        </h1>
                        <p className="text-sm text-text-secondary">
                            {isEditing ? `Editing: ${initialData.title}` : 'Add a new static page'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? 'Saving...' : 'Save Page'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left, 2 cols) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Title & Slug */}
                    <div className="bg-surface-card border border-border-primary rounded-2xl p-6 space-y-6 shadow-sm">
                        <div>
                            <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                                Page Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. About Us"
                                className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-3 text-lg font-medium text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                                URL Slug
                            </label>
                            <div className="flex items-center bg-surface-hover border border-border-primary rounded-xl px-4 py-3">
                                <span className="text-text-secondary mr-1">/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="about-us"
                                    className="w-full bg-transparent border-none p-0 text-text-primary focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editor Mode Toggle */}
                    <div className="flex items-center gap-4 bg-surface-card border border-border-primary rounded-2xl p-2 px-4 shadow-sm">
                        <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Editor Mode:</span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setEditorMode('rich-text')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${editorMode === 'rich-text'
                                    ? 'bg-brand-primary text-white shadow-md'
                                    : 'hover:bg-surface-hover text-text-secondary'
                                    }`}
                            >
                                <Type size={16} /> Rich Text
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditorMode('builder')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${editorMode === 'builder'
                                    ? 'bg-brand-primary text-white shadow-md'
                                    : 'hover:bg-surface-hover text-text-secondary'
                                    }`}
                            >
                                <LayoutTemplate size={16} /> Page Builder
                            </button>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="bg-surface-card border border-border-primary rounded-2xl p-6 shadow-sm">

// ... imports
                        import Builder from './page-builder/Builder';

                        // ... inside render toggle
                        {editorMode === 'rich-text' ? (
                            <>
                                <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-4">
                                    Content (HTML/Markdown)
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={20}
                                    className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-4 text-text-primary font-mono text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-y"
                                    placeholder="<h1>Start writing your page content...</h1>"
                                />
                                <p className="mt-2 text-xs text-text-secondary">
                                    Supports HTML and Markdown. Use &lt;section&gt; tags for layout blocks.
                                </p>
                            </>
                        ) : (
                            <Builder sections={builderSections} setSections={setBuilderSections} />
                        )}

                    </div>
                </div>

                {/* Sidebar (Right, 1 col) */}
                <div className="space-y-6">

                    {/* Status Card */}
                    <div className="bg-surface-card border border-border-primary rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-text-primary mb-4">Publishing</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            {isEditing && (
                                <div className="pt-4 border-t border-border-primary">
                                    <p className="text-xs text-text-secondary">
                                        Last Updated: {initialData.updatedAt ? new Date(initialData.updatedAt).toLocaleString() : '-'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SEO Card */}
                    <div className="bg-surface-card border border-border-primary rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-text-primary">
                            <Globe size={18} />
                            <h3 className="font-bold">SEO Settings</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    name="seoTitle"
                                    value={formData.seoTitle}
                                    onChange={handleChange}
                                    placeholder="Browser Tab Title"
                                    className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    name="seoDescription"
                                    value={formData.seoDescription}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Search engine description..."
                                    className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
