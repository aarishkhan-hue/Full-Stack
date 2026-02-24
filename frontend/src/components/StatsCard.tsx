import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: 'indigo' | 'purple' | 'fuchsia' | 'emerald';
    index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon, color, index }) => {
    const colorMap = {
        indigo: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20',
        purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20',
        fuchsia: 'from-fuchsia-500/20 to-fuchsia-600/5 text-fuchsia-400 border-fuchsia-500/20',
        emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    };

    return (
        <div
            className={`glass-card p-6 rounded-[2rem] flex items-center gap-5 group animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={`p-4 bg-gradient-to-br ${colorMap[color]} rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-tighter">{label}</p>
                <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;
