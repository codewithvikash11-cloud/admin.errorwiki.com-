"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPostById, createAdminPost, updateAdminPost } from '@/lib/actions/posts';
import { Save, ArrowLeft, Layout, FileText, Type } from 'lucide-react';
import Link from 'next/link';

export default function PostEditor() {
    const params = useParams(); // { id }
    const router = useRouter();
    const isNew = params.id === 'new';

    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        seoTitle: '',
        seoDescription: ''
    });
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) {
            const load = async () => {
                const data = await getPostById(params.id);
                if (data) {
                    setForm({
                        title: data.title,
                        slug: data.slug,
                        description: data.description || '',
                        content: data.content || '',
                        seoTitle: data.seoTitle || '',
                        seoDescription: data.seoDescription || ''
                    });
                }
                setLoading(false);
            };
            load();
        }
    }, [isNew, params.id]);

    const handleSave = async () => {
        if (!form.title || !form.content) return alert('Title and Content are required.');

        setSaving(true);
        let res;

        if (isNew) {
            res = await createAdminPost(form);
        } else {
            res = await updateAdminPost(params.id, form);
        }

        setSaving(false);

        if (res.success) {
            alert('Saved successfully!');
            router.push('/admin/posts');
            router.refresh();
        } else {
            alert('Error: ' + res.error);
        }
    };

    if (loading) return <div className="p-10 text-accent-primary">Loading editor...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white">{isNew ? 'Create New Post' : 'Edit Post'}</h1>
                        <p className="text-gray-500 text-sm">{isNew ? 'Draft a new article for your audience.' : `Editing: ${form.title}`}</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-black px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20 disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Publish Changes'}
                </button>
            </div>

            <div className="grid gap-6">
                {/* Main Meta */}
                <section className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 space-y-4">
                    <div>
                        <label className="text-xs font-mono text-gray-500 uppercase mb-1 block">Post Title</label>
                        <input
                            type="text"
                            placeholder="e.g. 10 Ways to optimize Next.js"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full bg-[#111] border border-[#222] rounded-xl p-4 text-xl font-bold text-white focus:border-accent-primary outline-none"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-mono text-gray-500 uppercase mb-1 block">URL Slug (Optional)</label>
                            <input
                                type="text"
                                placeholder="auto-generated-from-title"
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                className="w-full bg-[#111] border border-[#222] rounded-lg p-3 text-sm text-gray-300 focus:border-accent-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono text-gray-500 uppercase mb-1 block">Short Description</label>
                            <input
                                type="text"
                                placeholder="For SEO and cards..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full bg-[#111] border border-[#222] rounded-lg p-3 text-sm text-gray-300 focus:border-accent-primary outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Content Editor */}
                <section className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 flex-1 flex flex-col min-h-[500px]">
                    <label className="text-xs font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
                        <FileText size={14} /> Main Content (Markdown Supported)
                    </label>
                    <textarea
                        className="flex-1 w-full bg-[#111] border border-[#222] rounded-xl p-6 text-gray-200 font-mono text-sm leading-relaxed focus:border-accent-primary outline-none resize-none"
                        placeholder="# Write something amazing..."
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                </section>

                {/* SEO (Collapsible style or just block) */}
                <section className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6">
                    <h3 className="font-bold text-gray-400 mb-4 flex items-center gap-2 text-sm uppercase">
                        <Type size={16} /> SEO Settings (Advanced)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-mono text-gray-500 uppercase mb-1 block">Meta Title</label>
                            <input
                                type="text"
                                value={form.seoTitle}
                                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                                className="w-full bg-[#111] border border-[#222] rounded-lg p-3 text-sm text-gray-300 focus:border-accent-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono text-gray-500 uppercase mb-1 block">Meta Description</label>
                            <input
                                type="text"
                                value={form.seoDescription}
                                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                                className="w-full bg-[#111] border border-[#222] rounded-lg p-3 text-sm text-gray-300 focus:border-accent-primary outline-none"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
