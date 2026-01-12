"use client";

import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, Clock } from 'lucide-react';

// TOTP Implementation Helpers
const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32tohex(base32) {
    let bits = '';
    let hex = '';
    for (let i = 0; i < base32.length; i++) {
        const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        if (val === -1) continue; // Skip invalid chars
        bits += val.toString(2).padStart(5, '0');
    }
    for (let i = 0; i + 4 <= bits.length; i += 4) {
        const chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
}

export default function OtpGenerator() {
    const [secret, setSecret] = useState('JBSWY3DPEHPK3PXP'); // Default Base32 Secret
    const [code, setCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [algorithm, setAlgorithm] = useState('SHA-1');
    const [digits, setDigits] = useState(6);
    const [period, setPeriod] = useState(30);

    const generateTOTP = async () => {
        try {
            const epoch = Math.round(new Date().getTime() / 1000.0);
            const time = Math.floor(epoch / period);

            // Convert time to hex (8 bytes, padded)
            const timeHex = time.toString(16).padStart(16, '0');

            // Convert secret to hex
            const keyHex = base32tohex(secret);
            if (!keyHex) { setCode("Invalid Base32 Secret"); return; }

            // Create arrays
            const encoder = new TextEncoder(); // Not used for hex strings direct
            // We need manual hex to Uint8Array conversion for crypto key
            const keyBytes = new Uint8Array(keyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const msgBytes = new Uint8Array(timeHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

            const key = await crypto.subtle.importKey(
                'raw',
                keyBytes,
                { name: 'HMAC', hash: { name: algorithm } },
                false,
                ['sign']
            );

            const signature = await crypto.subtle.sign('HMAC', key, msgBytes);
            const hashBytes = new Uint8Array(signature);

            // TOTP truncation
            const offset = hashBytes[hashBytes.length - 1] & 0xf;
            const binary =
                ((hashBytes[offset] & 0x7f) << 24) |
                ((hashBytes[offset + 1] & 0xff) << 16) |
                ((hashBytes[offset + 2] & 0xff) << 8) |
                (hashBytes[offset + 3] & 0xff);

            const otp = binary % Math.pow(10, digits);
            setCode(otp.toString().padStart(digits, '0'));

            // Update time left
            setTimeLeft(period - (epoch % period));

        } catch (e) {
            console.error(e);
            setCode("Error");
        }
    };

    useEffect(() => {
        generateTOTP();
        const interval = setInterval(generateTOTP, 1000);
        return () => clearInterval(interval);
    }, [secret, digits, period, algorithm]);

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-surface-highlight">
                    <div
                        className="h-full bg-accent-primary transition-all duration-1000 ease-linear"
                        style={{ width: `${(timeLeft / period) * 100}%` }}
                    />
                </div>

                <span className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-2">Current Code</span>
                <div className="font-mono text-6xl md:text-7xl font-black text-text-primary tracking-[0.2em] tabular-nums">
                    {code.split('').map((char, i) => (
                        <span key={i} className={i === Math.floor(digits / 2) ? 'ml-4' : ''}>{char}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-text-secondary">
                    <Clock size={16} className="text-accent-primary" />
                    <span>Refreshes in {timeLeft}s</span>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Secret Key (Base32)</label>
                    <input
                        type="text"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value.toUpperCase())}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-wide focus:border-accent-primary focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary">Digits</label>
                        <select
                            value={digits}
                            onChange={(e) => setDigits(parseInt(e.target.value))}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-accent-primary focus:outline-none"
                        >
                            <option value={6}>6 Digits</option>
                            <option value={8}>8 Digits</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary">Period (Seconds)</label>
                        <input
                            type="number"
                            value={period}
                            onChange={(e) => setPeriod(parseInt(e.target.value))}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-accent-primary focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <p className="text-xs text-center text-text-tertiary max-w-sm mx-auto">
                This tool implements standard TOTP (RFC 6238). Copy the secret key into your authenticator app to verify match.
            </p>
        </div>
    );
}
