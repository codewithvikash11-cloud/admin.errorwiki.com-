"use client";

import React from 'react';
import { Search, Terminal, Zap, Check } from 'lucide-react';

const GlassEcosystem = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-[2000px]">

            {/* MAIN INTERFACE - Holographic Terminal */}
            <div className="relative z-20 w-[90%] md:w-[500px] bg-panel/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden animate-float-slow transform-gpu">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 opacity-60 flex items-center">
                        <Terminal size={10} className="mr-1" /> ~/devfixer/core
                    </div>
                </div>

                {/* Code Area */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed text-gray-300">
                    <div className="flex mb-2 opacity-50 border-b border-white/5 pb-2">
                        <span className="text-accent-primary mr-2">➜</span> <span className="text-gray-500">Scanning for issues...</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex group">
                            <span className="text-gray-600 select-none w-6">1</span>
                            <span className="text-purple-400">async function</span> <span className="text-blue-400 ml-1">resolveError</span><span className="text-gray-400">(</span><span className="text-orange-400">log</span><span className="text-gray-400">)</span> <span className="text-gray-400">{`{`}</span>
                        </div>

                        <div className="flex group bg-red-500/10 -mx-6 px-6 py-1 border-l-2 border-red-500">
                            <span className="text-gray-600 select-none w-6">2</span>
                            <span className="text-red-400">// Critical: Memory Leak Detected</span>
                        </div>

                        <div className="flex group">
                            <span className="text-gray-600 select-none w-6">3</span>
                            <span className="text-purple-400">const</span> <span className="text-white ml-2">fix</span> <span className="text-purple-400">=</span> <span className="text-green-400">await</span> <span className="text-blue-400">DevFixer</span>.<span className="text-yellow-300">patch</span><span className="text-gray-400">(</span><span className="text-orange-400">log</span><span className="text-gray-400">);</span>
                        </div>

                        <div className="flex group relative">
                            <div className="absolute inset-0 bg-green-500/10 animate-pulse rounded" />
                            <span className="text-gray-600 select-none w-6 z-10">4</span>
                            <span className="text-purple-400 z-10">return</span> <span className="text-white ml-2 z-10">fix.deployed</span><span className="text-gray-400 z-10">;</span>
                            <span className="ml-auto flex items-center text-[10px] text-green-400 z-10 font-bold"><Check size={10} className="mr-1" /> FIXED</span>
                        </div>

                        <div className="flex group">
                            <span className="text-gray-600 select-none w-6">5</span>
                            <span className="text-gray-400">{`}`}</span>
                        </div>
                    </div>
                </div>

                {/* Glow Overlay */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-primary/10 blur-[50px] pointer-events-none" />
            </div>

            {/* FLOATING CARDS - Layered Depth */}
            <div className="absolute right-0 md:-right-8 top-12 z-30 p-4 rounded-xl glass-strong border border-white/10 shadow-2xl animate-float-slow" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent-primary/20 rounded-lg text-accent-primary">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm">Instant Fix</div>
                        <div className="text-[10px] text-gray-400">Deployed within 50ms</div>
                    </div>
                </div>
            </div>

            {/* Background Glow for Depth */}
            <div className="absolute z-0 w-[400px] h-[400px] bg-gradient-to-r from-accent-primary/20 to-accent-hover/20 blur-[80px] rounded-full animate-pulse-glow" />

        </div>
    );
};

export default GlassEcosystem;
