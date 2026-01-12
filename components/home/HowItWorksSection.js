"use client";

import React from 'react';
import { Search, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: <Search size={24} />,
        title: "Search Error",
        description: "Paste your stack trace.",
        accent: "text-accent-primary",
        border: "group-hover:border-accent-primary/50"
    },
    {
        icon: <BookOpen size={24} />,
        title: "Get Solution",
        description: "Receive a verified patch.",
        accent: "text-accent-primary",
        border: "group-hover:border-accent-primary/50"
    },
    {
        icon: <CheckCircle size={24} />,
        title: "Deploy Fix",
        description: "Ship confidently.",
        accent: "text-accent-primary",
        border: "group-hover:border-accent-primary/50"
    }
];

const HowItWorksSection = () => {
    return (
        <section className="py-24 bg-surface border-y border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-accent-primary mb-2">
                            How it works
                        </h2>
                        <p className="text-text-secondary">Three simple steps to zero-bug policy.</p>
                    </div>

                    <div className="hidden md:block h-px flex-1 bg-border mx-8 translate-y-[-10px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="group relative">
                            {/* Connector Line */}
                            {index !== steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-border to-transparent -z-10" />
                            )}

                            <div className={`glass p-8 rounded-2xl border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${step.border}`}>
                                <div className={`w-12 h-12 rounded-lg bg-surface-highlight border border-border flex items-center justify-center mb-6 ${step.accent}`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
                                <p className="text-text-secondary text-sm">{step.description}</p>
                            </div>

                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center text-xs font-bold text-text-tertiary">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
