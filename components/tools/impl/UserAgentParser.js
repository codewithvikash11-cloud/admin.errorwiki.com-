"use client";
import React, { useState, useEffect } from 'react';
import { Globe, Smartphone, Monitor, Cpu, Laptop } from 'lucide-react';

export default function UserAgentParser() {
    const [uaString, setUaString] = useState('');
    const [parsed, setParsed] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUaString(navigator.userAgent);
        }
    }, []);

    useEffect(() => {
        if (!uaString) {
            setParsed(null);
            return;
        }

        // Naive parsing logic for demonstration (production should use a library like UAParser.js)
        const browserRegex = /(Chrome|Safari|Firefox|Edge|Opera)\/([\d\.]+)/i;
        const osRegex = /(Windows NT|Mac OS X|Linux|Android|iOS|iPhone OS) ([\d\._]+)?/i;
        const mobileRegex = /(Mobile|Android|iPhone|iPad)/i;

        const browserMatch = uaString.match(browserRegex);
        const osMatch = uaString.match(osRegex);
        const isMobile = mobileRegex.test(uaString);

        setParsed({
            browser: browserMatch ? browserMatch[1] : 'Unknown',
            browserVersion: browserMatch ? browserMatch[2] : 'Unknown',
            os: osMatch ? osMatch[1].replace('NT', '') : 'Unknown',
            osVersion: osMatch && osMatch[2] ? osMatch[2].replace(/_/g, '.') : 'Unknown',
            deviceType: isMobile ? 'Mobile/Tablet' : 'Desktop',
            engine: uaString.includes('WebKit') ? 'WebKit' : uaString.includes('Gecko') ? 'Gecko' : 'Unknown'
        });

    }, [uaString]);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">User Agent String</label>
                <textarea
                    value={uaString}
                    onChange={(e) => setUaString(e.target.value)}
                    className="w-full h-24 bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none"
                    placeholder="Paste User-Agent string here..."
                />
                <div className="flex justify-end">
                    <button
                        onClick={() => setUaString(navigator.userAgent)}
                        className="text-xs font-bold text-accent-primary hover:underline"
                    >
                        Reset to My User Agent
                    </button>
                </div>
            </div>

            {parsed && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<Globe size={24} />}
                        label="Browser"
                        value={parsed.browser}
                        sub={parsed.browserVersion}
                    />
                    <InfoCard
                        icon={<Monitor size={24} />}
                        label="Operating System"
                        value={parsed.os}
                        sub={parsed.osVersion}
                    />
                    <InfoCard
                        icon={parsed.deviceType.includes('Mobile') ? <Smartphone size={24} /> : <Laptop size={24} />}
                        label="Device Type"
                        value={parsed.deviceType}
                        sub={parsed.engine}
                    />
                </div>
            )}
        </div>
    );
}

const InfoCard = ({ icon, label, value, sub }) => (
    <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4 hover:border-accent-primary/50 transition-colors">
        <div className="w-12 h-12 rounded-xl bg-surface-highlight flex items-center justify-center text-accent-primary">
            {icon}
        </div>
        <div>
            <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">{label}</div>
            <div className="text-lg font-bold text-text-primary truncate max-w-[180px]">{value}</div>
            <div className="text-sm text-text-secondary">{sub}</div>
        </div>
    </div>
);
