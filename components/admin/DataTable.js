'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function DataTable({
    columns,
    data,
    onSearch,
    searchPlaceholder = "Search...",
    actions,
    pagination
}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (onSearch) onSearch(term);
    };

    return (
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b border-[#1e293b] flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0f172a]">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-[#334155] rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {/* Placeholder for Filters */}
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#1e293b] border border-[#334155] rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-colors">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    {actions}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#1e293b] bg-[#1e293b]/50">
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-6 py-4 font-semibold text-slate-300 uppercase tracking-wider text-xs">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e293b]">
                        {data.length > 0 ? (
                            data.map((row, rowIdx) => (
                                <tr key={row.id || rowIdx} className="hover:bg-[#1e293b]/30 transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-6 py-4 text-slate-300">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center mb-2">
                                            <Search size={24} className="opacity-50" />
                                        </div>
                                        <p className="font-medium">No results found</p>
                                        <p className="text-xs">Try adjusting your search or filters.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="px-6 py-4 border-t border-[#1e293b] flex items-center justify-between bg-[#0f172a]">
                    <div className="text-xs text-slate-500">
                        Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{data.length}</span> results
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-[#334155] text-slate-400 hover:text-white hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 rounded-lg border border-[#334155] text-slate-400 hover:text-white hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
