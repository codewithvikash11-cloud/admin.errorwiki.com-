"use client";
import React, { useState, useEffect } from 'react';
import jsyaml from 'js-yaml';
import { ArrowLeftRight, Copy, Code } from 'lucide-react';

export default function YamlJsonConverter() {
    const [json, setJson] = useState('{\n  "name": "DevFixer",\n  "status": "Awesome"\n}');
    const [yaml, setYaml] = useState('name: DevFixer\nstatus: Awesome\n');
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('json2yaml'); // json2yaml or yaml2json

    const handleJsonChange = (val) => {
        setJson(val);
        setError(null);
        try {
            const parsed = JSON.parse(val);
            const y = jsyaml.dump(parsed);
            setYaml(y);
        } catch (e) {
            // setError('Invalid JSON'); // Don't show error immediately on typing, just don't convert
        }
    };

    const handleYamlChange = (val) => {
        setYaml(val);
        setError(null);
        try {
            const parsed = jsyaml.load(val);
            const j = JSON.stringify(parsed, null, 2);
            setJson(j);
        } catch (e) {
            // 
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6">
            <div className="flex items-center justify-center gap-4 bg-surface-highlight p-2 rounded-xl w-fit mx-auto border border-border">
                <button
                    onClick={() => setMode('json2yaml')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'json2yaml' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    JSON <span className="opacity-50 mx-1">→</span> YAML
                </button>
                <div className="w-[1px] h-6 bg-border mx-2" />
                <button
                    onClick={() => setMode('yaml2json')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'yaml2json' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    YAML <span className="opacity-50 mx-1">→</span> JSON
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* JSON Panel */}
                <div className={`flex flex-col gap-2 ${mode === 'yaml2json' ? 'order-last' : 'order-first'}`}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <span className="text-yellow-400">{'{}'}</span> JSON
                        </label>
                        <button onClick={() => copyToClipboard(json)} className="text-xs text-accent-primary hover:underline">Copy JSON</button>
                    </div>
                    <textarea
                        value={json}
                        onChange={(e) => handleJsonChange(e.target.value)}
                        readOnly={mode === 'yaml2json'}
                        className={`flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary ${mode === 'yaml2json' ? 'opacity-80' : ''}`}
                        placeholder="{ ... }"
                    />
                </div>

                {/* Arrow for Desktop */}
                <div className="hidden md:flex flex-col items-center justify-center">
                    <ArrowLeftRight className={`text-accent-primary transition-transform duration-500 ${mode === 'yaml2json' ? 'rotate-180' : ''}`} />
                </div>

                {/* YAML Panel */}
                <div className={`flex flex-col gap-2 ${mode === 'json2yaml' ? 'order-last' : 'order-first'}`}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <span className="text-red-400">---</span> YAML
                        </label>
                        <button onClick={() => copyToClipboard(yaml)} className="text-xs text-accent-primary hover:underline">Copy YAML</button>
                    </div>
                    <textarea
                        value={yaml}
                        onChange={(e) => handleYamlChange(e.target.value)}
                        readOnly={mode === 'json2yaml'}
                        className={`flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary ${mode === 'json2yaml' ? 'opacity-80' : ''}`}
                        placeholder="key: value..."
                    />
                </div>
            </div>

            <p className="text-center text-sm text-text-tertiary">
                Requires valid syntax. Invalid input will stop conversion until fixed.
            </p>
        </div>
    );
}
