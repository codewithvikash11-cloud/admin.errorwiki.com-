"use client";
import React, { useState } from 'react';
import { Copy, Check, ArrowDown, ArrowUp } from 'lucide-react';

export default function UrlEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState('encode'); // encode | decode
    const [error, setError] = useState('');

    const handleProcess = (newInput = input) => {
        setError('');
        if (!newInput) {
            setOutput('');
            return;
        }

        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(newInput));
            } else {
                setOutput(decodeURIComponent(newInput));
            }
        } catch (e) {
            setError('Invalid format: Unable to decode this string.');
            setOutput('');
        }
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        // Clean slate or re-process? Let's just update the output if input exists
        // But logic flips direction usually. For simplicity, we just change the function applied to Current Input.
        // Wait, often user wants to take Output -> Input to reverse. 
        // We'll keep it simple: Input box -> Process -> Output box.
    };

    // Auto-process on input change
    const onInputChange = (val) => {
        setInput(val);
        // We need to defer process slightly or just run it immediate? Immediate is fine for URL encoding.
        // But need to pass 'val' because state updates async

        // Re-implement logic inline to use 'val'
        if (!val) {
            setOutput('');
            setError('');
            return;
        }
        try {
            setError('');
            if (mode === 'encode') {
                setOutput(encodeURIComponent(val));
            } else {
                setOutput(decodeURIComponent(val));
            }
        } catch (e) {
            setError('Invalid format');
            setOutput('');
        }
    };

    // Trigger effect when mode changes too
    React.useEffect(() => {
        onInputChange(input);
    }, [mode]);

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Toggle */}
            <div className="flex justify-center mb-4">
                <div className="bg-surface border border-border p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => handleModeChange('encode')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'encode' ? 'bg-accent-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-surface-active'}`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => handleModeChange('decode')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'decode' ? 'bg-accent-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-surface-active'}`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 h-[400px]">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">Input</label>
                    <textarea
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm leading-relaxed outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 resize-none transition-all placeholder:text-text-tertiary text-text-primary"
                        placeholder={mode === 'encode' ? 'Paste text to encode...' : 'Paste URL encoded text to decode...'}
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                    />
                </div>

                <div className="flex flex-col relative">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">Result</label>
                    <div className="flex-1 bg-surface border border-border rounded-xl p-4 relative overflow-hidden flex flex-col">
                        {error ? (
                            <div className="text-red-500 font-medium p-2">{error}</div>
                        ) : (
                            <textarea
                                readOnly
                                className="flex-1 w-full bg-transparent font-mono text-sm outline-none resize-none text-text-primary placeholder:text-text-tertiary"
                                value={output}
                                placeholder="Result..."
                            />
                        )}

                        {output && !error && (
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-text-secondary hover:text-accent-primary transition-colors shadow-sm"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
