"use client";
import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Globe, Cpu, Battery } from 'lucide-react';

export default function DeviceInfo() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        // Collect info client-side
        const ua = navigator.userAgent;
        const platform = navigator.platform;
        const language = navigator.language;
        const cores = navigator.hardwareConcurrency;
        const memory = navigator.deviceMemory; // Experimental
        const screenRes = `${window.screen.width} x ${window.screen.height}`;
        const colorDepth = `${window.screen.colorDepth}-bit`;
        const online = navigator.onLine ? 'Online' : 'Offline';
        const dpr = window.devicePixelRatio;

        // basic UA parser (simplified)
        let browser = "Unknown";
        if (ua.indexOf("Chrome") > -1) browser = "Chrome";
        else if (ua.indexOf("Safari") > -1) browser = "Safari";
        else if (ua.indexOf("Firefox") > -1) browser = "Firefox";

        let os = "Unknown";
        if (ua.indexOf("Win") > -1) os = "Windows";
        else if (ua.indexOf("Mac") > -1) os = "MacOS";
        else if (ua.indexOf("Linux") > -1) os = "Linux";
        else if (ua.indexOf("Android") > -1) os = "Android";
        else if (ua.indexOf("iPhone") > -1) os = "iOS";

        setInfo({
            os,
            browser,
            platform,
            language,
            cores: cores || 'N/A',
            memory: memory ? `~${memory} GB` : 'N/A',
            screenRes,
            colorDepth,
            online,
            dpr,
            userAgent: ua
        });
    }, []);

    if (!info) return <div className="text-center p-10 text-text-tertiary">Loading device info...</div>;

    const cards = [
        { icon: Monitor, label: 'OS & Platform', value: `${info.os} (${info.platform})` },
        { icon: Globe, label: 'Browser', value: info.browser },
        { icon: Monitor, label: 'Screen Resolution', value: info.screenRes },
        { icon: Cpu, label: 'CPU Cores', value: info.cores },
        { icon: Smartphone, label: 'Language', value: info.language },
        { icon: Battery, label: 'Pixel Ratio', value: info.dpr },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4 hover:border-accent-primary/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-surface-highlight flex items-center justify-center text-accent-primary">
                            <card.icon size={24} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">{card.label}</div>
                            <div className="text-lg font-bold text-text-primary truncate">{card.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Raw User Agent</label>
                <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm break-all text-text-secondary">
                    {info.userAgent}
                </div>
            </div>
        </div>
    );
}
