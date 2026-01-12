"use client";

import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, Unlock, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

export default function OutlookSafelink() {
    const [input, setInput] = useState('');
    const [decoded, setDecoded] = useState(null);
    const [params, setParams] = useState({});
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!input.trim()) {
            setDecoded(null);
            setParams({});
            setError(null);
            return;
        }

        try {
            const urlObj = new URL(input);

            // basic validation for safelink
            if (!urlObj.hostname.includes('safelinks.protection.outlook.com')) {
                // If it's not a standard safelink, we might still try to look for a 'url' param or just warn
                // But let's assume strict usage or at least try to find query param 'url'
            }

            const targetUrl = urlObj.searchParams.get('url');

            if (targetUrl) {
                setDecoded(targetUrl);
                setError(null);

                // Extract other interesting params
                const extraParams = {};
                urlObj.searchParams.forEach((value, key) => {
                    if (key !== 'url') {
                        extraParams[key] = value;
                    }
                });
                setParams(extraParams);
            } else {
                // Check if maybe the whole input IS encoded? 
                // Sometimes users paste just the encoded part? No, usually the full link.
                setError("Could not find 'url' parameter in the link.");
                setDecoded(null);
            }

        } catch (e) {
            setError("Invalid URL format.");
            setDecoded(null);
        }
    }, [input]);

    const handleCopy = () => {
        if (decoded) {
            navigator.clipboard.writeText(decoded);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            <div className="relative">
                <LinkIcon className="absolute left-4 top-4 text-text-tertiary" size={20} />
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste Outlook Safe Link here (https://...safelinks.protection.outlook.com/?url=...)"
                    className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all font-mono text-sm min-h-[120px] resize-y placeholder:text-text-tertiary"
                />
            </div>

            {decoded && (
                <div className="bg-surface border border-border rounded-2xl p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-text-primary flex items-center gap-2">
                                <Unlock className="text-green-500" size={20} />
                                Decoded URL
                            </h3>
                            <div className="flex gap-2">
                                <a
                                    href={decoded}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-surface-highlight hover:bg-surface-active text-text-secondary rounded-lg transition-colors"
                                    title="Open Link"
                                >
                                    <ExternalLink size={18} />
                                </a>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-colors"
                                    title="Copy URL"
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-surface-highlight border border-border rounded-xl p-4 break-all font-mono text-text-primary text-lg font-medium">
                            {decoded}
                        </div>

                        {Object.keys(params).length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-xs text-text-tertiary uppercase font-bold tracking-wider mb-3">Metadata</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {Object.entries(params).map(([key, value]) => (
                                        <div key={key} className="flex flex-col bg-surface-highlight/50 p-2 rounded">
                                            <span className="text-[10px] text-text-tertiary uppercase">{key}</span>
                                            <span className="text-xs font-mono text-text-secondary truncate" title={value}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!decoded && error && input.length > 0 && (
                <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {!decoded && !error && (
                <div className="text-center text-sm text-text-tertiary">
                    Paste a Safe Link to extract the original target URL without visiting it.
                </div>
            )}
        </div>
    );
}
