"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const Logo = ({ className, iconOnly = false }) => {
    return (
        <div className={cn("flex items-center gap-3 group select-none cursor-pointer", className)}>
            {/* Visual Icon Container */}
            <div className="relative w-9 h-9 flex items-center justify-center">

                {/* Outer Glow - Animated Pulse */}
                <div className="absolute inset-0 bg-[#008000] rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-500"></div>

                {/* SVG Logo */}
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 transition-transform duration-500 group-hover:rotate-180">
                    <defs>
                        <linearGradient id="orbitGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#008000" />
                            <stop offset="100%" stopColor="#00FF00" />
                        </linearGradient>
                    </defs>

                    {/* Orbit Ring 1 (Horizontal) */}
                    <ellipse cx="20" cy="20" rx="18" ry="6" stroke="url(#orbitGradient)" strokeWidth="2" strokeLinecap="round" transform="rotate(-45 20 20)" className="opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* Orbit Ring 2 (Vertical) */}
                    <ellipse cx="20" cy="20" rx="18" ry="6" stroke="url(#orbitGradient)" strokeWidth="2" strokeLinecap="round" transform="rotate(45 20 20)" className="opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* Center Core (Planet/Code) */}
                    <circle cx="20" cy="20" r="5" fill="#008000" className="drop-shadow-[0_0_8px_#008000]" />
                </svg>
            </div>

            {!iconOnly && (
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-text-primary leading-none">
                        Error<span className="text-[#008000]">Wiki</span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
