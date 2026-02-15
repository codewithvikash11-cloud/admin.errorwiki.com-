'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Menu, ExternalLink } from 'lucide-react';
import { getMenus, deleteMenu } from '@/lib/actions/menus';
import { toast } from 'sonner';

export default function MenusList() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('header'); // 'header' | 'footer'

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {
        setLoading(true);
        const data = await getMenus('all'); // Fetch all and filter client-side for smooth tab switching
        setMenus(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this menu item?')) return;

        const res = await deleteMenu(id);
        if (res.success) {
            toast.success('Menu item deleted');
            loadMenus();
        } else {
            toast.error('Failed to delete');
        }
    };

    const filteredMenus = menus
        .filter(m => m.type === activeTab || m.type === 'both')
        .sort((a, b) => a.order - b.order);

    if (loading) {
        return <div className="p-8 text-center text-text-secondary">Loading menus...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Menus</h1>
                    <p className="text-text-secondary">Manage site navigation links.</p>
                </div>
                <Link
                    href="/admin/menus/create"
                    className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-xl font-bold transition-all"
                >
                    <Plus size={18} />
                    Add Item
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-surface-card p-1 rounded-xl border border-border-primary w-fit">
                {['header', 'footer'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab
                                ? 'bg-brand-primary text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                            }`}
                    >
                        {tab} Menu
                    </button>
                ))}
            </div>

            <div className="bg-surface-card border border-border-primary rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover/50 text-left border-b border-border-primary">
                            <th className="p-4 text-xs font-bold uppercase text-text-secondary tracking-wider w-16 text-center">Order</th>
                            <th className="p-4 text-xs font-bold uppercase text-text-secondary tracking-wider">Label</th>
                            <th className="p-4 text-xs font-bold uppercase text-text-secondary tracking-wider">Path</th>
                            <th className="p-4 text-xs font-bold uppercase text-text-secondary tracking-wider">Type</th>
                            <th className="p-4 text-xs font-bold uppercase text-text-secondary tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-primary">
                        {filteredMenus.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-text-secondary">
                                    No items in {activeTab} menu.
                                </td>
                            </tr>
                        ) : (
                            filteredMenus.map((menu) => (
                                <tr key={menu.id} className="hover:bg-surface-hover/30 transition-colors group">
                                    <td className="p-4 text-center font-mono text-text-secondary">
                                        {menu.order}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                                <Menu size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-text-primary">{menu.label}</span>
                                                {menu.parentId && <span className="text-[10px] uppercase text-text-secondary">Child Item</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <code className="text-xs bg-surface-hover px-2 py-1 rounded text-text-secondary">
                                                {menu.path}
                                            </code>
                                            {menu.isExternal && <ExternalLink size={12} className="text-text-secondary" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${menu.type === 'both'
                                                ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                            }`}>
                                            {menu.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/menus/${menu.id}`}
                                                className="p-2 hover:bg-surface-hover rounded-lg text-text-secondary hover:text-blue-400 transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(menu.id)}
                                                className="p-2 hover:bg-surface-hover rounded-lg text-text-secondary hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
