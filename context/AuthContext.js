"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Build-safe check
        if (typeof window !== 'undefined') {
            checkUser();
        }
    }, []);

    const checkUser = async () => {
        try {
            // Check session via a new API route or just rely on middleware protection + client state
            // For client-side state, we can try to fetch the user profile if we had a /me endpoint
            // For now, if we are on a protected route and middleware didn't kick us, we are likely auth'd.
            // But to be sure and get user info:
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser({ email: data.user, name: 'Admin', role: 'admin' });
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Determine user from email for local state
                setUser({ email: email, name: 'Admin', role: 'admin' });
                return { success: true };
            } else {
                return { success: false, error: data.error || "Invalid credentials" };
            }
        } catch (error) {
            return { success: false, error: "Network error" };
        }
    };

    const signup = async () => {
        return { success: false, error: "Registration disabled." };
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {
            console.error('Logout failed', e);
        }
        setUser(null);
        router.push('/admin/login');
    };

    const updatePassword = async () => {
        return { success: false, error: "Password updates disabled in local mode." };
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updatePassword, loading, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
