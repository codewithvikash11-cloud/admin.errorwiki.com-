"use client";

import React, { useState, useEffect } from 'react';
import { Keyboard, Command, ArrowUp, Monitor, Zap } from 'lucide-react';

export default function KeycodeInfo() {
    const [eventInfo, setEventInfo] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent default behavior for some keys to keep focus, 
            // but allow critical ones like F5 (Refresh) or Ctrl+W (Close) unless we are very aggressive.
            // For a tool like data-fixer, let's keep it safe: prevent scrolling/navigation mostly.
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }

            const info = {
                key: e.key,
                code: e.code,
                which: e.which || e.keyCode,
                location: e.location,
                modifiers: {
                    ctrl: e.ctrlKey,
                    shift: e.shiftKey,
                    alt: e.altKey,
                    meta: e.metaKey
                },
                repeat: e.repeat
            };

            setEventInfo(info);
            setHistory(prev => [info, ...prev].slice(0, 10));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const getLocationName = (loc) => {
        switch (loc) {
            case 0: return 'Standard';
            case 1: return 'Left';
            case 2: return 'Right';
            case 3: return 'Numpad';
            default: return 'Unknown';
        }
    };

    if (!eventInfo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-6 animate-in fade-in">
                <div className="w-24 h-24 bg-surface border border-border rounded-3xl flex items-center justify-center shadow-sm relative group">
                    <Keyboard size={48} className="text-accent-primary animate-pulse" />
                    <div className="absolute inset-0 bg-accent-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                    <h2 className="text-3xl font-black text-text-primary mb-2">Press Any Key</h2>
                    <p className="text-text-secondary text-lg">Detailed keycode information will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-in zoom-in-50 duration-200">
            {/* Main Display Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Big Code */}
                <div className="bg-surface border border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 shadow-xl shadow-accent-primary/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Keyboard size={120} />
                    </div>

                    <div className="text-xl font-bold text-text-tertiary uppercase tracking-widest">JavaScript Key Code</div>
                    <div className="text-[8rem] leading-none font-black text-accent-primary font-mono tracking-tighter">
                        {eventInfo.which}
                    </div>
                    <div className="text-2xl font-bold text-text-primary">
                        {eventInfo.key === ' ' ? '(Space)' : eventInfo.key}
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <InfoCard label="event.key" value={eventInfo.key === ' ' ? '(Space)' : eventInfo.key} icon={Keyboard} />
                    <InfoCard label="event.code" value={eventInfo.code} icon={Command} />
                    <InfoCard label="event.which" value={eventInfo.which} icon={Zap} />
                    <InfoCard label="Location" value={getLocationName(eventInfo.location)} icon={Monitor} />
                </div>
            </div>

            {/* Modifiers & Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-surface border border-border rounded-2xl p-6 md:col-span-1">
                    <h3 className="font-bold text-text-secondary uppercase tracking-wider mb-4 text-sm">Modifiers</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <ModifierBadge label="General Key" active={true} /> {/* Always active as base */}
                        <ModifierBadge label="Shift" active={eventInfo.modifiers.shift} />
                        <ModifierBadge label="Ctrl" active={eventInfo.modifiers.ctrl} />
                        <ModifierBadge label="Alt" active={eventInfo.modifiers.alt} />
                        <ModifierBadge label="Meta (Cmd/Win)" active={eventInfo.modifiers.meta} />
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-2xl p-6 md:col-span-2">
                    <h3 className="font-bold text-text-secondary uppercase tracking-wider mb-4 text-sm">Raw Event Dump</h3>
                    <pre className="font-mono text-xs text-text-primary bg-background p-4 rounded-xl border border-border overflow-x-auto">
                        {JSON.stringify({
                            key: eventInfo.key,
                            code: eventInfo.code,
                            keyCode: eventInfo.which,
                            charCode: eventInfo.which,
                            location: eventInfo.location,
                            repeat: eventInfo.repeat,
                            ...eventInfo.modifiers
                        }, null, 2)}
                    </pre>
                </div>
            </div>

            {/* History - Optional, minimal list */}
            {history.length > 1 && (
                <div className="mt-4 pt-8 border-t border-border">
                    <h3 className="font-bold text-text-secondary uppercase tracking-wider mb-4 text-sm">Recent Keys</h3>
                    <div className="flex flex-wrap gap-2">
                        {history.slice(1).map((h, i) => (
                            <div key={i} className="px-3 py-2 bg-surface-highlight rounded-lg border border-border text-sm font-mono text-text-secondary flex items-center gap-2">
                                <span className="font-bold text-text-primary">{h.key === ' ' ? 'Space' : h.key}</span>
                                <span className="opacity-50">({h.which})</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function InfoCard({ label, value, icon: Icon }) {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-center gap-2 relative group overflow-hidden">
            <div className="absolute top-3 right-3 text-text-tertiary opacity-20 group-hover:opacity-100 transition-opacity">
                <Icon size={24} />
            </div>
            <div className="text-sm font-bold text-text-secondary">{label}</div>
            <div className="text-2xl font-bold text-text-primary font-mono truncate" title={value}>
                {value}
            </div>
        </div>
    );
}

function ModifierBadge({ label, active }) {
    return (
        <div className={`px-3 py-2 rounded-lg font-bold text-sm transition-all text-center border ${active ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-surface-highlight text-text-tertiary border-transparent'}`}>
            {label}
        </div>
    );
}
