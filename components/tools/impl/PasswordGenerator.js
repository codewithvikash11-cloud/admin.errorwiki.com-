"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [strength, setStrength] = useState('Weak');
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = "";
        if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (options.numbers) charset += "0123456789";
        if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (charset === "") return;

        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
    };

    useEffect(() => {
        generatePassword();
    }, [length, options]);

    useEffect(() => {
        // Calculate Strength
        let score = 0;
        if (length > 8) score++;
        if (length > 12) score++;
        if (options.uppercase && options.lowercase) score++;
        if (options.numbers) score++;
        if (options.symbols) score++;

        if (score < 2) setStrength('Very Weak');
        else if (score < 3) setStrength('Weak');
        else if (score < 4) setStrength('Medium');
        else if (score < 5) setStrength('Strong');
        else setStrength('Very Strong');

    }, [password, length, options]);


    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 'Very Weak': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'Weak': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'Strong': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Very Strong': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-gray-500';
        }
    };

    const StrengthIcon = () => {
        if (strength.includes('Weak')) return <ShieldAlert size={18} />;
        if (strength === 'Medium') return <Shield size={18} />;
        return <ShieldCheck size={18} />;
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">

            {/* Display Box */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-border">
                    <div
                        className={`h-full transition-all duration-500 ${strength === 'Very Strong' ? 'bg-emerald-500' : strength === 'Strong' ? 'bg-green-500' : strength === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${(length / 32) * 100}%` }}
                    />
                </div>

                <div className="flex-1 w-full text-center md:text-left break-all font-mono text-2xl md:text-3xl font-bold tracking-wider text-text-primary">
                    {password}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                    <button
                        onClick={generatePassword}
                        className="p-3 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-xl transition-colors"
                        title="Regenerate"
                    >
                        <RefreshCw size={24} />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-xl transition-all shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        <span className="font-bold">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Length Slider */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <label className="font-bold text-text-primary">Password Length</label>
                        <span className="px-3 py-1 bg-surface-highlight rounded-lg text-accent-primary font-mono font-bold text-lg border border-border">{length}</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-highlight rounded-lg appearance-none cursor-pointer accent-accent-primary"
                    />
                    <div className="flex justify-between text-xs text-text-tertiary mt-2 font-mono">
                        <span>8</span>
                        <span>16</span>
                        <span>24</span>
                        <span>32</span>
                    </div>
                </div>

                {/* Checklist */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <label className="font-bold text-text-primary">Character Sets</label>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-bold ${getStrengthColor()}`}>
                            <StrengthIcon />
                            <span>{strength}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { id: 'uppercase', label: 'Uppercase (A-Z)' },
                            { id: 'lowercase', label: 'Lowercase (a-z)' },
                            { id: 'numbers', label: 'Numbers (0-9)' },
                            { id: 'symbols', label: 'Symbols (!@#)' },
                        ].map((opt) => (
                            <label key={opt.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-border/50">
                                <span className="text-text-secondary font-medium">{opt.label}</span>
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${options[opt.id] ? 'bg-accent-primary border-accent-primary' : 'border-text-secondary/50'}`}>
                                    <input
                                        type="checkbox"
                                        checked={options[opt.id]}
                                        onChange={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id] }))}
                                        className="hidden"
                                    />
                                    {options[opt.id] && <Check size={14} className="text-white" strokeWidth={3} />}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
