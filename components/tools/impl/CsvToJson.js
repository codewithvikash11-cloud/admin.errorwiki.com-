"use client";

import React, { useState } from 'react';
import { Copy, Table, Check } from 'lucide-react';

export default function CsvToJson() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const convert = () => {
        try {
            setError('');
            if (!input.trim()) return;

            const rows = input.trim().split('\n');
            if (rows.length < 1) {
                setOutput('[]');
                return;
            }

            const headers = rows[0].split(',').map(h => h.trim());
            const json = rows.slice(1).map(row => {
                const values = row.split(',').map(v => v.trim());
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index] || null;
                });
                return obj;
            });

            setOutput(JSON.stringify(json, null, 2));
        } catch (err) {
            setError('Error parsing CSV');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Table className="text-accent-primary" />
                    CSV to JSON
                </h3>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px]">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Input CSV</label>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface border border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none font-mono text-sm resize-none"
                        placeholder="id,name,email&#10;1,John,john@example.com"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-secondary">JSON Output</label>
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
                        placeholder="[]"
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
                Convert to JSON
            </button>
        </div>
    );
}
