"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Star } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-background">

            {/* Background: Warp Speed Starfield Effect */}
            <div className="absolute inset-0 bg-[#020617] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#020617] to-[#020617]" />

                {/* Stars */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/10 blur-[100px] rounded-full animate-pulse-glow" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full animate-blob" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-5xl mx-auto">

                    {/* Floating Badge */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent-primary/30 bg-accent-primary/10 backdrop-blur-sm mb-8 animate-float-slow">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold tracking-widest uppercase text-accent-primary">Join the revolution</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
                        Ready to fix your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-hover to-accent-success animate-gradient-x">codebase?</span>
                    </h2>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Join thousands of elite developers using DevFixer to solve complex errors in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/errors"
                            className="group relative px-8 py-4 bg-accent-primary text-white rounded-lg font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:bg-accent-hover hover:shadow-[0_0_40px_-10px_rgba(0,128,0,0.5)]"
                        >
                            <span className="relative flex items-center gap-2">
                                Start Fixing Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="group px-8 py-4 bg-transparent border border-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/5 transition-all flex items-center gap-2 backdrop-blur-sm"
                        >
                            <Github size={20} />
                            <span>Contribute</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
