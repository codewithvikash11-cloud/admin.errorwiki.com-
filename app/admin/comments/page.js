"use client";

import React, { useState, useEffect } from 'react';
import { commentsService } from '@/lib/comments';
import { Check, X, AlertOctagon, MessageSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // all, pending, approved, spam

    useEffect(() => {
        fetchComments();
    }, [filter]);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await commentsService.getComments(filter === 'all' ? null : filter);
            setComments(data);
        } catch (error) {
            console.error("Comments Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        try {
            await commentsService.updateStatus(id, status);
            // Optimistic update
            setComments(comments.filter(c => c.id !== id));
        } catch (error) {
            alert("Action failed: " + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Comments</h1>
                    <p className="text-text-secondary">Moderate user discussions and remove spam.</p>
                </div>
                <div className="flex bg-panel border border-border p-1 rounded-xl">
                    {['pending', 'approved', 'spam', 'all'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                                filter === f ? "bg-accent-primary text-white shadow-md" : "text-text-secondary hover:text-text-primary hover:bg-surface"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 text-center animate-pulse flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-accent-primary" size={32} />
                        <p className="text-text-tertiary">Loading comments...</p>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center gap-4">
                        <div className="p-4 bg-surface rounded-full text-text-tertiary">
                            <MessageSquare size={32} />
                        </div>
                        <p className="text-text-secondary font-bold">No {filter} comments found.</p>
                        <p className="text-text-tertiary text-sm">Great job keeping it clean! 🎉</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {comments.map(comment => (
                            <div key={comment.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-surface/50 transition-colors group">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-text-primary">{comment.author}</span>
                                        <span className="text-text-tertiary text-xs">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                        <span className="text-text-tertiary text-xs">• on <span className="font-medium text-text-secondary">{comment.postTitle}</span></span>
                                    </div>
                                    <p className="text-text-secondary leading-relaxed text-sm bg-surface p-3 rounded-lg border border-border/50">
                                        {comment.content}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 self-start md:self-center">
                                    {filter !== 'approved' && (
                                        <button
                                            onClick={() => handleAction(comment.id, 'approved')}
                                            className="p-2.5 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-xl transition-all"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                    )}
                                    {filter !== 'spam' && (
                                        <button
                                            onClick={() => handleAction(comment.id, 'spam')}
                                            className="p-2.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl transition-all"
                                            title="Mark as Spam"
                                        >
                                            <AlertOctagon size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleAction(comment.id, 'rejected')}
                                        className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                        title="Delete"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
