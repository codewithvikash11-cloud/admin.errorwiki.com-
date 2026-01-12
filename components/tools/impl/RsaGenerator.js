"use client";

import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Key } from 'lucide-react';

export default function RsaGenerator() {
    const [bitLength, setBitLength] = useState(2048);
    const [format, setFormat] = useState('pkcs8'); // pkcs8 for private, spki for public
    const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(null);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const exportKey = async (key, type) => {
        const exported = await crypto.subtle.exportKey(type, key);
        const exportedAsBase64 = arrayBufferToBase64(exported);
        const pemHeader = type === 'spki' ? '-----BEGIN PUBLIC KEY-----' : '-----BEGIN PRIVATE KEY-----';
        const pemFooter = type === 'spki' ? '-----END PUBLIC KEY-----' : '-----END PRIVATE KEY-----';

        // Wrap lines
        const wrapped = exportedAsBase64.match(/.{1,64}/g).join('\n');

        return `${pemHeader}\n${wrapped}\n${pemFooter}`;
    };

    const generateKeys = async () => {
        setLoading(true);
        setKeys({ publicKey: '', privateKey: '' });

        // Small delay to allow UI to render loading state
        await new Promise(r => setTimeout(r, 100));

        try {
            const keyPair = await crypto.subtle.generateKey(
                {
                    name: "RSA-OAEP",
                    modulusLength: bitLength,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
            );

            const publicKeyPEM = await exportKey(keyPair.publicKey, 'spki');
            const privateKeyPEM = await exportKey(keyPair.privateKey, 'pkcs8');

            setKeys({ publicKey: publicKeyPEM, privateKey: privateKeyPEM });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, keyName) => {
        navigator.clipboard.writeText(text);
        setCopied(keyName);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-text-secondary">Key Size:</span>
                    <select
                        value={bitLength}
                        onChange={(e) => setBitLength(parseInt(e.target.value))}
                        className="bg-background border border-border rounded-lg px-4 py-2 text-sm font-bold focus:border-accent-primary focus:outline-none"
                    >
                        <option value={1024}>1024 bits (Weak)</option>
                        <option value={2048}>2048 bits (Standard)</option>
                        <option value={4096}>4096 bits (Strong)</option>
                    </select>
                </div>

                <button
                    onClick={generateKeys}
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? <RefreshCw size={18} className="animate-spin" /> : <Key size={18} />}
                    Generate Key Pair
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                    { title: 'Public Key', key: 'publicKey', color: 'text-green-400' },
                    { title: 'Private Key', key: 'privateKey', color: 'text-red-400' }
                ].map((item) => (
                    <div key={item.key} className="bg-surface border border-border rounded-2xl p-6 flex flex-col relative group">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-sm font-bold uppercase tracking-wider ${item.color}`}>{item.title}</h3>
                            <button
                                onClick={() => copyToClipboard(keys[item.key], item.key)}
                                disabled={!keys[item.key]}
                                className="p-2 text-text-tertiary hover:text-white transition-colors"
                            >
                                {copied === item.key ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <textarea
                            readOnly
                            value={keys[item.key] || (loading ? 'Generating...' : '')}
                            className="flex-1 min-h-[400px] bg-background border border-border rounded-xl p-4 font-mono text-[10px] md:text-xs leading-relaxed text-text-secondary resize-none outline-none focus:border-accent-primary/50 transition-colors"
                            placeholder="Key will appear here..."
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
