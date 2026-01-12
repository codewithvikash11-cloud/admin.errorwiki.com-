"use client";

import React, { useState } from 'react';
import { CreditCard, CheckCircle, XCircle, Search } from 'lucide-react';

export default function IbanValidator() {
    const [iban, setIban] = useState('');
    const [result, setResult] = useState(null);

    const validateIBAN = (input) => {
        // Remove spaces and uppercase
        const code = input.replace(/[\s]/g, '').toUpperCase();

        if (code.length < 4) {
            setResult(null);
            return;
        }

        // Basic Check: Length differs by country, but must be at most 34 chars
        if (code.length > 34) {
            setResult({ isValid: false, message: 'Too long to be a valid IBAN' });
            return;
        }

        // Move first 4 chars to end
        const rearranged = code.substring(4) + code.substring(0, 4);

        // Replace letters with numbers (A=10, ..., Z=35)
        const numeric = rearranged.replace(/[A-Z]/g, (match) => match.charCodeAt(0) - 55);

        // Modulo 97 check on big integer
        // Since the number is too big for JS integers, we do piece-wise modulo
        let remainder = '';
        for (let i = 0; i < numeric.length; i++) {
            const digit = numeric[i];
            const current = parseInt(remainder + digit, 10);
            remainder = String(current % 97);
        }

        const isValid = parseInt(remainder, 10) === 1;

        if (isValid) {
            setResult({
                isValid: true,
                formatted: code.match(/.{1,4}/g).join(' '), // Groups of 4
                country: code.substring(0, 2),
                checkDigits: code.substring(2, 4),
                bban: code.substring(4)
            });
        } else {
            setResult({
                isValid: false,
                message: 'Checksum validation failed'
            });
        }
    };

    const handleChange = (e) => {
        setIban(e.target.value);
        if (e.target.value.trim() === '') {
            setResult(null);
        } else {
            validateIBAN(e.target.value);
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                <input
                    type="text"
                    value={iban}
                    onChange={handleChange}
                    placeholder="Enter IBAN (e.g. GB29 XXXX...)"
                    className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 text-lg font-mono uppercase text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all placeholder:text-text-tertiary"
                />
            </div>

            {result && (
                <div className={`border rounded-2xl p-6 ${result.isValid ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'} animate-in fade-in slide-in-from-bottom-2`}>

                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full flex-shrink-0 ${result.isValid ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {result.isValid ? <CheckCircle size={32} /> : <XCircle size={32} />}
                        </div>

                        <div className="space-y-4 flex-1">
                            <div>
                                <h3 className={`text-xl font-bold ${result.isValid ? 'text-green-500' : 'text-red-500'}`}>
                                    {result.isValid ? 'Valid IBAN' : 'Invalid IBAN'}
                                </h3>
                                {!result.isValid && <p className="text-text-secondary mt-1">{result.message}</p>}
                            </div>

                            {result.isValid && (
                                <div className="space-y-4 pt-4 border-t border-border/50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-text-tertiary uppercase font-semibold">Country Code</span>
                                            <div className="text-lg font-bold text-text-primary">{result.country}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-text-tertiary uppercase font-semibold">Check Digits</span>
                                            <div className="text-lg font-bold text-text-primary">{result.checkDigits}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-text-tertiary uppercase font-semibold">Formatted</span>
                                        <div className="text-lg font-mono font-bold text-text-primary tracking-wide">{result.formatted}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!result && (
                <div className="text-center text-sm text-text-secondary bg-surface/30 p-8 rounded-xl border border-dashed border-border mx-auto w-full">
                    Enter an International Bank Account Number (IBAN) to validate its checksum and format.
                </div>
            )}
        </div>
    );
}
