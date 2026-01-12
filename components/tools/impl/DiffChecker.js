"use client";

import React, { useState } from 'react';
import { Scissors } from 'lucide-react';

export default function DiffChecker() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffs, setDiffs] = useState([]);

    const compare = () => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLines = Math.max(lines1.length, lines2.length);
        const result = [];

        for (let i = 0; i < maxLines; i++) {
            const l1 = lines1[i] || '';
            const l2 = lines2[i] || '';
            if (l1 === l2) {
                result.push({ type: 'same', content: l1 });
            } else {
                if (l1) result.push({ type: 'removed', content: l1 });
                if (l2) result.push({ type: 'added', content: l2 });
            }
        }
        setDiffs(result);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Scissors className="text-accent-primary" />
                Diff Checker
            </h3>

            <div className="grid grid-cols-2 gap-4 h-[300px]">
                <textarea
                    className="w-full h-full p-4 rounded-xl bg-surface border border-border focus:border-accent-primary outline-none font-mono text-xs resize-none"
                    placeholder="Original Text..."
                    value={text1}
                    onChange={(e) => setText1(e.target.value)}
                />
                <textarea
                    className="w-full h-full p-4 rounded-xl bg-surface border border-border focus:border-accent-primary outline-none font-mono text-xs resize-none"
                    placeholder="Changed Text..."
                    value={text2}
                    onChange={(e) => setText2(e.target.value)}
                />
            </div>

            <button
                onClick={compare}
                className="w-full py-2 bg-accent-primary text-white font-bold rounded-xl"
            >
                Compare
            </button>

            <div className="flex-1 bg-surface-highlight rounded-xl border border-border p-4 overflow-auto font-mono text-sm">
                {diffs.map((diff, i) => (
                    <div
                        key={i}
                        className={`
                            px-2 py-0.5 whitespace-pre-wrap
                            ${diff.type === 'added' ? 'bg-green-500/20 text-green-400' : ''}
                            ${diff.type === 'removed' ? 'bg-red-500/20 text-red-400' : ''}
                            ${diff.type === 'same' ? 'text-text-secondary opacity-50' : ''}
                        `}
                    >
                        <span className="inline-block w-6 select-none opacity-50 mr-2">{diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : ' '}</span>
                        {diff.content}
                    </div>
                ))}
                {diffs.length === 0 && <p className="text-text-tertiary text-center mt-10">Comparison results will appear here</p>}
            </div>
        </div>
    );
}
