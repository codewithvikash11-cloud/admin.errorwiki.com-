"use client";

import React, { useState } from 'react';
import { Copy, FileCode, Check } from 'lucide-react';

export default function JsonToTs() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const getType = (value) => {
        if (value === null) return 'any';
        if (Array.isArray(value)) {
            if (value.length === 0) return 'any[]';
            const type = getType(value[0]);
            return `${type}[]`;
        }
        if (typeof value === 'object') return 'object'; // Simplified for nested
        return typeof value;
    };

    const generateInterface = (json, name = 'RootObject') => {
        let output = `interface ${name} {\n`;
        Object.keys(json).forEach(key => {
            const value = json[key];
            const type = getType(value);

            // Handle nested objects recursively (simplified)
            if (type === 'object' && value !== null && !Array.isArray(value)) {
                // For now, just keep it simple. Ideally we'd generate sub-interfaces.
                output += `  ${key}: {\n`;
                Object.keys(value).forEach(subKey => {
                    output += `    ${subKey}: ${getType(value[subKey])};\n`;
                });
                output += `  };\n`;
            } else {
                output += `  ${key}: ${type};\n`;
            }
        });
        output += `}`;
        return output;
    };

    const convert = () => {
        try {
            setError('');
            if (!input.trim()) return;
            const json = JSON.parse(input);
            const ts = generateInterface(json);
            setOutput(ts);
        } catch (err) {
            setError('Invalid JSON');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <FileCode className="text-accent-primary" />
                JSON to TypeScript
            </h3>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px]">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Input JSON</label>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface border border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none font-mono text-sm resize-none"
                        placeholder='{"id": 1, "name": "John"}'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-secondary">TypeScript Interface</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-accent-primary hover:text-accent-hover transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface-highlight border border-border outline-none font-mono text-sm resize-none text-text-primary"
                        readOnly
                        value={output}
                        placeholder="interface RootObject { ... }"
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-accent-error/10 border border-accent-error/20 text-accent-error text-sm">
                    {error}
                </div>
            )}

            <button
                onClick={convert}
                className="w-full py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20"
            >
                Generate TypeScript
            </button>
        </div>
    );
}
