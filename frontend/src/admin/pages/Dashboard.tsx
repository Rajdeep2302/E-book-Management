import {
    Users,
    BookOpen,
    FileText,
    ClipboardList,
    AlertTriangle,
    TrendingUp,
    Activity
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import GlassCard from '../components/GlassCard';

const Dashboard = () => {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, trend: '12%', trendUp: true, color: 'blue' as const },
        { label: 'Total Books', value: '456', icon: BookOpen, trend: '5%', trendUp: true, color: 'purple' as const },
        { label: 'Total Notes', value: '892', icon: FileText, trend: '8%', trendUp: true, color: 'green' as const },
        { label: 'Question Papers', value: '156', icon: ClipboardList, trend: '2%', trendUp: false, color: 'amber' as const },
        { label: 'Unverified Files', value: '23', icon: AlertTriangle, trend: 'Requires Action', trendUp: false, color: 'red' as const },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-400 mt-1">Snapshot of platform activity and content status</p>
                </div>
                <div className="text-sm text-gray-500 font-medium">Last updated: Just now</div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content Area: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <GlassCard className="lg:col-span-2 p-6 min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            Platform Growth
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-400 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">7D</span>
                            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-xs text-blue-400 cursor-pointer">1M</span>
                            <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-400 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">1Y</span>
                        </div>
                    </div>

                    {/* Placeholder for Chart */}
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                            <div key={i} className="w-full bg-blue-500/10 rounded-t-lg relative group h-full flex flex-col justify-end overflow-hidden">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="w-full bg-gradient-to-t from-blue-600/50 to-purple-500/50 rounded-t-lg relative group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-4 text-xs text-gray-500 mt-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </GlassCard>

                {/* Recent Activity Feed */}
                <GlassCard className="p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        Recent Activity
                    </h3>

                    <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {[
                            { text: 'John Doe uploaded a new book', time: '2 mins ago', type: 'upload' },
                            { text: 'Sarah Smith registered as Teacher', time: '15 mins ago', type: 'user' },
                            { text: 'Physics Notes v2 approved', time: '1 hour ago', type: 'success' },
                            { text: 'Chemistry Question Paper rejected', time: '3 hours ago', type: 'error' },
                            { text: 'New report on Biology Notes', time: '5 hours ago', type: 'warning' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="relative">
                                    <div className={`
                    w-2 h-2 rounded-full mt-2
                    ${item.type === 'upload' ? 'bg-blue-500' : ''}
                    ${item.type === 'user' ? 'bg-purple-500' : ''}
                    ${item.type === 'success' ? 'bg-emerald-500' : ''}
                    ${item.type === 'error' ? 'bg-red-500' : ''}
                    ${item.type === 'warning' ? 'bg-amber-500' : ''}
                    shadow-[0_0_10px_currentColor]
                  `} />
                                    {i !== 4 && <div className="absolute top-4 left-1 w-[1px] h-10 bg-white/10 group-hover:bg-white/20 transition-colors" />}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.text}</p>
                                    <p className="text-xs text-gray-600 mt-1">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Dashboard;
