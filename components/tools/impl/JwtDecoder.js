"use client";
import React, { useState } from 'react';

export default function JwtDecoder() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState({});
    const [payload, setPayload] = useState({});
    const [error, setError] = useState(null);

    const handleDecode = (input) => {
        setToken(input);
        setError(null);
        if (!input) {
            setHeader({});
            setPayload({});
            return;
        }

        try {
            const parts = input.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT format (must have 3 parts)');

            const decode = (str) => {
                try {
                    return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
                } catch (e) {
                    throw new Error('Failed to decode Base64');
                }
            }

            setHeader(decode(parts[0]));
            setPayload(decode(parts[1]));
        } catch (err) {
            setError(err.message);
            setHeader({});
            setPayload({});
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">JWT Token</label>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-purple-500 resize-none break-all"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={token}
                    onChange={(e) => handleDecode(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto pr-2">
                {error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="flex-1 flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2">Header</label>
                            <pre className="bg-[#1e293b] p-4 rounded-xl text-xs font-mono text-purple-300 overflow-auto">
                                {JSON.stringify(header, null, 2)}
                            </pre>
                        </div>
                        <div className="flex-[2] flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2">Payload</label>
                            <pre className="bg-[#1e293b] p-4 rounded-xl text-xs font-mono text-blue-300 overflow-auto h-full">
                                {JSON.stringify(payload, null, 2)}
                            </pre>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
