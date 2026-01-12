"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Flag, Clock } from 'lucide-react';

export default function Chronometer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Timer Display */}
            <div className="bg-surface-highlight p-8 rounded-2xl border border-border flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-primary/5 blur-3xl rounded-full transform scale-150 animate-pulse"></div>
                <div className="relative z-10 font-mono text-6xl md:text-8xl font-bold text-text-primary tracking-widest tabular-nums">
                    {formatTime(time)}
                </div>
                <div className="text-text-tertiary mt-2 uppercase tracking-wider text-xs font-semibold">
                    MM:SS.ms
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-4">
                <button
                    onClick={handleStartPause}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 font-semibold transition-all ${isRunning
                            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'
                            : 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20'
                        }`}
                >
                    {isRunning ? <Pause size={24} /> : <Play size={24} />}
                    {isRunning ? 'Pause' : 'Start'}
                </button>

                <button
                    onClick={handleLap}
                    disabled={!isRunning}
                    className="p-4 bg-surface border border-border rounded-xl flex flex-col items-center justify-center gap-2 font-semibold text-text-secondary hover:text-text-primary hover:border-accent-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Flag size={24} />
                    Lap
                </button>

                <button
                    onClick={handleReset}
                    className="p-4 bg-surface border border-border rounded-xl flex flex-col items-center justify-center gap-2 font-semibold text-text-secondary hover:text-red-500 hover:border-red-500/30 transition-all"
                >
                    <RefreshCw size={24} />
                    Reset
                </button>
            </div>

            {/* Laps */}
            {laps.length > 0 && (
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-border bg-surface-highlight/50 font-semibold text-sm text-text-secondary flex justify-between items-center">
                        <span>Laps</span>
                        <span className="text-xs bg-accent-primary/10 text-accent-primary px-2 py-0.5 rounded-full">{laps.length}</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {laps.slice().reverse().map((lapTime, index) => (
                            <div key={laps.length - index} className="flex justify-between items-center p-3 rounded-lg hover:bg-surface-highlight transition-colors text-sm font-mono border border-transparent hover:border-border/50">
                                <span className="text-text-tertiary">#{laps.length - index}</span>
                                <span className="text-text-primary font-bold">{formatTime(lapTime)}</span>
                                <span className="text-text-secondary text-xs">
                                    {index < laps.length - 1
                                        ? `+${formatTime(lapTime - laps[laps.length - index - 2])}`
                                        : '-'
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
