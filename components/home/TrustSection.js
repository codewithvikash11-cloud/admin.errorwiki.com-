
import React from 'react';

const companies = [
    "ACME Corp", "NextGen", "Starlight", "Vertex", "Orbit", "Velocify"
];

export default function TrustSection() {
    return (
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-medium text-accent-primary uppercase tracking-widest mb-6">
                    Powering developers at
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using text for now as placeholders for SVGs, styled to look like logos */}
                    {companies.map((company, i) => (
                        <span key={i} className="text-xl md:text-2xl font-black text-text-secondary hover:text-text-primary transition-colors cursor-default select-none font-sans">
                            {company}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
