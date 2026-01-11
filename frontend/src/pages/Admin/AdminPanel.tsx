import { useState, useEffect } from 'react'
import Navbar from '../../components/admin/Navbar'
import ManageResources from '../../components/admin/ManageResources'
import ManageUsers from '../../components/admin/ManageUsers'
import AdminSettings from '../../components/admin/AdminSettings'
import { LayoutDashboard, Users, BookOpen } from 'lucide-react'

const API_BASE_URL = 'http://localhost:8000/api';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    const [stats, setStats] = useState({
        users: { total: 0, admins: 0, users: 0 },
        uploads: { total: 0, books: 0, notes: 0 }
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [usersRes, uploadsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/users/stats/roles`, { headers }),
                    fetch(`${API_BASE_URL}/upload/stats`, { headers })
                ]);

                const usersData = await usersRes.json();
                const uploadsData = await uploadsRes.json();

                setStats({
                    users: usersData.success ? usersData.stats : { total: 0, admins: 0, users: 0 },
                    uploads: uploadsData.success ? uploadsData.stats : { total: 0, books: 0, notes: 0 }
                });
            } catch (error) {
                console.error("Failed to fetch admin dashboard stats", error);
            }
        };

        if (activeTab === 'dashboard') {
            fetchStats();
        }
    }, [activeTab]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#020202] selection:bg-blue-500/30 overflow-x-hidden">
            {/* Gemini Glowing Lights */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div className={`flex-1 flex flex-col min-h-0 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${collapsed ? 'lg:pl-20' : 'lg:pl-72'} relative z-10`}>
                <main className="flex-1 overflow-y-auto focus:outline-none p-6 md:p-10 lg:p-16">
                    <div className="max-w-6xl mx-auto">
                        {activeTab === 'dashboard' && (
                            <section className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <header className="space-y-2">
                                    <h1 className="text-5xl font-light text-white/90 tracking-tight">
                                        System <span className="font-semibold text-white">Overview</span>
                                    </h1>
                                    <p className="text-white/40 font-medium max-w-lg leading-relaxed">
                                        Monitor the pulse of EduHub. Real-time metrics for content distribution and community growth.
                                    </p>
                                </header>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Stat Card 1: Total Community */}
                                    <div className="group relative p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] hover:bg-blue-600/10 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/60 group-hover:text-blue-400 transition-colors">Total Community</p>
                                                <h3 className="text-5xl font-light text-white tracking-tighter">{stats.users.total.toLocaleString()}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-500/60 uppercase tracking-wider">
                                                <Users className="w-4 h-4" />
                                                Active Members
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat Card 2: Published Content */}
                                    <div className="group relative p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] hover:bg-indigo-600/10 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/60 group-hover:text-indigo-400 transition-colors">Published Content</p>
                                                <h3 className="text-5xl font-light text-white tracking-tighter">{stats.uploads.total.toLocaleString()}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-400/60 uppercase tracking-wider">
                                                <BookOpen className="w-4 h-4" />
                                                Books & Notes
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat Card 3: Admins (Replaced Pending Review) */}
                                    <div className="group relative p-8 bg-purple-600/5 border border-purple-500/10 rounded-[2.5rem] hover:bg-purple-600/10 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400/60 group-hover:text-purple-400 transition-colors">System Admins</p>
                                                <h3 className="text-5xl font-light text-white tracking-tighter">{stats.users.admins.toLocaleString()}</h3>
                                            </div>
                                            <div className="text-[11px] font-bold text-purple-400/60 uppercase tracking-wider">
                                                Managing Platform
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-16 border border-white/5 rounded-[3rem] text-center space-y-4 bg-white/1">
                                    <div className="w-12 h-12 rounded-full border border-white/10 mx-auto flex items-center justify-center text-white/20">
                                        <LayoutDashboard className="w-5 h-5 stroke-[1px]" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/20">Additional visualizations coming soon</p>
                                </div>
                            </section>
                        )}

                        {activeTab === 'users' && <ManageUsers />}

                        {activeTab === 'manage' && <ManageResources />}
                        {/* {activeTab === 'settings' && <AdminSettings />} */}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminPanel
