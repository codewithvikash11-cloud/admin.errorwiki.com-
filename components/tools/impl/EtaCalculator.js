"use client";

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Gauge, Calendar } from 'lucide-react';

export default function EtaCalculator() {
    const [distance, setDistance] = useState('');
    const [speed, setSpeed] = useState('');
    const [startTime, setStartTime] = useState('');

    // Initialize start time to current time
    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setStartTime(`${hours}:${minutes}`);
    }, []);

    const result = React.useMemo(() => {
        if (!distance || !speed || parseFloat(speed) === 0) return null;

        const dist = parseFloat(distance);
        const spd = parseFloat(speed);

        const timeInHours = dist / spd;

        const hours = Math.floor(timeInHours);
        const minutes = Math.round((timeInHours - hours) * 60);

        let displayTime = '';
        if (hours > 0) displayTime += `${hours}h `;
        displayTime += `${minutes}m`;

        // Calculate Arrival Time
        let arrivalTimeStr = '-';
        if (startTime) {
            const [startH, startM] = startTime.split(':').map(Number);
            const startDate = new Date();
            startDate.setHours(startH, startM, 0, 0);

            // Add duration
            const arrivalDate = new Date(startDate.getTime() + timeInHours * 60 * 60 * 1000);

            arrivalTimeStr = arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Check if next day
            if (arrivalDate.getDate() !== startDate.getDate()) {
                arrivalTimeStr += ' (+1 day)';
            }
        }

        return {
            duration: displayTime,
            arrival: arrivalTimeStr,
            decimalHours: timeInHours.toFixed(2)
        };
    }, [distance, speed, startTime]);

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <MapPin size={16} /> Distance (km/miles)
                    </label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="e.g. 150"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Gauge size={16} /> Speed (km/h or mph)
                    </label>
                    <input
                        type="number"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        placeholder="e.g. 60"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all font-medium"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Clock size={16} /> Start Time
                    </label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                    <Calendar size={20} className="text-accent-primary" />
                    Trip Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-text-tertiary uppercase font-semibold">Travel Time</span>
                        <span className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
                            {result ? result.duration : '--'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-text-tertiary uppercase font-semibold">Estimated Arrival</span>
                        <span className="text-2xl md:text-3xl font-black text-accent-primary tracking-tight">
                            {result ? result.arrival : '--:--'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-text-tertiary uppercase font-semibold">Decimal Hours</span>
                        <span className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
                            {result ? result.decimalHours : '--'}h
                        </span>
                    </div>
                </div>

                {!result && (
                    <div className="mt-6 text-sm text-text-tertiary bg-surface-highlight/50 p-4 rounded-lg">
                        Enter distance and speed to see the estimated time of arrival.
                    </div>
                )}
            </div>
        </div>
    );
}
