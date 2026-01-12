"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/lib/admin';
import { ShieldAlert } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function AdminGuard({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);



    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Not logged in -> Redirect to admin login
                router.push('/admin/login');
            } else if (!isAdmin(user.email)) {
                // Logged in but not admin -> Show unauthorized or redirect home
                // We'll show unauthorized state here to avoid infinite loops if they try to access
            } else {
                // Authorized
                setIsAuthorized(true);
            }
        }
    }, [user, loading, router]);

    // Bypass guard for login page (moved after hooks)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    if (!isAdmin(user.email)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
                    <ShieldAlert size={32} />
                </div>
                <h1 className="text-2xl font-black text-text-primary mb-2">Access Denied</h1>
                <p className="text-text-secondary max-w-md mb-8">
                    You do not have permission to access the Admin Panel.
                    This area is restricted to Rovio Tech administrators only.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-surface border border-border rounded-xl font-bold hover:bg-surface-highlight transition-all"
                >
                    Return Home
                </button>
            </div>
        );
    }

    // Render admin content if authorized
    return <>{children}</>;
}
