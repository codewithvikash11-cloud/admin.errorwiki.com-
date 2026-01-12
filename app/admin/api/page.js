"use client";

import React from 'react';
import { Server, Key } from 'lucide-react';

export default function AdminApiPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">API Manager</h1>
                    <p className="text-text-secondary">Configure API keys and rate limits.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Key size={18} />
                    New API Key
                </button>
            </div>

            <div className="bg-panel border border-border rounded-2xl p-8">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Server size={20} className="text-accent-primary" />
                    Active Keys
                </h2>
                <p className="text-text-secondary text-sm">No active API keys found.</p>
            </div>
        </div>
    );
}
