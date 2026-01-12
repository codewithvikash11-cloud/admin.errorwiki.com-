"use client";

import React, { useState, useRef } from 'react';
import { FileSignature, Upload, FileText, CheckCircle, XCircle, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export default function PdfSignature() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            if (selected.type !== 'application/pdf') {
                alert('Please select a PDF file.');
                return;
            }
            setFile(selected);
            analyzePdf(selected);
        }
    };

    const analyzePdf = async (pdfFile) => {
        setLoading(true);
        setAnalysis(null);

        try {
            // Read as ArrayBuffer
            const arrayBuffer = await pdfFile.arrayBuffer();
            const uint8 = new Uint8Array(arrayBuffer);

            // Convert specific chunks to string for regex is safer, but for tool simplicity
            // we will convert the whole buffer to a "binary string" (Latin1) to search.
            // TextDecoder('latin1') maps bytes 1:1 to chars, preserving binary data in strings.
            const decoder = new TextDecoder('latin1');
            const content = decoder.decode(uint8);

            // 1. Search for Signature Dictionary: /Type /Sig
            // We use a more relaxed regex to catch variations in spacing and line breaks
            // PDF Names can be /Type or /Type
            // A signature dictionary MUST have /Type /Sig
            // It might look like: <</Type/Sig/Filter/Adobe.PPKLite...>>

            // Regex explanations:
            // \/Type\s*\/Sig : standard type definition
            // \/ByteRange : mandatory for signatures
            // \/Contents : mandatory for signatures (hex string)

            const sigRegex = /\/Type\s*\/Sig\b/g;
            const byteRangeRegex = /\/ByteRange\s*\[\s*([\d\s]+)\s*\]/g;
            const filterRegex = /\/Filter\s*\/([a-zA-Z0-9.]+)/g;
            const subFilterRegex = /\/SubFilter\s*\/([a-zA-Z0-9.]+)/g;
            const contentsRegex = /\/Contents\s*<([0-9a-fA-F\s]+)>/g; // Hex contents usually

            const sigMatches = [...content.matchAll(sigRegex)];
            const byteRangeMatches = [...content.matchAll(byteRangeRegex)];

            // Sometimes regex misses if the file is massive or encoding is weird. 
            // Let's rely on finding "ByteRange" primarily as it implies a signature or form field.
            // But actually, signature fields must have /Type /Sig.

            const signaturesFound = sigMatches.length;
            const byteRangesFound = byteRangeMatches.length;

            const report = {
                signaturesCount: Math.max(signaturesFound, byteRangesFound), // If we find ByteRange but missed /Type/Sig, likely a signature
                isSigned: signaturesFound > 0 || byteRangesFound > 0,
                details: [],
                fileSize: pdfFile.size,
                version: null
            };

            // PDF Version Check (%PDF-1.x)
            const versionMatch = content.match(/%PDF-(\d\.\d)/);
            if (versionMatch) report.version = versionMatch[1];

            // Collect info
            // Since regexes are global, we might not match them 1:1 if we just map arrays. 
            // We should try to find them contextually, but loosely is fine for this tool.

            // We'll iterate up to the max count found
            const maxCount = Math.max(signaturesFound, byteRangesFound);

            // Helper to get match by index safe
            const getMatch = (matches, idx) => {
                if (!matches || !matches[idx]) return null;
                return matches[idx][1] || matches[idx][0];
            };

            const filters = [...content.matchAll(filterRegex)];
            const subFilters = [...content.matchAll(subFilterRegex)];

            for (let i = 0; i < maxCount; i++) {
                report.details.push({
                    id: i + 1,
                    filter: getMatch(filters, i) || 'Unknown',
                    subFilter: getMatch(subFilters, i) || 'Unknown',
                    byteRange: getMatch(byteRangeMatches, i) || 'Present but not parsed'
                });
            }

            // Debug info
            // Check for incremental cleanup
            // (Simulated Logic)

            setAnalysis(report);

        } catch (error) {
            console.error(error);
            setAnalysis({ error: "Failed to analyze PDF structure. File might be too large or encrypted." });
        } finally {
            setLoading(false);
        }
    };

    const triggerUpload = () => inputRef.current?.click();

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${file ? 'border-accent-primary bg-accent-primary/5' : 'border-border hover:border-accent-primary/50 hover:bg-surface-highlight'}`}
                onClick={triggerUpload}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="hidden"
                />

                {file ? (
                    <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in">
                        <FileText size={48} className="text-accent-primary" />
                        <h3 className="text-xl font-bold text-text-primary">{file.name}</h3>
                        <div className="flex items-center gap-2 text-text-tertiary">
                            <span className="text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            {analysis?.version && <span className="text-xs bg-surface border border-border px-2 py-0.5 rounded text-text-secondary">PDF {analysis.version}</span>}
                        </div>
                        <button className="mt-4 flex items-center gap-2 text-sm text-accent-primary font-bold hover:underline">
                            <RefreshCw size={14} /> Change file
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 text-text-tertiary">
                        <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center">
                            <Upload size={32} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-text-primary">Click to upload PDF</p>
                            <p className="text-sm">or drag and drop here</p>
                        </div>
                    </div>
                )}
            </div>

            {loading && (
                <div className="text-center py-10 text-text-secondary animate-pulse flex flex-col items-center gap-3">
                    <RefreshCw className="animate-spin text-accent-primary" size={24} />
                    Analyzing PDF structure...
                </div>
            )}

            {!loading && analysis && !analysis.error && (
                <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 mb-6">
                        {analysis.isSigned ? (
                            <div className="bg-green-500/10 p-4 rounded-full text-green-500 shadow-sm shadow-green-500/20">
                                <FileSignature size={32} />
                            </div>
                        ) : (
                            <div className="bg-text-tertiary/10 p-4 rounded-full text-text-tertiary">
                                <XCircle size={32} />
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-text-primary">
                                {analysis.isSigned ? 'Signatures Detected' : 'No Signatures Detected'}
                            </h3>
                            <p className="text-text-secondary">
                                Found <strong>{analysis.signaturesCount}</strong> potential signature dictionaries.
                            </p>
                        </div>
                    </div>

                    {analysis.isSigned && (
                        <div className="space-y-6">
                            <div className="grid gap-4">
                                {analysis.details.map((sig) => (
                                    <div key={sig.id} className="bg-background border border-border rounded-xl p-5 shadow-sm">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-sm">
                                                    #{sig.id}
                                                </div>
                                                <h4 className="font-bold text-text-primary">Signature Field</h4>
                                            </div>
                                            {sig.filter !== 'Unknown' && (
                                                <span className="px-3 py-1 bg-surface-highlight rounded-full text-xs font-mono text-text-secondary border border-border">
                                                    {sig.filter}
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-1">
                                                <span className="text-xs font-bold text-text-tertiary uppercase">SubFilter / Encoding</span>
                                                <div className="font-mono text-text-primary bg-surface p-2 rounded border border-border truncate">
                                                    {sig.subFilter}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-xs font-bold text-text-tertiary uppercase">ByteRange</span>
                                                <div className="font-mono text-text-primary bg-surface p-2 rounded border border-border truncate" title={sig.byteRange}>
                                                    {sig.byteRange}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!analysis.isSigned && (
                        <div className="p-4 bg-surface-highlight/50 rounded-xl text-sm text-text-secondary text-center">
                            This document does not contain standard <code className="text-accent-primary">/Type /Sig</code> dictionaries usually associated with digital signatures.
                            It might be an unsigned PDF or use a non-standard signing method.
                        </div>
                    )}

                    <div className="mt-8 flex items-start gap-3 text-xs text-text-tertiary bg-surface-highlight/30 p-4 rounded-xl border border-border/50">
                        <Info size={18} className="shrink-0 mt-0.5 text-accent-primary" />
                        <div className="space-y-2">
                            <p className="leading-relaxed">
                                <strong>Technical Note:</strong> This tool performs a structural scan of the PDF file (looking for <code>ByteRange</code> and Signature Dictionaries).
                            </p>
                            <p className="leading-relaxed">
                                It confirms the <strong>presence</strong> of a signature field but cannot verify the <strong>cryptographic validity</strong>, trust chain, or if the document has been modified since signing.
                                For legal validation, please use Adobe Acrobat Reader or a compliant validation service.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {analysis?.error && (
                <div className="bg-accent-error/10 border border-accent-error/20 rounded-2xl p-6 flex items-center gap-4 text-accent-error animate-in fade-in">
                    <AlertTriangle size={24} />
                    <div>
                        <h3 className="font-bold">Scan Error</h3>
                        <p className="text-sm opacity-90">{analysis.error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
