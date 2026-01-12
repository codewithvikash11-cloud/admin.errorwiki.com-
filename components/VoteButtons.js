"use client";

import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function VoteButtons({ slug, initialLikes, initialDislikes, likedBy = [], dislikedBy = [] }) {
    const { user } = useAuth();
    const router = useRouter();

    // Optimistic UI state
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [userVote, setUserVote] = useState(null); // 'like' | 'dislike' | null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            if (likedBy.includes(user.$id)) setUserVote('like');
            else if (dislikedBy.includes(user.$id)) setUserVote('dislike');
            else setUserVote(null);
        }
    }, [user, likedBy, dislikedBy]);

    const handleVote = async (type) => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (loading) return;

        // Optimistic Update
        const previousVote = userVote;
        const previousLikes = likes;
        const previousDislikes = dislikes;

        let newVote = type;
        if (userVote === type) {
            // Toggle off
            newVote = 'none';
        }

        setUserVote(newVote === 'none' ? null : newVote);

        // Adjust counts
        if (previousVote === 'like') setLikes(l => l - 1);
        if (previousVote === 'dislike') setDislikes(d => d - 1);

        if (newVote === 'like') setLikes(l => l + 1);
        if (newVote === 'dislike') setDislikes(d => d + 1);

        setLoading(true);

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, userId: user.$id, type: newVote })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            // Sync with server truth eventually?
            // For now rely on optimistic.
        } catch (error) {
            console.error("Vote failed", error);
            // Revert
            setUserVote(previousVote);
            setLikes(previousLikes);
            setDislikes(previousDislikes);
            alert("Failed to submit vote. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4 py-4 border-t border-b border-border/50 my-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Was this helpful?</span>

            <button
                onClick={() => handleVote('like')}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    userVote === 'like' ? "bg-accent-green/20 text-accent-green" : "bg-panel hover:bg-white/5 text-text-secondary"
                )}
            >
                <ThumbsUp size={16} className={cn(userVote === 'like' && "fill-current")} />
                <span>{likes}</span>
            </button>

            <button
                onClick={() => handleVote('dislike')}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    userVote === 'dislike' ? "bg-red-500/20 text-red-500" : "bg-panel hover:bg-white/5 text-text-secondary"
                )}
            >
                <ThumbsDown size={16} className={cn(userVote === 'dislike' && "fill-current")} />
                <span>{dislikes}</span>
            </button>
        </div>
    );
}
