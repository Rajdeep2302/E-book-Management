import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, Shield, CheckCircle, XCircle, Loader2, Trash2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    isVerified: boolean;
    createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const UserAccount = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
            } else {
                setError(data.message || 'User not found');
            }
        } catch (err) {
            setError('Failed to fetch user');
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (newRole: string) => {
        setUpdating(true);
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update user');
        } finally {
            setUpdating(false);
        }
    };

    const deleteUser = async () => {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                navigate('/admin/users');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Users
                </button>
                <div className="p-8 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/30">
                    {error || 'User not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Users
            </button>

            {/* Profile Header */}
            <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${user.role === 'admin'
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                    : user.role === 'teacher'
                                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                        : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                                }`}>
                                {user.role}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1.5">
                                <Mail className="w-4 h-4" /> {user.email}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                                {user.isVerified ? (
                                    <><CheckCircle className="w-4 h-4 text-green-500" /> Verified</>
                                ) : (
                                    <><XCircle className="w-4 h-4 text-yellow-500" /> Not Verified</>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Role Management */}
            <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Role Management
                </h3>

                <div className="flex flex-wrap gap-3">
                    {['student', 'teacher', 'admin'].map((role) => (
                        <button
                            key={role}
                            onClick={() => updateRole(role)}
                            disabled={updating || user.role === role}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${user.role === role
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {updating && user.role !== role ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
                            {role}
                        </button>
                    ))}
                </div>
            </GlassCard>

            {/* Danger Zone */}
            <GlassCard className="p-6 border-red-500/20">
                <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Danger Zone
                </h3>

                {!deleteConfirm ? (
                    <button
                        onClick={() => setDeleteConfirm(true)}
                        className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-semibold"
                    >
                        Delete This User
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm">Are you sure?</span>
                        <button
                            onClick={deleteUser}
                            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-semibold"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setDeleteConfirm(false)}
                            className="px-4 py-2 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors text-sm font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};

export default UserAccount;
