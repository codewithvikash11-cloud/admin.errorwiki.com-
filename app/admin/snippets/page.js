"use client";

import React, { useState } from 'react';
import { Code, Check, X, Filter } from 'lucide-react';

// Mock Data - In real impl, use getAllSnippets() Action
const MOCK_SNIPPETS = [
    { id: 1, title: 'React Hook Form Pattern', language: 'javascript', status: 'pending', author: 'user_123' },
    { id: 2, title: 'Python Async IO', language: 'python', status: 'approved', author: 'admin' },
    { id: 3, title: 'CSS Grid Layouts', language: 'css', status: 'rejected', author: 'user_999' },
];

export default function SnippetsManager() {
    const [snippets, setSnippets] = useState(MOCK_SNIPPETS);
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? snippets : snippets.filter(s => s.status === filter);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Code Snippets DB</h1>
                    <p className="text-gray-500 text-sm">Moderate community code submissions.</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'pending', 'approved', 'rejected'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${filter === f
                                    ? 'bg-white text-black'
                                    : 'bg-[#111] text-gray-500 hover:bg-[#222]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filtered.map(snip => (
                    <div key={snip.id} className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 flex items-center justify-between hover:border-[#333] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#111] rounded-lg text-accent-primary">
                                <Code size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{snip.title}</h3>
                                <div className="flex gap-2 text-xs text-gray-500 font-mono mt-1">
                                    <span className="bg-[#111] px-2 py-0.5 rounded text-blue-400">{snip.language}</span>
                                    <span>by {snip.author}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${snip.status === 'approved' ? 'text-green-500 bg-green-500/10' :
                                    snip.status === 'rejected' ? 'text-red-500 bg-red-500/10' :
                                        'text-orange-500 bg-orange-500/10'
                                }`}>
                                {snip.status}
                            </div>

                            {snip.status === 'pending' && (
                                <div className="flex gap-1 ml-4 border-l border-[#222] pl-4">
                                    <button className="p-2 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors"><Check size={16} /></button>
                                    <button className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><X size={16} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
