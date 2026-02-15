"use client";

import React, { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { getSettings, updateSettings } from '@/lib/actions/settings';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';

export default function AdminSeoPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        siteTitle: '',
        siteDescription: '',
        keywords: '',
        ogImage: '',
        googleAnalyticsId: ''
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        const data = await getSettings();
        if (data) {
            setFormData({
                siteTitle: data.siteTitle || '',
                siteDescription: data.siteDescription || '',
                keywords: data.keywords || '',
                ogImage: data.ogImage || '',
                googleAnalyticsId: data.googleAnalyticsId || ''
            });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings(formData);
            toast.success('SEO settings updated');
        } catch (error) {
            toast.error('Failed to update settings');
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PageHeader
                title="SEO Settings"
                description="Manage global search engine optimization settings."
                actions={
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Save Changes
                    </button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 space-y-6">
                    <h3 className="font-bold text-lg text-white mb-4 border-b border-[#1e293b] pb-2">Global Meta Tags</h3>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Site Title</label>
                        <input
                            type="text"
                            name="siteTitle"
                            value={formData.siteTitle}
                            onChange={handleChange}
                            className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="e.g. DevFixer"
                        />
                        <p className="text-xs text-slate-500 mt-1">Default title suffix for all pages.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Site Description</label>
                        <textarea
                            name="siteDescription"
                            value={formData.siteDescription}
                            onChange={handleChange}
                            className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                            placeholder="e.g. Premium Developer Tools & Resources..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Keywords</label>
                        <input
                            type="text"
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="e.g. dev tools, fix, code"
                        />
                        <p className="text-xs text-slate-500 mt-1">Comma separated keywords.</p>
                    </div>
                </div>

                {/* Social & Analytics */}
                <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 space-y-6">
                    <h3 className="font-bold text-lg text-white mb-4 border-b border-[#1e293b] pb-2">Social & Analytics</h3>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">OG Image URL</label>
                        <input
                            type="text"
                            name="ogImage"
                            value={formData.ogImage}
                            onChange={handleChange}
                            className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Google Analytics ID</label>
                        <input
                            type="text"
                            name="googleAnalyticsId"
                            value={formData.googleAnalyticsId}
                            onChange={handleChange}
                            className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="G-XXXXXXXXXX"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
