"use client";

import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Settings2 } from 'lucide-react';

export default function TokenGenerator() {
    const [token, setToken] = useState('');
    const [copied, setCopied] = useState(false);
    const [length, setLength] = useState(64);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
    });

    const generateToken = () => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        let chars = '';
        if (options.uppercase) chars += charset.uppercase;
        if (options.lowercase) chars += charset.lowercase;
        if (options.numbers) chars += charset.numbers;
        if (options.symbols) chars += charset.symbols;

        if (chars === '') return;

        let result = '';
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            result += chars[randomValues[i] % chars.length];
        }

        setToken(result);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        generateToken();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Controls */}
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2 text-text-primary font-bold mb-4">
                    <Settings2 size={20} className="text-accent-primary" />
                    <h2>Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-text-secondary block">
                            Token Length: <span className="text-accent-primary font-bold">{length}</span>
                        </label>
                        <input
                            type="range"
                            min="8"
                            max="512"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-accent-primary h-2 bg-surface-highlight rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-text-tertiary">
                            <span>8</span>
                            <span>256</span>
                            <span>512</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(options).map(key => (
                            <label key={key} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${options[key] ? 'bg-accent-primary border-accent-primary' : 'bg-transparent border-text-tertiary group-hover:border-text-secondary'}`}>
                                    {options[key] && <Check size={14} className="text-white" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={options[key]}
                                    onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                                    className="hidden"
                                />
                                <span className="text-sm text-text-secondary capitalize group-hover:text-text-primary transition-colors">{key}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={generateToken}
                    className="w-full py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold transition-all transform active:scale-[0.99] shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2"
                >
                    <RefreshCw size={18} /> Generate New Token
                </button>
            </div>

            {/* Output */}
            <div className="bg-surface border border-border rounded-2xl p-6 relative group">
                <label className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3 block">Generated Token</label>
                <div className="bg-background border border-border rounded-xl p-4 break-all font-mono text-text-primary leading-relaxed min-h-[100px] flex items-center">
                    {token}
                </div>

                <button
                    onClick={copyToClipboard}
                    className="absolute top-6 right-6 p-2 rounded-lg bg-surface-highlight hover:bg-surface-active text-text-secondary hover:text-white transition-all border border-border"
                    title="Copy to clipboard"
                >
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
            </div>
        </div>
    );
}
