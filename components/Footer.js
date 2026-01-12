"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Command, Terminal, Cpu, Github, Twitter, Globe, Heart } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="lg:pl-16 bg-background border-t border-border relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute -top-[300px] left-1/4 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block">
                            <Logo />
                        </Link>
                        <p className="text-text-secondary leading-relaxed max-w-sm text-sm">
                            The intelligent error resolution platform for modern engineering teams. Fix faster, ship cleaner.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink icon={<Github size={18} />} href="https://github.com" />
                            <SocialLink icon={<Twitter size={18} />} href="https://twitter.com" />
                            <SocialLink icon={<Globe size={18} />} href="https://errorwiki.com" />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-sm text-text-primary">Platform</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <FooterLink href="/errors">Database</FooterLink>
                            <FooterLink href="/languages">Languages</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/enterprise">Enterprise</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-sm text-text-primary">Resources</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <FooterLink href="/docs">Documentation</FooterLink>
                            <FooterLink href="/api">API Reference</FooterLink>
                            <FooterLink href="/blog">Engineering Blog</FooterLink>
                            <FooterLink href="/community">Community</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="font-bold text-sm text-text-primary">Stay updated</h4>
                        <p className="text-xs text-text-secondary">
                            Get the latest debugging tips and platform updates directly to your inbox.
                        </p>
                        <form className="relative flex gap-2">
                            <input
                                type="email"
                                placeholder="developer@company.com"
                                className="w-full h-10 bg-surface border border-border rounded-lg px-4 text-sm outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all"
                            />
                            <button type="submit" className="h-10 px-4 bg-text-primary text-background rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-text-tertiary">
                        &copy; {new Date().getFullYear()} ErrorWiki Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-text-tertiary border border-border px-3 py-1.5 rounded-full bg-surface/50">
                        <span>Crafted by developers</span>
                        <Heart size={10} className="text-red-500 fill-red-500" />
                        <span>worldwide</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, children }) => (
    <li>
        <Link href={href} className="hover:text-accent-primary transition-colors block">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ icon, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:bg-surface-highlight hover:text-text-primary transition-all hover:-translate-y-1">
        {icon}
    </a>
);

export default Footer;
