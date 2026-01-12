"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, History, Trash2, ArrowRight } from 'lucide-react';

export default function MathEvaluator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    const evaluate = () => {
        if (!expression.trim()) return;

        try {
            // Safety: Only allow basic math characters and Math functions
            // This is a simple client-side evaluator tool, so strict security is less critical than server-side,
            // but we still want to avoid arbitrary code execution.
            // We'll use the 'Function' constructor with a limited scope.

            const sanitized = expression
                .replace(/[^-()\d/*+%.^Matha-z]/g, '') // Allow numbers, operators, parens, and generic letters for Math functions
                .replace(/\^/g, '**'); // Replace ^ with ** for power

            // Create a function that returns the evaluated result
            // We expose the Math object properties directly to the scope if possible, 
            // but easiest is just returning the eval result.
            // A clearer way for users: they can type Math.sin(x) or just sin(x) if we map it.

            // Let's make it user friendly: map common Math functions to top level
            const mathKeys = Object.getOwnPropertyNames(Math);
            const mathArgs = mathKeys.join(', ');
            const mathVals = mathKeys.map(k => Math[k]);

            const func = new Function(...mathKeys, `return ${sanitized}`);
            const res = func(...mathVals);

            if (isNaN(res) || !isFinite(res)) {
                throw new Error("Invalid Result");
            }

            const newResult = res.toString();
            setResult(newResult);
            setError(null);

            setHistory(prev => [{
                expr: expression,
                res: newResult,
                timestamp: new Date()
            }, ...prev].slice(0, 10)); // Keep last 10

        } catch (err) {
            setError('Invalid expression');
            setResult(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            evaluate();
        }
    };

    const clearHistory = () => setHistory([]);

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {/* Input Area */}
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 w-full">
                    <label className="text-sm font-semibold text-text-secondary mb-2 block">Expression</label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g. 2 * (10 + 5) or Math.sin(90)"
                            className="w-full bg-surface-highlight border border-border rounded-xl pl-4 pr-14 py-4 text-lg md:text-xl font-mono text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all placeholder:text-text-tertiary"
                            autoFocus
                        />
                        <button
                            onClick={evaluate}
                            className="absolute right-2 p-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg transition-colors"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Result Display */}
                {result !== null && !error && (
                    <div className="relative z-10 animate-in fade-in slide-in-from-top-2">
                        <div className="text-xs text-text-tertiary uppercase font-semibold mb-1">Result</div>
                        <div className="text-4xl md:text-5xl font-black text-accent-primary tracking-tight break-all font-mono">
                            {result}
                        </div>
                    </div>
                )}
                {error && (
                    <div className="relative z-10 animate-in fade-in slide-in-from-top-2">
                        <div className="text-red-500 font-bold flex items-center gap-2">
                            <Calculator size={18} />
                            {error}
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-text-tertiary">
                <div className="bg-surface border border-border rounded-lg p-3 text-center">Use <code>*</code> for multiplication</div>
                <div className="bg-surface border border-border rounded-lg p-3 text-center">Use <code>/</code> for division</div>
                <div className="bg-surface border border-border rounded-lg p-3 text-center">Use <code>^</code> or <code>**</code> for power</div>
                <div className="bg-surface border border-border rounded-lg p-3 text-center">Use <code>Math.PI</code> for PI</div>
            </div>

            {/* History */}
            {history.length > 0 && (
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-border bg-surface-highlight/30 flex justify-between items-center">
                        <h3 className="font-bold text-text-primary flex items-center gap-2">
                            <History size={16} /> History
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                        >
                            <Trash2 size={12} /> Clear
                        </button>
                    </div>
                    <div className="divide-y divide-border">
                        {history.map((item, index) => (
                            <div key={index} className="p-4 hover:bg-surface-highlight/50 transition-colors flex justify-between items-center group">
                                <div className="font-mono text-sm">
                                    <span className="text-text-secondary">{item.expr}</span>
                                    <span className="text-text-tertiary mx-2">=</span>
                                    <span className="text-text-primary font-bold">{item.res}</span>
                                </div>
                                <button
                                    onClick={() => setExpression(item.expr)}
                                    className="opacity-0 group-hover:opacity-100 text-xs bg-surface border border-border px-2 py-1 rounded hover:border-accent-primary/50 transition-all text-text-secondary"
                                >
                                    Load
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
