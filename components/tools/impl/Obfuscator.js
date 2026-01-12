"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Shield } from 'lucide-react';

export default function StringObfuscator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [method, setMethod] = useState('html'); // html, url, base64, hex
    const [copied, setCopied] = useState(false);

    const obfuscate = (str, type) => {
        if (!str) return '';
        switch (type) {
            case 'html':
                return str.split('').map(char => `&#${char.charCodeAt(0)};`).join('');
            case 'url':
                return encodeURIComponent(str);
            case 'base64':
                try {
                    return btoa(str);
                } catch (e) {
                    return 'Error: Invalid input for Base64';
                }
            case 'hex':
                return str.split('').map(char => '%' + char.charCodeAt(0).toString(16).toUpperCase()).join('');
            case 'rot13':
                return str.replace(/[a-zA-Z]/g, function (c) {
                    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
                });
            default:
                return str;
        }
    };

    const handleGenerate = () => {
        setOutput(obfuscate(input, method));
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Input String</label>
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (e.target.value) setOutput(obfuscate(e.target.value, method));
                            else setOutput('');
                        }}
                        placeholder="Enter text to obfuscate (e.g. mailto:email@example.com)"
                        className="w-full h-32 bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary resize-none font-mono"
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[
                        { id: 'html', label: 'HTML Entity' },
                        { id: 'url', label: 'URL Encode' },
                        { id: 'hex', label: 'Hex Encode' },
                        { id: 'base64', label: 'Base64' },
                        { id: 'rot13', label: 'ROT13' },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => {
                                setMethod(m.id);
                                if (input) setOutput(obfuscate(input, m.id));
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${method === m.id ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/25' : 'bg-surface-highlight text-text-secondary hover:text-text-primary'}`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                        <Shield size={14} /> Obfuscated Output
                    </label>
                    <div className="relative">
                        <textarea
                            readOnly
                            value={output}
                            className="w-full h-32 bg-surface-highlight border border-border rounded-xl px-4 py-3 text-lg font-mono text-accent-primary focus:outline-none cursor-default resize-none"
                        />
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-4 bottom-4 p-2 bg-background hover:bg-surface rounded-lg text-text-secondary hover:text-white transition-colors border border-border"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <p className="text-center text-sm text-text-tertiary">
                Use HTML Entities to hide email addresses from simple spambots.
            </p>
        </div>
    );
}
