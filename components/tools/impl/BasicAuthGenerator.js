"use client";

import React, { useState, useEffect } from 'react';
import { Lock, Copy, Check, Eye, EyeOff } from 'lucide-react';

export default function BasicAuthGenerator() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [header, setHeader] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!username && !password) {
            setHeader('');
            return;
        }
        const str = `${username}:${password}`;
        // Basic Base64 encoding handling UTF-8 
        // btoa only accepts Latin1, so we encodeURIComponent first for proper UTF-8 support if needed,
        // but standard Basic Auth is often just ISO-8859-1. 
        // For tools, `btoa` is usually enough, but let's be safe.
        // Actually, simple btoa(username + ":" + password) is the standard expectation.

        try {
            const encoded = btoa(str);
            setHeader(`Authorization: Basic ${encoded}`);
        } catch (e) {
            // Handle charset issues if necessary
            setHeader('Error: Invalid characters for Base64');
        }
    }, [username, password]);

    const handleCopy = () => {
        navigator.clipboard.writeText(header);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="user@example.com"
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent-primary transition-colors font-medium text-text-primary"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Required"
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent-primary transition-colors font-medium text-text-primary pr-12"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] bg-border my-2" />

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Generated Header</label>
                        {header && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:underline transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy Header'}
                            </button>
                        )}
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            readOnly
                            value={header}
                            placeholder="Authorization: Basic ..."
                            className="w-full bg-accent-primary/5 border border-accent-primary/20 text-accent-primary font-mono text-sm rounded-xl px-4 py-4 outline-none"
                        />
                        {header && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 bg-surface rounded-lg shadow-sm border border-border hover:bg-surface-highlight text-text-secondary"
                                >
                                    <Copy size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {header && (
                        <div className="mt-2 text-xs text-text-tertiary font-mono">
                            Base64 Token: <span className="text-text-primary select-all">{header.replace('Authorization: Basic ', '')}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h4 className="flex items-center gap-2 font-bold text-text-primary mb-2">
                        <Lock size={16} className="text-accent-primary" />
                        Security Note
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Basic Auth transmits credentials in an easily reversible format (Base64).
                        Always ensure you are using <strong>HTTPS (SSL/TLS)</strong> when sending Basic Auth headers to prevent credential interception.
                    </p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h4 className="font-bold text-text-primary mb-2">
                        Format
                    </h4>
                    <p className="text-sm text-text-secondary font-mono bg-background p-2 rounded-lg border border-border inline-block">
                        Authorization: Basic base64(username:password)
                    </p>
                </div>
            </div>
        </div>
    );
}
