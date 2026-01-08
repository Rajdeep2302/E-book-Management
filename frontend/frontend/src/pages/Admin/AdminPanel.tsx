import { useState } from 'react'
import Navbar from '../../components/admin/Navbar'
import ReviewResources from '../../components/admin/ReviewResources'
import ManageResources from '../../components/admin/ManageResources'
import AdminSettings from '../../components/admin/AdminSettings'
import { LayoutDashboard } from 'lucide-react'

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);

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
                                    {/* Stat Card 1 */}
                                    <div className="group relative p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] hover:bg-blue-600/10 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/60 group-hover:text-blue-400 transition-colors">Total Community</p>
                                                <h3 className="text-5xl font-light text-white tracking-tighter">1,284</h3>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-500/80 uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                                                +12% vs last month
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat Card 2 */}
                                    <div className="group relative p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] hover:bg-indigo-600/10 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/60 group-hover:text-indigo-400 transition-colors">Published Content</p>
                                                <h3 className="text-5xl font-light text-white tracking-tighter">452</h3>
                                            </div>
                                            <div className="text-[11px] font-bold text-indigo-400/20 uppercase tracking-wider">
                                                Platform growth active
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat Card 3 */}
                                    <div className="group relative p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] hover:bg-red-600/5 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/60 group-hover:text-red-400 transition-colors">Pending Review</p>
                                                <h3 className="text-5xl font-light text-white tracking-tighter">12</h3>
                                            </div>
                                            <button
                                                onClick={() => setActiveTab('review')}
                                                className="w-fit text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-5 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-900/10"
                                            >
                                                PRIORITY REVIEW
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-16 border border-white/5 rounded-[3rem] text-center space-y-4 bg-white/1">
                                    <div className="w-12 h-12 rounded-full border border-white/10 mx-auto flex items-center justify-center text-white/20">
                                        <LayoutDashboard className="w-5 h-5 stroke-[1px]" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/20">Metric visualizations coming soon</p>
                                </div>
                            </section>
                        )}

                        {activeTab === 'users' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <header className="space-y-2 mb-12">
                                    <h1 className="text-4xl font-light text-white/90 tracking-tight">Admin <span className="font-semibold text-white">Users</span></h1>
                                    <p className="text-white/40 font-medium">Full governance over the contributor network.</p>
                                </header>
                                <div className="p-24 border border-white/5 border-dashed rounded-[3rem] text-center">
                                    <p className="text-white/20 font-bold uppercase tracking-[0.2em] text-xs">Governance matrix initializing...</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'manage' && <ManageResources />}
                        {activeTab === 'review' && <ReviewResources />}
                        {activeTab === 'settings' && <AdminSettings />}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminPanel
