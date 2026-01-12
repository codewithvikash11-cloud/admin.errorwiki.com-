"use client";

import React, { useState } from 'react';
import {
    Search,
    ShieldCheck,
    AlertTriangle,
    ExternalLink,
    PieChart,
    CheckCircle2,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { documentService } from '@/lib/documents-local';

const PlagiarismChecker = () => {
    const [text, setText] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleCheck = () => {
        if (!text || text.length < 10) return;
        setIsChecking(true);
        setResult(null);
        setProgress(0);

        // Simulate Scanning Progress
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 10;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 200);

        // Mock Result after scan
        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);

            // Random mock logic
            const isUnique = Math.random() > 0.3;
            const score = isUnique ? Math.floor(Math.random() * 5) + 95 : Math.floor(Math.random() * 40) + 40;

            setResult({
                score: score,
                matches: isUnique ? [] : [
                    { id: 1, source: "wikipedia.org", percentage: 12, text: "The quick brown fox jumps over..." },
                    { id: 2, source: "techcrunch.com", percentage: 8, text: "...lazy dog in the park." },
                    { id: 3, source: "medium.com", percentage: 5, text: "A complete functionality test." }
                ],
                wordCount: text.split(/\s+/).length
            });


            setIsChecking(false);

            // Log to history
            documentService.addToHistory({
                action: 'Plagiarism Scan',
                preview: `Score: ${score}% - ${text.substring(0, 30)}...`,
                tool: 'plagiarism'
            });

        }, 3000);
    };

    const handleSaveReport = () => {
        if (!result) return;
        documentService.saveDocument({
            type: 'plagiarism',
            content: `Originality Score: ${result.score}%\n\nText:\n${text}`,
            title: `Plagiarism Report - ${new Date().toLocaleString()}`
        });
        alert('Report Saved!');
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* Input Section */}
            <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm">
                <div className="relative mb-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here to check for plagiarism..."
                        className="w-full h-64 bg-background/50 border border-border/30 rounded-xl p-6 resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all font-sans leading-relaxed"
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-text-secondary bg-surface px-2 py-1 rounded-full border border-border/50">
                        {text.length} chars
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-xs text-text-secondary flex items-center gap-2">
                        <ShieldCheck size={14} className="text-accent-success" />
                        Secure & Private Check
                    </p>
                    <button
                        onClick={handleCheck}
                        disabled={!text || text.length < 10 || isChecking}
                        className={cn(
                            "px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg",
                            !text || text.length < 10 || isChecking
                                ? "bg-surface-highlight text-text-secondary cursor-not-allowed shadow-none"
                                : "bg-accent-primary text-white hover:bg-accent-primary/90 shadow-accent-primary/25"
                        )}
                    >
                        {isChecking ? "Scanning Web..." : "Check for Plagiarism"}
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            {isChecking && (
                <div className="w-full bg-surface-highlight rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-accent-primary h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Results Section */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                    <div className="flex justify-end">
                        <button onClick={handleSaveReport} className="flex items-center gap-2 text-sm font-bold text-accent-primary hover:underline">
                            <Save size={16} /> Save Report
                        </button>
                    </div>

                    {/* Score Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={cn(
                            "bg-surface border rounded-2xl p-6 flex flex-col items-center justify-center text-center",
                            result.score > 90 ? "border-accent-success/30 bg-accent-success/5" : "border-accent-danger/30 bg-accent-danger/5"
                        )}>
                            <div className="relative mb-2">
                                <PieChart size={48} className={result.score > 90 ? "text-accent-success" : "text-accent-danger"} />
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-black">{result.score}%</span>
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider text-text-secondary">Originality Score</span>
                        </div>

                        <div className="bg-surface border border-border/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                            <span className="text-4xl font-black text-text-primary mb-2">{result.matches.length}</span>
                            <span className="text-sm font-bold uppercase tracking-wider text-text-secondary">Sources Found</span>
                        </div>

                        <div className="bg-surface border border-border/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                            <span className="text-4xl font-black text-text-primary mb-2">{result.wordCount}</span>
                            <span className="text-sm font-bold uppercase tracking-wider text-text-secondary">Words Scanned</span>
                        </div>
                    </div>

                    {/* Matches List */}
                    {result.matches.length > 0 ? (
                        <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden">
                            <div className="h-12 border-b border-border/50 bg-panel/30 flex items-center px-6">
                                <h3 className="font-bold text-text-primary flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-accent-warning" />
                                    Potential Matches Found
                                </h3>
                            </div>
                            <div className="divide-y divide-border/50">
                                {result.matches.map(match => (
                                    <div key={match.id} className="p-6 hover:bg-surface-highlight transition-colors flex items-start gap-4">
                                        <div className="bg-red-500/10 text-red-500 font-bold px-3 py-1 rounded text-sm min-w-[60px] text-center">
                                            {match.percentage}%
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-text-primary mb-2 font-medium">"...{match.text}..."</p>
                                            <a href="#" className="text-accent-primary text-sm hover:underline flex items-center gap-1">
                                                <ExternalLink size={12} />
                                                Match found on {match.source}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-surface border border-accent-success/30 bg-accent-success/5 rounded-2xl p-8 flex items-center justify-center text-center">
                            <div>
                                <CheckCircle2 size={48} className="text-accent-success mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-text-primary mb-2">No Plagiarism Detected</h3>
                                <p className="text-text-secondary">Your text appears to be 100% unique.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlagiarismChecker;
