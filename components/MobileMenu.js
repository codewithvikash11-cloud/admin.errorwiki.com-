"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { X, Home, Terminal, Code, BookOpen, Layout, Globe, Network, Briefcase, GraduationCap, ScrollText, ShieldCheck, LogIn, UserPlus } from 'lucide-react';
import {
    GrammarIcon,
    RewriteIcon,
    PlagiarismIcon,
    DocumentsIcon,
    HistoryIcon,
    DocsIcon,
    SheetsIcon
} from '@/components/ui/PremiumIcons';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname();
    const { user } = useAuth();

    const items = [
        { label: 'Home', href: '/', icon: Home, color: 'text-accent-success', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Learn', href: '/learn', icon: GraduationCap, color: 'text-accent-info', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Tools Hub', href: '/tools', icon: Briefcase, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'API Tester', href: '/api-tester', icon: Network, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Compiler', href: '/compiler', icon: Code, color: 'text-accent-info', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Errors', href: '/errors', icon: Terminal, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Languages', href: '/languages', icon: Globe, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Log Analyzer', href: '/log-analyzer', icon: ScrollText, color: 'text-accent-warning', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Code Reviewer', href: '/code-reviewer', icon: ShieldCheck, color: 'text-accent-success', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Snippets', href: '/snippets', icon: BookOpen, color: 'text-accent-success', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },
        { label: 'Dashboard', href: '/dashboard', icon: Layout, color: 'text-accent-warning', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10' },

        // Writing Section
        { label: 'Docs Editor', href: '/docs', icon: DocsIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
        { label: 'Sheets Editor', href: '/sheets', icon: SheetsIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
        { label: 'Grammar', href: '/grammar', icon: GrammarIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
        { label: 'Rewrite', href: '/rewrite', icon: RewriteIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
        { label: 'Plagiarism', href: '/plagiarism', icon: PlagiarismIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
        { label: 'Saved Docs', href: '/documents', icon: DocumentsIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
        { label: 'History', href: '/history', icon: HistoryIcon, color: 'text-accent-primary', activeColor: 'text-accent-primary', activeBg: 'bg-accent-primary/10', hasCustomIcon: true },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Side Drawer */}
            <div className={cn(
                "fixed top-0 left-0 bottom-0 w-72 bg-panel border-r border-border z-[100] transform transition-transform duration-300 ease-out lg:hidden flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <Logo />
                    <button onClick={onClose} className="p-2 -mr-2 text-text-secondary hover:text-text-primary">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium group",
                                    isActive
                                        ? cn(item.activeBg, item.activeColor, "border border-transparent")
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                )}
                            >
                                {item.hasCustomIcon ? (
                                    <Icon size={22} isActive={isActive} className={cn(isActive ? "text-current" : item.color)} />
                                ) : (
                                    <Icon size={22} className={cn(isActive ? "text-current" : item.color)} />
                                )}
                                <span className="text-sm font-semibold">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto border-t border-border">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-success/10 border border-border">
                        <h4 className="text-xs font-bold text-text-primary mb-1">ErrorWiki Mobile</h4>
                        <p className="text-[10px] text-text-secondary">Code on the go.</p>
                    </div>
                </div>

                {!user && (
                    <div className="p-6 pt-0 space-y-3">
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="flex items-center justify-center w-full py-3 rounded-xl border border-[#008000] text-[#008000] font-bold text-sm"
                        >
                            <LogIn size={18} className="mr-2" />
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            onClick={onClose}
                            className="flex items-center justify-center w-full py-3 rounded-xl bg-[#008000] text-white font-bold text-sm shadow-lg shadow-[#008000]/20"
                        >
                            <UserPlus size={18} className="mr-2" />
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
