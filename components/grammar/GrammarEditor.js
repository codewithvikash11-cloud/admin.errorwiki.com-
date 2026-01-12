"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    AlertCircle,
    CheckCircle2,
    Copy,
    Download,
    Zap,
    Wand2,
    RotateCcw,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { documentService } from '@/lib/documents-local';

// Mock AI Service
const analyzeText = (text) => {
    // Simple mock logic to generate "issues"
    const issues = [];
    if (!text) return [];

    const words = text.split(" ");

    // 1. Check for passive voice (dummy check: 'was/is/are' + 'ed')
    // 2. Check for complexity (long words)
    // 3. Check for specific "bad" words

    if (text.toLowerCase().includes("very")) {
        const index = text.toLowerCase().indexOf("very");
        issues.push({
            id: Date.now() + 1,
            type: "style",
            original: "very",
            replacement: "extremely",
            message: "Weak adjective. Consider 'extremely' or a stronger word.",
            position: index,
            length: 4
        });
    }

    if (text.toLowerCase().includes("utilize")) {
        const index = text.toLowerCase().indexOf("utilize");
        issues.push({
            id: Date.now() + 2,
            type: "clarity",
            original: "utilize",
            replacement: "use",
            message: "Simpler word choice: 'use'.",
            position: index,
            length: 7
        });
    }

    if (text.length > 20 && !text.includes(".")) {
        issues.push({
            id: Date.now() + 3,
            type: "readability",
            original: text.substring(0, 10) + "...",
            replacement: null,
            message: "This sentence is quite long. Consider splitting it.",
            position: 0,
            length: text.length
        });
    }

    return issues;
};

const GrammarEditor = () => {
    const [text, setText] = useState("");
    const [issues, setIssues] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [stats, setStats] = useState({ words: 0, chars: 0, score: 100 });

    const editorRef = useRef(null);

    // Live Analysis Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim().length > 3) {
                setIsAnalyzing(true);
                // Simulate network/processing delay
                setTimeout(() => {
                    const foundIssues = analyzeText(text);
                    setIssues(foundIssues);

                    // Update Score
                    let newScore = 100 - (foundIssues.length * 5);
                    if (newScore < 0) newScore = 0;

                    setStats({
                        words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
                        chars: text.length,
                        score: newScore
                    });

                    setIsAnalyzing(false);
                }, 600);
            } else {
                setIssues([]);
                setStats({ words: 0, chars: 0, score: 100 });
            }
        }, 800); // Debounce

        return () => clearTimeout(timer);
    }, [text]);

    const handleApplyFix = (issue) => {
        if (!issue.replacement) return;
        // Simple replace logic (this is a basic implementation, real one needs complex index tracking)
        const newText = text.replace(issue.original, issue.replacement);
        setText(newText);
        // Optimistically remove issue
        setIssues(prev => prev.filter(i => i.id !== issue.id));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        // Show toast (not implemented yet)
    };

    const handleSave = () => {
        if (!text) return;
        documentService.saveDocument({
            type: 'grammar',
            content: text,
            title: `Grammar Check - ${new Date().toLocaleString()}`
        });
        documentService.addToHistory({
            action: 'Grammar Check',
            preview: text.substring(0, 50) + '...',
            tool: 'grammar'
        });
        alert('Document Saved!');
    };

    return (
        <div className="flex flex-col lg:flex-row h-[80vh] gap-6">
            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col bg-surface border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="h-14 border-b border-border/50 px-4 flex items-center justify-between bg-panel/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
                        <Wand2 size={16} className="text-accent-primary" />
                        <span>AI Assistant Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleSave} className="p-2 hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-text-primary transition-colors" title="Save Document">
                            <Save size={18} />
                        </button>
                        <button onClick={handleCopy} className="p-2 hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-text-primary transition-colors" title="Copy Text">
                            <Copy size={18} />
                        </button>
                        <button className="p-2 hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-text-primary transition-colors" title="Download">
                            <Download size={18} />
                        </button>
                        <button onClick={() => setText("")} className="p-2 hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-text-primary transition-colors" title="Clear">
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>

                {/* Text Area */}
                <div className="flex-1 relative">
                    <textarea
                        ref={editorRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing or paste your text here..."
                        className="w-full h-full p-8 bg-transparent text-text-primary text-lg resize-none focus:outline-none font-sans leading-relaxed selection:bg-accent-primary/20"
                        spellCheck="false"
                    />
                    {/* Placeholder for overlay highlights (complex to implement in pure textarea, simplifying for now) */}
                </div>

                {/* Footer Stats */}
                <div className="h-10 border-t border-border/50 px-4 flex items-center justify-between bg-panel/30 text-xs font-mono text-text-secondary">
                    <div className="flex gap-4">
                        <span>WORDS: {stats.words}</span>
                        <span>CHARS: {stats.chars}</span>
                    </div>
                    <div>
                        {isAnalyzing ? (
                            <span className="flex items-center gap-2 text-accent-primary animate-pulse">
                                <Zap size={12} fill="currentColor" /> ANALYZING...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-accent-success">
                                <CheckCircle2 size={12} /> SYNCED
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Suggestions Panel */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
                {/* Score Card */}
                <div className="bg-surface border border-border/50 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                    {/* Circular Progress (CSS only for simplicity) */}
                    <div className="mb-2 relative">
                        <div className="w-24 h-24 rounded-full border-8 border-surface-highlight flex items-center justify-center">
                            <span className={cn(
                                "text-3xl font-black tracking-tighter",
                                stats.score > 80 ? "text-accent-success" : stats.score > 50 ? "text-accent-warning" : "text-accent-danger"
                            )}>{stats.score}</span>
                        </div>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider text-text-secondary">Overall Score</span>

                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={100} />
                    </div>
                </div>

                {/* Issues List */}
                <div className="flex-1 bg-surface border border-border/50 rounded-2xl p-4 overflow-y-auto max-h-[500px]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center justify-between">
                        <span>Suggestions</span>
                        <span className="bg-surface-highlight text-text-primary px-2 py-0.5 rounded-full text-xs">{issues.length}</span>
                    </h3>

                    {issues.length === 0 ? (
                        <div className="text-center py-10 opacity-50">
                            <CheckCircle2 size={40} className="mx-auto mb-3 text-accent-success" />
                            <p className="text-sm">Great work! No issues found.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {issues.map((issue) => (
                                <div key={issue.id} className="bg-background border border-border/50 p-4 rounded-xl hover:border-accent-primary/50 transition-colors group cursor-pointer">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm",
                                            issue.type === 'style' ? "bg-purple-500/10 text-purple-500" :
                                                issue.type === 'clarity' ? "bg-blue-500/10 text-blue-500" :
                                                    "bg-orange-500/10 text-orange-500"
                                        )}>{issue.type}</span>
                                    </div>
                                    <p className="text-sm text-text-primary mb-3 font-medium">
                                        {issue.message}
                                    </p>

                                    {issue.replacement && (
                                        <div className="flex items-center gap-2">
                                            <span className="line-through text-xs text-text-secondary decoration-red-500/50">{issue.original}</span>
                                            <span className="text-xs text-text-secondary">→</span>
                                            <button
                                                onClick={() => handleApplyFix(issue)}
                                                className="bg-accent-success/10 text-accent-success hover:bg-accent-success hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all flex-1 text-center"
                                            >
                                                Apply: {issue.replacement}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GrammarEditor;
