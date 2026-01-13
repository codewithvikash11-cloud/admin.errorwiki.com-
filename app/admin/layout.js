'use client';

import React, { useState } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/Navbar';
import { NavbarProvider } from '@/context/NavbarContext';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return (
            <AdminGuard>
                <NavbarProvider>
                    {children}
                </NavbarProvider>
            </AdminGuard>
        );
    }

    return (
        <AdminGuard>
            <NavbarProvider>
                <div className="min-h-screen bg-background text-text-primary">
                    <Navbar
                        onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
                        isSidebarOpen={isMobileOpen}
                    // Admin-specific navbar props if needed (e.g., hideLinks?) or keep global nav
                    />

                    <div className="flex pt-16">
                        <AdminSidebar
                            isOpen={isMobileOpen}
                            onClose={() => setIsMobileOpen(false)}
                        />

                        <main className="flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 lg:ml-0 bg-surface/50">
                            <div className="container mx-auto max-w-7xl p-6 lg:p-10 animate-in fade-in duration-300">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </NavbarProvider>
        </AdminGuard>
    );
}
