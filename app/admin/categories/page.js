"use client";

import React, { useState, useEffect } from 'react';
import { getCategories } from '@/lib/actions/categories';
import { createCategoryAction, deleteCategoryAction } from './actions';
import { List, Plus, Trash2, Loader2, Tag } from 'lucide-react';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        const formData = new FormData(e.target);
        await createCategoryAction(formData);
        e.target.reset();
        await loadCategories();
        setIsCreating(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this category?')) return;
        setCategories(prev => prev.filter(c => c.id !== id)); // Optimistic
        await deleteCategoryAction(id);
        loadCategories(); // Sync
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Categories</h1>
                    <p className="text-text-secondary">Organize your content topics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-1">
                    <div className="bg-panel border border-border rounded-2xl p-6 sticky top-8">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Plus size={20} className="text-accent-primary" />
                            Add New Category
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="e.g. Tutorials"
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 outline-none focus:border-accent-primary transition-colors"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                            >
                                {isCreating ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                Create Category
                            </button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-panel border border-border rounded-2xl overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center text-text-secondary flex flex-col items-center gap-4">
                                <Loader2 size={32} className="animate-spin text-accent-primary" />
                                <p>Loading categories...</p>
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="p-12 text-center text-text-secondary flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center">
                                    <List size={32} className="opacity-50" />
                                </div>
                                <p>No categories found.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border">
                                {categories.map(cat => (
                                    <div key={cat.id} className="p-4 flex items-center justify-between group hover:bg-surface/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                                <Tag size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-text-primary">{cat.name}</div>
                                                <div className="text-xs font-mono text-text-secondary">/{cat.slug}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-xs font-bold text-text-secondary bg-surface px-3 py-1 rounded-full border border-border">
                                                {cat.count || 0} posts
                                            </div>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className="p-2 text-text-tertiary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
