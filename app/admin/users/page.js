"use client";

import React, { useState, useEffect } from 'react';
import { adminService } from '@/lib/admin-service';
import { User, Shield, Ban, CheckCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.getUsers();
            setUsers(data.users);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await adminService.updateUserStatus(userId, newStatus);
            setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        } catch (error) {
            alert("Failed to update user: " + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Users</h1>
                    <p className="text-text-secondary">Manage access, roles, and trust scores.</p>
                </div>
            </div>

            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface border-b border-border">
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">User</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">Role</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">Trust Score</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                            <th className="p-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-surface/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center font-bold text-accent-primary">
                                            {user.name?.[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-text-primary">{user.name}</p>
                                            <p className="text-xs text-text-tertiary">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={cn(
                                        "px-2 py-1 rounded text-xs font-bold uppercase border",
                                        user.role === 'admin' ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                                            user.role === 'editor' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                                "bg-surface text-text-secondary border-border"
                                    )}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full", user.trustScore > 80 ? "bg-green-500" : user.trustScore > 50 ? "bg-yellow-500" : "bg-red-500")}
                                                style={{ width: `${user.trustScore}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-mono">{user.trustScore}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={cn(
                                        "flex items-center gap-1.5 text-xs font-bold",
                                        user.status === 'active' ? "text-green-500" : "text-red-500"
                                    )}>
                                        {user.status === 'active' ? <CheckCircle size={12} /> : <Ban size={12} />}
                                        {user.status === 'active' ? 'Active' : 'Banned'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {user.status === 'active' ? (
                                        <button
                                            onClick={() => handleStatusChange(user.id, 'banned')}
                                            className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-all"
                                        >
                                            Ban User
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleStatusChange(user.id, 'active')}
                                            className="px-3 py-1 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg text-xs font-bold transition-all"
                                        >
                                            Unban
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
