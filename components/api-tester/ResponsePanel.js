"use client";

import React, { useState } from 'react';
import { Copy, Check, Clock, Database, AlertCircle } from 'lucide-react';

export default function ResponsePanel({ response, error, isLoading }) {
    const [viewMode, setViewMode] = useState('pretty'); // 'pretty' | 'raw'
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!response) return;
        navigator.clipboard.writeText(JSON.stringify(response.response.body || response.error, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-text-tertiary">
                <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-medium animate-pulse">Sending Request...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-red-500 p-8 text-center">
                <AlertCircle size={48} className="mb-4 opacity-50" />
                <h3 className="text-lg font-bold">Request Failed</h3>
                <p className="text-sm opacity-80 mt-2">{error}</p>
            </div>
        );
    }

    if (!response) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-text-tertiary opacity-50">
                <div className="p-4 bg-panel rounded-full mb-4">
                    <Database size={32} />
                </div>
                <p>Send a request to see the response here.</p>
            </div>
        );
    }

    const isSuccess = response.success;
    const bodyContent = response.response?.body;
    const isJson = typeof bodyContent === 'object';

    return (
        <div className="flex flex-col h-full">
            {/* Status Bar */}
            <div className="p-4 border-b border-border bg-panel flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold ${isSuccess ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        <span className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`} />
                        {response.status} {response.statusText}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-tertiary">
                        <Clock size={12} />
                        {response.time}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode(viewMode === 'pretty' ? 'raw' : 'pretty')}
                        className="px-2 py-1 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors uppercase"
                    >
                        {viewMode}
                    </button>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-surface rounded-md text-text-secondary transition-colors"
                        title="Copy Response"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 bg-[#0d1117] text-gray-300 font-mono text-sm leading-relaxed">
                {viewMode === 'pretty' && isJson ? (
                    <pre>{JSON.stringify(bodyContent, null, 2)}</pre>
                ) : (
                    <div className="whitespace-pre-wrap break-all">
                        {typeof bodyContent === 'string' ? bodyContent : JSON.stringify(bodyContent)}
                    </div>
                )}
            </div>
        </div>
    );
}
