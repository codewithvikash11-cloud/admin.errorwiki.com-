"use client";

import React, { useEffect, useState } from 'react';
import { getContent, updateContent, seedInitialContent } from '@/lib/actions/content';
import { Save, RefreshCw, Layers, Layout, Type, Image as ImageIcon } from 'lucide-react';

const SECTIONS = [
    { id: 'home', label: 'Home Page', icon: Layout },
    { id: 'global', label: 'Global Settings', icon: Layers },
    { id: 'seo', label: 'SEO Metadata', icon: Type },
];

export default function ContentManager() {
    const [activeSection, setActiveSection] = useState('home');
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Initial Load
    useEffect(() => {
        loadContent();
    }, [activeSection]);

    const loadContent = async () => {
        setLoading(true);
        // Ensure seed
        await seedInitialContent();

        const data = await getContent(activeSection);
        setContent(data);
        setLoading(false);
    };

    const handleChange = (key, value) => {
        setContent(prev => ({
            ...prev,
            [key]: { ...prev[key], value }
        }));
    };

    const handleSave = async (key) => {
        setSaving(true);
        const item = content[key];
        const res = await updateContent(item.id, item.value);
        if (res.success) {
            // Optional: Toast success
        } else {
            alert('Failed to save');
        }
        setSaving(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Content Manager</h1>
                <p className="text-gray-500 text-sm">Edit website text and layout in real-time.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    {SECTIONS.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl text-sm font-bold transition-all ${activeSection === section.id
                                    ? 'bg-accent-primary text-black shadow-lg shadow-accent-primary/20'
                                    : 'bg-[#0A0A0A] border border-[#222] text-gray-400 hover:border-gray-600 hover:text-white'
                                }`}
                        >
                            <section.icon size={18} />
                            {section.label}
                        </button>
                    ))}
                </div>

                {/* Editor Area */}
                <div className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 min-h-[500px]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white capitalize">{activeSection} Content</h2>
                        <button onClick={loadContent} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400">
                            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-[#111] rounded-xl animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(content).map(([key, item]) => (
                                <div key={key} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">{key.replace(/_/g, ' ')}</label>
                                        <button
                                            onClick={() => handleSave(key)}
                                            disabled={saving}
                                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] bg-accent-primary/10 text-accent-primary px-2 py-1 rounded transition-all hover:bg-accent-primary hover:text-black font-bold"
                                        >
                                            <Save size={12} /> SAVE
                                        </button>
                                    </div>

                                    {item.type === 'text' ? (
                                        <textarea
                                            value={item.value}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full bg-[#111] border border-[#222] rounded-xl p-4 text-gray-200 focus:outline-none focus:border-accent-primary transition-colors min-h-[100px]"
                                            placeholder={`Enter ${key}...`}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full bg-[#111] border border-[#222] rounded-xl p-4 text-gray-200 focus:outline-none focus:border-accent-primary transition-colors"
                                        />
                                    )}
                                </div>
                            ))}
                            {Object.keys(content).length === 0 && (
                                <div className="text-center py-10 text-gray-600">
                                    No content found for this section.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
