"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, Info, RefreshCw } from 'lucide-react';

export default function CrontabGenerator() {
    const [fields, setFields] = useState({
        minute: '*',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*'
    });
    const [expression, setExpression] = useState('* * * * *');
    const [description, setDescription] = useState('Every minute');
    const [copied, setCopied] = useState(false);

    // Presets
    const PRESETS = [
        { label: 'Every Minute', expr: '* * * * *' },
        { label: 'Every Hour', expr: '0 * * * *' },
        { label: 'Every Day at Midnight', expr: '0 0 * * *' },
        { label: 'Every Week (Sun)', expr: '0 0 * * 0' },
        { label: 'Every Month (1st)', expr: '0 0 1 * *' },
        { label: 'Weekdays (Mon-Fri)', expr: '0 0 * * 1-5' },
    ];

    // Update expression when fields change
    useEffect(() => {
        const expr = `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
        setExpression(expr);
        generateDescription(fields);
    }, [fields]);

    const handleFieldChange = (field, value) => {
        setFields(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const loadPreset = (expr) => {
        const parts = expr.split(' ');
        if (parts.length === 5) {
            setFields({
                minute: parts[0],
                hour: parts[1],
                dayOfMonth: parts[2],
                month: parts[3],
                dayOfWeek: parts[4]
            });
        }
    };

    const generateDescription = (f) => {
        // Very basic description logic (improving this usually requires a library like 'cronstrue')
        // We will just handle common cases or show generic info.

        let desc = 'runs ';

        if (f.minute === '*' && f.hour === '*' && f.dayOfMonth === '*' && f.month === '*' && f.dayOfWeek === '*') {
            setDescription('Every minute');
            return;
        }

        if (f.minute !== '*' && f.hour === '*') desc += `at minute ${f.minute} of every hour`;
        else if (f.minute === '0' && f.hour !== '*') desc += `at minute 0 of hour ${f.hour}`;
        else if (f.minute === '0' && f.hour === '0') desc += `at midnight`;
        else desc += `at ${f.minute} ${f.hour} ${f.dayOfMonth} ${f.month} ${f.dayOfWeek}`; // Fallback

        // A proper text description is complex to build manually.
        // For this tool, we will rely on users knowing basic syntax but providing cheatsheets.
        // Or we stick to the presets for clear text.
        // Let's at least try to be helpful for standard "At XX:XX"

        if (f.dayOfMonth === '*' && f.month === '*' && f.dayOfWeek === '*') {
            if (f.hour !== '*' && f.minute !== '*') {
                setDescription(`At ${f.hour.padStart(2, '0')}:${f.minute.padStart(2, '0')} every day`);
                return;
            }
        }

        // Default fallback
        setDescription('Custom schedule');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(expression);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const InputField = ({ label, field, value, placeholder, help }) => (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
                <label className="text-sm font-bold text-text-secondary">{label}</label>
                <span className="text-xs text-text-tertiary">{help}</span>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={placeholder}
                className="bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-accent-primary transition-colors font-mono text-center font-bold text-text-primary"
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in">

            {/* Main Display */}
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-10 flex flex-col items-center gap-6 shadow-sm">
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-3xl md:text-5xl font-black text-accent-primary tracking-tight font-mono text-center break-all">
                        {expression}
                    </h2>
                    <p className="text-text-secondary font-medium">{description}</p>
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-6 py-2 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-full font-bold transition-colors"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied' : 'Copy Expression'}
                </button>
            </div>

            {/* Editor */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <InputField label="Minute" field="minute" value={fields.minute} placeholder="*" help="0-59" />
                <InputField label="Hour" field="hour" value={fields.hour} placeholder="*" help="0-23" />
                <InputField label="Day" field="dayOfMonth" value={fields.dayOfMonth} placeholder="*" help="1-31" />
                <InputField label="Month" field="month" value={fields.month} placeholder="*" help="1-12" />
                <InputField label="Week" field="dayOfWeek" value={fields.dayOfWeek} placeholder="*" help="0-6 (Sun-Sat)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Presets */}
                <div className="md:col-span-2 bg-surface border border-border rounded-xl p-6">
                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                        <RefreshCw size={18} className="text-accent-primary" />
                        Quick Presets
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.label}
                                onClick={() => loadPreset(preset.expr)}
                                className="p-3 text-left text-sm bg-background border border-border rounded-lg hover:border-accent-primary hover:bg-surface-highlight transition-all"
                            >
                                <div className="font-bold text-text-primary truncate">{preset.label}</div>
                                <div className="font-mono text-xs text-text-tertiary mt-1">{preset.expr}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Help */}
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Info size={18} className="text-accent-primary" />
                        Syntax
                    </h3>
                    <ul className="text-sm text-text-secondary space-y-2 font-mono">
                        <li><span className="text-accent-primary font-bold">*</span> : Any value</li>
                        <li><span className="text-accent-primary font-bold">,</span> : Value list separator</li>
                        <li><span className="text-accent-primary font-bold">-</span> : Range of values</li>
                        <li><span className="text-accent-primary font-bold">/</span> : Step values</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
