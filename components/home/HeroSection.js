'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import AuroraBackground from '@/components/hero/AuroraBackground'; // Assuming this exists or I'll check/fix
import { cn } from '@/lib/utils';

export default function HeroSection({
    title = "Build Faster. Code Better.",
    subtitle = "The ultimate developer playground and toolkit.",
    ctaPromise = "Start Coding",
    ctaLink = "/compiler"
}) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {/* Fallback pattern if Aurora is complex or missing, but trying to use it if available */}
                <div className="absolute inset-0 bg-[#0a0a0a]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                {/* Try to use AuroraBackground if it exists, else we just have this nice grid */}
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8 max-w-5xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <Sparkles size={12} />
                    <span>v2.0 Now Available</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    {title}
                </h1>

                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Link
                        href={ctaLink}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#008000] px-8 font-medium text-white transition-all duration-300 hover:bg-[#006600] type-submit"
                    >
                        <span className="flex items-center gap-2">
                            {ctaPromise}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>

                    <Link
                        href="/tools"
                        className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 px-8 font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                        Explore Tools
                    </Link>
                </div>
            </div>
        </section>
    );
}
