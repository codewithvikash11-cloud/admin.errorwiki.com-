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
            if (typeof window !== 'undefined') {
                const isAuthenticated = localStorage.getItem("admin_auth") === "true";
                if (isAuthenticated) {
                    setUser({ email: 'admin@errorwiki.com', name: 'Admin', role: 'admin' });
                } else {
                    setUser(null);
                }
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        // Simple fixed password check
        if (password === "Admin@12345") {
            if (typeof window !== 'undefined') {
                localStorage.setItem("admin_auth", "true");
            }
            setUser({ email: email || 'admin@errorwiki.com', name: 'Admin', role: 'admin' });
            return { success: true };
        } else {
            return { success: false, error: "Invalid password" };
        }
    };

    const signup = async () => {
        return { success: false, error: "Registration disabled in local mode." };
    };

    const logout = async () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("admin_auth");
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
