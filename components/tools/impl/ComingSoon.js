"use client";

import React from 'react';
import { Construction, Bell } from 'lucide-react';

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
            <div className="w-20 h-20 bg-surface-highlight rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Construction size={40} className="text-accent-primary" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Work in Progress</h3>
            <p className="text-text-secondary max-w-md mx-auto mb-8">
                This tool is currently being built by our engineering team.
                We are crafting a premium experience for you.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-accent-primary/25">
                <Bell size={18} />
                Notify me when ready
            </button>
        </div>
    );
}
