"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Key } from 'lucide-react';

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

export default function HmacGenerator() {
    const [input, setInput] = useState('');
    const [secret, setSecret] = useState('');
    const [algo, setAlgo] = useState('SHA-256');
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const generate = async () => {
            if (!input || !secret) {
                setHash('');
                return;
            }
            setLoading(true);

            try {
                const encoder = new TextEncoder();
                const keyData = encoder.encode(secret);
                const msgData = encoder.encode(input);

                const key = await crypto.subtle.importKey(
                    'raw',
                    keyData,
                    { name: 'HMAC', hash: { name: algo } },
                    false,
                    ['sign']
                );

                const signature = await crypto.subtle.sign(
                    'HMAC',
                    key,
                    msgData
                );

                const hashArray = Array.from(new Uint8Array(signature));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                setHash(hashHex);
            } catch (error) {
                console.error("HMAC Generation failed:", error);
                setHash("Error generating HMAC");
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(generate, 300); // Debounce
        return () => clearTimeout(timeout);
    }, [input, secret, algo]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider block">1. Input Text</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Message to hash..."
                        className="w-full h-32 bg-surface border border-border rounded-xl p-4 text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none font-mono text-sm"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider block">2. Secret Key</label>
                    <textarea
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="Secret key..."
                        className="w-full h-32 bg-surface border border-border rounded-xl p-4 text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none font-mono text-sm"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center bg-surface p-4 rounded-xl border border-border">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="text-sm font-bold text-text-secondary whitespace-nowrap">Algorithm:</span>
                    <div className="flex bg-background rounded-lg p-1 border border-border w-full md:w-auto overflow-x-auto">
                        {ALGOS.map(a => (
                            <button
                                key={a}
                                onClick={() => setAlgo(a)}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${algo === a ? 'bg-accent-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-surface-active'}`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 relative group hover:border-accent-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider block">HMAC Output (Hex)</label>
                    <button
                        onClick={copyToClipboard}
                        disabled={!hash}
                        className="text-text-tertiary hover:text-white transition-colors"
                    >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                </div>

                <div className="bg-background border border-border rounded-xl p-4 break-all min-h-[60px] flex items-center">
                    {loading ? (
                        <div className="flex items-center gap-2 text-text-tertiary animate-pulse">
                            <RefreshCw size={14} className="animate-spin" /> Generating...
                        </div>
                    ) : (
                        <code className="font-mono text-sm md:text-base text-accent-primary">
                            {hash || 'Enter input and secret to generate...'}
                        </code>
                    )}
                </div>
            </div>
        </div>
    );
}
