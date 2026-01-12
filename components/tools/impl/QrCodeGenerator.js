"use client";

import React, { useState } from 'react';
import { Download, QrCode } from 'lucide-react';

export default function QrCodeGenerator({ defaultValue = '', defaultTitle = 'Text or URL' }) {
    const [input, setInput] = useState(defaultValue);
    const [size, setSize] = useState(300);
    const [color, setColor] = useState('000000');
    const [bgColor, setBgColor] = useState('FFFFFF');

    // Using a reliable public API for QR generation without client-side heavy lifting
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(input)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&margin=10`;

    const downloadQr = async () => {
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qrcode-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">Configuration</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">{defaultTitle}</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter text or URL..."
                            className="w-full h-32 bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-accent-primary resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Size (px)</label>
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            step="50"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full accent-accent-primary"
                        />
                        <div className="flex justify-between text-xs text-text-tertiary">
                            <span>100px</span>
                            <span className="font-bold text-accent-primary">{size}px</span>
                            <span>1000px</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Foreground</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={color.startsWith('#') ? color : `#${color}`}
                                    onChange={(e) => setColor(e.target.value.replace('#', ''))}
                                    className="w-10 h-10 rounded-lg cursor-pointer border-none p-0"
                                />
                                <span className="text-xs font-mono text-text-secondary uppercase">#{color}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Background</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={bgColor.startsWith('#') ? bgColor : `#${bgColor}`}
                                    onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
                                    className="w-10 h-10 rounded-lg cursor-pointer border-none p-0"
                                />
                                <span className="text-xs font-mono text-text-secondary uppercase">#{bgColor}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-surface border border-border rounded-2xl p-8 min-h-[400px]">
                {input ? (
                    <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-300">
                        <div className="bg-white p-2 rounded-xl border border-border shadow-lg">
                            <img
                                src={qrUrl}
                                alt="Generated QR Code"
                                className="max-w-full h-auto rounded-lg"
                                style={{ width: size, height: size }}
                            />
                        </div>
                        <button
                            onClick={downloadQr}
                            className="px-6 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-accent-primary/20"
                        >
                            <Download size={18} /> Download PNG
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-text-tertiary">
                        <QrCode size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Enter text to generate QR code</p>
                    </div>
                )}
            </div>
        </div>
    );
}
