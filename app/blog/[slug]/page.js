import React from 'react';
import { getPostBySlug } from '@/lib/actions/posts';
import { getMenus } from '@/lib/actions/menus';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock'; // Reusing CodeBlock if applicable for markdown

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: `${post.seoTitle || post.title} | ErrorWiki`,
        description: post.seoDescription || post.description
    };
}

export default async function BlogPostPage({ params }) {
    const [post, menuItems] = await Promise.all([
        getPostBySlug(params.slug),
        getMenus()
    ]);

    if (!post) notFound();

    // Simple markdown renderer or just text if raw
    // Assuming content is markdown. We should use a markdown renderer.
    // For now, I'll split by newlines and basic formatting or just dumb render.
    // Ideally use 'react-markdown' if installed, but I don't think it is.
    // I will check package.json later. For now, simple render.

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar hideLinks={false} menuItems={menuItems} />

            <article className="container mx-auto px-6 py-24 max-w-4xl">
                <Link href="/blog" className="inline-flex items-center text-sm text-text-secondary hover:text-accent-primary mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-accent-primary mb-4">
                        <span className="flex items-center gap-1"><Tag size={12} /> {post.category}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {new Date(post.$createdAt).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{post.title}</h1>
                    <p className="text-xl text-text-secondary leading-relaxed">{post.description}</p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-a:text-accent-primary prose-headings:font-bold">
                    {/* 
                      Basic fallback renderer since we might not have a markdown parser. 
                      If content is huge, this is bad. But works for "v0".
                    */}
                    {post.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-4 min-h-[1em]">{line}</p>
                    ))}
                </div>
            </article>

            <Footer />
        </main>
    );
}
