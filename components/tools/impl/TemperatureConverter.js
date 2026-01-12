"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Thermometer } from 'lucide-react';

export default function TemperatureConverter() {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');
    const [kelvin, setKelvin] = useState('');

    const handleCelsiusChange = (value) => {
        setCelsius(value);
        if (value === '') {
            setFahrenheit('');
            setKelvin('');
            return;
        }
        const c = parseFloat(value);
        if (!isNaN(c)) {
            setFahrenheit((c * 9 / 5 + 32).toFixed(2));
            setKelvin((c + 273.15).toFixed(2));
        }
    };

    const handleFahrenheitChange = (value) => {
        setFahrenheit(value);
        if (value === '') {
            setCelsius('');
            setKelvin('');
            return;
        }
        const f = parseFloat(value);
        if (!isNaN(f)) {
            setCelsius(((f - 32) * 5 / 9).toFixed(2));
            setKelvin(((f - 32) * 5 / 9 + 273.15).toFixed(2));
        }
    };

    const handleKelvinChange = (value) => {
        setKelvin(value);
        if (value === '') {
            setCelsius('');
            setFahrenheit('');
            return;
        }
        const k = parseFloat(value);
        if (!isNaN(k)) {
            setCelsius((k - 273.15).toFixed(2));
            setFahrenheit(((k - 273.15) * 9 / 5 + 32).toFixed(2));
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="bg-surface p-6 rounded-2xl border border-border text-center">
                <div className="w-12 h-12 bg-accent-primary/10 text-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Thermometer size={24} />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Real-time Converter</h3>
                <p className="text-text-secondary text-sm">Type in any field to convert to other units instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Celsius */}
                <div className="bg-surface-highlight p-6 rounded-xl border border-border flex flex-col gap-3 relative group focus-within:ring-2 focus-within:ring-accent-primary/50 transition-all">
                    <label className="text-sm font-semibold text-text-secondary">Celsius (°C)</label>
                    <input
                        type="number"
                        value={celsius}
                        onChange={(e) => handleCelsiusChange(e.target.value)}
                        placeholder="0"
                        className="bg-transparent text-3xl font-bold text-text-primary outline-none w-full placeholder:text-text-tertiary/20"
                    />
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary pointer-events-none">
                        <ArrowRightLeft size={16} />
                    </div>
                </div>

                {/* Fahrenheit */}
                <div className="bg-surface-highlight p-6 rounded-xl border border-border flex flex-col gap-3 relative group focus-within:ring-2 focus-within:ring-accent-primary/50 transition-all">
                    <label className="text-sm font-semibold text-text-secondary">Fahrenheit (°F)</label>
                    <input
                        type="number"
                        value={fahrenheit}
                        onChange={(e) => handleFahrenheitChange(e.target.value)}
                        placeholder="32"
                        className="bg-transparent text-3xl font-bold text-text-primary outline-none w-full placeholder:text-text-tertiary/20"
                    />
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary pointer-events-none">
                        <ArrowRightLeft size={16} />
                    </div>
                </div>

                {/* Kelvin */}
                <div className="bg-surface-highlight p-6 rounded-xl border border-border flex flex-col gap-3 relative group focus-within:ring-2 focus-within:ring-accent-primary/50 transition-all">
                    <label className="text-sm font-semibold text-text-secondary">Kelvin (K)</label>
                    <input
                        type="number"
                        value={kelvin}
                        onChange={(e) => handleKelvinChange(e.target.value)}
                        placeholder="273.15"
                        className="bg-transparent text-3xl font-bold text-text-primary outline-none w-full placeholder:text-text-tertiary/20"
                    />
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary pointer-events-none">
                        <ArrowRightLeft size={16} />
                    </div>
                </div>
            </div>

            {/* Common Conversions */}
            <div className="mt-8">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Thermometer size={16} className="text-accent-primary" />
                    Common Temperatures
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Absolute Zero', c: -273.15, f: -459.67, k: 0 },
                        { label: 'Freezing Point', c: 0, f: 32, k: 273.15 },
                        { label: 'Body Temp', c: 37, f: 98.6, k: 310.15 },
                        { label: 'Boiling Point', c: 100, f: 212, k: 373.15 },
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-surface border border-border rounded-xl text-xs space-y-1 hover:border-accent-primary/30 transition-colors">
                            <div className="font-bold text-text-primary mb-1">{item.label}</div>
                            <div className="flex justify-between text-text-secondary"><span>{item.c}°C</span></div>
                            <div className="flex justify-between text-text-secondary"><span>{item.f}°F</span></div>
                            <div className="flex justify-between text-text-secondary"><span>{item.k}K</span></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
