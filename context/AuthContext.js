"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { account, isConfigured } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            checkUser();
        }
    }, []);

    const checkUser = async () => {
        try {
            if (typeof window !== 'undefined') {
                if (!isConfigured) {
                    setLoading(false);
                    return;
                }
                const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
                const sessionKey = `a_session_${projectId}`;
                const sessionLegacy = `a_session_${projectId}_legacy`;

                if (!localStorage.getItem(sessionKey) && !localStorage.getItem(sessionLegacy)) {
                    setUser(null);
                    setLoading(false);
                    return;
                }
            }

            const current = await account.get();
            setUser(current);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        if (!isConfigured) {
            console.error("Appwrite is not configured.");
            return {
                success: false,
                error: "Appwrite connection failed. Missing Environment Variables."
            };
        }
        console.log("Attempting login for:", email);

        try {
            try {
                await account.get();
                console.warn("Active session found. Logging out before new login...");
                await account.deleteSession('current');
            } catch (ignored) {
                // No session
            }

            await account.createEmailPasswordSession(email, password);
            const u = await account.get();
            setUser(u);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name) => {
        try {
            await account.create('unique()', email, password, name);
            await login(email, password);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const updatePassword = async (newPassword, oldPassword) => {
        try {
            await account.updatePassword(newPassword, oldPassword);
            return { success: true };
        } catch (error) {
            console.error('Update password failed', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updatePassword, loading, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
