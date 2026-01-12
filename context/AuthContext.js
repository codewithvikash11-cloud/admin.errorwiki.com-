"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
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
            // Optimization: Check for session in localStorage before making network request
            // This prevents 401 console errors for guest users
            if (typeof window !== 'undefined') {
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
        console.log("Attempting login for:", email);

        try {
            // 1. Check if a session already exists
            try {
                await account.get();
                // If get() succeeds, a session exists. We must delete it to allow new login.
                console.warn("Active session found. Logging out before new login...");
                await account.deleteSession('current');
            } catch (ignored) {
                // checks failed = no session = good to proceed
            }

            // 2. Create new session
            await account.createEmailPasswordSession(email, password);

            // 3. Verify & Get User
            const u = await account.get();
            setUser(u);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            if (error.code) console.error("Error Code:", error.code);
            if (error.type) console.error("Error Type:", error.type);
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name) => {
        try {
            // Create account
            await account.create('unique()', email, password, name);
            // Auto login
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
