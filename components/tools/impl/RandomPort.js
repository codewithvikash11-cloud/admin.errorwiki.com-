"use client";

import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Zap, Shield, Server } from 'lucide-react';

export default function RandomPort() {
    const [ports, setPorts] = useState([8080]);
    const [count, setCount] = useState(1);
    const [range, setRange] = useState('all'); // all, registered, dynamic
    const [copied, setCopied] = useState(null);

    const generate = () => {
        const newPorts = [];
        let min = 1024;
        let max = 65535;

        // Ranges based on IANA
        if (range === 'registered') {
            min = 1024;
            max = 49151;
        } else if (range === 'dynamic') {
            min = 49152;
            max = 65535;
        }

        for (let i = 0; i < count; i++) {
            newPorts.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setPorts(newPorts);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    // Helper to identify common ports (just for fun context, though 1024+ are less common than well-known)
    const getPortInfo = (port) => {
        const common = {
            3000: 'React/Node Dev',
            3306: 'MySQL',
            5432: 'PostgreSQL',
            6379: 'Redis',
            8000: 'Python/Django',
            8080: 'HTTP Alt / Tomcat',
            8443: 'HTTPS Alt',
            27017: 'MongoDB'
        };
        return common[port] || 'Available / Unknown Service';
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Range</label>
                        <div className="flex bg-background rounded-lg p-1 border border-border">
                            {['all', 'registered', 'dynamic'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRange(r)}
                                    className={`px-3 py-1.5 rounded-md text-sm font-bold capitalize transition-all ${range === r ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-surface-highlight'}`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-24">
                        <label className="text-sm font-bold text-text-secondary">Count</label>
                        <input
                            type="number"
                            min="1" max="10"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                            className="bg-background border border-border rounded-lg px-3 py-1.5 outline-none focus:border-accent-primary font-bold text-text-primary"
                        />
                    </div>

                    <button
                        onClick={generate}
                        className="mt-auto h-[38px] px-6 bg-accent-primary hover:bg-accent-hover text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCw size={18} /> Generate
                    </button>
                </div>

                <div className="space-y-3">
                    {ports.map((port, idx) => (
                        <div key={idx} className="bg-background border border-border rounded-xl p-4 flex items-center justify-between group hover:border-accent-primary/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-text-primary tracking-tight font-mono">{port}</div>
                                    <div className="text-xs text-text-tertiary flex items-center gap-1">
                                        <Server size={10} />
                                        {getPortInfo(port)}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleCopy(port.toString())}
                                className="p-2 text-text-tertiary hover:text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-colors"
                            >
                                {copied === port.toString() ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                        <Shield size={16} className="text-green-500" />
                        Safe Ranges
                    </h4>
                    <p>
                        We intentionally generate ports above <strong>1024</strong>.
                        Ports 0-1023 are "System Ports" (Well-Known) regarding root privileges and shouldn't be used for random services.
                    </p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h4 className="font-bold text-text-primary mb-2">Ranges Info</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        <li><strong>All:</strong> 1024 - 65535</li>
                        <li><strong>Registered:</strong> 1024 - 49151 (Common apps)</li>
                        <li><strong>Dynamic:</strong> 49152 - 65535 (Ephemeral)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
