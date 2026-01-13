import React from 'react';
import { getPosts } from '@/lib/actions/posts'; // I need to ensure getPosts exists in actions
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getMenus } from '@/lib/actions/menus';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const [posts, menuItems] = await Promise.all([
        getPosts(), // This action fetches all posts
        getMenus()
    ]);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar hideLinks={false} menuItems={menuItems} />

            <div className="container mx-auto px-6 py-24 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Engineering Blog</h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Insights, tutorials, and updates from the team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent-primary transition-colors">
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                                        <span>{post.category || 'General'}</span>
                                        <span>•</span>
                                        <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h2 className="text-xl font-bold group-hover:text-accent-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-text-secondary text-sm line-clamp-3">
                                        {post.description}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-text-secondary">
                            No posts found.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
