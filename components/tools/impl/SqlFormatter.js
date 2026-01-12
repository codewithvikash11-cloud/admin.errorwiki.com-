"use client";
import React, { useState } from 'react';
import { Copy, Check, Database, Play } from 'lucide-react';

const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE',
    'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'ON', 'AS', 'DISTINCT', 'COUNT', 'SUM',
    'AVG', 'MAX', 'MIN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IS NULL', 'IS NOT NULL', 'LIKE',
    'IN', 'BETWEEN', 'EXISTS', 'CAST', 'CONVERT', 'UNION', 'ALL'
];

// Basic SQL formatter
function formatSql(sql) {
    let formatted = sql
        .replace(/\s+/g, ' ') // Collapse whitespace
        .trim();

    // Add newlines before major keywords
    SQL_KEYWORDS.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, (match) => `\n${match.toUpperCase()}`);
    });

    // Fix indentation for sub-queries nicely
    formatted = formatted.replace(/\(/g, '(\n    ')
        .replace(/\)/g, '\n)')
        .replace(/,/g, ',\n    ');

    // Remove leading newline if present
    return formatted.trim();
}

export default function SqlFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        if (!input.trim()) return;
        const formatted = formatSql(input);
        setOutput(formatted);
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                        <Database size={14} /> SQL Query
                    </label>
                    <button
                        onClick={() => setInput('')}
                        className="text-xs text-text-tertiary hover:text-accent-primary transition-colors"
                    >
                        Clear
                    </button>
                </div>
                <textarea
                    className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 resize-none transition-all placeholder:text-text-tertiary text-text-primary"
                    placeholder="SELECT * FROM users WHERE active = 1 ..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Beautified SQL</label>
                    <button
                        onClick={handleFormat}
                        disabled={!input}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20 disabled:opacity-50"
                    >
                        <Play size={14} /> Format Query
                    </button>
                </div>

                <div className="flex-1 relative bg-surface border border-border rounded-xl overflow-hidden">
                    <textarea
                        readOnly
                        className="w-full h-full bg-transparent p-4 font-mono text-sm outline-none resize-none text-accent-primary placeholder:text-text-tertiary"
                        value={output}
                        placeholder="Formatted SQL will appear here..."
                    />
                    {output && (
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={copyToClipboard}
                                className="p-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-text-secondary hover:text-accent-primary transition-colors shadow-sm"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
