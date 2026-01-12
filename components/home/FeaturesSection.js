"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Shield, Globe, Code2, Database, ArrowRight, Check, Bug, Copy, Terminal } from 'lucide-react';

const BentoCard = ({ title, description, icon, className = "", href, ctaText, children }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardRef.current.style.setProperty('--mouse-x', `${x}px`);
            cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (card) {
                card.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`spotlight-card group relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent-primary/10 ${className}`}>

            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-surface-highlight rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border shadow-sm">
                        {icon}
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-accent-primary transition-colors tracking-tight">
                    {title}
                </h3>

                <p className="text-text-secondary leading-relaxed mb-8 max-w-md text-sm">
                    {description}
                </p>

                {/* Visual Area - Fills the empty space */}
                {children && <div className="mt-4 mb-4 flex-grow relative min-h-[160px] md:min-h-[200px]">{children}</div>}

                <div className="mt-auto">
                    {href ? (
                        <Link
                            href={href}
                            className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent-primary text-white font-bold text-xs hover:scale-105 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-primary/20 transition-all duration-300 group/btn"
                        >
                            {ctaText} <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <div className="flex items-center text-sm font-bold text-accent-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            Learn more <ArrowRight size={16} className="ml-2" />
                        </div>
                    )}
                </div>
            </div>
            {/* Render Children (background visuals) if they are absolute positioned/not part of flex flow */}
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && (child.type === GlobalCDNVisual || child.type === SolutionsVisual || child.type === CopyPasteVisual)) {
                    // Check if it's one of the absolute positioned visuals (GlobalCDNVisual is usually absolute)
                    // But wait, BentoCard structure puts children inside the flex col above. 
                    // We need to handle 'background' visuals vs 'inline' visuals.
                    // For now, SolutionsVisual uses 'absolute inside relative container'.
                    // GlobalCDNVisual uses 'absolute right-0 top-0'.
                    // Let's rely on the child component's styling.
                    return null;
                }
                return null;
            })}
            {/* Re-render GlobalCDNVisual outside content div if it exists */}
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === GlobalCDNVisual) return child;
                return null;
            })}
        </div>
    );
};

/* 
 * Enhanced Visual for "Instant Solutions"
 * Simulates a code scanning interface to look like a premium image 
 */
const SolutionsVisual = () => {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center translate-x-0 translate-y-2 md:translate-x-8 md:translate-y-4">

            {/* Main Interface Window */}
            <div className="relative w-[110%] bg-surface border border-border rounded-xl shadow-2xl p-4 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">

                {/* Window Header */}
                <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-surface-highlight rounded border border-border text-[10px] text-text-secondary font-mono">
                        <Bug size={10} />
                        <span>analysis_buffer.log</span>
                    </div>
                </div>

                {/* Code Content */}
                <div className="space-y-2 font-mono text-[10px]">
                    <div className="flex items-center gap-2 text-text-tertiary">
                        <span>01</span>
                        <span className="text-accent-secondary">import</span> <span className="text-text-primary">DevFixer</span> <span className="text-accent-secondary">from</span> <span className="text-accent-success">'@core/engine'</span>;
                    </div>
                    <div className="flex items-center gap-2 text-text-tertiary relative">
                        <div className="absolute -left-4 w-[110%] h-full bg-accent-error/10 border-l-2 border-accent-error" />
                        <span>02</span>
                        <span className="text-text-primary">const</span> <span className="text-accent-warning">error</span> <span className="text-text-primary">=</span> <span className="text-text-primary">await</span> <span className="text-accent-primary">scan(log)</span>;
                    </div>
                    <div className="flex items-center gap-2 text-text-tertiary">
                        <span>03</span>
                        <span className="text-text-tertiary">// Detecting root cause...</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-tertiary">
                        <span>04</span>
                        <span className="text-accent-secondary">return</span> <span className="text-text-primary">error.fix</span><span className="text-text-tertiary">();</span>
                    </div>
                </div>

                {/* Floating "Success" Toast */}
                <div className="absolute bottom-4 right-4 bg-accent-success text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-float-slow">
                    <div className="bg-white/20 p-1 rounded-full">
                        <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold">Patched</div>
                        <div className="text-[8px] opacity-90">0.05s</div>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute -z-10 -right-10 -bottom-10 w-40 h-40 bg-accent-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
        </div>
    );
};

