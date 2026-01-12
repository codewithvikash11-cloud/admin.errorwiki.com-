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
            {/* Mobile Search Overlay */}
            <div className={cn(
                "absolute inset-0 z-50 flex items-center px-4 gap-4 md:hidden bg-background transition-opacity duration-300 ease-out",
                isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}>
                <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 -ml-2 hover:bg-surface rounded-full text-text-secondary active:scale-95 transition-transform"
                >
                    <X size={24} />
                </button>
                <form onSubmit={handleSearch} className="flex-1">
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder="Search solutions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 bg-transparent text-lg font-medium text-text-primary placeholder:text-text-tertiary outline-none"
                    />
                </form>
                {searchQuery && (
                    <button
                        onClick={handleSearch}
                        className="p-2 bg-accent-primary text-white rounded-full"
                    >
                        <ArrowRight size={20} />
                    </button>
                )}
            </div>

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

                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <Logo />
                    </Link>

                    {/* Desktop Nav Links */}
                    {!hideLinks && (
                        <div className="hidden lg:flex items-center gap-1 ml-4">
                            <NavLink href="/compiler" active={pathname?.startsWith('/compiler')}>Compiler</NavLink>
                            <NavLink href="/snippets" active={pathname?.startsWith('/snippets')}>Snippets</NavLink>
                            <NavLink href="/errors" active={pathname?.startsWith('/errors')}>Errors</NavLink>
                            <NavLink href="/tools" active={pathname?.startsWith('/tools')}>Tools</NavLink>
                        </div>
                    )}
                </div>

                {/* Center: Omni-Search (Desktop) OR Custom Content */}
                <div className="hidden md:block flex-1 max-w-sm lg:max-w-xl px-4 absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
                    <div className="pointer-events-auto inline-block w-full">
                        {centerContent ? (
                            centerContent
                        ) : !hideSearch && (
                            <form onSubmit={handleSearch} className="relative group w-full text-left">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search 50k+ error solutions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-10 pl-10 pr-12 bg-surface/50 border border-border/50 rounded-full text-sm transition-all focus:bg-background focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/10 outline-none text-text-primary placeholder:text-text-tertiary shadow-sm hover:border-border"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
                                    <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-panel px-1.5 font-mono text-[10px] font-medium text-text-secondary">
                                        <span className="text-xs">⌘</span>K
                                    </kbd>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {customActions && (
                        <>
                            {customActions}
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                        </>
                    )}

                    {!hideSearch && !centerContent && (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 md:hidden text-text-secondary hover:text-text-primary active:scale-95 transition-transform"
                        >
                            <Search size={22} />
                        </button>
                    )}

                    <ThemeToggle />

                    {/* Authenticated State */}
                    {user ? (
                        <>
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                            <div className="flex items-center gap-3">
                                <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-bold hover:bg-surface-highlight transition-all">
                                    <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                                    Dashboard
                                </Link>
                                <button onClick={logout} className="p-2 hover:bg-surface rounded-lg text-text-secondary transition-colors">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Unauthenticated State - Login / Signup */
                        <>
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex px-4 py-2 text-sm font-bold text-[#008000] hover:text-[#006600] transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="hidden sm:inline-flex px-5 py-2 text-sm font-bold bg-[#008000] text-white rounded-lg hover:bg-[#006600] transition-all shadow-md shadow-[#008000]/20"
                            >
                                Sign Up
                            </Link>
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
