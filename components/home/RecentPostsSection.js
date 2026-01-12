"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Star } from 'lucide-react';

const RecentPostsSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts?status=published&limit=3')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch posts", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; // Or a loading skeleton
    if (posts.length === 0) return null;

    return (
        <section className="py-24 bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-xs font-black tracking-widest uppercase text-accent-primary mb-2 block">Fresh from the Lab</span>
                        <h2 className="text-3xl md:text-4xl font-black text-accent-primary">Latest Verified Fixes</h2>
                    </div>
                    <Link href="/errors" className="group flex items-center space-x-2 text-sm font-bold text-accent-primary hover:text-accent-hover transition-colors">
                        <span>View Archive</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/errors/${post.slug}`} className="group flex flex-col h-full">
                            <div className="flex-1 p-8 bg-gray-50 dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/5 rounded-3xl hover:border-accent-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-primary/5 group-hover:bg-white dark:group-hover:bg-[#121212]">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary transition-all">
                                        {post.language}
                                    </span>
                                    <div className="flex items-center text-yellow-500 space-x-1 text-xs font-bold">
                                        <Star size={12} fill="currentColor" />
                                        <span>4.9</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-accent-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                                    {post.description}
                                </p>
                                <div className="mt-auto flex items-center text-xs font-medium text-gray-400">
                                    <Clock size={14} className="mr-2" />
                                    <span>Added recently</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentPostsSection;
