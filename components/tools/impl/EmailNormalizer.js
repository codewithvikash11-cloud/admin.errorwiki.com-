"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, Copy, AlertCircle } from 'lucide-react';

export default function EmailNormalizer() {
    const [email, setEmail] = useState('');
    const [normalized, setNormalized] = useState(null);
    const [copied, setCopied] = useState(false);

    const normalize = (input) => {
        if (!input) {
            setNormalized(null);
            return;
        }

        const trimmed = input.trim();
        const parts = trimmed.split('@');

        if (parts.length !== 2) {
            setNormalized({
                isValid: false,
                error: 'Invalid email format'
            });
            return;
        }

        let [user, domain] = parts;
        domain = domain.toLowerCase();

        // Specific provider login (Gmail, etc.)
        // Gmail: ignores dots, ignores +suffix
        const isGmail =
            domain === 'gmail.com' ||
            domain === 'googlemail.com';

        let standardizedUser = user;

        if (isGmail) {
            standardizedUser = standardizedUser.replace(/\./g, ''); // Remove dots
            standardizedUser = standardizedUser.split('+')[0]; // Remove suffix
        }

        // Outlook/Hotmail: ignores +suffix but keeps dots? (Actually outlook often ignores dots too but implementation varies, safer to strict normalize dots only for known dot-ignoring providers like Gmail)
        // For 'normalize', standard approach is usually just lowercase + trim for most.
        // But the "Email Normalize" tool usually implies getting the "canonical" version for deduplication.

        const canonical = `${standardizedUser.toLowerCase()}@${domain}`;

        setNormalized({
            isValid: true,
            original: trimmed,
            canonical: canonical,
            domain: domain,
            user: standardizedUser,
            isGmail: isGmail
        });
    };

    const handleCopy = () => {
        if (normalized?.canonical) {
            navigator.clipboard.writeText(normalized.canonical);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        normalize(e.target.value);
                    }}
                    placeholder="Enter email address (e.g. John.Doe+test@gmail.com)"
                    className="w-full bg-surface border border-border rounded-xl pl-4 pr-4 py-4 text-lg text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all font-medium"
                />
            </div>

            {normalized && normalized.isValid && (
                <div className="space-y-4">
                    <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={handleCopy}
                                className="p-2 bg-surface-highlight hover:bg-accent-primary hover:text-white rounded-lg transition-colors text-text-secondary"
                                title="Copy Canonical Email"
                            >
                                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                            </button>
                        </div>

                        <div className="space-y-1 mb-6">
                            <div className="text-xs text-text-tertiary uppercase font-bold tracking-wider">Normalized / Canonical</div>
                            <div className="text-2xl md:text-3xl font-bold text-accent-primary break-all">
                                {normalized.canonical}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-surface-highlight/50 p-3 rounded-lg">
                                <span className="text-text-secondary block text-xs mb-1">Domain</span>
                                <span className="font-semibold text-text-primary">{normalized.domain}</span>
                            </div>
                            <div className="bg-surface-highlight/50 p-3 rounded-lg">
                                <span className="text-text-secondary block text-xs mb-1">User</span>
                                <span className="font-semibold text-text-primary">{normalized.user}</span>
                            </div>
                        </div>

                        {normalized.isGmail && (
                            <div className="mt-4 text-xs text-text-tertiary flex items-center gap-2">
                                <AlertCircle size={12} />
                                <span>Gmail normalization applied (dots removed, suffix ignored).</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {normalized && !normalized.isValid && email.trim().length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>Invalid email format</span>
                </div>
            )}

            {!email && (
                <div className="text-center text-sm text-text-secondary bg-surface/30 p-8 rounded-xl border border-dashed border-border mx-auto w-full">
                    <Mail className="mx-auto mb-2 opacity-50" size={24} />
                    Enter an email to clean formatting, lowercase, and resolve provider-specific aliases.
                </div>
            )}
        </div>
    );
}
