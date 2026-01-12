"use client";

import React, { useState } from 'react';
import { Lock, Unlock, RefreshCw, Copy, Check, ArrowRightLeft } from 'lucide-react';

export default function EncryptDecrypt() {
    const [mode, setMode] = useState('encrypt'); // encrypt | decrypt
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [keyBits, setKeyBits] = useState(256);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // AES-GCM Implementation
    // We derive a key from the password using PBKDF2
    // We encapusalte the salt and iv in the result string for decryption: "salt:iv:ciphertext" (Hex encoded)

    const deriveKey = async (pass, salt) => {
        const encoder = new TextEncoder();
        const baseKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(pass),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            baseKey,
            { name: 'AES-GCM', length: keyBits },
            false,
            ['encrypt', 'decrypt']
        );
    };

    const buffToHex = (buff) => {
        return Array.from(new Uint8Array(buff)).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const hexToBuff = (hex) => {
        return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    };

    const handleProcess = async () => {
        if (!text || !password) return;
        setLoading(true);
        setResult('');

        try {
            if (mode === 'encrypt') {
                const salt = crypto.getRandomValues(new Uint8Array(16));
                const iv = crypto.getRandomValues(new Uint8Array(12));

                const key = await deriveKey(password, salt);
                const encoder = new TextEncoder();

                const encrypted = await crypto.subtle.encrypt(
                    { name: 'AES-GCM', iv: iv },
                    key,
                    encoder.encode(text)
                );

                // Format: salt:iv:ciphertext
                setResult(`${buffToHex(salt)}:${buffToHex(iv)}:${buffToHex(encrypted)}`);

            } else {
                // Decrypt
                const parts = text.split(':');
                if (parts.length !== 3) throw new Error("Invalid format. Expected salt:iv:ciphertext hex string.");

                const salt = hexToBuff(parts[0]);
                const iv = hexToBuff(parts[1]);
                const ciphertext = hexToBuff(parts[2]);

                const key = await deriveKey(password, salt);

                const decrypted = await crypto.subtle.decrypt(
                    { name: 'AES-GCM', iv: iv },
                    key,
                    ciphertext
                );

                const decoder = new TextDecoder();
                setResult(decoder.decode(decrypted));
            }
        } catch (error) {
            console.error(error);
            setResult(mode === 'decrypt' ? 'Decryption failed. Wrong password or corrupted data.' : 'Encryption failed.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-center">
                <div className="bg-surface border border-border p-1 rounded-xl flex items-center gap-1">
                    <button
                        onClick={() => setMode('encrypt')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${mode === 'encrypt' ? 'bg-accent-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-surface-active'}`}
                    >
                        <Lock size={16} /> Encrypt
                    </button>
                    <button
                        onClick={() => setMode('decrypt')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${mode === 'decrypt' ? 'bg-green-600 text-white shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-surface-active'}`}
                    >
                        <Unlock size={16} /> Decrypt
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider block">
                        {mode === 'encrypt' ? 'Plaintext Input' : 'Encrypted Ciphertext'}
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Paste salt:iv:ciphertext string..."}
                        className="w-full h-48 bg-surface border border-border rounded-xl p-4 text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none font-mono text-sm"
                    />
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider block">Configuration</label>
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-text-primary">Password / Passphrase</span>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Secret password..."
                                    className="w-full bg-surface border border-border rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-accent-primary"
                                />
                                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-bold text-text-primary">Algorithm</span>
                            <div className="px-4 py-3 bg-surface-highlight border border-border rounded-xl text-sm font-mono text-text-secondary">
                                AES-GCM (256-bit) + PBKDF2 (100k rounds)
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleProcess}
                        disabled={!text || !password || loading}
                        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-white shadow-lg ${mode === 'encrypt' ? 'bg-accent-primary hover:bg-accent-hover shadow-accent-primary/20' : 'bg-green-600 hover:bg-green-700 shadow-green-600/20'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {loading ? <RefreshCw size={18} className="animate-spin" /> : <ArrowRightLeft size={18} />}
                        {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 relative group">
                <label className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 block">
                    {mode === 'encrypt' ? 'Encrypted Output' : 'Decrypted Output'}
                </label>

                <div className={`w-full min-h-[100px] bg-background border border-border rounded-xl p-4 break-all font-mono text-sm leading-relaxed ${result.startsWith('Decryption failed') ? 'text-red-400' : 'text-text-primary'}`}>
                    {result || <span className="text-text-tertiary italic">Result will appear here...</span>}
                </div>

                {result && !result.startsWith('Decryption failed') && (
                    <button
                        onClick={copyToClipboard}
                        className="mt-4 flex items-center gap-2 px-4 py-2 ml-auto rounded-lg bg-surface-highlight hover:bg-surface-active text-text-secondary hover:text-white transition-colors text-sm font-medium border border-border"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy Result"}
                    </button>
                )}
            </div>
        </div>
    );
}
