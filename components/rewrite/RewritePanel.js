"use client";

import React, { useState } from 'react';
import {
    RefreshCw,
    Copy,
    Download,
    ArrowRight,
    Sparkles,
    Check,
    AlignLeft,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { documentService } from '@/lib/documents-local';

const TONES = [
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'simple', label: 'Simple', icon: '👶' },
    { id: 'human', label: 'Humanized', icon: '🗣️' },
    { id: 'seo', label: 'SEO Optimized', icon: '🚀' },
];

const RewritePanel = () => {
    const [originalText, setOriginalText] = useState("");
    const [rewrittenText, setRewrittenText] = useState("");
    const [selectedTone, setSelectedTone] = useState("professional");
    const [isRewriting, setIsRewriting] = useState(false);
    const resultRef = React.useRef(null);

    const handleRewrite = () => {
        if (!originalText) return;
        setIsRewriting(true);

        // Mock Rewrite Logic
        setTimeout(() => {
            let result = "";
            const prefixes = {
                professional: "To address the matter effectively, ",
                simple: "Basically, ",
                human: "Hey there! So, ",
                seo: "In this comprehensive guide, we explore how "
            };

            const transformations = {
                professional: originalText.replace(/bad/g, "suboptimal").replace(/good/g, "exemplary"),
                simple: originalText.replace(/complex/g, "hard").replace(/utilize/g, "use"),
                human: originalText.replace(/I am/g, "I'm").replace(/cannot/g, "can't"),
                seo: originalText + " #optimization #growth"
            };

            result = (prefixes[selectedTone] || "") + (transformations[selectedTone] || originalText);

            setRewrittenText(result);
            setIsRewriting(false);

            // Auto-log to history on success
            documentService.addToHistory({
                action: `Rewrote as ${selectedTone}`,
                preview: originalText.substring(0, 30) + '... -> ' + result.substring(0, 30) + '...',
                tool: 'rewrite'
            });

        }, 1500);
    };

    // Auto-scroll effect
    React.useEffect(() => {
        if (!isRewriting && rewrittenText && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [isRewriting, rewrittenText]);

    const handleSave = () => {
        if (!rewrittenText) return;
        documentService.saveDocument({
            type: 'rewrite',
            content: rewrittenText,
            title: `Rewrite (${selectedTone}) - ${new Date().toLocaleString()}`
        });
        alert('Rewritten Text Saved!');
    };

    return (
        <div className="flex flex-col min-h-[800px] lg:min-h-0 lg:h-[calc(100vh-200px)] lg:max-h-[800px] gap-6">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface border border-border/50 rounded-2xl">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-text-secondary uppercase mr-2">Tone:</span>
                    {TONES.map(tone => (
                        <button
                            key={tone.id}
                            onClick={() => setSelectedTone(tone.id)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap",
                                selectedTone === tone.id
                                    ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                                    : "bg-background hover:bg-surface-highlight text-text-secondary hover:text-text-primary border border-border/50"
                            )}
                        >
                            <span>{tone.icon}</span>
                            {tone.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleRewrite}
                    disabled={!originalText || isRewriting}
                    className={cn(
                        "px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all min-w-[140px] justify-center",
                        !originalText || isRewriting
                            ? "bg-surface-highlight text-text-secondary cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    )}
                >
                    {isRewriting ? (
                        <>
                            <RefreshCw className="animate-spin" size={18} />
                            Rewriting...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Rewrite
                        </>
                    )}
                </button>
            </div>

            {/* Dual Panes */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full">
                {/* Original */}
                <div className="flex-1 bg-surface border border-border/50 rounded-2xl flex flex-col overflow-hidden group focus-within:border-accent-primary/50 transition-colors min-h-[300px]">
                    <div className="h-10 bg-panel/30 border-b border-border/50 flex items-center justify-between px-4">
                        <span className="text-xs font-bold text-text-secondary uppercase flex items-center gap-2">
                            <AlignLeft size={14} /> Original
                        </span>
                        <span className="text-xs text-text-secondary">{originalText.length} chars</span>
                    </div>
                    <textarea
                        value={originalText}
                        onChange={(e) => setOriginalText(e.target.value)}
                        placeholder="Paste text to rewrite..."
                        className="flex-1 bg-transparent resize-none p-6 focus:outline-none text-text-primary leading-relaxed h-full overflow-y-auto"
                    />
                </div>

                {/* Arrow (Desktop) */}
                <div className="hidden lg:flex items-center justify-center text-text-secondary">
                    <ArrowRight size={24} />
                </div>

                {/* Rewritten */}
                <div ref={resultRef} className="flex-1 bg-surface border border-border/50 rounded-2xl flex flex-col overflow-hidden group relative min-h-[300px]">
                    {/* Gradient Overlay when empty */}
                    {!rewrittenText && !isRewriting && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center opacity-20">
                                <Sparkles size={48} className="mx-auto mb-4" />
                                <p className="font-bold">AI Output will appear here</p>
                            </div>
                        </div>
                    )}

                    <div className="h-10 bg-panel/30 border-b border-border/50 flex items-center justify-between px-4 bg-accent-primary/5">
                        <span className="text-xs font-bold text-accent-primary uppercase flex items-center gap-2">
                            <Sparkles size={14} /> Rewritten
                        </span>
                        <div className="flex items-center gap-2">
                            {rewrittenText && (
                                <>
                                    <button onClick={handleSave} className="p-1 hover:bg-accent-primary/10 rounded text-accent-primary transition-colors" title="Save">
                                        <Save size={14} />
                                    </button>
                                    <button className="p-1 hover:bg-accent-primary/10 rounded text-accent-primary transition-colors" title="Copy">
                                        <Copy size={14} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={cn(
                        "flex-1 p-6 overflow-y-auto transition-opacity duration-500",
                        isRewriting ? "opacity-50 blur-sm" : "opacity-100"
                    )}>
                        {rewrittenText ? (
                            <p className="text-text-primary leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                                {rewrittenText}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewritePanel;
