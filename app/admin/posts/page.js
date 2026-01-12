"use client";

import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '@/lib/posts';
import Link from 'next/link';
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react';

export default function AdminPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await getPosts(100);
        setPosts(data);
        setLoading(false);
    };

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        await deletePost(slug);
        loadPosts();
    };

    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">Posts</h1>
                    <p className="text-text-secondary">Manage your content.</p>
                </div>
                <Link
                    href="/admin/create-post"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#008000] text-white font-bold hover:bg-[#006600] transition-colors"
                >
                    <Plus size={18} /> New Post
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full bg-panel border border-border rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#008000] outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* List */}
            <div className="bg-panel border border-border rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-text-secondary">Loading posts...</div>
                ) : filteredPosts.length === 0 ? (
                    <div className="p-8 text-center text-text-secondary">No posts found.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-surface border-b border-border">
                            <tr>
                                <th className="p-4 text-xs font-bold uppercase text-text-secondary">Title</th>
                                <th className="p-4 text-xs font-bold uppercase text-text-secondary">Status</th>
                                <th className="p-4 text-xs font-bold uppercase text-text-secondary">Date</th>
                                <th className="p-4 text-xs font-bold uppercase text-text-secondary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredPosts.map(post => (
                                <tr key={post.id} className="hover:bg-surface/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-text-primary">{post.title}</div>
                                        <div className="text-xs text-text-secondary font-mono">{post.slug}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${post.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-text-secondary">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link href={`/post/${post.slug}`} target="_blank" className="inline-block p-2 text-text-secondary hover:text-white transition-colors">
                                            <Eye size={16} />
                                        </Link>
                                        <button disabled className="inline-block p-2 text-text-secondary hover:text-white transition-colors opacity-50 cursor-not-allowed" title="Edit coming soon">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(post.slug)} className="inline-block p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
