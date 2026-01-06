import GlassCard from './GlassCard';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: 'blue' | 'purple' | 'green' | 'amber' | 'red';
}

const StatsCard = ({ label, value, icon: Icon, trend, trendUp, color = 'blue' }: StatsCardProps) => {
    const colors = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-emerald-500 to-teal-500',
        amber: 'from-amber-500 to-orange-500',
        red: 'from-red-500 to-rose-500',
    };

    const bgColors = {
        blue: 'bg-blue-500/10',
        purple: 'bg-purple-500/10',
        green: 'bg-emerald-500/10',
        amber: 'bg-amber-500/10',
        red: 'bg-red-500/10',
    };

    const textColors = {
        blue: 'text-blue-500',
        purple: 'text-purple-500',
        green: 'text-emerald-500',
        amber: 'text-amber-500',
        red: 'text-red-500',
    };

    return (
        <GlassCard className="p-6 flex flex-col justify-between h-full group hover:bg-white/[0.08]">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bgColors[color]} ${textColors[color]} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-3xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{value}</h3>
                <p className="text-sm text-gray-400 font-medium">{label}</p>
            </div>

            {/* Decorative gradient blur */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${colors[color]} rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity`} />
        </GlassCard>
    );
};

export default StatsCard;
