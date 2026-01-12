"use client";
import React, { useState } from 'react';
import { Network, Globe, Calculator, RefreshCw, Copy, Check } from 'lucide-react';

export default function NetworkCalculators({ type = 'ipv4-subnet' }) {
    // Shared State
    const [copied, setCopied] = useState(false);

    // IPv4 Subnet State
    const [ip, setIp] = useState('192.168.1.1');
    const [cidr, setCidr] = useState(24);
    const [subnetInfo, setSubnetInfo] = useState(null);

    // IPv6 ULA State
    const [ula, setUla] = useState(null);

    // Helpers
    const calculateSubnet = () => {
        try {
            const ipParts = ip.split('.').map(Number);
            if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
                setSubnetInfo({ error: 'Invalid IP Address' });
                return;
            }

            const mask = -1 << (32 - cidr);
            const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
            const networkNum = ipNum & mask;
            const broadcastNum = networkNum | (~mask);

            const toIpStr = (num) => {
                return [
                    (num >>> 24) & 255,
                    (num >>> 16) & 255,
                    (num >>> 8) & 255,
                    num & 255
                ].join('.');
            };

            const hosts = Math.max(0, (broadcastNum - networkNum) - 1); // -1 because broadcast (actually -2 usually but formula varies slightly by strictness, sticking to usable) -> typically Usable = Total - 2 (Network + Broadcast)

            setSubnetInfo({
                networkAddress: toIpStr(networkNum),
                broadcastAddress: toIpStr(broadcastNum),
                firstUsable: toIpStr(networkNum + 1),
                lastUsable: toIpStr(broadcastNum - 1),
                subnetMask: toIpStr(mask),
                totalHosts: Math.pow(2, 32 - cidr),
                usableHosts: Math.max(0, Math.pow(2, 32 - cidr) - 2)
            });

        } catch (e) {
            setSubnetInfo({ error: 'Calculation Error' });
        }
    };

    const generateUla = () => {
        // RFC 4193: fd00::/8 prefix + 40 bits random global ID + 16 bits subnet ID
        // Prefix: fd
        // Global ID: 40 bits (5 bytes) random
        const randomHex = (len) => [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

        const globalId = randomHex(10); // 40 bits = 10 hex chars
        const prefix = `fd${globalId.substring(0, 2)}:${globalId.substring(2, 6)}:${globalId.substring(6, 10)}`;

        setUla({
            prefix: prefix + '::/48',
            explanation: 'Generated according to RFC 4193 (Unique Local IPv6 Unicast Addresses).',
            breakdown: {
                'Prefix (8 bits)': 'fd00',
                'L (1 bit)': '1 (Locally Assigned)',
                'Global ID (40 bits)': globalId,
                'Subnet ID (16 bits)': '0000 (User definable)'
            }
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (type === 'ipv6-ula') {
        return (
            <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6 ">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-text-primary">
                        <Globe className="text-accent-primary" size={24} /> IPv6 ULA Generator
                    </h3>
                    <button
                        onClick={generateUla}
                        className="bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={16} /> Generate New
                    </button>
                </div>

                <div className="bg-surface border border-border rounded-xl p-8 flex flex-col items-center justify-center gap-6 min-h-[200px]">
                    {!ula ? (
                        <div className="text-text-tertiary text-center">
                            Click Generate to create a Unique Local Address prefix.
                        </div>
                    ) : (
                        <>
                            <div className="text-center">
                                <p className="text-sm text-text-secondary uppercase tracking-widest mb-2 font-bold">Generated Prefix</p>
                                <div className="text-3xl md:text-5xl font-mono text-accent-primary font-bold tracking-tight break-all cursor-pointer hover:opacity-80 transition-opacity" onClick={() => copyToClipboard(ula.prefix)}>
                                    {ula.prefix}
                                </div>
                                <div className="mt-2 text-green-500 font-bold h-6">
                                    {copied ? 'Copied to clipboard!' : ''}
                                </div>
                            </div>

                            <div className="w-full max-w-2xl bg-surface-highlight/50 rounded-lg p-4 mt-4 border border-border/50">
                                <h4 className="font-bold text-text-secondary mb-3 text-sm">Structure</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {Object.entries(ula.breakdown).map(([k, v]) => (
                                        <React.Fragment key={k}>
                                            <div className="text-text-tertiary">{k}</div>
                                            <div className="font-mono text-text-primary text-right">{v}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Default: IPv4 Subnet
    return (
        <div className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col gap-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-text-primary">
                <Network className="text-accent-primary" size={24} /> IPv4 Subnet Calculator
            </h3>

            <div className="grid md:grid-cols-[300px_1fr] gap-6">
                {/* Inputs */}
                <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-6 h-fit">
                    <div>
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">IP Address</label>
                        <input
                            type="text"
                            className="w-full bg-surface-highlight border border-border rounded-lg px-3 py-2 font-mono text-sm outline-none focus:border-accent-primary"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="192.168.1.1"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">CIDR / Mask Bits</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range" min="1" max="32"
                                className="flex-1 accent-accent-primary h-2 bg-surface-active rounded-lg appearance-none cursor-pointer"
                                value={cidr}
                                onChange={(e) => setCidr(parseInt(e.target.value))}
                            />
                            <span className="w-10 text-center font-mono font-bold bg-surface-highlight py-1 rounded border border-border text-sm">/{cidr}</span>
                        </div>
                    </div>
                    <button
                        onClick={calculateSubnet}
                        className="w-full bg-accent-primary hover:bg-accent-hover text-white py-2 rounded-lg font-bold transition-colors mt-2"
                    >
                        Calculate
                    </button>
                </div>

                {/* Results */}
                <div className="bg-surface border border-border rounded-xl p-6 flex-1">
                    {!subnetInfo ? (
                        <div className="h-full flex items-center justify-center text-text-tertiary italic">
                            Enter IP and Mask to calculate subnet details.
                        </div>
                    ) : subnetInfo.error ? (
                        <div className="h-full flex items-center justify-center text-red-500 font-bold">
                            {subnetInfo.error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                { label: 'Network Address', value: subnetInfo.networkAddress },
                                { label: 'Broadcast Address', value: subnetInfo.broadcastAddress },
                                { label: 'Subnet Mask', value: subnetInfo.subnetMask },
                                { label: 'Total Hosts', value: subnetInfo.totalHosts.toLocaleString() },
                                { label: 'First Usable IP', value: subnetInfo.firstUsable, highlight: true },
                                { label: 'Last Usable IP', value: subnetInfo.lastUsable, highlight: true },
                                { label: 'Usable Hosts', value: subnetInfo.usableHosts.toLocaleString(), highlight: true },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col gap-1 border-b border-border/50 pb-2">
                                    <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">{item.label}</span>
                                    <div className={`font-mono text-lg ${item.highlight ? 'text-accent-primary font-bold' : 'text-text-primary'}`}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
