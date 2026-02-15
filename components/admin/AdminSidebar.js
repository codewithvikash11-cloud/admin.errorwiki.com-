"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Files,
    Image as ImageIcon,
    MessageSquare,
    Users,
    Settings,
    Shield,
    Menu,
    X,
    LogOut,
    ExternalLink,
    Briefcase,
    BookOpen,
    AlertTriangle,
    Languages,
    File as FileIcon,
    Table,
    UserCheck,
    List,
    Tag,
    Globe,
    Search,
    Database,
    Server
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Posts', href: '/admin/posts', icon: FileText },
    { label: 'Pages', href: '/admin/pages', icon: Files },
    { label: 'Tools', href: '/admin/tools', icon: Briefcase },
    { label: 'Courses', href: '/admin/courses', icon: BookOpen }, // New
    { label: 'Errors', href: '/admin/errors', icon: AlertTriangle }, // New
    { label: 'Languages', href: '/admin/languages', icon: Languages }, // New
    { label: 'Docs', href: '/admin/docs', icon: FileIcon }, // New
    { label: 'Sheets', href: '/admin/sheets', icon: Table }, // New
    { label: 'Media', href: '/admin/media', icon: ImageIcon },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Roles', href: '/admin/roles', icon: UserCheck }, // New
    { label: 'Comments', href: '/admin/comments', icon: MessageSquare },
    { label: 'Categories', href: '/admin/categories', icon: List }, // New
    { label: 'Tags', href: '/admin/tags', icon: Tag }, // New
    { label: 'Site Builder', href: '/admin/builder', icon: Globe }, // New
    { label: 'SEO', href: '/admin/seo', icon: Search },
    { label: 'Security', href: '/admin/security', icon: Shield },
    { label: 'Backups', href: '/admin/backups', icon: Database }, // New
    { label: 'API Manager', href: '/admin/api', icon: Server }, // New
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const renderLink = (item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
            <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose && onClose()}
                className={cn(
                    "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                        ? "bg-blue-600/10 text-blue-500"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                )}
            >
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300")} />
                {item.label}
            </Link>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed top-0 left-0 h-screen w-64 bg-[#0B1121] border-r border-[#1e293b] z-50 transition-transform duration-300 ease-in-out md:translate-x-0 md:static flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-[#1e293b]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Shield className="text-white w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">Admin<span className="text-blue-500">Panel</span></span>
                    </div>
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

                    <div>
                        <div className="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            Overview
                        </div>
                        <div className="space-y-0.5">
                            {NAV_ITEMS.slice(0, 1).map(renderLink)}
                        </div>
                    </div>

                    <div>
                        <div className="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            Content Management
                        </div>
                        <div className="space-y-0.5">
                            {NAV_ITEMS.filter(i => ['Posts', 'Pages', 'Media', 'Comments', 'Categories', 'Tags'].includes(i.label)).map(renderLink)}
                        </div>
                    </div>

                    <div>
                        <div className="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            Builder & Tools
                        </div>
                        <div className="space-y-0.5">
                            {NAV_ITEMS.filter(i => ['Site Builder', 'Menus', 'Tools'].includes(i.label)).map(renderLink)}
                        </div>
                    </div>

                    <div>
                        <div className="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            System & Settings
                        </div>
                        <div className="space-y-0.5">
                            {NAV_ITEMS.filter(i => ['Users', 'Settings', 'SEO', 'Security', 'Backups', 'API Manager'].includes(i.label)).map(renderLink)}
                        </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1e293b]">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
                        >
                            <ExternalLink size={18} className="text-slate-500 group-hover:text-slate-300" />
                            View Live Site
                        </Link>
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-[#1e293b] bg-[#0f172a]/50">
                    <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#1e293b]">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email || 'Logged In'}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
