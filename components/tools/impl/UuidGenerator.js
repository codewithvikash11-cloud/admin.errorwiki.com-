"use client";
import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Fingerprint } from 'lucide-react';

export default function UuidGenerator() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState(null); // Index of copied item

    const generate = () => {
        const newUuids = Array(Math.min(count, 50)).fill(0).map(() => crypto.randomUUID());
        setUuids(newUuids);
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
    };

    React.useEffect(() => {
        generate();
    }, []);

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-6 h-[calc(100vh-250px)] min-h-[500px]">
            {/* Controls */}
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Count</span>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-20 h-10 bg-background border border-border rounded-lg px-2 text-center text-sm font-bold outline-none focus:border-accent-primary transition-colors"
                    />
                </div>
                <button
                    onClick={generate}
                    className="flex-1 h-10 bg-accent-primary hover:bg-accent-hover text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2"
                >
                    <RefreshCw size={16} /> Generate UUIDs
                </button>
            </div>

            {/* List */}
            <div className="flex-1 bg-surface border border-border rounded-2xl p-4 overflow-hidden flex flex-col">
                <div className="space-y-2 overflow-y-auto pr-2 flex-1 scrollbar-thin">
                    {uuids.map((uuid, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-background border border-border rounded-xl group hover:border-accent-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Fingerprint size={16} className="text-text-tertiary" />
                                <code className="font-mono text-text-primary text-sm md:text-base">{uuid}</code>
                            </div>
                            <button
                                onClick={() => copyToClipboard(uuid, i)}
                                className="p-2 text-text-tertiary hover:text-accent-primary bg-transparent hover:bg-surface-highlight rounded-lg transition-colors"
                                title="Copy"
                            >
                                {copied === i ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
