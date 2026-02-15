'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Link as LinkIcon, Menu as MenuIcon } from 'lucide-react';
import { toast } from 'sonner';
import { createMenu, updateMenu } from '@/lib/actions/menus';

export default function MenuForm({ initialData = null }) {
    const router = useRouter();
    const isEditing = !!initialData;
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        label: '',
        path: '',
        type: 'header',
        order: 0,
        parentId: '',
        isExternal: false,
        isOpenNewTab: false
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                label: initialData.label || '',
                path: initialData.path || '',
                type: initialData.type || 'header',
                order: initialData.order || 0,
                parentId: initialData.parentId || '',
                isExternal: initialData.isExternal || false,
                isOpenNewTab: initialData.isOpenNewTab || false
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let res;
            if (isEditing) {
                res = await updateMenu(initialData.id, formData);
            } else {
                res = await createMenu(formData);
            }

            if (res.success) {
                toast.success(`Menu item ${isEditing ? 'updated' : 'created'} successfully!`);
                router.push('/admin/menus');
            } else {
                toast.error(res.error || 'Something went wrong');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between sticky top-0 bg-[#050505] z-10 py-4 border-b border-border-primary mb-6">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-2 hover:bg-surface-hover rounded-xl text-text-secondary transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-text-primary tracking-tight">
                            {isEditing ? 'Edit Menu Item' : 'New Menu Item'}
                        </h1>
                        <p className="text-sm text-text-secondary">
                            {isEditing ? `Editing: ${initialData.label}` : 'Add a link to navigation'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? 'Saving...' : 'Save Item'}
                    </button>
                </div>
            </div>

            <div className="bg-surface-card border border-border-primary rounded-2xl p-6 space-y-6 shadow-sm">

                {/* Visual Preview / Type */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                            Menu Location
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                        >
                            <option value="header">Header (Navbar)</option>
                            <option value="footer">Footer</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                            Order Priority
                        </label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                        />
                        <p className="text-[10px] text-text-secondary mt-1">Lower numbers appear first.</p>
                    </div>
                </div>

                {/* Label & Path */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                            Label
                        </label>
                        <div className="relative">
                            <MenuIcon className="absolute left-4 top-3.5 text-text-secondary" size={18} />
                            <input
                                type="text"
                                name="label"
                                required
                                value={formData.label}
                                onChange={handleChange}
                                placeholder="e.g. Services"
                                className="w-full bg-surface-hover border border-border-primary rounded-xl pl-11 pr-4 py-3 text-lg font-medium text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                            Destination Path / URL
                        </label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-3.5 text-text-secondary" size={18} />
                            <input
                                type="text"
                                name="path"
                                required
                                value={formData.path}
                                onChange={handleChange}
                                placeholder="e.g. /services or https://google.com"
                                className="w-full bg-surface-hover border border-border-primary rounded-xl pl-11 pr-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-col gap-3 pt-4 border-t border-border-primary">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="isExternal"
                            checked={formData.isExternal}
                            onChange={handleChange}
                            className="w-5 h-5 rounded bg-surface-hover border-border-primary text-brand-primary focus:ring-brand-primary transition-all"
                        />
                        <div>
                            <span className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">External Link</span>
                            <p className="text-xs text-text-secondary">Enable if this link goes to another domain.</p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="isOpenNewTab"
                            checked={formData.isOpenNewTab}
                            onChange={handleChange}
                            className="w-5 h-5 rounded bg-surface-hover border-border-primary text-brand-primary focus:ring-brand-primary transition-all"
                        />
                        <div>
                            <span className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">Open in New Tab</span>
                            <p className="text-xs text-text-secondary">Force link to open in a new browser tab/window.</p>
                        </div>
                    </label>
                </div>

                {/* Advanced */}
                <div className="pt-4 mt-2">
                    <details className="text-xs text-text-secondary">
                        <summary className="cursor-pointer hover:text-text-primary transition-colors">Advanced Options</summary>
                        <div className="mt-4">
                            <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">
                                Parent Menu ID (Optional)
                            </label>
                            <input
                                type="text"
                                name="parentId"
                                value={formData.parentId}
                                onChange={handleChange}
                                placeholder="ID of parent menu item"
                                className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-all"
                            />
                        </div>
                    </details>
                </div>

            </div>
        </form>
    );
}
