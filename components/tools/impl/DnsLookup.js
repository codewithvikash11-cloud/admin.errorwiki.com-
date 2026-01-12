"use client";

import React, { useState } from 'react';
import { Search, Globe, Activity, AlertCircle, Server } from 'lucide-react';

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA', 'PTR'];

export default function DnsLookup() {
    const [domain, setDomain] = useState('');
    const [selectedType, setSelectedType] = useState('A');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const lookup = async () => {
        if (!domain) return;

        // Basic domain validation/sanitization
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            // Using Google's Public DNS-over-HTTPS API
            const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=${selectedType}`);
            if (!response.ok) {
                throw new Error('Failed to fetch DNS records');
            }
            const data = await response.json();

            if (data.Status !== 0) {
                // Status 0 is NOERROR. Other codes indicate issues (3=NXDOMAIN, etc.)
                let msg = 'DNS Query Failed';
                if (data.Status === 3) msg = 'Domain does not exist (NXDOMAIN)';
                else if (data.Status === 2) msg = 'Server Failure (SERVFAIL)';
                setError(msg);
            } else {
                setResults(data);
            }
        } catch (err) {
            setError('Network error or blocked by CORS. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') lookup();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="example.com"
                                className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-accent-primary transition-colors font-medium text-text-primary"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent-primary font-bold text-text-secondary cursor-pointer"
                        >
                            {RECORD_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <button
                            onClick={lookup}
                            disabled={loading || !domain}
                            className="bg-accent-primary text-white rounded-xl px-6 py-3 font-bold hover:bg-accent-hover transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {loading ? <Activity className="animate-spin" size={20} /> : <Search size={20} />}
                            Lookup
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-accent-error/10 border border-accent-error/20 flex items-center gap-3 text-accent-error">
                        <AlertCircle size={20} />
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {results && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    Results for <span className="text-accent-primary">{results.Question?.[0]?.name?.replace(/\.$/, '')}</span>
                                </h3>
                                <p className="text-sm text-text-tertiary">Record Type: {selectedType}</p>
                            </div>
                            {results.Answer ? (
                                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold">
                                    Found {results.Answer.length} records
                                </div>
                            ) : (
                                <div className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold">
                                    No records found
                                </div>
                            )}
                        </div>

                        {results.Answer ? (
                            <div className="grid gap-3">
                                {results.Answer.map((record, index) => (
                                    <div key={index} className="bg-background border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-surface p-2 rounded-lg border border-border">
                                                <Server size={18} className="text-text-secondary" />
                                            </div>
                                            <div>
                                                <div className="font-mono font-bold text-text-primary break-all">{record.data}</div>
                                                <div className="text-xs text-text-tertiary">TTL: {record.TTL}s</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-text-tertiary">
                                No records returned for this domain and type.
                            </div>
                        )}

                        <div className="bg-surface-highlight/30 p-4 rounded-xl text-xs text-text-tertiary">
                            <h4 className="font-bold mb-1">Raw Response (Debug)</h4>
                            <pre className="overflow-x-auto font-mono">{JSON.stringify(results, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
