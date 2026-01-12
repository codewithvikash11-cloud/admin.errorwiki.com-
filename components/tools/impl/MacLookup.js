"use client";

import React, { useState } from 'react';
import { Network, RefreshCw, Search, Calculator, Check, Copy } from 'lucide-react';

export default function MacLookup() {
    // Mode: 'lookup' or 'generate'
    const [mode, setMode] = useState('lookup');

    // Lookup State
    const [macInput, setMacInput] = useState('');
    const [lookupResult, setLookupResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generate State
    const [generatedMac, setGeneratedMac] = useState('');
    const [copied, setCopied] = useState(false);
    const [separator, setSeparator] = useState(':');
    const [casing, setCasing] = useState('upper');

    // -- LOOKUP LOGIC --
    const handleLookup = async () => {
        if (!macInput.trim()) return;
        setLoading(true);
        setError(null);
        setLookupResult(null);

        try {
            // Using macvendors.co API (free, needs no key for low volume, or fallback)
            // Note: Client-side calls might fail due to CORS. Best practice is a server proxy.
            // But since this is a client-side tool primarily, let's try a common public API.
            // If CORS fails, we can't do much without a backend route.
            // Alternative: Use a local list of common vendors? Too big.
            // Let's try https://api.macvendors.com/ (Rate limited, no CORS usually).
            // Actually, for a pure client tool, we might simulate or warn about CORS.
            // Let's attempt a fetch and handle CORS error gracefully or use a CORS proxy if allowed.
            // For this demo, we'll try to fetch. If it fails, we assume it's offline or CORS blocked.

            const res = await fetch(`https://api.macvendors.com/${macInput}`);
            if (!res.ok) {
                // 404 means not found
                if (res.status === 404) throw new Error("Vendor not found");
                throw new Error("Lookup failed (Rate limited or CORS)");
            }
            const vendor = await res.text();
            setLookupResult({ vendor, mac: macInput });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // -- GENERATE LOGIC --
    const generateMac = () => {
        const hex = '0123456789ABCDEF';
        let mac = '';
        for (let i = 0; i < 6; i++) {
            // First byte: ensure unicast (bit 0 of 1st byte must be 0) and locally administered (bit 1 of 1st byte is 1) for safe random
            // Actually, for "random" generation, usually standard random is fine, but for "valid" local macs:
            // x2:xx:xx:xx:xx:xx, x6, xA, xE are locally administered.
            // Let's just do pure random for now or maybe options later.
            // Let's do pure random bytes.
            let byte = Math.floor(Math.random() * 256);
            if (i === 0) {
                // Set 2nd least significant bit to 1 for locally administered (optional but good practice)
                // byte = byte | 0x02; 
                // Ensure unicast? (bit 0 = 0)
                // byte = byte & 0xFE; 
            }
            let bStr = byte.toString(16).padStart(2, '0');
            mac += bStr + (i < 5 ? separator : '');
        }

        if (casing === 'upper') mac = mac.toUpperCase();
        else mac = mac.toLowerCase();

        setGeneratedMac(mac);
        setCopied(false);
    };

    const copyMac = () => {
        if (!generatedMac) return;
        navigator.clipboard.writeText(generatedMac);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* Toggle */}
            <div className="flex bg-surface-highlight p-1 rounded-xl self-center">
                <button
                    onClick={() => setMode('lookup')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'lookup' ? 'bg-surface shadow text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}
                >
                    Lookup Vendor
                </button>
                <button
                    onClick={() => setMode('generate')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'generate' ? 'bg-surface shadow text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}
                >
                    Generate Random
                </button>
            </div>

            {mode === 'lookup' && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-surface border border-border rounded-xl p-8 text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary mb-2">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">MAC Address Lookup</h3>
                        <p className="text-text-secondary max-w-md">Enter a MAC address (OUI) to find the manufacturer/vendor.</p>

                        <div className="flex items-center gap-2 w-full max-w-md mt-4">
                            <input
                                type="text"
                                value={macInput}
                                onChange={(e) => setMacInput(e.target.value)}
                                placeholder="00:11:22:33:44:55"
                                className="flex-1 bg-surface-highlight border border-border rounded-xl px-4 py-3 font-mono text-text-primary focus:outline-none focus:border-accent-primary transition-all text-center"
                            />
                            <button
                                onClick={handleLookup}
                                disabled={loading || !macInput}
                                className="bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-50 text-white p-3 rounded-xl transition-all"
                            >
                                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                            </button>
                        </div>

                        {error && (
                            <div className="mt-4 text-red-500 bg-red-500/10 px-4 py-2 rounded-lg text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {lookupResult && (
                            <div className="mt-6 bg-surface-highlight border border-border rounded-xl p-6 w-full max-w-md">
                                <span className="text-xs text-text-tertiary uppercase font-bold tracking-wider mb-1 block">Vendor Found</span>
                                <div className="text-xl font-bold text-text-primary">{lookupResult.vendor}</div>
                                <div className="text-sm text-text-secondary font-mono mt-1">{lookupResult.mac}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {mode === 'generate' && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-surface border border-border rounded-xl p-8 flex flex-col items-center gap-6">
                        <div className="w-16 h-16 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary mb-2">
                            <Calculator size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">MAC Address Generator</h3>

                        {/* Options */}
                        <div className="flex gap-4 mb-4">
                            <select
                                value={separator}
                                onChange={(e) => setSeparator(e.target.value)}
                                className="bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none"
                            >
                                <option value=":">Colon (:)</option>
                                <option value="-">Dash (-)</option>
                                <option value="">None</option>
                            </select>
                            <select
                                value={casing}
                                onChange={(e) => setCasing(e.target.value)}
                                className="bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none"
                            >
                                <option value="upper">Uppercase</option>
                                <option value="lower">Lowercase</option>
                            </select>
                        </div>

                        <button
                            onClick={generateMac}
                            className="bg-accent-primary hover:bg-accent-primary/90 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-accent-primary/25"
                        >
                            <RefreshCw size={20} /> Generate Random MAC
                        </button>

                        {generatedMac && (
                            <div className="mt-4 p-6 bg-surface-highlight border border-border rounded-2xl w-full max-w-md relative group cursor-pointer hover:border-accent-primary/50 transition-all" onClick={copyMac}>
                                <div className="text-center">
                                    <div className="text-3xl font-mono font-bold text-text-primary tracking-wider">{generatedMac}</div>
                                </div>
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary">
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="text-center text-xs text-text-tertiary">
                {mode === 'lookup' ? 'Lookup uses public API. Rate limits may apply.' : 'Generates standard random 48-bit MAC addresses.'}
            </div>
        </div>
    );
}
