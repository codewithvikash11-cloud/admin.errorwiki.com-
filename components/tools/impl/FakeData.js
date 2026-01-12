"use client";

import React, { useState } from 'react';
import { Copy, User, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "example.com", "test.org"];
const STREETS = ["Main St", "Oak Ave", "Pine Ln", "Maple Dr", "Cedar Rd", "Elm St", "Washington Blvd", "Lakeview Dr"];
const CITIES = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];

export default function FakeData() {
    const [count, setCount] = useState(5);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const generate = () => {
        const data = [];
        for (let i = 0; i < count; i++) {
            const firstName = NAMES[Math.floor(Math.random() * NAMES.length)];
            const lastName = NAMES[Math.floor(Math.random() * NAMES.length)]; // Reusing names as last names for simplicity
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}@${DOMAINS[Math.floor(Math.random() * DOMAINS.length)]}`;
            const address = `${Math.floor(Math.random() * 9999)} ${STREETS[Math.floor(Math.random() * STREETS.length)]}, ${CITIES[Math.floor(Math.random() * CITIES.length)]}, USA`;

            data.push({
                id: i + 1,
                name: `${firstName} ${lastName}`,
                email,
                address,
                phone: `+1 (${Math.floor(Math.random() * 800) + 200}) 555-${Math.floor(Math.random() * 8999) + 1000}`
            });
        }
        setOutput(JSON.stringify(data, null, 2));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <User className="text-accent-primary" />
                Fake Data Generator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Rows to Generate: {count}</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full accent-accent-primary h-2 bg-surface-highlight rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <button
                        onClick={generate}
                        className="w-full py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Generate Data
                    </button>
                    <div className="p-4 bg-surface-highlight rounded-xl border border-border text-xs text-text-secondary">
                        <p>Generates mock Users with Name, Email, Address, and Phone.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 h-full min-h-[300px]">
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
                        className="flex-1 w-full p-4 rounded-xl bg-surface border border-border outline-none font-mono text-sm resize-none text-text-primary"
                        readOnly
                        value={output}
                        placeholder="[]"
                    />
                </div>
            </div>
        </div>
    );
}
