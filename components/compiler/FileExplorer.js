"use client";

import React from 'react';
import { FileCode, FileType, FileJson, Plus, Trash2 } from 'lucide-react';

export default function FileExplorer({ files, activeFile, onFileSelect }) {
    return (
        <div className="flex flex-col h-full bg-[#050505] border-r border-white/5">
            {/* Header */}
            <div className="p-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Explore</span>
                <Plus size={14} className="text-text-secondary hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* Files List */}
            <div className="flex-1 overflow-y-auto py-2">
                {files.map((file) => (
                    <div
                        key={file.name}
                        onClick={() => onFileSelect(file.name)}
                        className={`group px-4 py-2 text-sm flex items-center justify-between cursor-pointer border-l-2 transition-all duration-200
                            ${activeFile === file.name
                                ? 'bg-white/5 border-accent-blue text-white'
                                : 'border-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FileIcon name={file.name} />
                            <span className="font-medium">{file.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-3 text-[10px] text-text-tertiary text-center border-t border-white/5">
                v2.0.1 Stable
            </div>
        </div>
    );
}

// Icon Helper
const FileIcon = ({ name }) => {
    if (name.endsWith('.html')) return <FileType size={15} className="text-orange-500" />;
    if (name.endsWith('.css')) return <FileType size={15} className="text-blue-500" />;
    if (name.endsWith('.js')) return <FileCode size={15} className="text-yellow-400" />;
    if (name.endsWith('.py')) return <FileCode size={15} className="text-blue-400" />;
    if (name.endsWith('.cpp') || name.endsWith('.c')) return <FileCode size={15} className="text-indigo-400" />;
    if (name.endsWith('.java')) return <FileCode size={15} className="text-red-400" />;
    if (name.endsWith('.go')) return <FileCode size={15} className="text-cyan-400" />;
    return <FileCode size={15} className="text-gray-400" />;
};
