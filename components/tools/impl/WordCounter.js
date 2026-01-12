"use client";
import React, { useState, useMemo } from 'react';
import { Copy, Check, AlignLeft, Clock } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const stats = useMemo(() => {
        if (!text) return { characters: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: 0 };

        const characters = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
        const readingTime = Math.ceil(words / 200); // approx 200 wpm

        return { characters, words, sentences, paragraphs, readingTime };
    }, [text]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Words', value: stats.words },
                    { label: 'Characters', value: stats.characters },
                    { label: 'Sentences', value: stats.sentences },
                    { label: 'Paragraphs', value: stats.paragraphs },
                ].map((stat) => (
                    <div key={stat.label} className="bg-surface border border-border p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-accent-primary mb-1">{stat.value}</div>
                        <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="bg-surface border border-border rounded-2xl p-1 relative flex flex-col min-h-[400px]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste text to analyze..."
                    className="flex-1 w-full bg-transparent p-6 text-base md:text-lg outline-none resize-none text-text-primary placeholder:text-text-tertiary leading-relaxed"
                />

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-surface-highlight rounded-lg text-xs font-medium text-text-secondary mr-2">
                        <Clock size={14} />
                        <span>~{stats.readingTime} min read</span>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-all shadow-lg shadow-accent-primary/20"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="font-bold text-sm">{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
