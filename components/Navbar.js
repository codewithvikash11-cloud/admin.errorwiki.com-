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

const Navbar = ({
    onMenuClick,
    isSidebarOpen,
    centerContent: propCenter,
    customActions: propActions,
    hideSearch: propHideSearch,
    hideLinks: propHideLinks = false,
    menuItems = [] // New prop
}) => {
    // ...
    // (Ensure existing logic remains)
    // ...
    // ... inside return ...
    {/* Public Links (if not hidden) */ }
    {
        !hideLinks && !user && (
            <div className="hidden md:flex items-center gap-4 mr-4">
                {menuItems && menuItems.length > 0 ? (
                    menuItems.sort((a, b) => a.order - b.order).map(item => (
                        <NavLink key={item.$id || item.id} href={item.path}>{item.label}</NavLink>
                    ))
                ) : (
                    <>
                        {/* Fallback if no menu items */}
                        <NavLink href="/compiler">Compiler</NavLink>
                        <NavLink href="/tools">Tools</NavLink>
                        <NavLink href="/blog">Blog</NavLink>
                    </>
                )}
                <Link href="/admin/login" className="text-sm font-bold text-text-primary hover:text-accent-primary transition-colors">
                    Login
                </Link>
            </div>
        )
    }


    {/* Authenticated State */ }
    {
        user && (
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
        )
    }
                </div >
            </div >
        </nav >
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
