"use client";

import React, { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

const CodeBlock = ({ code, language = 'javascript', fileName = 'example.js' }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.trim().split('\n');

    return (
        <div className="group rounded-[1.5rem] overflow-hidden border border-border bg-panel/30 shadow-2xl my-6 transition-all hover:border-accent-blue/30 backdrop-blur-sm">
            <div className="flex items-center justify-between px-5 py-3 bg-background/50 border-b border-border/50">
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                    </div>
                    <div className="h-4 w-px bg-border/50 mx-1"></div>
                    <div className="flex items-center space-x-2">
                        <FileCode size={14} className="text-accent-blue" />
                        <span className="text-[10px] font-mono font-black text-text-secondary uppercase tracking-widest">{fileName}</span>
                    </div>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="p-1.5 hover:bg-white/5 rounded-lg transition-all active:scale-90 flex items-center space-x-2 group/btn"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <>
                            <span className="text-[10px] font-bold text-accent-green">COPIED</span>
                            <CheckCircle2 size={14} className="text-accent-green" />
                        </>
                    ) : (
                        <>
                            <span className="text-[10px] font-bold text-text-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity">COPY</span>
                            <Copy size={14} className="text-text-secondary group-hover/btn:text-text-primary" />
                        </>
                    )}
                </button>
            </div>
            <div className="flex font-mono text-[13px] md:text-sm overflow-x-auto selection:bg-accent-blue/20">
                <div className="py-6 px-4 text-right text-text-secondary/20 select-none bg-background/10 border-r border-border/30 min-w-[3.5rem] shrink-0">
                    {lines.map((_, i) => (
                        <div key={i} className="leading-relaxed h-6">{i + 1}</div>
                    ))}
                </div>
                <div className="py-6 px-6 text-text-primary/90 whitespace-pre leading-relaxed flex-1">
                    {/* Basic syntax highlighting simulation for common patterns */}
                    {code.split('\n').map((line, i) => (
                        <div key={i} className="h-6">
                            {line.split(' ').map((word, wi) => {
                                if (/^(const|let|var|function|return|if|else|export|default|import|from|async|await|try|catch)$/.test(word)) {
                                    return <span key={wi} className="text-accent-blue font-bold">{word} </span>;
                                }
                                if (/^(['"].*['"])$/.test(word)) {
                                    return <span key={wi} className="text-accent-green">{word} </span>;
                                }
                                if (/^(true|false|null|undefined)$/.test(word)) {
                                    return <span key={wi} className="text-accent-yellow">{word} </span>;
                                }
                                if (/^\d+$/.test(word)) {
                                    return <span key={wi} className="text-accent-purple">{word} </span>;
                                }
                                return <span key={wi}>{word} </span>;
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;
