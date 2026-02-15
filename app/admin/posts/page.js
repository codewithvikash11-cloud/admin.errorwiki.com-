"use client";

import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '@/lib/actions/posts';
import Link from 'next/link';
import { Edit2, Trash2, Eye, Plus, FileText } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

export default function AdminPostsPage() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await getPosts(100);
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        await deletePost(id);
        loadPosts();
    };

    const handleSearch = (term) => {
        if (!term) {
            setFilteredPosts(posts);
            return;
        }
        const lower = term.toLowerCase();
        setFilteredPosts(posts.filter(p => p.title.toLowerCase().includes(lower)));
    };

    const columns = [
        {
            header: 'Post Details',
            accessor: 'title',
            render: (row) => (
                <div>
                    <div className="font-medium text-white">{row.title}</div>
                    <div className="text-xs text-slate-500 font-mono">/{row.slug}</div>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Date',
            accessor: 'createdAt',
            render: (row) => <span className="text-slate-400">{new Date(row.createdAt).toLocaleDateString()}</span>
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/post/${row.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Eye size={16} />
                    </Link>
                    <Link href={`/admin/create-post?id=${row.id}`} className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                        <Edit2 size={16} />
                    </Link>
                    <button onClick={() => handleDelete(row.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Posts"
                description="Manage your blog posts and articles."
                actions={
                    <Link
                        href="/admin/create-post"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#008000] text-white font-bold hover:bg-[#006600] transition-colors shadow-lg shadow-[#008000]/20"
                    >
                        <Plus size={18} /> New Post
                    </Link>
                }
            />

            <DataTable
                columns={columns}
                data={filteredPosts}
                onSearch={handleSearch}
                searchPlaceholder="Search posts..."
            />
        </div>
    );
}
