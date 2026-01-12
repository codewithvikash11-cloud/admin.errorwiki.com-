"use client";
import React, { useState } from 'react';
import { Copy, Check, Filter, ArrowRight } from 'lucide-react';

export default function RemoveDuplicates() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

    const handleProcess = () => {
        if (!input) return;

        const lines = input.split(/\r?\n/);
        const uniqueSet = new Set(lines); // Keeps insertion order? JS Sets iterate in insertion order
        const uniqueLines = Array.from(uniqueSet);

        setOutput(uniqueLines.join('\n'));
        setStats({
            original: lines.length,
            unique: uniqueLines.length,
            removed: lines.length - uniqueLines.length
        });
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Original List</label>
                    <button
                        onClick={() => { setInput(''); setOutput(''); setStats({ original: 0, unique: 0, removed: 0 }); }}
                        className="text-xs text-text-tertiary hover:text-accent-primary transition-colors"
                    >
                        Clear
                    </button>
                </div>
                <textarea
                    className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 resize-none transition-all placeholder:text-text-tertiary text-text-primary"
                    placeholder="Paste list items here (one per line)..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className="flex flex-col relative">
                {/* Action Button Centered on Mobile, Absolute on desktop center? No, let's keep simple layout */}
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Unique List</label>
                    <button
                        onClick={handleProcess}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20"
                    >
                        <Filter size={14} /> Remove Duplicates
                    </button>
                </div>

                <div className="flex-1 bg-surface border border-border rounded-xl p-4 relative overflow-hidden flex flex-col">
                    <textarea
                        readOnly
                        className="flex-1 w-full bg-transparent font-mono text-sm outline-none resize-none text-text-primary placeholder:text-text-tertiary"
                        value={output}
                        placeholder="Result will appear here..."
                    />

                    {output && (
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                            <div className="text-xs text-text-secondary">
                                Removed <span className="font-bold text-accent-primary">{stats.removed}</span> duplicates
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1.5 bg-surface-highlight hover:bg-surface-active text-text-secondary hover:text-white rounded-lg transition-colors border border-border"
                            >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                <span className="font-bold text-xs">{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
