"use client";

import React from 'react';
import { Terminal, Globe } from 'lucide-react';

export default function OutputPanel({ mode, srcDoc, consoleOutput, isRunning }) {
    if (mode === 'preview') {
        return (
            <div className="w-full h-full bg-white relative flex flex-col">
                <div className="h-8 bg-[#f3f4f6] border-b flex items-center px-4 gap-2 text-xs text-gray-500 select-none">
                    <Globe size={12} />
                    <span>localhost:3000 (Preview)</span>
                </div>
                <iframe
                    srcDoc={srcDoc}
                    title="Live Preview"
                    sandbox="allow-scripts"
                    className="flex-1 w-full border-none bg-white"
                />
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-[#0d0d10] text-[#d4d4d4] font-mono text-sm p-4 overflow-auto flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-text-secondary select-none border-b border-white/10 pb-2">
                <Terminal size={14} className="text-accent-blue" />
                <span className="text-xs font-bold uppercase tracking-widest">Console Output</span>
                {isRunning && <span className="text-xs text-accent-yellow animate-pulse ml-auto">Running...</span>}
            </div>

            <pre className="whitespace-pre-wrap leading-relaxed">
                {consoleOutput || <span className="text-text-tertiary italic">// Output will appear here...</span>}
            </pre>
        </div>
    );
}
