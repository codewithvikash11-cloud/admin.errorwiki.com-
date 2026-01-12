"use client";

import React, { useEffect, useState } from 'react';

const TerminalInterface = () => {
    const [lines, setLines] = useState([
        { type: 'cmd', content: 'devfixer analyze --deep' },
        { type: 'info', content: 'Scanning codebase for critical errors...' },
    ]);

    useEffect(() => {
        const sequence = [
            { type: 'success', content: 'Found 3 potential vulnerabilities', delay: 800 },
            { type: 'error', content: 'Error: Dependency conflict in package.json', delay: 1600 },
            { type: 'cmd', content: 'devfixer resolve --auto', delay: 2800 },
            { type: 'success', content: '✔ Solution applied successfully', delay: 3800 },
            { type: 'info', content: 'Optimization complete. System stable.', delay: 4800 },
        ];

        let timeouts = [];

        sequence.forEach(({ type, content, delay }) => {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, { type, content }]);
            }, delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="w-full max-w-xl mx-auto backdrop-blur-md bg-black/80 rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm sm:text-base transform hover:scale-[1.02] transition-transform duration-500">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs text-white/30 font-medium">devfixer-cli — v2.4.0</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-2 h-[320px] overflow-hidden">
                {lines.map((line, i) => (
                    <div key={i} className={`flex ${line.type === 'cmd' ? 'items-center mt-4' : ''} animate-in fade-in slide-in-from-left-2 duration-300`}>
                        {line.type === 'cmd' && (
                            <span className="text-accent-primary mr-3">$</span>
                        )}
                        <span className={`
                            ${line.type === 'cmd' ? 'text-white font-bold' : ''}
                            ${line.type === 'info' ? 'text-accent-primary/70' : ''}
                            ${line.type === 'success' ? 'text-accent-primary' : ''}
                            ${line.type === 'error' ? 'text-red-400' : ''}
                        `}>
                            {line.content}
                        </span>
                    </div>
                ))}
                <div className="flex items-center mt-4 animate-pulse">
                    <span className="text-accent-primary mr-3">$</span>
                    <span className="w-2.5 h-5 bg-white/50 block" />
                </div>
            </div>
        </div>
    );
};

export default TerminalInterface;
