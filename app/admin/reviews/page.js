"use client";

import React, { useEffect, useState } from 'react';
import { getPendingPosts, reviewPost } from '@/lib/actions/reviews';
import { Check, X, AlertTriangle, FileText, Eye, Brain } from 'lucide-react';
import Link from 'next/link';

export default function ReviewQueue() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueue = async () => {
        setLoading(true);
        const data = await getPendingPosts();
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    const handleDecision = async (postId, action) => {
        const reason = action === 'reject' ? prompt("Enter rejection reason (optional):") : null;
        if (action === 'reject' && reason === null) return; // Cancelled prompt

        const res = await reviewPost(postId, action, reason);
        if (res.success) {
            setPosts(prev => prev.filter(p => p.id !== postId));
        } else {
            alert('Action failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Content Review Queue</h1>
                <p className="text-gray-500 text-sm">Approve or reject user submissions before they go live.</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading pending items...</div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-[#0A0A0A] border border-[#222] rounded-2xl">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                        <Check size={32} />
                    </div>
                    <h3 className="text-white font-bold text-lg">All Caught Up!</h3>
                    <p className="text-gray-500">No pending submissions found.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 flex flex-col lg:flex-row gap-6 hover:border-[#333] transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/20">PENDING REVIEW</span>
                                    <span className="text-xs text-gray-500 font-mono">{new Date(post.submittedAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">{post.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{post.preview}</p>

                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-[#111] px-2 py-1 rounded-lg">
                                        <Brain size={12} className={post.aiScore > 30 ? "text-red-400" : "text-green-400"} />
                                        AI Score: <span className={post.aiScore > 30 ? "text-red-400 font-bold" : "text-white"}>{post.aiScore}%</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-[#111] px-2 py-1 rounded-lg">
                                        <FileText size={12} className={post.plagiarismScore > 15 ? "text-red-400" : "text-green-400"} />
                                        Plagiarism: <span className={post.plagiarismScore > 15 ? "text-red-400 font-bold" : "text-white"}>{post.plagiarismScore}%</span>
                                    </div>
                                    <Link href={`/${post.slug || '#'}`} target="_blank" className="flex items-center gap-1 text-xs text-accent-primary hover:underline">
                                        <Eye size={12} /> Preview
                                    </Link>
                                </div>
                            </div>

                            <div className="flex lg:flex-col gap-2 justify-center border-t lg:border-t-0 lg:border-l border-[#222] pt-4 lg:pt-0 lg:pl-6 min-w-[140px]">
                                <button
                                    onClick={() => handleDecision(post.id, 'approve')}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500 hover:text-white text-green-500 border border-green-500/20 rounded-xl py-2 px-4 transition-all font-bold text-sm"
                                >
                                    <Check size={16} /> Approve
                                </button>
                                <button
                                    onClick={() => handleDecision(post.id, 'reject')}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 rounded-xl py-2 px-4 transition-all font-bold text-sm"
                                >
                                    <X size={16} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
