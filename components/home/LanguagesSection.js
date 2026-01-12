"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Code } from 'lucide-react';

import { LANGUAGES } from '@/lib/languages';

const languages = LANGUAGES.filter(l => l.image).map(l => ({
    name: l.name,
    count: "1k+", // Dynamic counts would be better, but static for now
    image: l.image,
    slug: l.slug
}));

const LanguageChip = ({ lang }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <Link
            href={`/languages?q=${lang.slug}`}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-border bg-surface hover:bg-surface-highlight hover:border-accent-primary/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group/chip"
        >
            <div className="relative w-6 h-6 shrink-0 mr-2.5 flex items-center justify-center">
                {!imgError ? (
                    <Image
                        src={lang.image}
                        alt={`${lang.name} icon`}
                        width={24}
                        height={24}
                        className="object-contain rounded-[8px]"
                        onError={() => setImgError(true)}
                        priority={false}
                    />
                ) : (
                    <Code className="w-5 h-5 text-text-tertiary" />
                )}
            </div>

            <span className="font-bold text-text-primary text-lg">{lang.name}</span>
            <span className="text-xs font-mono text-text-tertiary opacity-60 group-hover/chip:opacity-100">{lang.count}</span>
        </Link>
    );
};

const LanguagesSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background border-y border-border">

            <div className="container mx-auto px-6 text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold text-accent-primary tracking-tight mb-4">Supported Ecosystems</h2>
                <p className="text-text-secondary">We track error patterns across the entire modern stack.</p>
            </div>

            {/* Responsive Grid Container */}
            <div className="relative z-10 px-4 md:px-0">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
                    {languages.map((lang, index) => (
                        <LanguageChip key={`${lang.slug}-${index}`} lang={lang} />
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-transparent pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-primary/5 blur-[100px] rounded-full" />
            </div>
        </section>
    );
};

export default LanguagesSection;
