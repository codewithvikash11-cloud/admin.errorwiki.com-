"use client";
import React, { useState } from 'react';
import { Copy, Check, Link, RefreshCcw } from 'lucide-react';

export default function Slugify() {
    const [input, setInput] = useState('');
    const [separator, setSeparator] = useState('-');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSlugify = (str, sep) => {
        if (!str) {
            setOutput('');
            return;
        }

        const slug = str
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, sep)     // Replace spaces with separator
            .replace(/[^\w\-\.]+/g, '') // Remove non-word chars (except dot and hyphen)
            .replace(/\-\-+/g, sep)   // Replace multiple separators with single
            .replace(new RegExp(`^\\${sep}+|\\${sep}+$`, 'g'), ''); // Trim separators

        setOutput(slug);
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);
        handleSlugify(val, separator);
    };

    const handleSeparatorChange = (sep) => {
        setSeparator(sep);
        handleSlugify(input, sep);
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-surface p-4 rounded-xl border border-border flex items-center gap-4">
                <span className="text-sm font-bold text-text-secondary uppercase">Separator:</span>
                <div className="flex gap-2">
                    {['-', '_', '.'].map((sep) => (
                        <button
                            key={sep}
                            onClick={() => handleSeparatorChange(sep)}
                            className={`w-10 h-10 rounded-lg font-mono font-bold text-lg flex items-center justify-center transition-all ${separator === sep ? 'bg-accent-primary text-white shadow-md' : 'bg-background border border-border text-text-secondary hover:text-text-primary'}`}
                        >
                            {sep}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">String to Slugify</label>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="e.g. Hello World! This is a test."
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                        <Link size={14} /> Generated Slug
                    </label>
                    <div className="relative">
                        <input
                            readOnly
                            type="text"
                            value={output}
                            placeholder="hello-world-this-is-a-test"
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-lg font-mono text-accent-primary focus:outline-none cursor-default"
                        />
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-surface hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
