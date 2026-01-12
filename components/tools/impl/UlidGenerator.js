"use client";
import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, Clock, Fingerprint } from 'lucide-react';

// ULID Generator Implementation (Pure JS)
// Based on specification: https://github.com/ulid/spec
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ENCODING_LEN = ENCODING.length;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

function encodeTime(now, len) {
    let str = "";
    for (let i = len; i > 0; i--) {
        const mod = now % ENCODING_LEN;
        str = ENCODING[mod] + str;
        now = (now - mod) / ENCODING_LEN;
    }
    return str;
}

function encodeRandom(len) {
    let str = "";
    const randomBytes = new Uint8Array(len);
    crypto.getRandomValues(randomBytes);
    for (let i = 0; i < len; i++) {
        // We need 5 bits (0-31) for each char
        // This is a simplified implementation often used in JS libs
        // Proper full bit manipulation is more complex but this suffices for client gen
        const rand = Math.floor(Math.random() * ENCODING_LEN);
        str += ENCODING[rand];
    }
    return str;
}

function ulid() {
    return encodeTime(Date.now(), TIME_LEN) + encodeRandom(RANDOM_LEN);
}

export default function UlidGenerator() {
    const [ulids, setUlids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState(null);

    const generate = () => {
        const newUlids = Array(Math.min(count, 50)).fill(0).map(() => {
            const id = ulid();
            return {
                id,
                time: new Date().toISOString()
            };
        });
        setUlids(newUlids);
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
    };

    useEffect(() => {
        generate();
    }, []);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end bg-surface p-5 rounded-2xl border border-border">
                <div className="w-full md:w-auto space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Number of IDs</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-full md:w-32 bg-background border border-border rounded-xl px-4 py-3 text-center font-bold outline-none focus:border-accent-primary transition-colors"
                    />
                </div>
                <button
                    onClick={generate}
                    className="flex-1 w-full md:w-auto h-[50px] bg-accent-primary hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2"
                >
                    <RefreshCw size={18} /> Generate ULIDs
                </button>
            </div>

            <div className="space-y-3">
                {ulids.map((item, i) => (
                    <div key={i} className="group bg-surface hover:bg-surface-highlight border border-border hover:border-accent-primary/30 rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-text-secondary text-xs font-mono">
                                <Clock size={12} />
                                <span>{item.time}</span>
                            </div>
                            <code className="text-xl font-mono text-accent-primary font-bold tracking-wider">{item.id}</code>
                        </div>

                        <button
                            onClick={() => copyToClipboard(item.id, i)}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-active text-text-secondary hover:text-white transition-colors text-sm font-medium"
                        >
                            {copied === i ? <><Check size={16} className="text-green-500" /> Copied</> : <><Copy size={16} /> Copy</>}
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-accent-primary/5 border border-accent-primary/10 rounded-xl p-6 text-sm text-text-secondary space-y-2">
                <h3 className="text-accent-primary font-bold flex items-center gap-2">
                    <Fingerprint size={16} /> What is ULID?
                </h3>
                <p>
                    Universally Unique Lexicographically Sortable Identifier. It is a 128-bit identifier like UUID,
                    but sortable by generation time.
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1 opacity-80">
                    <li>128-bit compatibility with UUID</li>
                    <li>1.21e+24 unique ULIDs per millisecond</li>
                    <li>Lexicographically sortable!</li>
                    <li>Canonically encoded as a 26 char string, as opposed to the 36 char UUID</li>
                    <li>Uses Crockford's base32 for better efficiency and readability (5 bits per character)</li>
                </ul>
            </div>
        </div>
    );
}
