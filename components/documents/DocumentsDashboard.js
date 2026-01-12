"use client";

import React, { useState, useEffect } from 'react';
import {
    FileText,
    Trash2,
    Edit,
    Search,
    Calendar,
    FolderOpen
} from 'lucide-react';
import { documentService } from '@/lib/documents-local';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const DocumentsDashboard = () => {
    const [docs, setDocs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setDocs(documentService.getAllDocuments());
    }, []);

    const handleDelete = (id) => {
        const remaining = documentService.deleteDocument(id);
        setDocs(remaining);
    };

    const filteredDocs = docs.filter(doc =>
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.content.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Search saved documents..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-surface border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent-primary transition-colors text-text-primary"
                    />
                </div>
            </div>

            {/* Grid */}
            {filteredDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.map(doc => (
                        <div key={doc.id} className="bg-surface border border-border/50 rounded-2xl p-6 hover:border-accent-primary/50 transition-all group flex flex-col h-[280px]">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn(
                                    "p-3 rounded-xl",
                                    doc.type === 'grammar' ? "bg-blue-500/10 text-blue-500" :
                                        doc.type === 'rewrite' ? "bg-purple-500/10 text-purple-500" :
                                            "bg-orange-500/10 text-orange-500"
                                )}>
                                    <FileText size={24} />
                                </div>
                                <span className="text-xs font-mono text-text-secondary bg-surface-highlight px-2 py-1 rounded">
                                    {doc.type.toUpperCase()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-1">{doc.title}</h3>
                            <p className="text-text-secondary text-sm lines-clamp-3 mb-4 flex-1 overflow-hidden opacity-70">
                                {doc.content}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <span className="text-xs text-text-secondary flex items-center gap-1">
                                    <Calendar size={12} />
                                    {formatDate(doc.updatedAt)}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-text-secondary transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="p-2 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white rounded-lg transition-colors">
                                        <Edit size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-50 border-2 border-dashed border-border/50 rounded-2xl">
                    <FolderOpen size={64} className="mb-4 text-text-secondary" />
                    <h3 className="text-xl font-bold text-text-primary">No Documents Found</h3>
                    <p className="text-text-secondary">Start using the writing tools to save your work!</p>
                    <div className="flex gap-4 mt-6">
                        <Link href="/grammar" className="px-4 py-2 bg-surface border border-border/50 rounded-lg hover:bg-surface-highlight transition-colors">
                            Grammar
                        </Link>
                        <Link href="/rewrite" className="px-4 py-2 bg-surface border border-border/50 rounded-lg hover:bg-surface-highlight transition-colors">
                            Rewrite
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsDashboard;
