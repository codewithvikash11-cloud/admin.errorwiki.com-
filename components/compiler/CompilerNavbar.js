"use client";

import React from 'react';
import { Play, Download, Share2, LayoutPanelLeft, Monitor, Code2, Globe } from 'lucide-react';
import { LANGUAGES } from '@/lib/piston';

export default function CompilerNavbar({
    activeFile,
    onLanguageChange,
    onRun,
    isRunning,
    layoutMode,
    onLayoutChange
}) {
    return (
        <div className="h-14 bg-[#0d0d10] border-b border-white/5 flex items-center justify-between px-4 shrink-0 z-20">
            {/* Left: Active File Info */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-text-secondary">
                    <Code2 size={16} className="text-accent-blue" />
                    <span className="text-sm font-bold text-white">{activeFile}</span>
                </div>

                {/* Language Selector (Only show if not a web file) */}
                {!['index.html', 'styles.css', 'script.js'].includes(activeFile) && (
                    <select
                        onChange={(e) => onLanguageChange(e.target.value)}
                        className="bg-white/5 border border-white/10 text-xs text-text-secondary rounded px-2 py-1 outline-none hover:border-white/20 focus:border-accent-blue"
                    >
                        {Object.keys(LANGUAGES).map(lang => (
                            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                        ))}
                    </select>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Layout Toggle (Desktop) */}
                <div className="hidden md:flex items-center bg-white/5 rounded-lg p-1 border border-white/5 mr-2">
                    <button
                        onClick={() => onLayoutChange('split')}
                        className={`p-1.5 rounded transition-all ${layoutMode === 'split' ? 'bg-white/10 text-white' : 'text-text-tertiary hover:text-white'}`}
                        title="Split View"
                    >
                        <LayoutPanelLeft size={16} />
                    </button>
                    <button
                        onClick={() => onLayoutChange('tab')}
                        className={`p-1.5 rounded transition-all ${layoutMode === 'tab' ? 'bg-white/10 text-white' : 'text-text-tertiary hover:text-white'}`}
                        title="Tab View"
                    >
                        <Monitor size={16} />
                    </button>
                </div>

                <div className="h-5 w-px bg-white/10 hidden md:block" />

                <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-white transition-colors">
                    <Share2 size={14} />
                    <span>Share</span>
                </button>

                <button
                    onClick={onRun}
                    disabled={isRunning}
                    className={`
                        flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-lg hover:shadow-accent-glow
                        ${isRunning ? 'bg-white/10 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 active:scale-95'}
                    `}
                >
                    <Play size={14} fill="currentColor" className={isRunning ? 'animate-spin' : ''} />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
            </div>
        </div>
    );
}
