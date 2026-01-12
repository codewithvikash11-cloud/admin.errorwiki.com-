"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PenTool, FileText, BarChart3, Users, Zap, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getPosts } from '@/lib/posts';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ posts: 0, drafts: 0 });

    useEffect(() => {
        // Quick fetch for stats
        const fetchStats = async () => {
            const allPosts = await getPosts(100);
            const drafts = allPosts.filter(p => p.status === 'draft').length;
            setStats({ posts: allPosts.length, drafts });
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">Dashboard</h1>
                    <p className="text-text-secondary">Welcome back, {user?.name || 'Admin'}</p>
                </div>
                <Link
                    href="/admin/create-post"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#008000] text-white font-bold hover:bg-[#006600] transition-colors shadow-lg shadow-[#008000]/20"
                >
                    <PenTool size={18} />
                    Create New Post
                </Link>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-panel border border-border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                            <FileText size={24} />
                        </div>
                        <span className="text-xs font-bold text-text-secondary uppercase">Total Posts</span>
                    </div>
                    <div className="text-3xl font-black text-text-primary">{stats.posts}</div>
                </div>

                <div className="p-6 rounded-2xl bg-panel border border-border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                            <Zap size={24} />
                        </div>
                        <span className="text-xs font-bold text-text-secondary uppercase">Drafts</span>
                    </div>
                    <div className="text-3xl font-black text-text-primary">{stats.drafts}</div>
                </div>

                <div className="p-6 rounded-2xl bg-panel border border-border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                            <BarChart3 size={24} />
                        </div>
                        <span className="text-xs font-bold text-text-secondary uppercase">Published</span>
                    </div>
                    <div className="text-3xl font-black text-text-primary">{stats.posts - stats.drafts}</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/posts" className="group p-6 rounded-2xl bg-panel border border-border hover:border-[#008000] transition-all">
                    <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                        Manage Content <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-text-secondary">View, edit, and delete existing posts.</p>
                </Link>

                <div className="p-6 rounded-2xl bg-panel border border-border opacity-50 cursor-not-allowed">
                    <h3 className="text-lg font-bold text-text-primary mb-2">Manage Users (Soon)</h3>
                    <p className="text-sm text-text-secondary">User role management coming soon.</p>
                </div>
            </div>
        </div>
    );
}
