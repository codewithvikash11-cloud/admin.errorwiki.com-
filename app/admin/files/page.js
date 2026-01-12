"use client";

import React, { useState } from 'react';
import { Files, FileSpreadsheet, FileText, Lock, Unlock, Trash2, Download } from 'lucide-react';

export default function FileManager() {
    const [activeTab, setActiveTab] = useState('docs');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">File Manager</h1>
                <p className="text-gray-500 text-sm">Control user-generated Documents and Spreadsheets.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#222]">
                <button
                    onClick={() => setActiveTab('docs')}
                    className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'docs' ? 'border-accent-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    <FileText size={16} /> Documents
                </button>
                <button
                    onClick={() => setActiveTab('sheets')}
                    className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'sheets' ? 'border-green-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    <FileSpreadsheet size={16} /> Sheets
                </button>
            </div>

            {/* Content Mock */}
            <div className="min-h-[400px] border border-[#222] border-dashed rounded-2xl flex flex-col items-center justify-center text-gray-500">
                <Files size={48} className="mb-4 opacity-50" />
                <h3 className="text-lg font-bold">No {activeTab} found</h3>
                <p className="text-sm">When users create {activeTab === 'docs' ? 'docs' : 'spreadsheets'}, they will appear here.</p>
            </div>
        </div>
    );
}
