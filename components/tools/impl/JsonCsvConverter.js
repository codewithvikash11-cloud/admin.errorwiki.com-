"use client";

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Table, Braces } from 'lucide-react';

export default function JsonCsvConverter() {
    const [json, setJson] = useState('[\n  {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  {\n    "id": 2,\n    "name": "Jane Smith",\n    "email": "jane@test.com"\n  }\n]');
    const [csv, setCsv] = useState('id,name,email\n1,John Doe,john@example.com\n2,Jane Smith,jane@test.com');
    const [mode, setMode] = useState('json2csv'); // json2csv, csv2json
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleJsonChange = (val) => {
        setJson(val);
        setError(null);
        if (mode === 'json2csv') {
            try {
                const parsed = JSON.parse(val);
                if (!Array.isArray(parsed)) {
                    // Try to wrap if single object
                    if (typeof parsed === 'object' && parsed !== null) {
                        setCsv(convertJsonToCsv([parsed]));
                        return;
                    }
                    setError('JSON must be an array of objects');
                    return;
                }
                setCsv(convertJsonToCsv(parsed));
            } catch (e) {
                // Ignore parse errors while typing
            }
        }
    };

    const handleCsvChange = (val) => {
        setCsv(val);
        setError(null);
        if (mode === 'csv2json') {
            try {
                setJson(convertCsvToJson(val));
            } catch (e) {
                setError('Error parsing CSV');
            }
        }
    };

    const convertJsonToCsv = (jsonArray) => {
        if (!jsonArray.length) return '';
        // Get all unique keys from all objects to verify headers
        const keys = new Set();
        jsonArray.forEach(obj => Object.keys(obj).forEach(k => keys.add(k)));
        const headers = Array.from(keys);

        const csvRows = [headers.join(',')];

        jsonArray.forEach(obj => {
            const values = headers.map(header => {
                let val = obj[header];
                if (val === null || val === undefined) return '';
                val = String(val);
                // Escape quotes and commas
                if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                    val = `"${val.replace(/"/g, '""')}"`;
                }
                return val;
            });
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    };

    const convertCsvToJson = (csvText) => {
        if (!csvText.trim()) return '[]';
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) return '[]';

        // Simple CSV parser
        // Note: Does not handle multi-line fields perfectly without a complex state machine,
        // but handles standard quoted fields.
        const parseLine = (line) => {
            const result = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        current += '"';
                        i++; // Skip escaped quote
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === ',' && !inQuotes) {
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current);
            return result;
        };

        const headers = parseLine(lines[0]).map(h => h.trim());
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].trim();
            if (!currentLine) continue;
            const values = parseLine(currentLine);
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || null;
            });
            result.push(obj);
        }

        return JSON.stringify(result, null, 2);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6">
            <div className="flex items-center justify-center gap-4 bg-surface-highlight p-2 rounded-xl w-fit mx-auto border border-border">
                <button
                    onClick={() => { setMode('json2csv'); handleJsonChange(json); }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'json2csv' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    JSON <span className="opacity-50 mx-1">→</span> CSV
                </button>
                <div className="w-[1px] h-6 bg-border mx-2" />
                <button
                    onClick={() => { setMode('csv2json'); handleCsvChange(csv); }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'csv2json' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    CSV <span className="opacity-50 mx-1">→</span> JSON
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* JSON Input/Output */}
                <div className={`flex flex-col gap-2 ${mode === 'csv2json' ? 'order-last' : 'order-first'}`}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Braces size={14} className="text-yellow-400" />
                            JSON
                        </label>
                        <button onClick={() => handleCopy(json)} className="text-xs text-accent-primary hover:underline font-medium">Copy JSON</button>
                    </div>
                    <textarea
                        value={json}
                        onChange={(e) => handleJsonChange(e.target.value)}
                        readOnly={mode === 'csv2json'}
                        className={`flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-xs md:text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary ${mode === 'csv2json' ? 'opacity-90 bg-surface-highlight/20' : ''}`}
                        placeholder='[{"id": 1, "name": "..."}]'
                    />
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center justify-center">
                    <ArrowLeftRight className={`text-accent-primary transition-transform duration-500 ${mode === 'csv2json' ? 'rotate-180' : ''}`} />
                </div>

                {/* CSV Input/Output */}
                <div className={`flex flex-col gap-2 ${mode === 'json2csv' ? 'order-last' : 'order-first'}`}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Table size={14} className="text-green-400" />
                            CSV
                        </label>
                        <button onClick={() => handleCopy(csv)} className="text-xs text-accent-primary hover:underline font-medium">Copy CSV</button>
                    </div>
                    <textarea
                        value={csv}
                        onChange={(e) => handleCsvChange(e.target.value)}
                        readOnly={mode === 'json2csv'}
                        className={`flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-xs md:text-sm resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary whitespace-pre ${mode === 'json2csv' ? 'opacity-90 bg-surface-highlight/20' : ''}`}
                        placeholder="id,name..."
                    />
                </div>
            </div>

            {error && (
                <div className="text-center text-sm text-accent-error font-medium animate-pulse">
                    {error}
                </div>
            )}
        </div>
    );
}
