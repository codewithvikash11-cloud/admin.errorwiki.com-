"use client";

import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

export default function AdminCoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Courses Manager</h1>
                    <p className="text-text-secondary">Manage learning paths and tutorials.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform">
                    <Plus size={18} />
                    New Course
                </button>
            </div>

            <div className="bg-panel border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mb-4 text-accent-primary">
                    <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">No Courses Found</h3>
                <p className="text-text-secondary max-w-md mb-6">
                    Start building your educational content here. Courses will appear in the Learning Center.
                </p>
            </div>
        </div>
    );
}
