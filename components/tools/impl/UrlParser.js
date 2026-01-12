"use client";
import React, { useState, useEffect } from 'react';
import { Link, Check, Component, X, Copy } from 'lucide-react';

export default function UrlParser() {
    const [url, setUrl] = useState('');
    const [parsed, setParsed] = useState(null);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!url.trim()) {
            setParsed(null);
            setError(null);
            return;
        }

        try {
            // Add protocol if missing for better parsing, or just fail naturally
            let urlToParse = url;
            if (!url.match(/^https?:\/\//)) {
                // Try parsing as is, if fails might add https
                // But generally users paste full URLs
            }

            const u = new URL(urlToParse);
            const params = {};
            u.searchParams.forEach((value, key) => {
                params[key] = value;
            });

            setParsed({
                protocol: u.protocol,
                host: u.host,
                hostname: u.hostname,
                port: u.port || '(default)',
                pathname: u.pathname,
                search: u.search,
                hash: u.hash,
                origin: u.origin,
                params: params
            });
            setError(null);
        } catch (e) {
            setParsed(null);
            setError('Invalid URL format');
        }
    }, [url]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[600px] flex flex-col gap-6">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                        <Link size={14} /> Enter URL
                    </label>
                    <button onClick={() => setUrl('')} className="text-xs text-text-tertiary hover:text-accent-primary">Clear</button>
                </div>
                <input
                    type="text"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 font-mono text-sm outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all text-text-primary placeholder:text-text-tertiary"
                    placeholder="https://example.com/path?query=123"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
            </div>

            {parsed && (
                <div className="grid lg:grid-cols-2 gap-6 flex-1 overflow-auto">
                    {/* Basic Components */}
                    <div className="bg-surface rounded-xl border border-border p-4 h-fit">
                        <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                            <Component size={16} className="text-accent-primary" /> URL Parts
                        </h4>
                        <div className="space-y-3 font-mono text-sm">
                            {[
                                ['Protocol', parsed.protocol],
                                ['Host', parsed.host],
                                ['Path', parsed.pathname],
                                ['Port', parsed.port],
                                ['Origin', parsed.origin],
                                ['Hash', parsed.hash],
                            ].map(([label, value]) => (
                                value && (
                                    <div key={label} className="grid grid-cols-[80px_1fr] gap-2 p-2 rounded-lg hover:bg-surface-highlight transition-colors items-center group">
                                        <span className="text-text-tertiary text-xs uppercase font-bold">{label}</span>
                                        <span className="text-text-primary truncate" title={value}>{value}</span>
                                        <button
                                            onClick={() => copyToClipboard(value)}
                                            className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-accent-primary transition-opacity"
                                        >
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Query Params */}
                    <div className="bg-surface rounded-xl border border-border p-4 h-fit">
                        <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                            <span className="text-accent-secondary text-lg">?</span> Query Parameters
                        </h4>
                        {Object.keys(parsed.params).length > 0 ? (
                            <div className="space-y-2 font-mono text-sm">
                                {Object.entries(parsed.params).map(([key, value]) => (
                                    <div key={key} className="flex flex-col p-3 rounded-lg bg-surface-highlight/50 border border-border/50">
                                        <span className="text-accent-primary font-bold mb-1">{key}</span>
                                        <span className="text-text-secondary break-all">{value}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-text-tertiary text-sm italic">No query parameters found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
