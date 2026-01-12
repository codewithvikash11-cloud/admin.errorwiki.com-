"use client";

import React, { useState, useEffect } from 'react';
import { Percent, ArrowRight } from 'lucide-react';

export default function PercentageCalculator() {
    // 1. What is X% of Y?
    const [calc1, setCalc1] = useState({ x: '', y: '', res: null });
    // 2. X is what % of Y?
    const [calc2, setCalc2] = useState({ x: '', y: '', res: null });
    // 3. What is the % change from X to Y?
    const [calc3, setCalc3] = useState({ x: '', y: '', res: null });

    useEffect(() => {
        const { x, y } = calc1;
        if (x && y) {
            const res = (parseFloat(x) / 100) * parseFloat(y);
            setCalc1(prev => ({ ...prev, res: isNaN(res) ? null : res.toFixed(2) }));
        } else {
            setCalc1(prev => ({ ...prev, res: null }));
        }
    }, [calc1.x, calc1.y]);

    useEffect(() => {
        const { x, y } = calc2;
        if (x && y && parseFloat(y) !== 0) {
            const res = (parseFloat(x) / parseFloat(y)) * 100;
            setCalc2(prev => ({ ...prev, res: isNaN(res) ? null : res.toFixed(2) }));
        } else {
            setCalc2(prev => ({ ...prev, res: null }));
        }
    }, [calc2.x, calc2.y]);

    useEffect(() => {
        const { x, y } = calc3;
        if (x && y && parseFloat(x) !== 0) {
            const res = ((parseFloat(y) - parseFloat(x)) / parseFloat(x)) * 100;
            setCalc3(prev => ({ ...prev, res: isNaN(res) ? null : res.toFixed(2) }));
        } else {
            setCalc3(prev => ({ ...prev, res: null }));
        }
    }, [calc3.x, calc3.y]);

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {/* Card 1: X% of Y */}
            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full flex items-center gap-3">
                    <span className="font-semibold text-text-primary whitespace-nowrap">What is</span>
                    <div className="relative flex-1">
                        <input
                            type="number"
                            value={calc1.x}
                            onChange={(e) => setCalc1({ ...calc1, x: e.target.value })}
                            className="w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-primary transition-colors text-center font-bold"
                            placeholder="X"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">%</span>
                    </div>
                    <span className="font-semibold text-text-primary">of</span>
                    <input
                        type="number"
                        value={calc1.y}
                        onChange={(e) => setCalc1({ ...calc1, y: e.target.value })}
                        className="flex-1 w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-primary transition-colors text-center font-bold"
                        placeholder="Y"
                    />
                </div>

                <ArrowRight className="text-text-tertiary hidden md:block" />

                <div className="md:w-32 w-full bg-accent-primary/10 border border-accent-primary/20 rounded-lg py-2 px-4 text-center">
                    <span className="text-xl font-black text-accent-primary">
                        {calc1.res ?? '--'}
                    </span>
                </div>
            </div>

            {/* Card 2: X is what % of Y? */}
            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full flex items-center gap-3">
                    <input
                        type="number"
                        value={calc2.x}
                        onChange={(e) => setCalc2({ ...calc2, x: e.target.value })}
                        className="flex-1 w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-primary transition-colors text-center font-bold"
                        placeholder="X"
                    />
                    <span className="font-semibold text-text-primary whitespace-nowrap">is what % of</span>
                    <input
                        type="number"
                        value={calc2.y}
                        onChange={(e) => setCalc2({ ...calc2, y: e.target.value })}
                        className="flex-1 w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-primary transition-colors text-center font-bold"
                        placeholder="Y"
                    />
                </div>

                <ArrowRight className="text-text-tertiary hidden md:block" />

                <div className="md:w-32 w-full bg-accent-primary/10 border border-accent-primary/20 rounded-lg py-2 px-4 text-center">
                    <span className="text-xl font-black text-accent-primary">
                        {calc2.res ?? '--'}%
                    </span>
                </div>
            </div>

            {/* Card 3: % Change */}
            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full flex items-center gap-3">
                    <span className="font-semibold text-text-primary whitespace-nowrap">Change from</span>
                    <input
                        type="number"
                        value={calc3.x}
                        onChange={(e) => setCalc3({ ...calc3, x: e.target.value })}
                        className="flex-1 w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-primary transition-colors text-center font-bold"
                        placeholder="X"
                    />
                    <span className="font-semibold text-text-primary">to</span>
                    <input
                        type="number"
                        value={calc3.y}
                        onChange={(e) => setCalc3({ ...calc3, y: e.target.value })}
                        className="flex-1 w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-primary transition-colors text-center font-bold"
                        placeholder="Y"
                    />
                </div>

                <ArrowRight className="text-text-tertiary hidden md:block" />

                <div className={`md:w-32 w-full border rounded-lg py-2 px-4 text-center ${calc3.res > 0 ? 'bg-green-500/10 border-green-500/20 text-green-500' : calc3.res < 0 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-surface-highlight border-border text-text-primary'}`}>
                    <span className="text-xl font-black">
                        {calc3.res > 0 ? '+' : ''}{calc3.res ?? '--'}%
                    </span>
                </div>
            </div>

            <div className="text-center text-xs text-text-tertiary mt-4">
                Enter values to calculate automatically.
            </div>
        </div>
    );
}
