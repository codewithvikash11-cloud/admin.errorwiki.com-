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

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed top-0 left-0 h-full w-64 bg-[#0f172a] border-r border-[#1e293b] z-50 transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-[#1e293b]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                            <Shield className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">Admin Console</span>
                    </div>
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Management
                    </div>
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onClose && onClose()}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
                                        : "text-gray-400 hover:text-white hover:bg-[#1e293b]"
                                )}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="mt-8 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        System
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1e293b] transition-all"
                    >
                        <ExternalLink size={18} />
                        View Live Site
                    </Link>
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-[#1e293b] bg-[#0f172a]">
                    <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-xs ring-2 ring-accent-primary/50">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@rovio.tech'}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1e293b] hover:bg-red-500/10 hover:text-red-500 text-gray-400 text-sm font-medium rounded-lg transition-colors border border-[#334155] hover:border-red-500/50"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
