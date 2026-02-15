'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, FileText, Globe, Eye } from 'lucide-react';
import { getPages, deletePage } from '@/lib/actions/pages';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

export default function PagesList() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredPages, setFilteredPages] = useState([]);

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = async () => {
        setLoading(true);
        const data = await getPages();
        setPages(data);
        setFilteredPages(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this page?')) return;

        const res = await deletePage(id);
        if (res.success) {
            toast.success('Page deleted');
            loadPages();
        } else {
            toast.error('Failed to delete');
        }
    };

    const handleSearch = (term) => {
        if (!term) {
            setFilteredPages(pages);
            return;
        }
        const lower = term.toLowerCase();
        setFilteredPages(pages.filter(p => p.title.toLowerCase().includes(lower)));
    };


    const columns = [
        {
            header: 'Page',
            accessor: 'title',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <FileText size={16} />
                    </div>
                    <div>
                        <div className="font-medium text-white">{row.title}</div>
                        <div className="text-xs text-slate-500">/{row.slug}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.status === 'published'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                    {row.status === 'published' ? 'Published' : 'Draft'}
                </span>
            )
        },
        {
            header: 'Last Updated',
            accessor: 'updatedAt',
            render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : '-'
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex items-center justify-end gap-2">
                    {row.status === 'published' && (
                        <a
                            href={`https://devfixer.com/${row.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-[#1e293b] rounded-lg text-slate-400 hover:text-white transition-colors"
                            title="View Live"
                        >
                            <Globe size={16} />
                        </a>
                    )}
                    <Link
                        href={`/admin/pages/${row.id}`}
                        className="p-2 hover:bg-[#1e293b] rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={16} />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 hover:bg-[#1e293b] rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Pages"
                description="Manage static content pages."
                actions={
                    <Link
                        href="/admin/pages/create"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/20"
                    >
                        <Plus size={18} />
                        Create Page
                    </Link>
                }
            />

            <DataTable
                columns={columns}
                data={filteredPages}
                searchPlaceholder="Search pages..."
                onSearch={handleSearch}
            />
        </div>
    );
}
