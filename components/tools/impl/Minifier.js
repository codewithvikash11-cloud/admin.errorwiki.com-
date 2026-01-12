"use client";
import React, { useState } from 'react';

export default function Minifier() {
    const [code, setCode] = useState('');
    const [minified, setMinified] = useState('');
    const [type, setType] = useState('js');

    const handleMinify = (input) => {
        setCode(input);

        if (!input) {
            setMinified('');
            return;
        }

        // Extremely basic minifiers for client-side demo
        if (type === 'js' || type === 'css') {
            // Remove comments and whitespace
            let res = input
                .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // Remove comments
                .replace(/\s+/g, ' ') // Collapse whitespace
                .replace(/\s*([\{\}\(\)\[\];:,])\s*/g, '$1') // Remove space around chars
                .trim();
            setMinified(res);
        } else if (type === 'html') {
            let res = input
                .replace(/<!--[\s\S]*?-->/g, '')
                .replace(/\s+/g, ' ')
                .replace(/>\s+</g, '><');
            setMinified(res);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-gray-400">Input Code</label>
                    <select
                        className="bg-[#334155] text-xs rounded px-2 outline-none"
                        value={type}
                        onChange={(e) => { setType(e.target.value); handleMinify(code); }}
                    >
                        <option value="js">JavaScript</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                    </select>
                </div>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-indigo-500 resize-none"
                    placeholder="// Paste code here..."
                    value={code}
                    onChange={(e) => handleMinify(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">Minified Output</label>
                <textarea
                    readOnly
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none resize-none text-indigo-300 break-all"
                    value={minified}
                />
            </div>
        </div>
    );
}
