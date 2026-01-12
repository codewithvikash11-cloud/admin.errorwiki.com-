"use client";

import React from 'react';
import { Globe, Plus } from 'lucide-react';

export default function AdminBuilderPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Site Builder</h1>
                    <p className="text-text-secondary">Customize landing pages and layouts.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Plus size={18} />
                    New Layout
                </button>
            </div>

            <div className="bg-panel border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mb-4 text-accent-primary">
                    <Globe size={32} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Visual Editor</h3>
                <p className="text-text-secondary max-w-md mb-6">
                    Drag and drop components to build your pages.
                </p>
                <button className="px-6 py-2 bg-surface border border-border rounded-lg text-sm font-bold hover:bg-surface-highlight">
                    Launch Editor
                </button>
            </div>
        </div>
    );
}
