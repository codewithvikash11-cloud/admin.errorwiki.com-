"use client";

import React, { useState, useEffect } from 'react';
import { Globe, RefreshCw, MapPin } from 'lucide-react';

export default function IpLookup() {
    const [ip, setIp] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const lookup = async (targetIp = '') => {
        setLoading(true);
        setError('');
        setData(null);
        try {
            const res = await fetch(`https://ipapi.co/${targetIp}/json/`);
            if (!res.ok) throw new Error('Failed to fetch IP data');
            const json = await res.json();
            if (json.error) throw new Error(json.reason || 'Invalid IP');
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Auto fetch own IP on mount
        lookup();
    }, []);

    return (
        <div className="h-full flex flex-col gap-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Globe className="text-accent-primary" />
                IP Lookup
            </h3>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter IP Address (leave empty for yours)"
                    className="flex-1 p-3 bg-surface border border-border rounded-xl focus:border-accent-primary outline-none"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                />
                <button
                    onClick={() => lookup(ip)}
                    className="px-6 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary/90 transition-all flex items-center gap-2"
                    disabled={loading}
                >
                    {loading ? <RefreshCw className="animate-spin" size={20} /> : <MapPin size={20} />}
                    Lookup
                </button>
            </div>

            {error && (
                <div className="p-4 bg-accent-error/10 text-accent-error border border-accent-error/20 rounded-xl">
                    {error}
                </div>
            )}

            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard label="IP Address" value={data.ip} />
                    <InfoCard label="City" value={data.city} />
                    <InfoCard label="Region" value={data.region} />
                    <InfoCard label="Country" value={data.country_name} />
                    <InfoCard label="ISP" value={data.org} />
                    <InfoCard label="Timezone" value={data.timezone} />
                </div>
            )}

            {!data && !loading && !error && (
                <div className="text-center py-20 text-text-tertiary">
                    Enter an IP address to see details.
                </div>
            )}
        </div>
    );
}

const InfoCard = ({ label, value }) => (
    <div className="p-4 bg-surface border border-border rounded-xl">
        <p className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className="text-lg font-medium text-text-primary">{value || 'N/A'}</p>
    </div>
);
