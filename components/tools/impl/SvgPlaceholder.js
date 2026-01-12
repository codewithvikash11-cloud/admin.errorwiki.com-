"use client";

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Download, Copy, RefreshCw, Check } from 'lucide-react';

export default function SvgPlaceholder() {
    // Config
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(150);
    const [bgColor, setBgColor] = useState('#e2e8f0');
    const [textColor, setTextColor] = useState('#64748b');
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(20);
    const [fontFamily, setFontFamily] = useState('sans-serif');

    // Output
    const [svgCode, setSvgCode] = useState('');
    const [dataUrl, setDataUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Generate SVG string
        const displayText = text || `${width}×${height}`;

        // Basic SVG structure
        const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}" />
  <text x="50%" y="50%" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dy=".3em">${displayText}</text>
</svg>`;

        setSvgCode(svg);

        // Data URL for preview/download
        const encoded = encodeURIComponent(svg);
        setDataUrl(`data:image/svg+xml;charset=utf-8,${encoded}`);

    }, [width, height, bgColor, textColor, text, fontSize, fontFamily]);

    const handleCopy = () => {
        navigator.clipboard.writeText(svgCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `placeholder-${width}x${height}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Controls */}
            <div className="lg:w-1/3 space-y-6">
                <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                        <ImageIcon size={20} className="text-accent-primary" /> Configuration
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-text-secondary">Width</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                className="w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-text-secondary">Height</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-text-secondary">Background</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="h-9 w-9 p-1 rounded-lg bg-surface-highlight border border-border cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="flex-1 bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-text-secondary">Text Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="h-9 w-9 p-1 rounded-lg bg-surface-highlight border border-border cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="flex-1 bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-text-secondary">Custom Text (Optional)</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`${width}×${height}`}
                            className="w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-text-secondary">Font Size</label>
                        <input
                            type="range"
                            min="10"
                            max="72"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full accent-accent-primary"
                        />
                        <div className="text-right text-xs text-text-tertiary">{fontSize}px</div>
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="lg:w-2/3 flex flex-col gap-6">
                <div className="bg-surface border border-border rounded-xl p-8 flex items-center justify-center min-h-[300px] overflow-auto relative checkerboard">
                    {/* Inline SVG render for immediate react preview, though img src is also fine */}
                    <div
                        dangerouslySetInnerHTML={{ __html: svgCode }}
                        className="shadow-xl"
                    />
                </div>

                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="bg-surface-highlight/50 p-3 border-b border-border flex justify-between items-center">
                        <span className="text-xs font-bold text-text-secondary uppercase">SVG Code</span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-bold text-text-primary hover:bg-surface-highlight transition-colors"
                            >
                                <Download size={14} /> Download
                            </button>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-primary text-white rounded-lg text-xs font-bold hover:bg-accent-primary/90 transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy Code'}
                            </button>
                        </div>
                    </div>
                    <pre className="p-4 text-sm font-mono text-text-primary overflow-x-auto whitespace-pre-wrap break-all max-h-[200px] custom-scrollbar">
                        {svgCode}
                    </pre>
                </div>
            </div>

            <style jsx>{`
                .checkerboard {
                    background-image: 
                        linear-gradient(45deg, #252525 25%, transparent 25%), 
                        linear-gradient(-45deg, #252525 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #252525 75%), 
                        linear-gradient(-45deg, transparent 75%, #252525 75%);
                    background-size: 20px 20px;
                    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                    background-color: #1a1a1a; 
                }
            `}</style>
        </div>
    );
}
