"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Type } from 'lucide-react';

// Use a dynamic import if figlet fonts are large, but for now we'll try standard import
// Note: figlet runs in browser but might need font files. 
// We will use a simplified approach or see if standard fonts load.
// Actually, figlet is heavy for client side without proper setup. 
// Let's implement a wrapper that uses a simpler font or fetches it.
// To keep it simple and robust, we will assume figlet puts fonts in public/fonts/ or similar, 
// OR we can use a simpler text-to-ascii library if available.
// Given constraints, I'll use figlet.js via CDN or local if possible, 
// but since I can't really "install" heavy assets easily, I'll use a basic custom implementation 
// or rely on a simple font that is embedded in figlet's core if available.
// 
// WAIT: `figlet` npm package often requires fs or specific loaders. 
// Safest bet for a "pure JS" client tool without complex build config is a smaller library or a custom mapping for a few fonts.
// Let's use `figlet` but we need to import fonts.
//
// Alternative: Since installing and configuring figlet correctly with Next.js webpack can be tricky in this environment,
// I will implement a "Big Text" generator using a simple dictionary-based approach for a "Standard" font 
// to ensure it works 100% without external deps or build errors.

const FONT_STANDARD = {
    'A': ["  __  ", " /  \\ ", "|    |", "|    |", "|____|"],
    'B': [" ___  ", "|   \\ ", "|___/ ", "|   \\ ", "|___/ "],
    'C': [" ____ ", "/    |", "|     ", "|     ", "\\____|"],
    'D': [" ___  ", "|   \\ ", "|    |", "|    |", "|___/ "],
    'E': [" ____ ", "|    |", "|___  ", "|     ", "|____ "],
    'F': [" ____ ", "|    |", "|___  ", "|     ", "|     "],
    'G': [" ____ ", "/    |", "|  _  ", "|   | ", "\\___| "],
    'H': ["      ", "|    |", "|____|", "|    |", "|    |"],
    'I': [" ____ ", "  |   ", "  |   ", "  |   ", "____| "],
    'J': ["      ", "     |", "     |", "|    |", "\\____/"],
    'K': ["      ", "|   / ", "|__/  ", "|   \\ ", "|    \\"],
    'L': ["      ", "|     ", "|     ", "|     ", "|____ "],
    'M': ["      ", "|\\  /|", "| \\/ |", "|    |", "|    |"],
    'N': ["      ", "|\\   |", "| \\  |", "|  \\ |", "|   \\|"],
    'O': [" ____ ", "/    \\", "|    |", "|    |", "\\____/"],
    'P': [" ___  ", "|   \\ ", "|___/ ", "|     ", "|     "],
    'Q': [" ____ ", "/    \\", "|    |", "|  \\ |", "\\___\\|"],
    'R': [" ___  ", "|   \\ ", "|___/ ", "|   \\ ", "|    \\"],
    'S': [" ____ ", "/     ", "\\___  ", "    \\ ", "____/ "],
    'T': ["_____ ", "  |   ", "  |   ", "  |   ", "  |   "],
    'U': ["      ", "|    |", "|    |", "|    |", "\\____/"],
    'V': ["      ", "|    |", "|    |", " \\  / ", "  \\/  "],
    'W': ["      ", "|    |", "|    |", "| /\\ |", "|/  \\|"],
    'X': ["      ", "\\    /", " \\  / ", " /  \\ ", "/    \\"],
    'Y': ["      ", "\\    /", " \\  / ", "  |   ", "  |   "],
    'Z': ["_____ ", "   /  ", "  /   ", " /    ", "/____ "],
    ' ': ["      ", "      ", "      ", "      ", "      "],
    '0': [" ___  ", "/ _ \\ ", "|/ \\| ", "|\\_/| ", "\\___/ "],
    '1': ["  _   ", " / |  ", "  |   ", "  |   ", " ___| "],
    '2': [" ___  ", "/   \\ ", "   _/", "  /   ", "_____|"],
    '3': [" ___  ", "    / ", "  _/  ", "    \\ ", "____/ "],
    '4': ["      ", "  /|  ", " / |  ", "/__|__", "   |  "],
    '5': [" ___  ", "|     ", "|___  ", "    \\ ", "____/ "],
    '6': [" ___  ", "/     ", "|___  ", "|   | ", "\\___/ "],
    '7': ["_____ ", "    / ", "   /  ", "  /   ", " /    "],
    '8': [" ___  ", "( _ ) ", "/ _ \\ ", "\\ _ / ", "(___) "],
    '9': [" ___  ", "/   \\ ", "\\___| ", "    | ", "___/  "],
    '.': ["   ", "   ", "   ", "   ", " . "],
    '!': [" _ ", "| |", "| |", " _ ", "(_)"],
    '?': [" ___ ", "?   ?", "  _? ", "     ", "  ?  "],
};

export default function AsciiArt() {
    const [input, setInput] = useState('HELLO');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateAscii(input);
    }, [input]);

    const generateAscii = (text) => {
        if (!text) {
            setOutput('');
            return;
        }

        const lines = ["", "", "", "", ""];
        const chars = text.toUpperCase().split('');

        chars.forEach(char => {
            const art = FONT_STANDARD[char] || FONT_STANDARD['?'] || ["?", "?", "?", "?", "?"];
            for (let i = 0; i < 5; i++) {
                lines[i] += (art[i] || "     ") + " ";
            }
        });

        setOutput(lines.join('\n'));
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Input Text</label>
                    <input
                        type="text"
                        value={input}
                        maxLength={20}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-accent-primary transition-colors text-text-primary placeholder:text-text-tertiary font-bold"
                    />
                    <p className="text-xs text-text-tertiary">Limited to 20 characters for best fit.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                        <Type size={14} /> ASCII Output
                    </label>
                    <div className="relative">
                        <textarea
                            readOnly
                            value={output}
                            className="w-full h-48 bg-[#0f172a] border border-border rounded-xl px-4 py-3 text-sm md:text-base font-mono leading-none text-accent-primary focus:outline-none cursor-default resize-none whitespace-pre overflow-x-auto"
                        />
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-4 top-4 p-2 bg-surface hover:bg-surface-highlight rounded-lg text-text-secondary hover:text-white transition-colors border border-border"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
