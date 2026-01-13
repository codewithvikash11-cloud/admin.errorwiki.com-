import React from 'react';
import { getPageBySlug } from '@/lib/actions/pages';
import PageRenderer from '@/components/PageRenderer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const page = await getPageBySlug(`page-${slug}`); // We enforce 'page-' prefix for custom pages in createPage

    if (!page) {
        return {
            title: 'Page Not Found | ErrorWiki',
        };
    }

    // Parse content if valid JSON to extract seoTitle
    let title = page.title;
    try {
        const c = JSON.parse(page.content);
        if (c.seoTitle) title = c.seoTitle;
        else if (c.title) title = c.title;
    } catch (e) { }

    return {
        title: `${title} | ErrorWiki`,
        description: page.description || `Page about ${title}`,
    };
}

export default async function DynamicPage({ params }) {
    const slug = params.slug;

    // In PageEditor I used `fullSlug = page-${slug}`.
    // So I must fetch with prefix.
    const page = await getPageBySlug(`page-${slug}`);

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar hideLinks={false} />
            <PageRenderer content={page.content} />
            <Footer />
        </main>
    );
}
