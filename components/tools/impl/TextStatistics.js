"use client";

import React, { useState, useMemo } from 'react';
import { Type, AlignLeft, Clock, FileText, File, Hash } from 'lucide-react';

export default function TextStatistics() {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        const charCount = text.length;
        const charCountNoSpace = text.replace(/\s/g, '').length;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const lineCount = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;
        const sentenceCount = text === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphCount = text === '' ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;

        // Reading time (avg 200 wpm)
        const readingTimeSeconds = Math.ceil(wordCount / (200 / 60));
        const readingTimeValues = {
            minutes: Math.floor(readingTimeSeconds / 60),
            seconds: readingTimeSeconds % 60
        };

        // Speaking time (avg 130 wpm)
        const speakingTimeSeconds = Math.ceil(wordCount / (130 / 60));
        const speakingTimeValues = {
            minutes: Math.floor(speakingTimeSeconds / 60),
            seconds: speakingTimeSeconds % 60
        };

        return {
            charCount,
            charCountNoSpace,
            wordCount,
            lineCount,
            sentenceCount,
            paragraphCount,
            readingTime: `${readingTimeValues.minutes}m ${readingTimeValues.seconds}s`,
            speakingTime: `${speakingTimeValues.minutes}m ${speakingTimeValues.seconds}s`,
        };
    }, [text]);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Type} label="Characters" value={stats.charCount} subValue={`${stats.charCountNoSpace} without spaces`} />
                <StatCard icon={AlignLeft} label="Words" value={stats.wordCount} />
                <StatCard icon={FileText} label="Sentences" value={stats.sentenceCount} />
                <StatCard icon={Hash} label="Lines" value={stats.lineCount} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="bg-surface rounded-xl border border-border p-1">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type or paste your text here to analyze..."
                            className="w-full h-96 p-4 bg-transparent resize-none focus:outline-none text-text-primary placeholder:text-text-tertiary"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
                        <h3 className="font-bold text-text-primary flex items-center gap-2">
                            <Clock size={16} className="text-accent-primary" />
                            Estimated Time
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-text-secondary uppercase font-semibold mb-1">Reading Time</div>
                                <div className="text-xl font-bold text-text-primary">{stats.readingTime}</div>
                                <div className="text-xs text-text-tertiary">Based on 200 words/min</div>
                            </div>
                            <div className="h-px bg-border"></div>
                            <div>
                                <div className="text-xs text-text-secondary uppercase font-semibold mb-1">Speaking Time</div>
                                <div className="text-xl font-bold text-text-primary">{stats.speakingTime}</div>
                                <div className="text-xs text-text-tertiary">Based on 130 words/min</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
                        <h3 className="font-bold text-text-primary flex items-center gap-2">
                            <File size={16} className="text-accent-primary" />
                            Details
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-secondary">Paragraphs</span>
                                <span className="text-text-primary font-mono font-semibold">{stats.paragraphCount}</span>
                            </div>
                            {/* Can add more detailed stats here like keyword density in future */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, subValue }) {
    return (
        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-2 hover:border-accent-primary/30 transition-colors">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-semibold">
                <Icon size={16} />
                {label}
            </div>
            <div className="text-3xl font-bold text-text-primary tracking-tight">
                {value.toLocaleString()}
            </div>
            {subValue && (
                <div className="text-xs text-text-tertiary">
                    {subValue}
                </div>
            )}
        </div>
    );
}
