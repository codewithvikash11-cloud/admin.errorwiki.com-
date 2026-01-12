"use client";
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, RefreshCw } from 'lucide-react';

export default function DateConverter() {
    const [now, setNow] = useState(Date.now());
    const [input, setInput] = useState('');
    const [type, setType] = useState('timestamp'); // timestamp | string
    const [result, setResult] = useState(null);

    // Update 'Now' every second
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleConvert = () => {
        if (!input) {
            setResult(null);
            return;
        }

        try {
            let date;
            if (type === 'timestamp') {
                // Determine if seconds or milliseconds
                const ts = Number(input);
                if (input.length <= 10) {
                    // Seconds
                    date = new Date(ts * 1000);
                } else {
                    // Milliseconds
                    date = new Date(ts);
                }
            } else {
                date = new Date(input);
            }

            if (isNaN(date.getTime())) throw new Error("Invalid Date");

            setResult({
                iso: date.toISOString(),
                utc: date.toUTCString(),
                local: date.toLocaleString(),
                timestamp: date.getTime(),
                unix: Math.floor(date.getTime() / 1000),
                relative: getRelativeTime(date)
            });

        } catch (e) {
            setResult({ error: "Invalid format" });
        }
    };

    const getRelativeTime = (date) => {
        const diff = Math.floor((Date.now() - date.getTime()) / 1000);
        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Current Time Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface border border-border p-4 rounded-xl text-center">
                    <div className="text-xs font-bold text-text-tertiary uppercase mb-1">Current Unix (s)</div>
                    <div className="text-xl font-mono font-bold text-accent-primary">{Math.floor(now / 1000)}</div>
                </div>
                <div className="bg-surface border border-border p-4 rounded-xl text-center">
                    <div className="text-xs font-bold text-text-tertiary uppercase mb-1">Current Unix (ms)</div>
                    <div className="text-xl font-mono font-bold text-text-primary">{now}</div>
                </div>
                <div className="bg-surface border border-border p-4 rounded-xl text-center col-span-2">
                    <div className="text-xs font-bold text-text-tertiary uppercase mb-1">UTC Time</div>
                    <div className="text-xl font-mono font-bold text-text-secondary truncate">{new Date(now).toUTCString()}</div>
                </div>
            </div>

            {/* Converter */}
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="bg-background border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent-primary"
                    >
                        <option value="timestamp">Unix Timestamp</option>
                        <option value="string">Date String (ISO/UTC)</option>
                    </select>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={type === 'timestamp' ? "e.g. 1672531200" : "e.g. 2023-01-01T00:00:00Z"}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-primary font-mono"
                        />
                    </div>
                    <button
                        onClick={handleConvert}
                        className="px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20 flex items-center gap-2"
                    >
                        <RefreshCw size={18} /> Convert
                    </button>
                </div>

                {result && !result.error && (
                    <div className="grid gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        {[
                            { label: "ISO 8601", value: result.iso },
                            { label: "UTC / GMT", value: result.utc },
                            { label: "Local String", value: result.local },
                            { label: "Unix Timestamp", value: result.unix },
                            { label: "Relative", value: result.relative },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-surface-highlight border border-border rounded-lg group">
                                <span className="text-xs font-bold text-text-secondary uppercase w-32">{item.label}</span>
                                <span className="font-mono text-sm text-text-primary select-all">{item.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {result?.error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                        {result.error}
                    </div>
                )}
            </div>
        </div>
    );
}
