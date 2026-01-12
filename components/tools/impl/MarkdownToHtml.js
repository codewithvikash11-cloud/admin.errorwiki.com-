"use client";
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Copy, Code, Eye, Split } from 'lucide-react';

export default function MarkdownToHtml() {
    const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **Markdown** content.\n\n- List item 1\n- List item 2');
    const [html, setHtml] = useState('');
    const [view, setView] = useState('split'); // split, edit, preview

    useEffect(() => {
        try {
            const result = marked.parse(markdown);
            setHtml(result);
        } catch (e) {
            setHtml('<p class="text-red-500">Error parsing Markdown</p>');
        }
    }, [markdown]);

    const copyHtml = () => {
        navigator.clipboard.writeText(html);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex gap-2">
                    <button
                        onClick={() => setView('edit')}
                        className={`p-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${view === 'edit' ? 'bg-accent-primary text-white' : 'bg-surface hover:bg-surface-highlight text-text-secondary'}`}
                    >
                        <Code size={16} /> Edit
                    </button>
                    <button
                        onClick={() => setView('preview')}
                        className={`p-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${view === 'preview' ? 'bg-accent-primary text-white' : 'bg-surface hover:bg-surface-highlight text-text-secondary'}`}
                    >
                        <Eye size={16} /> Preview
                    </button>
                    <button
                        onClick={() => setView('split')}
                        className={`hidden md:flex p-2 rounded-lg text-sm font-bold items-center gap-2 transition-colors ${view === 'split' ? 'bg-accent-primary text-white' : 'bg-surface hover:bg-surface-highlight text-text-secondary'}`}
                    >
                        <Split size={16} /> Split
                    </button>
                </div>
                <button
                    onClick={copyHtml}
                    className="flex items-center gap-2 bg-surface hover:bg-surface-highlight text-text-secondary hover:text-white px-4 py-2 rounded-lg text-sm font-bold border border-border transition-colors"
                >
                    <Copy size={16} /> Copy HTML
                </button>
            </div>

            <div className={`flex-1 grid gap-6 ${view === 'split' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* Editor */}
                <div className={`flex flex-col gap-2 ${view === 'preview' ? 'hidden' : 'block'}`}>
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Markdown Input</label>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary"
                        placeholder="Type markdown here..."
                    />
                </div>

                {/* Preview */}
                <div className={`flex flex-col gap-2 ${view === 'edit' ? 'hidden' : 'block'}`}>
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Live Preview</label>
                    <div
                        className="flex-1 w-full bg-white dark:bg-[#0d1117] border border-border rounded-xl p-6 overflow-auto prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </div>
    );
}
