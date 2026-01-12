"use client";
import React, { useState } from 'react';
import { Copy, AlertCircle, Check, Minimize, Maximize, FileCode } from 'lucide-react';

// Simple XML helper function since we can't install 'xml-formatter'
function formatXml(xml) {
    let formatted = '';
    let reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    xml.split('\r\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        let padding = '';
        for (let i = 0; i < pad; i++) {
            padding += '    ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

export default function XmlFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        if (!input.trim()) return;
        setError(null);
        try {
            // Basic validation using DOMParser
            const parser = new DOMParser();
            const doc = parser.parseFromString(input, "application/xml");
            const parseError = doc.querySelector("parsererror");
            if (parseError) {
                throw new Error("Invalid XML: " + parseError.textContent);
            }

            const formatted = formatXml(input);
            setOutput(formatted);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const handleMinify = () => {
        if (!input.trim()) return;
        setError(null);
        try {
            // Validation
            const parser = new DOMParser();
            const doc = parser.parseFromString(input, "application/xml");
            if (doc.querySelector("parsererror")) {
                throw new Error("Invalid XML structure");
            }

            // Minify: remove newlines and extra spaces between tags
            const minified = input.replace(/>\s+</g, '><').trim();
            setOutput(minified);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
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
                        <FileCode size={14} /> Input XML
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
                    placeholder="<root>Paste your XML here...</root>"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Result</label>
                    <div className="flex gap-2">
                        <button
                            onClick={handleMinify}
                            disabled={!input}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-surface border border-border hover:bg-surface-highlight text-text-secondary hover:text-text-primary rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Minimize size={14} /> Minify
                        </button>
                        <button
                            onClick={handleFormat}
                            disabled={!input}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20 disabled:opacity-50"
                        >
                            <Maximize size={14} /> Format
                        </button>
                    </div>
                </div>

                <div className={`flex-1 relative bg-surface border rounded-xl overflow-hidden transition-colors ${error ? 'border-red-500/50' : 'border-border'}`}>
                    {error ? (
                        <div className="absolute inset-0 p-4 bg-red-500/5 backdrop-blur-sm text-red-500 font-mono text-sm overflow-auto">
                            <div className="flex items-center gap-2 font-bold mb-2 p-2 bg-red-500/10 rounded-lg w-fit">
                                <AlertCircle size={16} /> Parsing Error
                            </div>
                            <pre className="whitespace-pre-wrap">{error}</pre>
                        </div>
                    ) : (
                        <>
                            <textarea
                                readOnly
                                className="w-full h-full bg-transparent p-4 font-mono text-sm outline-none resize-none text-text-primary"
                                value={output}
                                placeholder="Formatted XML will appear here..."
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
