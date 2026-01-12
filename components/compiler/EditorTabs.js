"use client";

import React from 'react';
import { X, FileCode, FileType, FileJson } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EditorTabs({ files, activeFileName, onTabClick, onCloseTab }) {
    const activeFile = files.find(f => f.name === activeFileName);

    // Filter to show only "Open" files (For now, we assume all files in 'files' are open in explorer)
    // In a real app, you'd maintain a separate 'openFiles' state. 
    // We'll mimic this by just showing all files as tabs for now.

    return (
        <div className="flex items-center bg-[#0a0a0a] border-b border-white/5 overflow-x-auto scrollbar-hide">
            {files.map((file) => {
                const isActive = file.name === activeFileName;
                return (
                    <div
                        key={file.name}
                        onClick={() => onTabClick(file.name)}
                        className={cn(
                            "group flex items-center gap-2 px-3 py-2.5 min-w-[120px] max-w-[200px] border-r border-white/5 cursor-pointer select-none transition-colors",
                            isActive
                                ? "bg-[#0f0f12] text-white border-t-2 border-t-accent-blue"
                                : "bg-transparent text-text-secondary hover:bg-[#0f0f12]/50 hover:text-text-primary border-t-2 border-t-transparent"
                        )}
                    >
                        <FileIcon name={file.name} />
                        <span className="text-xs truncate flex-1">{file.name}</span>
                        {/* Close Icon (Hover only or Active) */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onCloseTab?.(file.name); }}
                            className={cn(
                                "p-0.5 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all",
                                isActive && "opacity-100"
                            )}
                        >
                            <X size={12} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

const FileIcon = ({ name }) => {
    if (name.endsWith('.html')) return <FileType size={14} className="text-orange-500" />;
    if (name.endsWith('.css')) return <FileType size={14} className="text-blue-500" />;
    if (name.endsWith('.js')) return <FileCode size={14} className="text-yellow-400" />;
    if (name.endsWith('.py')) return <FileCode size={14} className="text-blue-400" />;
    if (name.endsWith('.cpp') || name.endsWith('.c')) return <FileCode size={14} className="text-indigo-400" />;
    if (name.endsWith('.java')) return <FileCode size={14} className="text-red-400" />;
    return <FileCode size={14} className="text-gray-400" />;
};
