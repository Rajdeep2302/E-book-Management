import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminNav from './components/AdminNav';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Navbar />

            {/* Background ambient glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Admin<span className="text-blue-500">Console</span>
                    </h1>
                    <p className="text-gray-400">Manage users, resources, and platform analytics.</p>
                </div>

                <AdminNav />

                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
