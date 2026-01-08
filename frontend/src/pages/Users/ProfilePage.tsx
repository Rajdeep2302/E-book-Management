import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, BookOpen } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUserData] = useState<any>(null);

    useEffect(() => {
        const userData = getUser();
        if (!userData) {
            navigate('/login');
            return;
        }
        setUserData(userData);
    }, [navigate]);

    if (!user) return null;



    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <User className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tighter">My <span className="text-blue-500">Profile</span></h1>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
                    >
                        Return
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h3 className="text-lg font-semibold">Details</h3>
                            <button className="text-xs bg-blue-600 px-3 py-1 rounded-full">Edit Photo</button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-800 rounded-lg">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                                <p className="text-lg font-medium">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-800 rounded-lg">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                <p className="text-lg font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-800 rounded-lg">
                                <Shield className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Role</p>
                                <p className="text-lg font-medium capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-500" />  Activity
                            </h3>
                            <p className="text-gray-400 font-light">
                                No recent activity found.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <h4 className="text-red-500 font-medium mb-2">Danger Zone</h4>
                            <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                            <DeleteButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DeleteButton = () => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone!")) {
            setIsDeleting(true);
            try {
                const { deleteAccount, logout } = await import('../../services/authService');
                const { toast } = await import('react-toastify');

                const result = await deleteAccount();

                if (result.success) {
                    toast.success("Your account has been deleted successfully.");
                    logout();
                    setTimeout(() => navigate('/signup'), 1500);
                } else {
                    toast.error(result.message || "Failed to delete account.");
                    setIsDeleting(false);
                }
            } catch (error) {
                const { toast } = await import('react-toastify');
                toast.error("Something went wrong. Please try again.");
                setIsDeleting(false);
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
    );
};

export default ProfilePage;
