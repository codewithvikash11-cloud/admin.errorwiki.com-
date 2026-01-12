"use client";
import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Dice5 } from 'lucide-react';

export default function RandomString() {
    const [length, setLength] = useState(16);
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const [options, setOptions] = useState({
        upper: true,
        lower: true,
        numbers: true,
        symbols: false
    });

    const generate = () => {
        const charset = {
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lower: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
        };

        let chars = '';
        if (options.upper) chars += charset.upper;
        if (options.lower) chars += charset.lower;
        if (options.numbers) chars += charset.numbers;
        if (options.symbols) chars += charset.symbols;

        if (!chars) return;

        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setResult(str);
        setCopied(false);
    };

    // Initial generate
    React.useEffect(() => {
        generate();
    }, []);

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            {/* Result Box */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center gap-6 text-center">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Generated String</label>
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-accent-primary break-all">
                        {result}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={generate}
                        className="p-3 bg-surface-highlight hover:bg-surface-active rounded-xl text-text-secondary hover:text-text-primary transition-colors"
                        title="Regenerate"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold shadow-lg shadow-accent-primary/20 transition-all"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-text-primary">Length: <span className="text-accent-primary">{length}</span></label>
                    </div>
                    <input
                        type="range"
                        min="4"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-active rounded-lg appearance-none cursor-pointer accent-accent-primary"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'upper', label: 'Uppercase (A-Z)' },
                        { id: 'lower', label: 'Lowercase (a-z)' },
                        { id: 'numbers', label: 'Numbers (0-9)' },
                        { id: 'symbols', label: 'Symbols (!@#)' },
                    ].map((opt) => (
                        <label key={opt.id} className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl cursor-pointer hover:border-text-secondary/30 transition-colors">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${options[opt.id] ? 'bg-accent-primary border-accent-primary' : 'bg-transparent border-text-tertiary'}`}>
                                {options[opt.id] && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>
                            <input
                                type="checkbox"
                                checked={options[opt.id]}
                                onChange={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id] }))}
                                className="hidden"
                            />
                            <span className="text-sm font-medium text-text-secondary">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
