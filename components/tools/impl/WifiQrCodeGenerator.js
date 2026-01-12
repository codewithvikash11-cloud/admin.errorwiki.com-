"use client";

import React, { useState, useEffect } from 'react';
import QrCodeGenerator from './QrCodeGenerator';
import { Wifi, Eye, EyeOff } from 'lucide-react';

export default function WifiQrCodeGenerator() {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [encryption, setEncryption] = useState('WPA');
    const [hidden, setHidden] = useState(false);
    const [type, setType] = useState('WPA'); // WPA/WEP/nopass
    const [qrString, setQrString] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Construct WiFi URI scheme: WIFI:T:WPA;S:MyNetworkName;P:password;H:false;;
        let wifiString = `WIFI:T:${type};S:${ssid};`;
        if (type !== 'nopass') {
            wifiString += `P:${password};`;
        }
        if (hidden) {
            wifiString += `H:true;`;
        }
        wifiString += ';';
        setQrString(wifiString);
    }, [ssid, password, type, hidden]);

    return (
        <div className="space-y-12">
            <div className="max-w-4xl mx-auto bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 text-text-primary font-bold mb-4 pb-4 border-b border-border">
                    <Wifi size={24} className="text-accent-primary" />
                    <h2>WiFi Network Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary">Network Name (SSID)</label>
                        <input
                            type="text"
                            value={ssid}
                            onChange={(e) => setSsid(e.target.value)}
                            placeholder="e.g., Home_WiFi_5G"
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={type === 'nopass'}
                                placeholder={type === 'nopass' ? "No password required" : "Network Password"}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-accent-primary disabled:opacity-50"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary">Security Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-primary"
                        >
                            <option value="WPA">WPA/WPA2/WPA3</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">No Password (Open)</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3 pt-8">
                        <input
                            type="checkbox"
                            checked={hidden}
                            onChange={(e) => setHidden(e.target.checked)}
                            className="w-5 h-5 accent-accent-primary rounded"
                            id="hidden-check"
                        />
                        <label htmlFor="hidden-check" className="text-sm text-text-primary font-medium cursor-pointer select-none">
                            Hidden Network
                        </label>
                    </div>
                </div>
            </div>

            {ssid && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-center text-xl font-bold text-text-primary mb-6">Scan to Connect</h2>
                    {/* Reuse the generic QR generator component but pre-filled */}
                    <div className="pointer-events-none opacity-100">
                        {/* We mock the pointer events to prevent editing the valid string constructed here, 
                           but allow the visual generation. 
                           Actually, reusing the component might be tricky if it has inputs.
                           Let's re-implement a cleaner view just for this tool's output.
                       */}
                        <div className="flex flex-col items-center justify-center p-8 bg-surface border border-border rounded-2xl max-w-sm mx-auto shadow-2xl">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}&margin=10`}
                                alt="WiFi QR Code"
                                className="w-64 h-64 rounded-xl border border-gray-200"
                            />
                            <div className="mt-6 text-center space-y-1">
                                <p className="text-lg font-bold text-text-primary">{ssid}</p>
                                <p className="text-sm text-text-secondary">{type === 'nopass' ? 'Open Network' : `Password: ${password}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
