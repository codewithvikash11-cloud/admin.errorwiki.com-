"use client";

import React, { useState } from 'react';
import { AlertTriangle, Check, X, Tag } from 'lucide-react';

const MOCK_ERRORS = [
    { id: 1, code: 'ERR_CONNECTION_REFUSED', msg: 'Failed to connect to localhost:3000', status: 'pending', verified: false },
    { id: 2, code: 'TypeError', msg: 'Cannot read properties of undefined (reading map)', status: 'approved', verified: true },
];

export default function ErrorsManager() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Error Solutions DB</h1>
                <p className="text-gray-500 text-sm">Manage the knowledge base of fix solutions.</p>
            </div>

            <div className="grid gap-4">
                {MOCK_ERRORS.map(err => (
                    <div key={err.id} className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:border-[#333] transition-colors gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#111] rounded-lg text-red-400 mt-1">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-white font-mono text-sm bg-[#111] px-2 py-0.5 rounded">{err.code}</h3>
                                    {err.verified && (
                                        <span className="flex items-center gap-1 text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold border border-blue-500/20">
                                            VERIFIED FIX
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-1">{err.msg}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${err.status === 'approved' ? 'text-green-500 bg-green-500/10' :
                                    'text-orange-500 bg-orange-500/10'
                                }`}>
                                {err.status}
                            </div>
                            <button className="p-2 bg-[#111] hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition-all">
                                Edit Solution
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
