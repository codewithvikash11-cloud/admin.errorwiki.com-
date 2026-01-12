"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import SidebarToolbox from './SidebarToolbox';
import MobileMenu from './MobileMenu';
import { NavbarProvider } from '@/context/NavbarContext';

export default function GlobalShell({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <NavbarProvider>
            <div className="min-h-screen bg-background text-text-primary selection:bg-accent-blue/30 overflow-x-hidden">
                {/* Global Top Navigation */}
                <Navbar
                    onMenuClick={toggleMobileMenu}
                    isSidebarOpen={isMobileMenuOpen}
                />

                {/* Global Sidebar (Desktop) */}
                <SidebarToolbox />

                {/* Global Mobile Menu (Overlay) */}
                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                />

                {/* Main Content Area */}
                {/* Added pt-16 for Navbar height, pl-0/lg:pl-20 for Desktop Sidebar width */}
                <main className="pt-16 lg:pl-20 min-h-screen transition-all duration-300">
                    {children}
                </main>
            </div>
        </NavbarProvider>
    );
}
