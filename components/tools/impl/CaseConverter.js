"use client";
import React, { useState } from 'react';
import { Copy, Check, Type, ArrowRight, RefreshCcw } from 'lucide-react';

export default function CaseConverter() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const toSentenceCase = (str) => {
        return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    };

    const toTitleCase = (str) => {
        return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    };

    const transformers = [
        { id: 'upper', label: 'UPPERCASE', fn: s => s.toUpperCase() },
        { id: 'lower', label: 'lowercase', fn: s => s.toLowerCase() },
        { id: 'sentence', label: 'Sentence case', fn: toSentenceCase },
        { id: 'title', label: 'Title Case', fn: toTitleCase },
        { id: 'alternating', label: 'aLtErNaTiNg cAsE', fn: s => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
        { id: 'inverse', label: 'InVeRsE CaSe', fn: s => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
    ];

    const handleTransform = (fn) => {
        setText(fn(text));
    };

    const copyToClipboard = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {transformers.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => handleTransform(t.fn)}
                        disabled={!text}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-border hover:border-accent-primary hover:bg-surface-highlight transition-all disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-surface"
                    >
                        <span className="text-xs font-bold text-text-secondary mb-1">{t.label}</span>
                        <Type size={16} className="text-accent-primary" />
                    </button>
                ))}
            </div>

            <div className="bg-surface border border-border rounded-2xl p-1 relative flex flex-col h-[400px]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="flex-1 w-full bg-transparent p-6 text-base md:text-lg outline-none resize-none text-text-primary placeholder:text-text-tertiary"
                />

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        onClick={() => setText('')}
                        className="p-2 text-text-tertiary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Clear"
                    >
                        <RefreshCcw size={18} />
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-all shadow-lg shadow-accent-primary/20"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="font-bold text-sm">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-text-secondary px-2">
                <div>Character Count: <span className="font-bold text-text-primary">{text.length}</span></div>
                <div>Word Count: <span className="font-bold text-text-primary">{text.trim() ? text.trim().split(/\s+/).length : 0}</span></div>
            </div>
        </div>
    );
}
