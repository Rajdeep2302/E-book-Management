import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Shield, Bell, Lock, LogOut, Settings } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Profile = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/login');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-white">Admin Profile</h1>

            {/* Profile Header */}
            <GlassCard className="p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10" />

                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-xl shadow-blue-500/20">
                    <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                            alt="Admin Avatar"
                            className="w-full h-full bg-slate-800"
                        />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-3">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Super Admin</h2>
                        <p className="text-blue-400 font-medium">System Administrator</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm md:items-center">
                        <span className="flex items-center gap-2 justify-center md:justify-start">
                            <Mail className="w-4 h-4" /> admin@eduhub.com
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-2 justify-center md:justify-start">
                            <Shield className="w-4 h-4" /> Level: Root Access
                        </span>
                    </div>
                </div>

                <button className="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
                    Edit Profile
                </button>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Settings Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings className="w-5 h-5 text-gray-400" /> Settings
                    </h3>

                    <GlassCard className="divide-y divide-white/5">
                        <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Notifications</h4>
                                    <p className="text-xs text-gray-400">Receive alerts for new uploads</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                        </div>

                        <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Security</h4>
                                    <p className="text-xs text-gray-400">Change password, 2FA</p>
                                </div>
                            </div>
                            <button className="text-xs text-blue-400 hover:text-blue-300">Manage</button>
                        </div>
                    </GlassCard>
                </div>

                {/* Danger Zone */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 text-red-500">
                        <LogOut className="w-5 h-5" /> Session
                    </h3>

                    <GlassCard className="p-6 space-y-4">
                        <p className="text-gray-400 text-sm">
                            You are currently logged in as Super Admin.
                            Logging out will redirect you to the main login page.
                        </p>

                        <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
                        >
                            Logout
                        </button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default Profile;
