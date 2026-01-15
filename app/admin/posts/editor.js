"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost, getPostBySlug } from '@/lib/actions/posts';
import { useAuth } from '@/context/AuthContext';
import { Save, ArrowLeft, Image as ImageIcon, Code, Eye, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mediaService } from '@/lib/media';

// Simple Markdown Editor for now - Replace with TipTap/Quill later if requested
const Editor = ({ value, onChange, placeholder }) => (
    <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[500px] p-6 bg-surface border border-border rounded-xl focus:outline-none focus:border-accent-primary/50 font-mono text-sm leading-relaxed resize-none"
    />
);

export default function PostEditor({ params }) {
    const isEditMode = !!params?.slug;
    const router = useRouter();
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(isEditMode);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        status: 'draft', // draft, published
        category: 'tutorial',
        authorId: '',
        authorName: ''
    });

    useEffect(() => {
        if (isEditMode) {
            loadPost();
        } else if (user) {
            setFormData(prev => ({ ...prev, authorId: user.$id, authorName: user.name }));
        }
    }, [isEditMode, user]);

    const loadPost = async () => {
        try {
            const post = await getPostBySlug(params.slug);
            if (!post) {
                alert("Post not found");
                router.push('/admin/posts');
                return;
            }
            setFormData(post);
        } catch (error) {
            console.error("Load Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Auto-generate slug if empty
            const payload = { ...formData };
            if (!payload.slug) {
                payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }

            if (isEditMode) {
                await updatePost(params.slug, payload);
            } else {
                await createPost(payload);
            }

            alert(`Post ${isEditMode ? 'updated' : 'created'} successfully!`);
            router.push('/admin/posts');
        } catch (error) {
            alert("Error saving post: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-12 text-center animate-pulse">Loading editor...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-4 z-20 bg-[#0f172a]/80 backdrop-blur-md p-4 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => router.back()} className="p-2 hover:bg-surface rounded-lg transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-bold text-lg text-text-primary">
                            {isEditMode ? 'Edit Post' : 'New Post'}
                        </h1>
                        <p className="text-xs text-text-secondary">
                            {formData.status === 'published' ? '🟢 Published' : '🟡 Draft'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white font-bold rounded-lg shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Save
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4 bg-panel border border-border rounded-2xl p-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-lg font-bold text-text-primary focus:outline-none focus:border-accent-primary/50"
                                placeholder="Enter post title..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Language (Optional)</label>
                            <select
                                value={formData.language || ''}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary/50"
                            >
                                <option value="">None / Text</option>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="rust">Rust</option>
                                <option value="go">Go</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                                <option value="csharp">C#</option>
                                <option value="typescript">TypeScript</option>
                                <option value="php">PHP</option>
                                <option value="ruby">Ruby</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-2 font-mono text-sm text-text-secondary focus:outline-none focus:border-accent-primary/50"
                                placeholder="auto-generated-slug"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Excerpt / Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary/50 h-24 resize-none"
                                placeholder="Short summary for SEO and cards..."
                            />
                        </div>
                    </div>

                    <div className="bg-panel border border-border rounded-2xl p-1">
                        <div className="border-b border-border p-2 flex items-center gap-2">
                            <span className="text-xs font-bold text-text-secondary px-2">CONTENT EDITOR</span>
                            {/* Toolbar placeholders */}
                            <button type="button" className="p-1.5 hover:bg-surface rounded"><Code size={14} /></button>
                            <button type="button" className="p-1.5 hover:bg-surface rounded"><ImageIcon size={14} /></button>
                        </div>
                        <Editor
                            value={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            placeholder="Write your masterpiece here... (Markdown supported)"
                        />
                    </div>
                </div>

                {/* Sidebar Meta */}
                <div className="space-y-6">
                    <div className="bg-panel border border-border rounded-2xl p-6 space-y-4">
                        <h3 className="font-bold text-sm text-text-secondary uppercase border-b border-border pb-2 mb-4">Post Settings</h3>

                        <div>
                            <label className="block text-xs font-bold text-text-tertiary mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            >
                                <option value="tutorial">Tutorial</option>
                                <option value="news">News</option>
                                <option value="solution">Solution</option>
                                <option value="resource">Resource</option>
                            </select>
                        </div>
                        {/* Tags could go here */}
                    </div>

                    <div className="bg-panel border border-border rounded-2xl p-6">
                        <h3 className="font-bold text-sm text-text-secondary uppercase border-b border-border pb-2 mb-4">Featured Image</h3>
                        <div className="h-32 bg-surface border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-text-tertiary hover:border-accent-primary/50 cursor-pointer transition-colors">
                            <ImageIcon size={24} className="mb-2" />
                            <span className="text-xs">Click to upload</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
