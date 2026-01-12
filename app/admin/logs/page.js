"use client";

import React, { useState } from 'react';
import { AlertOctagon, Info, AlertTriangle, Shield, Calendar, User, Search, Filter } from 'lucide-react';

const MOCK_LOGS = [
    { id: 1, type: 'SECURITY', severity: 'high', msg: 'Bot network detected on /login', time: '10:42 AM', user: 'SYSTEM' },
    { id: 2, type: 'ADMIN', severity: 'info', msg: 'Updated Home Page Hero Section', time: '10:30 AM', user: 'admin_rahul' },
    { id: 3, type: 'CONTENT', severity: 'medium', msg: 'Flagged Snippet #492 for Plagiarism (85%)', time: '09:15 AM', user: 'AI_SENTINEL' },
    { id: 4, type: 'USER', severity: 'info', msg: 'New User Registration: user_99', time: '08:00 AM', user: 'SYSTEM' },
];

export default function SystemLogs() {
    const [logs, setLogs] = useState(MOCK_LOGS);
    const [search, setSearch] = useState('');

    const getIcon = (type) => {
        switch (type) {
            case 'SECURITY': return <Shield size={16} />;
            case 'ADMIN': return <User size={16} />;
            case 'CONTENT': return <AlertTriangle size={16} />;
            default: return <Info size={16} />;
        }
    };

    const getColor = (severity) => {
        switch (severity) {
            case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'medium': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">System Logs</h1>
                    <p className="text-gray-500 text-sm">Comprehensive audit trail of platform activity.</p>
                </div>

                <div className="flex gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                        <input
                            placeholder="Search logs..."
                            className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-accent-primary outline-none"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="p-2.5 bg-[#111] border border-[#222] rounded-xl text-gray-400 hover:text-white transition-colors">
                        <Filter size={18} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        <Calendar size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#111] border-b border-[#222]">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Message</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">User</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#222]">
                            {logs.map(log => (
                                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-[10px] font-bold uppercase border ${getColor(log.severity)}`}>
                                            {getIcon(log.type)}
                                            {log.type}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-300 font-mono">
                                        {log.msg}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {log.user}
                                    </td>
                                    <td className="p-4 text-right text-xs text-gray-600 font-mono">
                                        {log.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
