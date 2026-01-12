"use client";
import React, { useState, useEffect } from 'react';
import { Type, ArrowRight, Copy, Check, RefreshCw, SortAsc, Binary, Globe } from 'lucide-react';

const TOOLS = {
    'text-nato': {
        name: 'Text to NATO',
        icon: Globe,
        transform: (text) => {
            const nato = {
                a: 'Alpha', b: 'Bravo', c: 'Charlie', d: 'Delta', e: 'Echo', f: 'Foxtrot',
                g: 'Golf', h: 'Hotel', i: 'India', j: 'Juliett', k: 'Kilo', l: 'Lima',
                m: 'Mike', n: 'November', o: 'Oscar', p: 'Papa', q: 'Quebec', r: 'Romeo',
                s: 'Sierra', t: 'Tango', u: 'Uniform', v: 'Victor', w: 'Whiskey', x: 'X-ray',
                y: 'Yankee', z: 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
                '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
            };
            return text.split('').map(char => {
                const lower = char.toLowerCase();
                return nato[lower] ? nato[lower] : char;
            }).join(' ');
        }
    },
    'text-binary': {
        name: 'Text to Binary',
        icon: Binary,
        transform: (text) => {
            return text.split('').map(char => {
                return char.charCodeAt(0).toString(2).padStart(8, '0');
            }).join(' ');
        }
    },
    'text-unicode': {
        name: 'Text to Unicode',
        icon: Type,
        transform: (text) => {
            return text.split('').map(char => {
                return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
            }).join('');
        }
    },
    'numeronym': {
        name: 'Numeronym Generator',
        icon: SortAsc,
        transform: (text) => {
            return text.split(' ').map(word => {
                if (word.length <= 2) return word;
                return word[0] + (word.length - 2) + word[word.length - 1];
            }).join(' ');
        }
    },
    'reverse-text': {
        name: 'Reverse Text',
        icon: RefreshCw,
        transform: (text) => text.split('').reverse().join('')
    }
};

export default function TextTools({ type = 'text-nato' }) {
    const activeTool = TOOLS[type] || TOOLS['text-nato'];
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!input) {
            setOutput('');
            return;
        }
        try {
            setOutput(activeTool.transform(input));
        } catch (e) {
            setOutput('Error converting text');
        }
    }, [input, activeTool]);

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-text-primary">
                <activeTool.icon className="text-accent-primary" size={24} />
                {activeTool.name}
            </h3>

            <div className="grid lg:grid-cols-2 gap-6 flex-1">
                {/* Input */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                            Input Text
                        </label>
                        <button onClick={() => setInput('')} className="text-xs text-text-tertiary hover:text-accent-primary">Clear</button>
                    </div>
                    <textarea
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm outline-none focus:border-accent-primary resize-none text-text-primary placeholder:text-text-tertiary"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Type text to convert to ${activeTool.name.replace('Text to ', '')}...`}
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                            Result
                        </label>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-hover transition-colors"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <textarea
                        readOnly
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm outline-none focus:border-accent-primary resize-none text-accent-primary placeholder:text-text-tertiary"
                        value={output}
                        placeholder="Result will appear here..."
                    />
                </div>
            </div>
        </div>
    );
}
