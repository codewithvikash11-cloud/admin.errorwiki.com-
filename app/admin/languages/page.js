"use client";

import React from 'react';
import { Languages, Plus } from 'lucide-react';

export default function AdminLanguagesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Languages Manager</h1>
                    <p className="text-text-secondary">Manage programming languages and icons.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Plus size={18} />
                    New Language
                </button>
            </div>

            <div className="bg-panel border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mb-4 text-accent-primary">
                    <Languages size={32} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">No Languages Found</h3>
                <p className="text-text-secondary max-w-md mb-6">
                    Add programming languages to be used in code snippets and filters.
                </p>
            </div>
        </div>
    );
}
