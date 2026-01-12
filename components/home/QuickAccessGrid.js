
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const cards = [
    {
        title: 'Compiler',
        description: 'Run code instantly in 40+ languages.',
        image: '/Compiler.png',
        href: '/compiler',
        color: 'text-accent-primary',
        bg: 'bg-accent-primary/10',
        border: 'group-hover:border-accent-primary/50'
    },
    {
        title: 'Dev Tools',
        description: 'Formatters, converters, and generators.',
        image: '/Dev Tools.png',
        href: '/tools',
        color: 'text-accent-primary',
        bg: 'bg-accent-primary/10',
        border: 'group-hover:border-accent-primary/50'
    },
    {
        title: 'API Tester',
        description: 'Debug REST endpoints directly.',
        image: '/API Tester.png',
        href: '/api-tester',
        color: 'text-accent-primary',
        bg: 'bg-accent-primary/10',
        border: 'group-hover:border-accent-primary/50'
    },
    {
        title: 'Learn',
        description: 'Master new skills with interactive lessons.',
        image: '/Learn.png',
        href: '/learn',
        color: 'text-accent-primary',
        bg: 'bg-accent-primary/10',
        border: 'group-hover:border-accent-primary/50'
    }
];

export default function QuickAccessGrid() {
    return (
        <section className="py-12 bg-background relative z-10">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.href}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-xl",
                                card.border
                            )}
                        >
                            <div className={cn("inline-flex p-3 rounded-lg mb-4 transition-colors", card.bg)}>
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-white transition-colors">
                                {card.title}
                            </h3>

                            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                                {card.description}
                            </p>

                            <div className="flex items-center text-xs font-bold text-text-tertiary group-hover:text-accent-primary transition-colors">
                                <span>Open</span>
                                <ArrowRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>

                            {/* Glow Effect */}
                            <div
                                className={cn(
                                    "absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
                                    card.bg.replace('/10', '')
                                )}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
