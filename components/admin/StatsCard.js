import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCard({ title, value, icon: Icon, trend, trendValue, color = "blue" }) {
    const colorStyles = {
        blue: "text-blue-500 bg-blue-500/10",
        green: "text-green-500 bg-green-500/10",
        yellow: "text-yellow-500 bg-yellow-500/10",
        purple: "text-purple-500 bg-purple-500/10",
    };

    return (
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorStyles[color] || colorStyles.blue}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {trendValue}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-accent-primary transition-colors">
                    {value}
                </h3>
            </div>
        </div>
    );
}
