"use client";

import React from 'react';
import { UserCheck, Shield } from 'lucide-react';

export default function AdminRolesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Roles & Permissions</h1>
                    <p className="text-text-secondary">Configure user access levels and capabilities.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Shield size={18} />
                    Manage Rules
                </button>
            </div>

            <div className="bg-panel border border-border rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Admin', 'Editor', 'Author', 'Reviewer', 'User'].map((role) => (
                        <div key={role} className="p-6 border border-border rounded-xl hover:border-accent-primary/50 transition-colors bg-surface">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-accent-primary/10 rounded-lg flex items-center justify-center text-accent-primary">
                                    <UserCheck size={20} />
                                </div>
                                <h3 className="font-bold text-text-primary">{role}</h3>
                            </div>
                            <p className="text-sm text-text-secondary mb-4">
                                Defines access level for {role.toLowerCase()}s.
                            </p>
                            <button className="text-xs font-bold text-accent-primary hover:underline">Edit Permissions</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
