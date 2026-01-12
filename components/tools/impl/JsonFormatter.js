"use client";
import React, { useState } from 'react';
import { Copy, AlertCircle, Check, Minimize, Maximize } from 'lucide-react';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 4));
            setError(null);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const handleMinify = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Input JSON</label>
                    <button
                        onClick={() => setInput('')}
                        className="text-xs text-text-tertiary hover:text-accent-primary transition-colors"
                    >
                        Clear
                    </button>
                </div>
                <textarea
                    className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 resize-none transition-all placeholder:text-text-tertiary text-text-primary"
                    placeholder="Paste messy JSON here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Output</label>
                    <div className="flex gap-2">
                        <button
                            onClick={handleMinify}
                            disabled={!input}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-surface border border-border hover:bg-surface-highlight text-text-secondary hover:text-text-primary rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Minimize size={14} /> Minify
                        </button>
                        <button
                            onClick={handleFormat}
                            disabled={!input}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20 disabled:opacity-50"
                        >
                            <Maximize size={14} /> Format
                        </button>
                    </div>
                </div>

                <div className={`flex-1 relative bg-surface border rounded-xl overflow-hidden transition-colors ${error ? 'border-red-500/50' : 'border-border'}`}>
                    {error ? (
                        <div className="absolute inset-0 p-4 bg-red-500/5 backdrop-blur-sm text-red-500 font-mono text-sm overflow-auto">
                            <div className="flex items-center gap-2 font-bold mb-2 p-2 bg-red-500/10 rounded-lg w-fit">
                                <AlertCircle size={16} /> Invalid JSON
                            </div>
                            <pre className="whitespace-pre-wrap">{error}</pre>
                        </div>
                    ) : (
                        <>
                            <textarea
                                readOnly
                                className="w-full h-full bg-transparent p-4 font-mono text-sm outline-none resize-none text-text-primary"
                                value={output}
                                placeholder="Result will appear here..."
                            />
                            {output && (
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-text-secondary hover:text-accent-primary transition-colors shadow-sm"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
