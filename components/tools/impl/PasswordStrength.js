"use client";

import React, { useState } from 'react';
import { Copy, RefreshCw, Eye, EyeOff, ShieldCheck, ShieldAlert, Check } from 'lucide-react';

export default function PasswordStrength() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const calculateStrength = (pwd) => {
        let score = 0;
        if (!pwd) return { score: 0, status: 'Empty', color: 'text-text-secondary', width: '0%' };

        if (pwd.length > 8) score += 20;
        if (pwd.length > 12) score += 20;
        if (/[A-Z]/.test(pwd)) score += 15;
        if (/[a-z]/.test(pwd)) score += 15;
        if (/[0-9]/.test(pwd)) score += 15;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

        if (score >= 100) return { score: 100, status: 'Very Strong', color: 'text-green-500', bg: 'bg-green-500', width: '100%' };
        if (score >= 80) return { score: 80, status: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500', width: '80%' };
        if (score >= 60) return { score: 60, status: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500', width: '60%' };
        if (score >= 40) return { score: 40, status: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500', width: '40%' };
        return { score: 20, status: 'Very Weak', color: 'text-red-500', bg: 'bg-red-500', width: '20%' };
    };

    const strength = calculateStrength(password);

    const checks = [
        { label: 'At least 8 characters', valid: password.length >= 8 },
        { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
        { label: 'Contains lowercase letter', valid: /[a-z]/.test(password) },
        { label: 'Contains number', valid: /[0-9]/.test(password) },
        { label: 'Contains special character', valid: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6">

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Type a password to analyze..."
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-lg focus:outline-none focus:border-accent-primary transition-colors"
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Strength Meter */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-text-secondary font-medium">Strength Assessment</span>
                        <span className={`text-sm font-bold ${strength.color}`}>{strength.status} ({strength.score}%)</span>
                    </div>
                    <div className="h-3 w-full bg-background rounded-full overflow-hidden">
                        <div
                            className={`h-full ${strength.bg} transition-all duration-500 ease-out`}
                            style={{ width: strength.width }}
                        ></div>
                    </div>
                </div>

                {/* Detailed Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {checks.map((check, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${check.valid ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                {check.valid ? <Check size={12} strokeWidth={3} /> : <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                            </div>
                            <span className={`text-sm ${check.valid ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>{check.label}</span>
                        </div>
                    ))}
                </div>

                {/* Security Tips */}
                <div className="bg-accent-primary/5 border border-accent-primary/10 rounded-xl p-6 mt-6">
                    <h3 className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                        <ShieldCheck size={18} />
                        <span>Security Tips</span>
                    </h3>
                    <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
                        <li>Avoid using personal information (names, birthdays).</li>
                        <li>Use a unique password for every account.</li>
                        <li>Enable Two-Factor Authentication (2FA) whenever possible.</li>
                        <li>Consider using a password manager to generate and store complex passwords.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