const GlobalCDNVisual = () => {
    return (
        <div className="absolute right-0 top-0 h-full w-[60%] overflow-hidden opacity-90 pointer-events-none md:w-[50%]">
            {/* Map Background */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-contain bg-right opacity-[0.08] dark:invert" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

            {/* Pulsing Nodes */}
            <div className="absolute top-[30%] right-[40%] w-2 h-2 bg-accent-primary rounded-full animate-ping opacity-75" />
            <div className="absolute top-[30%] right-[40%] w-1.5 h-1.5 bg-accent-primary sm:bg-accent-primary/80 rounded-full shadow-[0_0_10px_green]" />

            <div className="absolute top-[45%] right-[20%] w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-75 delay-700" />
            <div className="absolute top-[45%] right-[20%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />

            <div className="absolute top-[60%] right-[60%] w-2 h-2 bg-accent-primary rounded-full animate-ping opacity-75 delay-1000" />
            <div className="absolute top-[60%] right-[60%] w-1.5 h-1.5 bg-accent-primary/80 rounded-full shadow-[0_0_10px_green]" />

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <path d="M 180 80 Q 240 120 280 160" fill="none" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="4 4" className="animate-dash" />
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#008000" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const CopyPasteVisual = () => {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="w-[90%] bg-[#0A0A0A] border border-white/10 rounded-lg p-3 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center gap-1 text-[8px] text-gray-400 bg-white/5 px-2 py-0.5 rounded cursor-pointer hover:bg-white/10 transition-colors">
                        <Copy size={8} /> Copy
                    </div>
                </div>
                <div className="space-y-1.5">
                    <div className="h-1.5 w-1/3 bg-accent-primary/30 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-gray-700/50 rounded-full" />
                    <div className="h-1.5 w-1/2 bg-accent-hover/30 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-gray-700/50 rounded-full" />
                </div>
                {/* Cursor clicking copy */}
                <div className="absolute top-2 right-4 w-6 h-6 bg-accent-primary/20 rounded-full animate-ping opacity-75" />
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    return (
        <section className="py-24 relative bg-background overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/3 rounded-full blur-[120px] pointer-events-none" />

            {/* Section Header */}
            <div className="container mx-auto px-6 lg:px-12 mb-16 relative z-10">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-accent-primary">
                        Built for Performance
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed">
                        Features designed for the modern stack. Everything you need to debug faster, optimizing your workflow from day one.
                    </p>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">

                    {/* HERO FEATURE: Instant Solutions */}
                    <BentoCard
                        title="Instant Solutions"
                        description="Stop wasting hours on StackOverflow. Get direct, verified fixes for your specific error logs instantly using our AI-driven engine."
                        icon={<Zap size={24} className="text-accent-primary" />}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface to-surface-highlight border-accent-primary/20 shadow-xl"
                        href="/solutions"
                        ctaText="Explore Solutions"
                    >
                        <SolutionsVisual />
                    </BentoCard>

                    {/* Standard Card 2 */}
                    <BentoCard
                        title="Verified by Experts"
                        description="Every solution is peer-reviewed by senior architects for security and best practices."
                        icon={<Shield size={24} className="text-accent-primary" />}
                        className="bg-surface"
                    />

                    {/* Standard Card 3 */}
                    <BentoCard
                        title="Universal Knowledge"
                        description="From React hydration errors to Rust borrow checker issues—we cover the stack."
                        className="bg-surface"
                    />

                    <BentoCard
                        title="Copy-Paste Ready"
                        description="Clean, formatted code snippets."
                        icon={<Code2 size={24} className="text-accent-primary" />}
                        className="bg-surface relative"
                        href="/errors"
                        ctaText="Learn more"
                    >
                        <CopyPasteVisual />
                    </BentoCard>

                    <BentoCard
                        title="Global CDN"
                        description="Access solutions from any edge location within milliseconds."
                        icon={<Globe size={24} className="text-accent-primary" />}
                        className="md:col-span-2 bg-gradient-to-l from-surface to-surface-highlight relative"
                        href="/global-cdn"
                        ctaText="View Network"
                    >
                        <GlobalCDNVisual />
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
