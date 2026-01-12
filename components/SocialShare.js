"use client";

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Twitter, Facebook, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SocialShare({ title, url }) {
    const [copied, setCopied] = useState(false);

    // Ensure we have a valid URL (client-side only)
    const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';
    const shareText = `Check out this fix: ${title}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy matches', err);
        }
    };

    const handleShare = (platform) => {
        let link = '';
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedText = encodeURIComponent(shareText);

        switch (platform) {
            case 'twitter':
                link = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
                break;
            case 'linkedin':
                link = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'facebook':
                link = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'whatsapp':
                link = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
                break;
            default:
                break;
        }

        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    // Web Share API for mobile
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                // console.log('Error sharing:', err);
            }
        }
    }


    return (
        <div className="p-6 bg-panel border-2 border-border/60 rounded-3xl space-y-6">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-purple/10 rounded-full flex items-center justify-center text-accent-purple font-bold text-xl">
                    <Share2 size={20} />
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Share Solution</p>
                    <p className="font-bold text-sm text-text-primary">Help others fix this bug</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center justify-center p-3 rounded-xl bg-background border border-border hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:text-accent-primary transition-all"
                    title="Share on Twitter"
                >
                    <Twitter size={18} />
                </button>
                <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center justify-center p-3 rounded-xl bg-background border border-border hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:text-accent-primary transition-all"
                    title="Share on LinkedIn"
                >
                    <Linkedin size={18} />
                </button>
                <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center justify-center p-3 rounded-xl bg-background border border-border hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:text-accent-primary transition-all"
                    title="Share on Facebook"
                >
                    <Facebook size={18} />
                </button>
                <button
                    onClick={handleCopy}
                    className="flex items-center justify-center p-3 rounded-xl bg-background border border-border hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:text-accent-primary transition-all relative"
                    title="Copy Link"
                >
                    {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                </button>
            </div>

            {typeof navigator !== 'undefined' && navigator.share && (
                <button
                    onClick={handleNativeShare}
                    className="w-full py-3 bg-accent-primary/10 text-accent-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all"
                >
                    Share via...
                </button>
            )}
        </div>
    );
}
