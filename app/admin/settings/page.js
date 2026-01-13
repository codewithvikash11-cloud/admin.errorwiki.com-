"use client";

import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/lib/actions/settings';
import { Save, Globe, Lock, Mail, Palette, Loader2 } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        contactEmail: '',
        maintenanceMode: false,
        registrationEnabled: true
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            const data = await getSettings();
            setSettings(prev => ({ ...prev, ...data })); // Merge with defaults
            setIsLoading(false);
        };
        load();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Filter out system fields
            const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...cleanSettings } = settings;
            await updateSettings(cleanSettings);
            alert("Settings saved successfully!");
        } catch (error) {
            alert("Failed to save settings: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-12 text-center animate-pulse">Loading configuration...</div>;

    return (
        <form onSubmit={handleSave} className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Settings</h1>
                    <p className="text-text-secondary">Configure global website parameters.</p>
                </div>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-panel border border-border rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                        <Globe className="text-accent-primary" size={20} />
                        <h2 className="font-bold text-text-primary">General Information</h2>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Website Name</label>
                        <input
                            name="siteName"
                            value={settings.siteName}
                            onChange={handleChange}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Description</label>
                        <textarea
                            name="siteDescription"
                            value={settings.siteDescription}
                            onChange={handleChange}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary/50 resize-none h-24"
                        />
                    </div>
                </div>

                {/* Access Control */}
                <div className="bg-panel border border-border rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                        <Lock className="text-red-500" size={20} />
                        <h2 className="font-bold text-text-primary">Access Control</h2>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                        <div>
                            <p className="font-bold text-text-primary">Maintenance Mode</p>
                            <p className="text-xs text-text-secondary">Disable site for non-admins</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                        <div>
                            <p className="font-bold text-text-primary">User Registration</p>
                            <p className="text-xs text-text-secondary">Allow new users to sign up</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="registrationEnabled" checked={settings.registrationEnabled} onChange={handleChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}
