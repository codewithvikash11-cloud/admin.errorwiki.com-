"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Save, Plus, Trash2, ArrowRight, Table2,
    Bold, AlignLeft, AlignCenter, AlignRight,
    DollarSign, Percent
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { documentService } from '@/lib/documents-local';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Helper to get column letter (0 -> A, 26 -> AA)
const getColLabel = (index) => {
    let label = "";
    let i = index;
    while (i >= 0) {
        label = ALPHABET[i % 26] + label;
        i = Math.floor(i / 26) - 1;
    }
    return label;
};

// INITIAL GRID SIZE
const ROWS = 20;
const COLS = 10;

const createEmptyGrid = (rows, cols) => {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ value: "", style: {} }))
    );
};

export default function SheetsEditor() {
    const [title, setTitle] = useState("Untitled Sheet");
    const [data, setData] = useState(createEmptyGrid(ROWS, COLS));
    const [selectedCell, setSelectedCell] = useState(null); // { r, c }
    const [lastSaved, setLastSaved] = useState(null);
    const [formulaBar, setFormulaBar] = useState("");

    // Calculate cell value (handles simple formulas like =SUM(A1:A3))
    // NOTE: This is a basic mock implementation. Real parsing is complex.
    const getCellValue = (r, c) => {
        const cell = data[r][c];
        if (!cell.value.startsWith('=')) return cell.value;

        // Basic formula handling mock
        if (cell.value.startsWith('=SUM')) {
            return "#SUM"; // Placeholder result
        }
        return cell.value;
    };

    const handleCellChange = (r, c, value) => {
        const newData = [...data];
        newData[r] = [...newData[r]];
        newData[r][c] = { ...newData[r][c], value };
        setData(newData);
    };

    const handleSelect = (r, c) => {
        setSelectedCell({ r, c });
        setFormulaBar(data[r][c].value);
    };

    const handleFormulaBarChange = (e) => {
        const val = e.target.value;
        setFormulaBar(val);
        if (selectedCell) {
            handleCellChange(selectedCell.r, selectedCell.c, val);
        }
    };

    const applyStyle = (styleKey, value) => {
        if (!selectedCell) return;
        const { r, c } = selectedCell;
        const newData = [...data];
        const cell = newData[r][c];

        // Toggle if boolean
        const currentVal = cell.style[styleKey];
        const newVal = typeof value === 'boolean' ? !currentVal : value;

        newData[r][c] = {
            ...cell,
            style: { ...cell.style, [styleKey]: newVal }
        };
        setData(newData);
    };

    const [isChecking, setIsChecking] = useState(false);

    // Security Import
    const validateContent = require('@/lib/security/content-analyzer').validateContent;
    const adminService = require('@/lib/admin-service').adminService;

    const handleSave = async () => {
        if (isChecking) return;
        setIsChecking(true);

        try {
            // Synthesize Text for Analysis (Join all non-empty cells)
            const textContent = data.flat()
                .map(cell => cell.value)
                .filter(val => val && val.trim().length > 0)
                .join(". ");

            // 1. RUN SECURITY CHECKS
            const report = await validateContent(textContent);

            // 2. LOG EVENT
            adminService.logSecurityEvent({
                ...report,
                contentId: title,
                snippet: textContent.substring(0, 100)
            });

            // 3. ENFORCE RESULTS
            if (report.status === 'REJECTED') {
                alert(`Security Violation: Sheet Rejected.\n\nReasons:\n${report.violations.join('\n')}`);
                setIsChecking(false);
                return; // BLOCK SAVE
            }

            // 4. PROCEED IF CLEAN
            const sheetData = {
                grid: data,
                rows: data.length,
                cols: data[0].length
            };

            documentService.saveDocument({
                id: Date.now().toString(),
                title,
                type: 'sheet',
                content: JSON.stringify(sheetData)
            });

            documentService.addToHistory({
                action: `Edited Sheet: ${title}`,
                preview: 'Grid Data updated',
                tool: 'sheets'
            });

            setLastSaved(new Date());
            // alert('Sheet saved successfullly!');
        } catch (error) {
            console.error("Security check failed:", error);
            alert("Error running security validation.");
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background overflow-hidden relative group">
            {/* Header */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 bg-surface">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary ring-1 ring-accent-primary/20">
                        <Table2 size={24} />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-accent-primary placeholder:text-text-tertiary w-full sm:w-auto"
                            placeholder="Enter sheet name..."
                        />
                        <p className="text-xs text-text-secondary">
                            {lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 'Unsaved changes'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isChecking}
                    className="flex items-center gap-2 px-3 py-1.5 bg-accent-primary text-white rounded-lg text-xs font-bold hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20 hover:scale-105 disabled:opacity-50 disabled:cursor-wait disabled:hover:scale-100"
                >
                    <Save size={14} />
                    {isChecking ? 'Scanning...' : 'Save Sheet'}
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-surface/80 backdrop-blur-sm border-b border-border overflow-x-auto">
                <div className="flex gap-1 border-r border-border pr-2">
                    <button onClick={() => applyStyle('bold')} className="p-1.5 hover:bg-surface-highlight rounded-md text-text-secondary hover:text-text-primary transition-colors"><Bold size={16} /></button>
                </div>
                <div className="flex gap-1 border-r border-border pr-2">
                    <button onClick={() => applyStyle('textAlign', 'left')} className="p-1.5 hover:bg-surface-highlight rounded-md text-text-secondary hover:text-text-primary transition-colors"><AlignLeft size={16} /></button>
                    <button onClick={() => applyStyle('textAlign', 'center')} className="p-1.5 hover:bg-surface-highlight rounded-md text-text-secondary hover:text-text-primary transition-colors"><AlignCenter size={16} /></button>
                    <button onClick={() => applyStyle('textAlign', 'right')} className="p-1.5 hover:bg-surface-highlight rounded-md text-text-secondary hover:text-text-primary transition-colors"><AlignRight size={16} /></button>
                </div>
                <div className="flex-1 px-2">
                    <div className="flex items-center gap-2 bg-background border border-border rounded-md px-2 h-8 focus-within:ring-1 focus-within:ring-accent-primary/50 transition-all">
                        <span className="text-xs font-mono text-accent-primary font-bold">fx</span>
                        <input
                            className="flex-1 bg-transparent text-sm focus:outline-none font-mono text-text-primary placeholder:text-text-tertiary"
                            value={formulaBar}
                            onChange={handleFormulaBarChange}
                            placeholder="Select a cell..."
                        />
                    </div>
                </div>
            </div>

            {/* Grid Canvas */}
            <div className="flex-1 overflow-auto relative bg-panel">
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="w-10 bg-[#f3f4f6] dark:bg-[#161b22] border-b border-r border-[#e5e7eb] dark:border-[#30363d] sticky top-0 left-0 z-30"></th>
                            {data[0].map((_, c) => (
                                <th key={c} className="bg-surface-highlight border-b border-r border-border min-w-[100px] h-8 text-xs font-semibold text-text-secondary sticky top-0 z-20 select-none">
                                    {getColLabel(c)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, r) => (
                            <tr key={r}>
                                <td className="bg-surface-highlight border-b border-r border-border w-10 text-center text-xs text-text-secondary select-none sticky left-0 z-20 font-mono font-medium">
                                    {r + 1}
                                </td>
                                {row.map((cell, c) => (
                                    <td
                                        key={`${r}-${c}`}
                                        className={cn(
                                            "border-b border-r border-border min-w-[100px] p-0 relative transition-colors duration-75",
                                            selectedCell?.r === r && selectedCell?.c === c
                                                ? "ring-2 ring-accent-primary z-10 bg-accent-primary/5"
                                                : "bg-surface hover:bg-surface-highlight"
                                        )}
                                        onClick={() => handleSelect(r, c)}
                                    >
                                        <input
                                            className={cn(
                                                "w-full h-full px-2 py-1 bg-transparent border-none focus:outline-none text-sm text-text-primary cursor-text font-mono",
                                                cell.style.bold && "font-bold",
                                                cell.style.textAlign && `text-${cell.style.textAlign}`
                                            )}
                                            value={cell.value}
                                            onChange={(e) => handleCellChange(r, c, e.target.value)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
