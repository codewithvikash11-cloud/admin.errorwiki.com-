"use client";

import React, { useRef, useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Pre-load themes or configure loader
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' } });

export default function CodeEditor({ language, value, onChange, theme = 'vs-dark' }) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // 1. Dracula Theme
        monaco.editor.defineTheme('dracula', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'ff79c6' },
                { token: 'string', foreground: 'f1fa8c' },
                { token: 'number', foreground: 'bd93f9' },
                { token: 'type', foreground: '8be9fd' },
            ],
            colors: {
                'editor.background': '#282a36',
                'editor.foreground': '#f8f8f2',
                'editor.lineHighlightBackground': '#44475a',
                'editorCursor.foreground': '#f8f8f2',
                'editor.selectionBackground': '#44475a',
            }
        });

        // 2. Monokai Theme
        monaco.editor.defineTheme('monokai', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '75715e' },
                { token: 'keyword', foreground: 'f92672' },
                { token: 'string', foreground: 'e6db74' },
                { token: 'number', foreground: 'ae81ff' },
            ],
            colors: {
                'editor.background': '#272822',
                'editor.foreground': '#f8f8f2',
                'editor.lineHighlightBackground': '#3e3d32',
            }
        });

        // 3. GitHub Dark
        monaco.editor.defineTheme('github-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '8b949e' },
                { token: 'keyword', foreground: 'ff7b72' },
                { token: 'string', foreground: 'a5d6ff' },
            ],
            colors: {
                'editor.background': '#0d1117',
                'editor.foreground': '#c9d1d9',
                'editor.lineHighlightBackground': '#161b22',
            }
        });
    };

    return (
        <div className="h-full w-full relative group">
            <Editor
                height="100%"
                language={language === 'javascript' || language === 'node' ? 'javascript' : language}
                value={value}
                theme={theme} // Dynamic theme
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    padding: { top: 16 },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on"
                }}
            />

            {/* Smooth Shadow Overlay for aesthetics */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
        </div>
    );
}
