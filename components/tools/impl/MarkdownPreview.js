"use client";
import React, { useState } from 'react';

export default function MarkdownPreview() {
    const [markdown, setMarkdown] = useState('# Hello World\nType some **markdown** here!');

    // Simple parser for demo
    const parseMarkdown = (text) => {
        let html = text
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/`(.*?)`/gim, '<code class="bg-black/30 px-1 rounded text-pink-400 font-mono text-sm">$1</code>')
            .replace(/\n$/gim, '<br />')
            .replace(/\n/gim, '<br />'); // Simple newline handling

        return { __html: html };
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">Editor</label>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-white resize-none"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">Preview</label>
                <div
                    className="flex-1 bg-white/5 border border-[#334155] rounded-xl p-6 overflow-y-auto prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={parseMarkdown(markdown)}
                >
                </div>
            </div>
        </div>
    );
}
