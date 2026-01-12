"use client";

import React from 'react';
import { Check, XCircle, AlertCircle } from 'lucide-react';

export default function StatusBar({ language, isRunning, cursorPosition = { line: 1, column: 1 } }) {
    return (
        <div className="h-6 bg-[#008000] text-white flex items-center justify-between px-3 text-[10px] select-none font-mono tracking-wide z-20 border-t border-white/10 shadow-lg">
            {/* Left: GIT / Status */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">
                    <span className="font-bold">master*</span>
                </div>
                <div className="flex items-center gap-1.5 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">
                    {isRunning ? (
                        <>
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
                            <span className="text-yellow-300">Running...</span>
                        </>
                    ) : (
                        <>
                            <Check size={10} className="text-green-300" />
                            <span className="text-green-300 font-bold">Ready</span>
                        </>
                    )}
                </div>
            </div>

            {/* Right: Metadata */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:block hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">
                    Ln {cursorPosition.line}, Col {cursorPosition.column}
                </div>
                <div className="hidden md:block hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">
                    UTF-8
                </div>
                <div className="hover:bg-white/10 px-1 rounded cursor-pointer transition-colors font-bold text-white">
                    {language === 'node' ? 'JAVASCRIPT' : language.toUpperCase()}
                </div>
                <div className="hidden md:block hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">
                    Prettier
                </div>
            </div>
        </div>
    );
}
