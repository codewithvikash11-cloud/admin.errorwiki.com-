"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLogin() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await login(formData.email.trim(), formData.password);
            if (res.success) {
                router.push('/admin/dashboard');
            } else {
                setError(res.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <Logo />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-center">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-gray-400 text-center">
                        Restricted area. Authorized personnel only.
                    </p>
                </div>

                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#008000] focus:ring-1 focus:ring-[#008000] transition-all placeholder:text-gray-700"
                                placeholder="admin@errorwiki.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#008000] focus:ring-1 focus:ring-[#008000] transition-all placeholder:text-gray-700"
                                placeholder="••••••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-[#008000] hover:bg-[#006600] text-white text-sm font-bold uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,128,0,0.2)]"
                        >
                            {loading ? (
                                <Loader2 size={18} className="animate-spin mr-2" />
                            ) : (
                                <Lock size={16} className="mr-2" />
                            )}
                            {loading ? 'Authenticating...' : 'Secure Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
