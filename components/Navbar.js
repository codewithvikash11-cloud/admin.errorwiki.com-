"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, Command, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useNavbar } from '@/context/NavbarContext';

const Navbar = ({ onMenuClick, isSidebarOpen, centerContent: propCenter, customActions: propActions, hideSearch: propHideSearch, hideLinks: propHideLinks = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // ... (rest of context connection and state)
    // Context connection
    const {
        centerContent: contextCenter,
        customActions: contextActions,
        hideSearch: contextHideSearch,
        hideLinks: contextHideLinks
    } = useNavbar();

    // Prioritize props if passed (legacy/override), else use context
    const centerContent = propCenter || contextCenter;
    const customActions = propActions || contextActions;
    const hideSearch = propHideSearch || contextHideSearch;
    const hideLinks = propHideLinks || contextHideLinks;

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const inputRef = React.useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/errors?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
            isScrolled || isSearchOpen || centerContent
                ? "glass-strong border-b border-border shadow-sm"
                : "bg-transparent border-b border-transparent"
        )}>
            <div className={cn(
                "h-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-[1920px] mx-auto relative transition-opacity duration-300",
                isSearchOpen ? "opacity-0 md:opacity-100" : "opacity-100"
            )}>

                {/* Left: Brand & Menu */}
                <div className="flex items-center gap-3 lg:gap-8 shrink-0">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 lg:hidden text-text-secondary hover:text-text-primary active:scale-90 transition-transform"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/admin" className="flex items-center gap-2 group shrink-0">
                        <Logo />
                        <span className="font-bold text-sm bg-accent-primary/10 text-accent-primary px-2 py-0.5 rounded-full border border-accent-primary/20">ADMIN</span>
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <ThemeToggle />

                    {/* Authenticated State */}
                    {user && (
                        <>
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex flex-col items-end mr-2">
                                    <span className="text-xs font-bold text-text-primary">{user.email}</span>
                                    <span className="text-[10px] text-accent-primary font-medium">Administrator</span>
                                </div>
                                <button onClick={logout} className="p-2 hover:bg-surface rounded-lg text-text-secondary transition-colors" title="Logout">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, children, active }) => (
    <Link
        href={href}
        className={cn(
            "px-3 py-2 text-sm font-medium transition-all rounded-lg relative",
            active
                ? "text-accent-primary bg-accent-primary/5 font-bold"
                : "text-text-secondary hover:text-text-primary hover:bg-surface"
        )}
    >
        {children}
        {active && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-primary rounded-full" />
        )}
    </Link>
);

export default Navbar;
