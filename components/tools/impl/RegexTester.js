"use client";
import React, { useState, useMemo } from 'react';

export default function RegexTester() {
    const [regex, setRegex] = useState('');
    const [flags, setFlags] = useState('gm');
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog.\nEmail: test@example.com\nPhone: 123-456-7890');

    const matches = useMemo(() => {
        if (!regex) return [];
        try {
            const re = new RegExp(regex, flags);
            const found = [];
            let match;
            // Prevent infinite loops with empty regex
            if (regex === '') return [];

            // If global flag is not present, exec only returns the first match once.
            if (!flags.includes('g')) {
                const m = re.exec(text);
                if (m) found.push({ index: m.index, match: m[0], groups: m.groups });
                return found;
            }

            while ((match = re.exec(text)) !== null) {
                found.push({ index: match.index, match: match[0], groups: match.groups });
                if (match.index === re.lastIndex) {
                    re.lastIndex++;
                }
            }
            return found;
        } catch (e) {
            return [];
        }
    }, [regex, flags, text]);

    // Simple highlighting (naive approach for MVP)
    const highlightedText = useMemo(() => {
        if (!regex || matches.length === 0) return text;
        // This is complex to do perfectly in React without a library like Prism, 
        // so we'll just show the matches list below for stability.
        return text;
    }, [text, matches]);

    return (
        <div className="flex flex-col gap-6 h-[600px]">
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-sm font-bold text-gray-400 mb-2">Regex Pattern</label>
                    <input
                        type="text"
                        className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm text-orange-400 outline-none focus:border-orange-500"
                        placeholder="[a-z]+"
                        value={regex}
                        onChange={(e) => setRegex(e.target.value)}
                    />
                </div>
                <div className="w-24 flex flex-col">
                    <label className="text-sm font-bold text-gray-400 mb-2">Flags</label>
                    <input
                        type="text"
                        className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm text-gray-300 outline-none focus:border-orange-500"
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-400 mb-2">Test String</label>
                    <textarea
                        className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-orange-500 resize-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-400 mb-2">Matches ({matches.length})</label>
                    <div className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 overflow-y-auto space-y-2">
                        {matches.length === 0 ? (
                            <p className="text-gray-500 italic text-sm">No matches found.</p>
                        ) : (
                            matches.map((m, i) => (
                                <div key={i} className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                    <span className="font-mono text-sm text-orange-300">{m.match}</span>
                                    <span className="float-right text-xs text-gray-500">Idx: {m.index}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
