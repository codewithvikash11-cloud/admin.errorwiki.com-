"use client";
import React, { useState } from 'react';
import { ArrowDownUp, Copy, Check } from 'lucide-react';

export default function RomanNumeralConverter() {
    const [number, setNumber] = useState('');
    const [roman, setRoman] = useState('');
    const [error, setError] = useState('');

    const toRoman = (num) => {
        if (num < 1 || num > 3999) return "Enter a number between 1 and 3999";
        const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let r = '';
        for (let i = 0; i < val.length; i++) {
            while (num >= val[i]) {
                r += syms[i];
                num -= val[i];
            }
        }
        return r;
    };

    const fromRoman = (str) => {
        if (!/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(str)) {
            return "Invalid Roman Numeral";
        }
        const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let num = 0;
        let s = str.toUpperCase();
        for (let i = 0; i < s.length; i++) {
            const curr = roman[s[i]];
            const next = roman[s[i + 1]];
            if (next && curr < next) {
                num -= curr;
            } else {
                num += curr;
            }
        }
        return num.toString();
    };

    const handleNumberChange = (val) => {
        setNumber(val);
        setError('');
        if (!val) {
            setRoman('');
            return;
        }
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
            setRoman('');
            return;
        }
        setRoman(toRoman(parsed));
    };

    const handleRomanChange = (val) => {
        const uppercaseVal = val.toUpperCase();
        setRoman(uppercaseVal);
        setError('');
        if (!uppercaseVal) {
            setNumber('');
            return;
        }
        const result = fromRoman(uppercaseVal);
        if (result === "Invalid Roman Numeral") {
            setError(result);
            setNumber('');
        } else {
            setNumber(result);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Integer</label>
                    <input
                        type="number"
                        min="1"
                        max="3999"
                        value={number}
                        onChange={(e) => handleNumberChange(e.target.value)}
                        placeholder="2024"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-6 text-3xl font-black text-center focus:outline-none focus:border-accent-primary transition-colors text-accent-primary"
                    />
                </div>

                <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-surface-highlight flex items-center justify-center text-text-tertiary">
                        <ArrowDownUp size={24} />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">Roman Numeral</label>
                    <input
                        type="text"
                        value={roman}
                        onChange={(e) => handleRomanChange(e.target.value)}
                        placeholder="MMXXIV"
                        className={`w-full bg-surface border ${error ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-6 text-3xl font-black text-center focus:outline-none focus:border-accent-primary transition-colors text-accent-primary uppercase font-serif`}
                    />
                </div>
            </div>

            {error && (
                <div className="text-center text-red-500 font-bold bg-red-500/10 py-3 rounded-lg border border-red-500/20">
                    {error}
                </div>
            )}
        </div>
    );
}
