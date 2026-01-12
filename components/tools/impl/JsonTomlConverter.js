"use client";

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Code, Settings } from 'lucide-react';

export default function JsonTomlConverter() {
    const [json, setJson] = useState('{\n  "title": "TOML Example",\n  "owner": {\n    "name": "Tom Preston-Werner",\n    "dob": "1979-05-27T07:32:00-08:00"\n  },\n  "database": {\n    "server": "192.168.1.1",\n    "ports": [ 8001, 8001, 8002 ]\n  }\n}');
    const [toml, setToml] = useState('title = "TOML Example"\n\n[owner]\nname = "Tom Preston-Werner"\ndob = "1979-05-27T07:32:00-08:00"\n\n[database]\nserver = "192.168.1.1"\nports = [ 8001, 8001, 8002 ]');
    const [mode, setMode] = useState('json2toml');
    const [error, setError] = useState(null);

    // --- Lightweight TOML Stringifier ---
    const toToml = (obj) => {
        let output = '';

        const convertValue = (val) => {
            if (typeof val === 'string') return `"${val}"`; // Basic escaping needed?
            if (typeof val === 'number' || typeof val === 'boolean') return String(val);
            if (val instanceof Date) return val.toISOString();
            if (Array.isArray(val)) {
                return `[ ${val.map(convertValue).join(', ')} ]`;
            }
            return '""';
        };

        const processObject = (currentObj, prefix = '') => {
            let sectionContent = '';
            let subSections = '';

            // 1. Process primitives first
            for (const [key, val] of Object.entries(currentObj)) {
                if (val === null || val === undefined) continue;

                if (typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
                    // It's a nested object, handled later as a section
                } else {
                    sectionContent += `${key} = ${convertValue(val)}\n`;
                }
            }

            // 2. Add current section header and content
            if (prefix) {
                if (sectionContent) output += `\n[${prefix}]\n${sectionContent}`;
            } else {
                output += sectionContent;
            }

            // 3. Process nested objects (sections)
            for (const [key, val] of Object.entries(currentObj)) {
                if (val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
                    processObject(val, prefix ? `${prefix}.${key}` : key);
                }
            }
        };

        if (typeof obj !== 'object' || obj === null) return '';
        processObject(obj);
        return output.trim();
    };

    // --- Lightweight TOML Parser ---
    // Note: This is a simplified regex-based parser. Full TOML spec implementation is massive.
    // Handles: basic keys, strings, numbers, booleans, arrays, [sections].
    const parseToml = (input) => {
        const result = {};
        let currentSection = result;

        const lines = input.split('\n');

        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;

            // Section [section]
            if (line.startsWith('[') && line.endsWith(']')) {
                const sectionName = line.slice(1, -1);
                // Resolve nested section a.b.c
                const parts = sectionName.split('.');
                let temp = result;
                for (const part of parts) {
                    if (!temp[part]) temp[part] = {};
                    temp = temp[part];
                }
                currentSection = temp;
                continue;
            }

            // Key = Value
            const equalIndex = line.indexOf('=');
            if (equalIndex > 0) {
                const key = line.slice(0, equalIndex).trim();
                let valueStr = line.slice(equalIndex + 1).trim();

                let value;
                if (valueStr.startsWith('"') || valueStr.startsWith("'")) {
                    // String (strip quotes) - extremely basic
                    value = valueStr.slice(1, -1);
                } else if (valueStr === 'true') value = true;
                else if (valueStr === 'false') value = false;
                else if (valueStr.startsWith('[')) {
                    // Array [1, 2, 3] - removing brackets and splitting
                    const content = valueStr.slice(1, -1);
                    if (!content.trim()) value = [];
                    else value = content.split(',').map(v => {
                        v = v.trim();
                        if (!v) return null;
                        if (v.startsWith('"')) return v.slice(1, -1);
                        if (!isNaN(v)) return Number(v);
                        return v;
                    }).filter(v => v !== null);
                } else if (!isNaN(valueStr)) {
                    value = Number(valueStr);
                } else {
                    // Date or unquoted string? 
                    // Let's assume date if it matches basic iso pattern
                    if (valueStr.match(/^\d{4}-\d{2}-\d{2}/)) value = valueStr;
                    else value = valueStr;
                }

                currentSection[key] = value;
            }
        }
        return result;
    };


    const handleJsonChange = (val) => {
        setJson(val);
        setError(null);
        if (mode === 'json2toml') {
            try {
                const parsed = JSON.parse(val);
                setToml(toToml(parsed));
            } catch (e) {
                // ignore
            }
        }
    };

    const handleTomlChange = (val) => {
        setToml(val);
        setError(null);
        if (mode === 'toml2json') {
            try {
                const parsed = parseToml(val);
                setJson(JSON.stringify(parsed, null, 2));
            } catch (e) {
                setError('Error parsing TOML');
            }
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6">
            <div className="flex items-center justify-center gap-4 bg-surface-highlight p-2 rounded-xl w-fit mx-auto border border-border">
                <button
                    onClick={() => { setMode('json2toml'); handleJsonChange(json); }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'json2toml' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    JSON <span className="opacity-50 mx-1">→</span> TOML
                </button>
                <div className="w-[1px] h-6 bg-border mx-2" />
                <button
                    onClick={() => { setMode('toml2json'); handleTomlChange(toml); }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'toml2json' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    TOML <span className="opacity-50 mx-1">→</span> JSON
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex flex-col gap-2 ${mode === 'toml2json' ? 'order-last' : 'order-first'}`}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <span className="text-yellow-400">{'{}'}</span> JSON
                        </label>
                        <button onClick={() => handleCopy(json)} className="text-xs text-accent-primary hover:underline font-medium">Copy JSON</button>
                    </div>
                    <textarea
                        value={json}
                        onChange={(e) => handleJsonChange(e.target.value)}
                        readOnly={mode === 'toml2json'}
                        className={`flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-xs md:text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary ${mode === 'toml2json' ? 'opacity-90 bg-surface-highlight/20' : ''}`}
                    />
                </div>

                <div className="hidden md:flex flex-col items-center justify-center">
                    <ArrowLeftRight className={`text-accent-primary transition-transform duration-500 ${mode === 'toml2json' ? 'rotate-180' : ''}`} />
                </div>

                <div className={`flex flex-col gap-2 ${mode === 'json2toml' ? 'order-last' : 'order-first'}`}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Settings size={14} className="text-blue-400" />
                            TOML
                        </label>
                        <button onClick={() => handleCopy(toml)} className="text-xs text-accent-primary hover:underline font-medium">Copy TOML</button>
                    </div>
                    <textarea
                        value={toml}
                        onChange={(e) => handleTomlChange(e.target.value)}
                        readOnly={mode === 'json2toml'}
                        className={`flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-xs md:text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary whitespace-pre ${mode === 'json2toml' ? 'opacity-90 bg-surface-highlight/20' : ''}`}
                        placeholder="Simple TOML support..."
                    />
                </div>
            </div>
            <p className="text-center text-xs text-text-tertiary">
                Note: This tool uses a lightweight parser. Complex TOML features (inline tables, nested arrays of objects) might not be fully supported.
            </p>
        </div>
    );
}
