"use client";

import React from 'react';
import { Search, Save } from 'lucide-react';

export default function AdminSeoPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">SEO Settings</h1>
                    <p className="text-text-secondary">Optimize your site for search engines.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-panel border border-border rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Global Meta Tags</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-1">Site Title</label>
                            <input type="text" className="w-full bg-surface border border-border rounded-lg p-2" defaultValue="RovioTech" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-1">Description</label>
                            <textarea className="w-full bg-surface border border-border rounded-lg p-2 h-24" defaultValue="Premium Developer Tools & Resources." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
