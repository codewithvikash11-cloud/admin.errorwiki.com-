"use client";

import React, { useState, useEffect } from 'react';
import { pagesService } from '@/lib/pages';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, File, Loader2 } from 'lucide-react';

export default function PagesAdmin() {
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = async () => {
        const data = await pagesService.getPages();
        setPages(data);
        setIsLoading(false);
    };

    const handleDelete = async (slug) => {
        if (!confirm("Are you sure?")) return;
        await pagesService.deletePage(slug);
        setPages(pages.filter(p => p.slug !== slug));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Pages</h1>
                    <p className="text-text-secondary">Manage static pages like About, Terms, Privacy.</p>
                </div>
                <Link
                    href="/admin/posts/new?type=page" // Reusing post editor for now with type flag if needed, or separate route
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-white font-bold rounded-xl hover:scale-[1.02] transition-transform"
                >
                    <Plus size={18} />
                    Create Page
                </Link>
            </div>

            <div className="bg-panel border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface border-b border-border">
                        <tr>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">Page Name</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">Slug</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {isLoading ? (
                            <tr><td colSpan="4" className="p-8 text-center animate-pulse">Loading...</td></tr>
                        ) : pages.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-text-tertiary">No pages found. Create one!</td></tr>
                        ) : (
                            pages.map(page => (
                                <tr key={page.id} className="hover:bg-surface/50 transition-colors">
                                    <td className="p-4 font-bold flex items-center gap-3">
                                        <File size={16} className="text-text-tertiary" />
                                        {page.title}
                                    </td>
                                    <td className="p-4 text-sm font-mono text-text-secondary">/{page.slug}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold uppercase">
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <Link href={`/admin/posts/edit/${page.slug}?type=page`} className="p-2 hover:bg-surface rounded text-blue-500">
                                            <Edit2 size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(page.slug)} className="p-2 hover:bg-surface rounded text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
