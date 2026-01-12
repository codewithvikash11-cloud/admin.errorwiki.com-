"use client";
import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export default function CurlConverter() {
    const [curl, setCurl] = useState('');
    const [output, setOutput] = useState('// JavaScript Fetch will appear here');
    const [mode, setMode] = useState('fetch'); // fetch | axios

    const convert = (input) => {
        setCurl(input);
        if (!input.trim().startsWith('curl')) return;

        // Very basic parser for demo (Robust parsing requires a library like 'curl-to-json')
        // This extracts URL and Method for basic cases.
        try {
            const urlMatch = input.match(/'([^']+)'| "([^"]+)"| (\S+)$/); // naive url extraction
            let url = 'https://api.example.com';

            // Extract URL (heuristic)
            const parts = input.split(' ');
            for (const part of parts) {
                if (part.startsWith('http')) url = part.replace(/['"]/g, '');
            }

            const methodMatch = input.match(/-X\s+(\w+)/);
            const method = methodMatch ? methodMatch[1] : 'GET';

            if (mode === 'fetch') {
                setOutput(`fetch('${url}', {\n  method: '${method}',\n  headers: {\n    'Content-Type': 'application/json'\n  }\n})\n.then(res => res.json())\n.then(console.log);`);
            } else {
                setOutput(`axios({\n  method: '${method}',\n  url: '${url}',\n  headers: { ... }\n});`);
            }
        } catch (e) {
            setOutput('// Failed to parse cURL');
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">cURL Command</label>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-cyan-500 resize-none text-cyan-300"
                    placeholder="curl -X POST https://api.example.com/data..."
                    value={curl}
                    onChange={(e) => convert(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setMode('fetch'); convert(curl); }}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${mode === 'fetch' ? 'bg-cyan-600 text-white' : 'bg-[#334155] text-gray-400'}`}
                        >
                            Fetch
                        </button>
                        <button
                            onClick={() => { setMode('axios'); convert(curl); }}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${mode === 'axios' ? 'bg-cyan-600 text-white' : 'bg-[#334155] text-gray-400'}`}
                        >
                            Axios
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm text-gray-300 overflow-auto">
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
}
