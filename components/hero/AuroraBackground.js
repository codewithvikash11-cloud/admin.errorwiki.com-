"use client";

import React from 'react';

const AuroraBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-background">

            {/* 1. Base Grid Layer */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] mix-blend-overlay" />

            {/* 2. Cosmic Nebulas - Deeper, slower moving */}
            {/* 2. Cosmic Nebulas - Deeper, slower moving - Using Blue/Cyan for Vercel/Linear Vibe */}
            <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-green-600/20 dark:bg-green-500/10 rounded-full blur-[120px] animate-float-slow mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />

            {/* 3. Central Spotlight - Focuses attention on content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-[0.03] dark:opacity-[0.05] rounded-full blur-[100px]" />

            {/* 4. Vignette for cinematic depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90" />
        </div>
    );
};

export default AuroraBackground;
