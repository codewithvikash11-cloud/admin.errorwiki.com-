"use client";
import React, { useState } from 'react';
import { Code, ArrowLeftRight, Copy, Check, Type } from 'lucide-react';

export default function HtmlEntity() {
    const [raw, setRaw] = useState('');
    const [encoded, setEncoded] = useState('');
    const [copied, setCopied] = useState(false);

    const handleRawChange = (val) => {
        setRaw(val);
        // Encode
        const textarea = document.createElement('textarea');
        textarea.textContent = val;
        setEncoded(textarea.innerHTML);
    };

    const handleEncodedChange = (val) => {
        setEncoded(val);
        // Decode
        const textarea = document.createElement('textarea');
        textarea.innerHTML = val;
        setRaw(textarea.value);
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6">
            <div className="grid lg:grid-cols-2 gap-6 flex-1">
                {/* Raw Text */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Type size={14} /> Plain Text
                        </label>
                        <button onClick={() => { setRaw(''); setEncoded(''); }} className="text-xs text-text-tertiary hover:text-accent-primary">Clear</button>
                    </div>
                    <textarea
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm outline-none focus:border-accent-primary resize-none text-text-primary placeholder:text-text-tertiary"
                        value={raw}
                        onChange={(e) => handleRawChange(e.target.value)}
                        placeholder="Type normal text here..."
                    />
                </div>

                {/* Encoded Text */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Code size={14} /> HTML Entity Encoded
                        </label>
                        <button
                            onClick={() => copyToClipboard(encoded)}
                            className="flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-hover transition-colors"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <textarea
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm outline-none focus:border-accent-primary resize-none text-accent-primary placeholder:text-text-tertiary"
                        value={encoded}
                        onChange={(e) => handleEncodedChange(e.target.value)}
                        placeholder="&lt;b&gt;Encoded output&lt;/b&gt;"
                    />
                </div>
            </div>

            <p className="text-center text-sm text-text-tertiary">
                Instantly converts characters to their HTML entity equivalents and back.
            </p>
        </div>
    );
}
