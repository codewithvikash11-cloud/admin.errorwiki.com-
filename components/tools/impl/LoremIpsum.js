"use client";

import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Type, AlignLeft } from 'lucide-react';

export default function LoremIpsum() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs'); // 'paragraphs' | 'words'
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const WORDS = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
        "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
        "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
        "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
        "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
        "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
        "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
        "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
        "est", "laborum"
    ];

    const generate = () => {
        if (type === 'words') {
            let result = [];
            for (let i = 0; i < count; i++) {
                result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
            }
            setText(result.join(' '));
        } else {
            let paragraphs = [];
            for (let i = 0; i < count; i++) {
                let sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
                let sentences = [];
                for (let j = 0; j < sentenceCount; j++) {
                    let wordCount = Math.floor(Math.random() * 8) + 5; // 5-13 words
                    let words = [];
                    for (let k = 0; k < wordCount; k++) {
                        words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
                    }
                    let sentence = words.join(' ');
                    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
                    sentences.push(sentence);
                }
                paragraphs.push(sentences.join(' '));
            }
            setText(paragraphs.join('\n\n'));
        }
    };

    // Generate on mount
    React.useEffect(() => {
        generate();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">Generation Type</label>
                    <div className="flex bg-black rounded-lg p-1 border border-border">
                        <button
                            onClick={() => setType('paragraphs')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${type === 'paragraphs' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            <AlignLeft size={16} /> Paragraphs
                        </button>
                        <button
                            onClick={() => setType('words')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${type === 'words' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            <Type size={16} /> Words
                        </button>
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">Count</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="flex-1 h-2 bg-black rounded-lg appearance-none cursor-pointer accent-accent-primary"
                        />
                        <span className="w-12 h-10 flex items-center justify-center bg-black border border-border rounded-lg text-accent-primary font-mono font-bold">
                            {count}
                        </span>
                        <button
                            onClick={generate}
                            className="w-10 h-10 flex items-center justify-center bg-accent-primary text-white rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent-primary/20"
                            title="Regenerate"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Output */}
            <div className="relative group">
                <textarea
                    value={text}
                    readOnly
                    className="w-full h-80 bg-surface border border-border rounded-xl p-6 font-mono text-sm text-text-primary outline-none focus:border-accent-primary/50 resize-none transition-all"
                ></textarea>
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="font-bold text-sm">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
