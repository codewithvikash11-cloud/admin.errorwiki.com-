"use client";

import React from 'react';
import { Database, Download } from 'lucide-react';

export default function AdminBackupsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">System Backups</h1>
                    <p className="text-text-secondary">Manage database dumps and file snapshots.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Database size={18} />
                    Create Backup
                </button>
            </div>

            <div className="bg-panel border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface border-b border-border text-xs uppercase text-text-secondary font-bold">
                        <tr>
                            <th className="p-4">Filename</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Size</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr>
                            <td className="p-4 font-mono text-sm">backup-2026-01-10.sql</td>
                            <td className="p-4 text-sm text-text-secondary">Jan 10, 2026</td>
                            <td className="p-4 text-sm text-text-secondary">45 MB</td>
                            <td className="p-4 text-right">
                                <button className="text-accent-primary hover:underline flex items-center justify-end gap-1 w-full">
                                    <Download size={14} /> Download
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
