"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = "Back" }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors group px-3 py-1.5 hover:bg-white/5 rounded-xl border border-transparent hover:border-border w-fit"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-[10px] uppercase tracking-widest">{label}</span>
        </button>
    );
}
