"use client";

import React, { useState } from 'react';
import { Play, Plus, Trash2, Code2, List } from 'lucide-react';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export default function RequestPanel({ request, setRequest, onSend, isLoading }) {
    const [activeTab, setActiveTab] = useState('params'); // 'params' | 'headers' | 'body'

    const updateHeader = (index, field, value) => {
        const newHeaders = [...request.headers];
        newHeaders[index][field] = value;
        setRequest({ ...request, headers: newHeaders });
    };

    const addHeader = () => {
        setRequest({ ...request, headers: [...request.headers, { key: '', value: '' }] });
    };

    const removeHeader = (index) => {
        const newHeaders = request.headers.filter((_, i) => i !== index);
        setRequest({ ...request, headers: newHeaders });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Top Bar: URL & Send */}
            <div className="p-4 border-b border-border bg-panel flex gap-2">
                <select
                    value={request.method}
                    onChange={(e) => setRequest({ ...request, method: e.target.value })}
                    className="h-10 px-3 bg-surface border border-border rounded-lg text-sm font-bold outline-none focus:border-accent-primary"
                >
                    {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input
                    type="text"
                    value={request.url}
                    onChange={(e) => setRequest({ ...request, url: e.target.value })}
                    placeholder="Enter URL (https://...)"
                    className="flex-1 h-10 px-4 bg-surface border border-border rounded-lg text-sm outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                />
                <button
                    onClick={onSend}
                    disabled={isLoading}
                    className="h-10 px-6 bg-accent-primary hover:bg-accent-primary/90 text-white font-bold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    {isLoading ? <span className="animate-spin text-lg">⟳</span> : <Play size={16} fill="currentColor" />}
                    Send
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border bg-panel px-2">
                {['headers', 'body'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-accent-primary text-text-primary' : 'border-transparent text-text-tertiary hover:text-text-secondary'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {tab === 'headers' && <span className="ml-2 text-xs bg-surface px-1.5 py-0.5 rounded-full border border-border">{request.headers.length}</span>}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-surface-highlight/30">
                {activeTab === 'headers' && (
                    <div className="space-y-2">
                        {request.headers.map((h, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    placeholder="Key"
                                    value={h.key}
                                    onChange={(e) => updateHeader(i, 'key', e.target.value)}
                                    className="flex-1 h-9 px-3 bg-surface border border-border rounded-md text-sm outline-none focus:border-accent-primary"
                                />
                                <input
                                    placeholder="Value"
                                    value={h.value}
                                    onChange={(e) => updateHeader(i, 'value', e.target.value)}
                                    className="flex-1 h-9 px-3 bg-surface border border-border rounded-md text-sm outline-none focus:border-accent-primary"
                                />
                                <button onClick={() => removeHeader(i)} className="p-2 text-text-tertiary hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button onClick={addHeader} className="flex items-center gap-1 text-xs font-bold text-accent-primary hover:underline mt-2">
                            <Plus size={14} /> Add Header
                        </button>
                    </div>
                )}

                {activeTab === 'body' && (
                    <div className="h-full flex flex-col">
                        <div className="text-xs text-text-tertiary mb-2 flex justify-between">
                            <span>JSON Body</span>
                            {['GET', 'HEAD'].includes(request.method) && <span className="text-orange-500">Method {request.method} usually does not send body.</span>}
                        </div>
                        <textarea
                            value={request.body}
                            onChange={(e) => setRequest({ ...request, body: e.target.value })}
                            className="flex-1 w-full bg-surface border border-border rounded-lg p-3 font-mono text-sm outline-none focus:border-accent-primary resize-none"
                            placeholder="{}"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
