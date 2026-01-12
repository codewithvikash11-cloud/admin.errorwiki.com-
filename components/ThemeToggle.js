"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative p-2.5 rounded-xl border-2 transition-all duration-300 active:scale-90",
                "border-border bg-panel hover:border-accent-blue/30 overflow-hidden group"
            )}
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun icon with orbital animation */}
                <div className={cn(
                    "absolute transition-all duration-500 transform",
                    theme === 'light'
                        ? "translate-y-0 opacity-100 rotate-0"
                        : "translate-y-8 opacity-0 rotate-45"
                )}>
                    <Sun size={20} className="text-accent-yellow" />
                </div>

                {/* Moon icon with orbital animation */}
                <div className={cn(
                    "absolute transition-all duration-500 transform",
                    theme === 'dark'
                        ? "translate-y-0 opacity-100 rotate-0"
                        : "-translate-y-8 opacity-0 -rotate-45"
                )}>
                    <Moon size={20} className="text-accent-blue" />
                </div>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-accent-blue/0 group-hover:bg-accent-blue/5 transition-colors duration-300" />
        </button>
    );
};

export default ThemeToggle;
