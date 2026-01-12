"use client";

import React, { useEffect, useState } from 'react';
import {
    Users,
    FileText,
    Briefcase,
    AlertTriangle,
    Activity,
    ArrowUpRight,
    Search,
    Clock
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        users: 0,
        posts: 0,
        tools: 0,
        errors: 0
    });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                setStats({
                    users: data.totalUsers || 0,
                    posts: data.totalPosts || 0,
                    tools: 0,
                    errors: 0
                });
            } catch (error) {
                console.error("Dashboard Stats Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Dashboard</h1>
                    <p className="text-text-secondary">Overview of platform performance and content.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                        <Activity size={12} />
                        All Systems Operational
                    </span>
                    <button className="px-4 py-2 bg-accent-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.users.toLocaleString()}
                    icon={Users}
                    trend="+12%"
                    trendUp={true}
                    loading={isLoading}
                />
                <StatsCard
                    title="Active Tools"
                    value={stats.tools.toLocaleString()}
                    icon={Briefcase}
                    trend="+4"
                    trendUp={true}
                    loading={isLoading}
                />
                <StatsCard
                    title="Published Posts"
                    value={stats.posts.toLocaleString()}
                    icon={FileText}
                    trend="+8%"
                    trendUp={true}
                    loading={isLoading}
                />
                <StatsCard
                    title="Security Alerts"
                    value={stats.errors.toLocaleString()}
                    icon={AlertTriangle}
                    trend="-2"
                    trendUp={false} // Good that it's down, but technically "trendUp" usually means increasing number
                    isBad={false}   // Helper to color code
                    loading={isLoading}
                />
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-text-primary">Recent Activity</h2>
                        <button className="text-xs text-accent-primary font-bold hover:underline">View All</button>
                    </div>

                    <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="divide-y divide-border">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-surface/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary group-hover:bg-accent-primary/10 group-hover:text-accent-primary transition-colors">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary">New blog post published</p>
                                            <p className="text-xs text-text-secondary">"Understanding React Server Components"</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-text-tertiary flex items-center gap-1">
                                            <Clock size={12} />
                                            2h ago
                                        </span>
                                        <button className="p-2 text-text-secondary hover:text-accent-primary">
                                            <ArrowUpRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions Column */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-text-primary">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <Link href="/admin/posts" className="p-4 bg-panel border border-border rounded-2xl hover:border-accent-primary/50 transition-all group shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-accent-primary/10 text-accent-primary rounded-lg group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <ArrowUpRight size={16} className="text-text-tertiary group-hover:text-accent-primary" />
                            </div>
                            <h3 className="font-bold text-text-primary">Write New Article</h3>
                            <p className="text-xs text-text-secondary mt-1">Create blog post or error solution</p>
                        </Link>

                        <Link href="/admin/pages" className="p-4 bg-panel border border-border rounded-2xl hover:border-accent-primary/50 transition-all group shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-accent-primary/10 text-accent-primary rounded-lg group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                    <Briefcase size={20} />
                                </div>
                                <ArrowUpRight size={16} className="text-text-tertiary group-hover:text-accent-primary" />
                            </div>
                            <h3 className="font-bold text-text-primary">Manage Tools</h3>
                            <p className="text-xs text-text-secondary mt-1">Edit descriptions and metadata</p>
                        </Link>

                        <Link href="/admin/users" className="p-4 bg-panel border border-border rounded-2xl hover:border-accent-primary/50 transition-all group shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 bg-accent-primary/10 text-accent-primary rounded-lg group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                    <Users size={20} />
                                </div>
                                <ArrowUpRight size={16} className="text-text-tertiary group-hover:text-accent-primary" />
                            </div>
                            <h3 className="font-bold text-text-primary">User Management</h3>
                            <p className="text-xs text-text-secondary mt-1">Review active sessions</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, trend, trendUp, loading }) {
    if (loading) {
        return <div className="h-32 bg-panel border border-border rounded-2xl animate-pulse"></div>;
    }

    return (
        <div className="p-6 bg-panel border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-black text-text-primary mt-1">{value}</h3>
                </div>
                <div className="p-3 bg-surface border border-border rounded-xl text-text-tertiary group-hover:text-accent-primary group-hover:border-accent-primary/30 transition-colors">
                    <Icon size={20} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trend}
                </span>
                <span className="text-xs text-text-tertiary">vs last month</span>
            </div>
        </div>
    );
}
