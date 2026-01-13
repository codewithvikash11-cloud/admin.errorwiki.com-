'use client';

import React, { useState, useEffect } from 'react';
import { getHomepageData, updateHomepageData } from '@/lib/actions/homepage';
import { Save, Loader2, Layout, Type, Image as ImageIcon, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';

const DEFAULT_CONFIG = {
    hero: {
        title: "Build Faster. Code Better.",
        subtitle: "The ultimate developer playground and toolkit.",
        ctaPromise: "Start Coding Now",
        ctaLink: "/compiler"
    },
    features: {
        show: true,
        title: "Everything you need",
        items: [
            { title: "Online Compiler", desc: "Run code in 10+ languages." },
            { title: "API Tester", desc: "Debug REST APIs instantly." }
        ]
    }
};

export default function HomepageEditor() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getHomepageData();
        if (data) setConfig({ ...DEFAULT_CONFIG, ...data });
        setIsLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateHomepageData(config);
            alert("Homepage updated successfully!");
        } catch (e) {
            alert("Failed to save: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    if (isLoading) return <div className="p-12 text-center animate-pulse">Loading editor...</div>;

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10 py-4 border-b border-border mb-6">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">Homepage</h1>
                    <p className="text-text-secondary">Edit landing page content.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-[#008000] text-white font-bold rounded-xl shadow-lg hover:bg-[#006600] transition-transform disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            {/* Hero Section */}
            <div className="bg-panel border border-border rounded-2xl overflow-hidden">
                <div className="bg-surface border-b border-border p-4 flex items-center gap-2 font-bold text-text-primary">
                    <Layout size={18} className="text-accent-primary" />
                    Hero Section
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Main Title</label>
                        <input
                            value={config.hero.title}
                            onChange={(e) => handleChange('hero', 'title', e.target.value)}
                            className="w-full bg-surface border border-border rounded-lg p-3 text-lg font-bold outline-none focus:border-accent-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Subtitle</label>
                        <textarea
                            value={config.hero.subtitle}
                            onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                            className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary h-24 resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">CTA Label</label>
                            <input
                                value={config.hero.ctaPromise}
                                onChange={(e) => handleChange('hero', 'ctaPromise', e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">CTA Link</label>
                            <input
                                value={config.hero.ctaLink}
                                onChange={(e) => handleChange('hero', 'ctaLink', e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-panel border border-border rounded-2xl overflow-hidden">
                <div className="bg-surface border-b border-border p-4 flex items-center justify-between font-bold text-text-primary">
                    <div className="flex items-center gap-2">
                        <Layout size={18} className="text-secondary" />
                        Features Section
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={config.features.show}
                            onChange={(e) => handleChange('features', 'show', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008000]"></div>
                    </label>
                </div>

                {config.features.show && (
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Section Title</label>
                            <input
                                value={config.features.title}
                                onChange={(e) => handleChange('features', 'title', e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg p-3 outline-none focus:border-accent-primary"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-text-secondary uppercase">Feature Items</label>
                            {config.features.items.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-surface rounded-xl border border-border relative group">
                                    <div className="flex-1 space-y-2">
                                        <input
                                            value={item.title}
                                            onChange={(e) => {
                                                const newItems = [...config.features.items];
                                                newItems[index].title = e.target.value;
                                                setConfig(prev => ({ ...prev, features: { ...prev.features, items: newItems } }));
                                            }}
                                            className="w-full bg-background border border-border rounded p-2 text-sm font-bold"
                                            placeholder="Feature Title"
                                        />
                                        <input
                                            value={item.desc}
                                            onChange={(e) => {
                                                const newItems = [...config.features.items];
                                                newItems[index].desc = e.target.value;
                                                setConfig(prev => ({ ...prev, features: { ...prev.features, items: newItems } }));
                                            }}
                                            className="w-full bg-background border border-border rounded p-2 text-sm"
                                            placeholder="Feature Description"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newItems = config.features.items.filter((_, i) => i !== index);
                                            setConfig(prev => ({ ...prev, features: { ...prev.features, items: newItems } }));
                                        }}
                                        className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg h-fit"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    setConfig(prev => ({
                                        ...prev,
                                        features: {
                                            ...prev.features,
                                            items: [...prev.features.items, { title: "", desc: "" }]
                                        }
                                    }));
                                }}
                                className="w-full py-2 border border-dashed border-border rounded-xl text-text-secondary hover:text-white hover:border-accent-primary transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> Add Feature
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
