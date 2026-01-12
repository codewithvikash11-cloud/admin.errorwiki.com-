"use client";
import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, X } from 'lucide-react';

export default function Base64Converter() {
    const [text, setText] = useState('');
    const [base64, setBase64] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleEncode = (val) => {
        setText(val);
        setError('');
        try {
            setBase64(btoa(val));
        } catch (e) {
            // btoa fails on unicode without proper escaping, but for simplicity:
            setError('Input contains characters that cannot be encoded directly to Base64 (try strict ASCII).');
            setBase64('');
        }
    };

    const handleDecode = (val) => {
        setBase64(val);
        setError('');
        try {
            setText(atob(val));
        } catch (e) {
            setError('Invalid Base64 string format.');
            setText('');
        }
    };

    const copyToClipboard = (content) => {
        if (!content) return;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 h-[calc(100vh-250px)] min-h-[500px]">
            {/* Plain Text Section */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Plain Text (ASCII)</label>
                    {text && (
                        <button onClick={() => { setText(''); setBase64(''); setError(''); }} className="text-xs text-text-tertiary hover:text-accent-primary flex items-center gap-1 transition-colors">
                            <X size={12} /> Clear
                        </button>
                    )}
                </div>
                <textarea
                    className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 resize-none transition-all placeholder:text-text-tertiary text-text-primary"
                    placeholder="Type text to encode..."
                    value={text}
                    onChange={(e) => handleEncode(e.target.value)}
                />
            </div>

            {/* Middle Divider */}
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative bg-surface p-2 rounded-full border border-border shadow-sm">
                    <ArrowLeftRight size={20} className="text-accent-primary" />
                </div>
            </div>

            {/* Base64 Section */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Base64 Output</label>
                    <button
                        onClick={() => copyToClipboard(base64)}
                        disabled={!base64}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-surface-highlight hover:bg-surface-active border border-border rounded-lg text-text-secondary transition-colors disabled:opacity-50"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy Result'}
                    </button>
                </div>

                <div className="flex-1 relative bg-surface border border-border rounded-xl overflow-hidden">
                    <textarea
                        className="w-full h-full bg-transparent p-4 font-mono text-sm outline-none resize-none text-accent-primary placeholder:text-text-tertiary"
                        placeholder="Or paste Base64 to decode..."
                        value={base64}
                        onChange={(e) => handleDecode(e.target.value)}
                    />
                    {error && (
                        <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-medium backdrop-blur-md">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
