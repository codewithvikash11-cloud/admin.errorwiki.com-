"use client";

import React, { useState, useEffect } from 'react';
import {
    Clock,
    FileText,
    Trash2,
    CheckCircle2,
    RefreshCcw,
    Search
} from 'lucide-react';
import { documentService } from '@/lib/documents-local';
import { cn } from '@/lib/utils'; // Assuming utils exists, if not I'll remove it or use inline

const HistoryTimeline = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(documentService.getHistory());
    }, []);

    const handleClearHistory = () => {
        if (confirm('Are you sure you want to clear your entire history?')) {
            documentService.clearHistory();
            setHistory([]);
        }
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-secondary">
                    <Clock size={16} />
                    <span className="text-sm font-medium">Recent Activity</span>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={handleClearHistory}
                        className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                        <Trash2 size={12} /> Clear History
                    </button>
                )}
            </div>

            <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden">
                {history.length > 0 ? (
                    <div className="divide-y divide-border/50">
                        {history.map((item, index) => (
                            <div key={index} className="p-6 hover:bg-surface-highlight transition-colors group flex items-start gap-4">
                                <div className={cn(
                                    "mt-1 w-2 h-2 rounded-full ring-4 ring-opacity-20",
                                    item.tool === 'grammar' ? "bg-blue-500 ring-blue-500" :
                                        item.tool === 'rewrite' ? "bg-purple-500 ring-purple-500" :
                                            "bg-orange-500 ring-orange-500"
                                )} />

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-text-primary text-sm">{item.action}</h4>
                                        <span className="text-xs text-text-secondary font-mono">
                                            {formatTime(item.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-text-secondary text-sm line-clamp-2 opacity-80">
                                        "{item.preview}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 flex flex-col items-center justify-center text-center opacity-50">
                        <Clock size={48} className="mb-4 text-text-secondary" />
                        <h3 className="text-lg font-bold text-text-primary">No History Yet</h3>
                        <p className="text-text-secondary">Your writing activity will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryTimeline;
