"use client";

import React, { useState, useEffect } from 'react';
import { adminService } from '@/lib/admin-service';
import { Shield, AlertTriangle, Info, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SecurityPage() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await adminService.getSecurityLogs(50);
            setLogs(data);
            setIsLoading(false);
        };
        load();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Security Center</h1>
                <p className="text-text-secondary">System logs, spam detection, and access audits.</p>
            </div>

            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface border-b border-border">
                                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Timestamp</th>
                                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Level</th>
                                <th className="p-4 text-xs font-bold text-text-secondary uppercase">Event</th>
                                <th className="p-4 text-xs font-bold text-text-secondary uppercase">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr><td colSpan="4" className="p-8 text-center animate-pulse">Scanning logs...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan="4" className="p-8 text-center text-text-secondary">No security events logged recently.</td></tr>
                            ) : (
                                logs.map(log => (
                                    <tr key={log.id} className="hover:bg-surface/50 transition-colors">
                                        <td className="p-4 text-sm font-mono text-text-tertiary">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={cn(
                                                "flex items-center w-fit gap-1 px-2 py-1 rounded text-xs font-bold uppercase",
                                                log.type === 'CRITICAL' ? "bg-red-500/10 text-red-500" :
                                                    log.type === 'WARNING' ? "bg-yellow-500/10 text-yellow-500" :
                                                        "bg-blue-500/10 text-blue-500"
                                            )}>
                                                {log.type === 'CRITICAL' ? <AlertTriangle size={12} /> :
                                                    log.type === 'WARNING' ? <Shield size={12} /> : <Info size={12} />}
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="p-4 font-medium text-text-primary">
                                            {log.message}
                                        </td>
                                        <td className="p-4 text-sm font-mono text-text-tertiary flex items-center gap-1">
                                            <MapPin size={12} />
                                            {log.ip || '127.0.0.1'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
