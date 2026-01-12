"use client";

import React from 'react';

export default function RovioTechFooter() {
    return (
        <footer className="h-8 bg-[#0a0a0a] border-t border-[#1e293b] flex items-center justify-between px-6 text-[10px] text-gray-500">
            <div className="flex items-center gap-4">
                <span className="hover:text-white cursor-pointer transition-colors">&copy; 2026 ErrorWiki</span>
                <span className="hover:text-white cursor-pointer transition-colors">About</span>
                <span className="hover:text-white cursor-pointer transition-colors">Learn</span>
                <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-gray-400">All Systems Operational</span>
                <span className="px-1.5 py-0.5 bg-[#1e293b] rounded text-gray-400 ml-2 border border-[#334155]">v2.0.0-beta</span>
            </div>
        </footer>
    );
}
