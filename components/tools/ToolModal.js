"use client";

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ToolModal({ tool, isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset' };
    }, [isOpen]);

    if (!isOpen || !tool) return null;

    const Icon = tool.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-[#0f172a] border border-[#334155] rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#334155] bg-[#1e293b]">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-[#0f172a] border border-[#334155] ${tool.color}`}>
                            <Icon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">{tool.title}</h2>
                            <p className="text-sm text-gray-400">{tool.description}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Tool Canvas */}
                <div className="flex-1 overflow-auto p-6 bg-[#0f172a]">
                    {children}
                </div>
            </div>
        </div>
    );
}
