"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Hash } from 'lucide-react';

export default function NumberBaseConverter() {
    const [values, setValues] = useState({
        bin: '',
        oct: '',
        dec: '',
        hex: ''
    });
    const [copied, setCopied] = useState('');

    const handleChange = (val, base) => {
        if (!val) {
            setValues({ bin: '', oct: '', dec: '', hex: '' });
            return;
        }

        let decimalValue = NaN;

        try {
            if (base === 'dec') {
                decimalValue = parseInt(val, 10);
            } else if (base === 'bin') {
                // remove non-binary chars
                if (/[^01]/.test(val)) return;
                decimalValue = parseInt(val, 2);
            } else if (base === 'oct') {
                if (/[^0-7]/.test(val)) return;
                decimalValue = parseInt(val, 8);
            } else if (base === 'hex') {
                if (/[^0-9a-fA-F]/.test(val)) return;
                decimalValue = parseInt(val, 16);
            }
        } catch (e) {
            return;
        }

        if (isNaN(decimalValue)) {
            // Allow partial clearing if invalid but keep current input in its field? 
            // For strict sync, we just don't update if invalid, but for UX let's handle empty.
            return;
        }

        setValues({
            bin: decimalValue.toString(2),
            oct: decimalValue.toString(8),
            dec: decimalValue.toString(10),
            hex: decimalValue.toString(16).toUpperCase()
        });
    };

    const copyToClipboard = (text, key) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(''), 2000);
    };

    const inputs = [
        { key: 'dec', label: 'Decimal (Base 10)', placeholder: '123' },
        { key: 'hex', label: 'Hexadecimal (Base 16)', placeholder: '7B' },
        { key: 'bin', label: 'Binary (Base 2)', placeholder: '01111011' },
        { key: 'oct', label: 'Octal (Base 8)', placeholder: '173' },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
                {inputs.map((item) => (
                    <div key={item.key} className="space-y-2">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Hash size={12} className="text-accent-primary" /> {item.label}
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={values[item.key]}
                                onChange={(e) => handleChange(e.target.value, item.key)}
                                placeholder={item.placeholder}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-accent-primary transition-colors text-text-primary"
                            />
                            {values[item.key] && (
                                <button
                                    onClick={() => copyToClipboard(values[item.key], item.key)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-text-tertiary hover:text-accent-primary hover:bg-surface-highlight transition-all opacity-0 group-hover:opacity-100"
                                >
                                    {copied === item.key ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-sm text-text-tertiary">
                Supports integer conversions. Real-time validation prevents invalid characters.
            </p>
        </div>
    );
}
