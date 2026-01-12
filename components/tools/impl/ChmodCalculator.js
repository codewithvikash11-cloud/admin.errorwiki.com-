"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Copy, Check, Info } from 'lucide-react';

export default function ChmodCalculator() {
    // State for permissions: [read, write, execute] for [owner, group, public]
    // Structure: { owner: {r: true, w: true, x: false}, group: ... }
    const [perms, setPerms] = useState({
        owner: { r: true, w: true, x: false }, // 6
        group: { r: true, w: false, x: false }, // 4
        public: { r: true, w: false, x: false } // 4
    }); // Default 644

    const [octal, setOctal] = useState('644');
    const [symbolic, setSymbolic] = useState('-rw-r--r--');
    const [copied, setCopied] = useState(null);

    // Calculate Octal and Symbolic from State
    useEffect(() => {
        const calculateVal = (p) => {
            return (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
        };
        const o = calculateVal(perms.owner);
        const g = calculateVal(perms.group);
        const p = calculateVal(perms.public);
        const newOctal = `${o}${g}${p}`;
        setOctal(newOctal);

        const sym = (
            (perms.owner.r ? 'r' : '-') + (perms.owner.w ? 'w' : '-') + (perms.owner.x ? 'x' : '-') +
            (perms.group.r ? 'r' : '-') + (perms.group.w ? 'w' : '-') + (perms.group.x ? 'x' : '-') +
            (perms.public.r ? 'r' : '-') + (perms.public.w ? 'w' : '-') + (perms.public.x ? 'x' : '-')
        );
        setSymbolic(sym);
    }, [perms]);

    const toggle = (entity, type) => {
        setPerms(prev => ({
            ...prev,
            [entity]: {
                ...prev[entity],
                [type]: !prev[entity][type]
            }
        }));
    };

    const handleOctalChange = (val) => {
        // Allow typing, but validate on length 3
        if (val.length > 3) return;
        if (!/^[0-7]*$/.test(val)) return; // Only 0-7 allowed

        // Temporarily just set input text if incomplete?
        // Actually, let's update state if valid
        if (val.length === 3) {
            const o = parseInt(val[0]);
            const g = parseInt(val[1]);
            const p = parseInt(val[2]);

            const getPerms = (num) => ({
                r: (num & 4) !== 0,
                w: (num & 2) !== 0,
                x: (num & 1) !== 0
            });

            setPerms({
                owner: getPerms(o),
                group: getPerms(g),
                public: getPerms(p)
            });
        }
        // We still drive the input from the calculated effect usually, 
        // so to support typing we might need to decouple or Handle specific 'editing' state.
        // For simplicity, we'll force the update immediate if it parses, otherwise 
        // the Effect might overwrite it if we aren't careful.
        // Actually, since the Effect runs on `perms` change, updating `perms` will trigger it.
        // But what if user types '7'? We don't want to reset to 644 immediately.
        // Let's just update `perms` only when we have a full 3 chars, 
        // logic for input value needs to be separate if we want smooth typing?
        // No, let's strictly control it:
        // User types 7, input shows 7, perm state waits? 
        // Let's allow direct updates via Buttons primarily.
        // If typing, we'll parse immediatley if 3 digits.
    };

    // Better Approach: 
    // The "Octal" display is read-only or strictly controlled? 
    // Let's make it an input that updates state on completion.

    const setByPreset = (oct) => {
        handleOctalChange(oct);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    const Checkbox = ({ checked, onChange, label }) => (
        <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-surface-highlight transition-colors border border-transparent hover:border-border">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-accent-primary border-accent-primary' : 'bg-background border-border group-hover:border-accent-primary/50'}`}>
                {checked && <Check size={14} className="text-white" />}
            </div>
            <span className={`font-medium ${checked ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</span>
        </label>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-sm">

                {/* Left: Grid */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Owner */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-text-primary border-b border-border pb-2">Owner</h4>
                            <div className="flex flex-col gap-1">
                                <Checkbox checked={perms.owner.r} onChange={() => toggle('owner', 'r')} label="Read (4)" />
                                <Checkbox checked={perms.owner.w} onChange={() => toggle('owner', 'w')} label="Write (2)" />
                                <Checkbox checked={perms.owner.x} onChange={() => toggle('owner', 'x')} label="Execute (1)" />
                            </div>
                        </div>
                        {/* Group */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-text-primary border-b border-border pb-2">Group</h4>
                            <div className="flex flex-col gap-1">
                                <Checkbox checked={perms.group.r} onChange={() => toggle('group', 'r')} label="Read (4)" />
                                <Checkbox checked={perms.group.w} onChange={() => toggle('group', 'w')} label="Write (2)" />
                                <Checkbox checked={perms.group.x} onChange={() => toggle('group', 'x')} label="Execute (1)" />
                            </div>
                        </div>
                        {/* Public */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-text-primary border-b border-border pb-2">Public</h4>
                            <div className="flex flex-col gap-1">
                                <Checkbox checked={perms.public.r} onChange={() => toggle('public', 'r')} label="Read (4)" />
                                <Checkbox checked={perms.public.w} onChange={() => toggle('public', 'w')} label="Write (2)" />
                                <Checkbox checked={perms.public.x} onChange={() => toggle('public', 'x')} label="Execute (1)" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Output & Presets */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    <div className="bg-background border border-border rounded-xl p-5 flex flex-col gap-4">
                        <div>
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 block">Octal</label>
                            <div className="text-4xl font-black text-accent-primary font-mono tracking-tight">{octal}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 block">Symbolic</label>
                            <div className="text-xl font-bold text-text-primary font-mono flex items-center justify-between">
                                {symbolic}
                                <button onClick={() => handleCopy(symbolic)} className="p-1.5 text-text-tertiary hover:text-accent-primary transition-colors">
                                    {copied === symbolic ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 block">Command</label>
                            <div className="bg-surface p-3 rounded-lg border border-border text-sm font-mono text-text-secondary break-all flex items-start justify-between gap-2">
                                <span>chmod {octal} filename</span>
                                <button onClick={() => handleCopy(`chmod ${octal} filename`)} className="pt-0.5 text-text-tertiary hover:text-accent-primary transition-colors">
                                    {copied === `chmod ${octal} filename` ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-text-secondary">Common Presets</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setByPreset('777')} className="px-3 py-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-sm text-text-primary font-medium transition-colors text-left">
                                <span className="font-bold text-accent-primary mr-1">777</span> All Access
                            </button>
                            <button onClick={() => setByPreset('755')} className="px-3 py-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-sm text-text-primary font-medium transition-colors text-left">
                                <span className="font-bold text-accent-primary mr-1">755</span> Executable
                            </button>
                            <button onClick={() => setByPreset('644')} className="px-3 py-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-sm text-text-primary font-medium transition-colors text-left">
                                <span className="font-bold text-accent-primary mr-1">644</span> Web File
                            </button>
                            <button onClick={() => setByPreset('600')} className="px-3 py-2 bg-surface hover:bg-surface-highlight border border-border rounded-lg text-sm text-text-primary font-medium transition-colors text-left">
                                <span className="font-bold text-accent-primary mr-1">600</span> Private Key
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 flex gap-4">
                <Info className="shrink-0 text-accent-primary" size={24} />
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                    <p>
                        <strong>Quick Reference:</strong>
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <li><strong className="text-text-primary">4</strong> = Read (r)</li>
                        <li><strong className="text-text-primary">2</strong> = Write (w)</li>
                        <li><strong className="text-text-primary">1</strong> = Execute (x)</li>
                    </ul>
                    <p>
                        Sum these numbers to get the permission digit for Owner, Group, or Public.
                        Example: Read + Write = 4 + 2 = <strong>6</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
