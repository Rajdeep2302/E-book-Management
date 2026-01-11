import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    Trash2,
    Search,
    Filter,
    MoreVertical,
    User,
    Users,
    Shield,
    GraduationCap,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import { getToken } from '../../services/authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    isVerified: boolean;
    department?: string;
    institute?: string;
    createdAt: string;
}

interface UsersResponse {
    success: boolean;
    users: UserData[];
    total: number;
    page: number;
    pages: number;
    count: number;
}

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
    const [users, setUsers] = useState<UserData[]>([]);
    const [stats, setStats] = useState({ students: 0, teachers: 0, admins: 0, total: 0 });

    // Fetch users from backend
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const queryParams = new URLSearchParams();
            if (roleFilter !== 'all') queryParams.append('role', roleFilter);
            if (searchTerm) queryParams.append('search', searchTerm);

            const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data: UsersResponse = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user stats
    const fetchStats = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/users/stats/roles`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setStats(data.stats);
                }
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, [roleFilter]);

    // Update user role
    const updateUserRole = async (userId: string, newRole: 'student' | 'teacher' | 'admin') => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                toast.success('User role updated');
                fetchUsers();
                fetchStats();
            } else {
                toast.error('Failed to update user role');
            }
        } catch {
            toast.error('Failed to update user role');
        }
        setActiveMenuId(null);
    };

    // Delete user
    const deleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success('User deleted successfully');
                fetchUsers();
                fetchStats();
            } else {
                toast.error('Failed to delete user');
            }
        } catch {
            toast.error('Failed to delete user');
        }
        setActiveMenuId(null);
    };

    // Search debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <Shield className="w-4 h-4" />;
            case 'teacher': return <Users className="w-4 h-4" />;
            default: return <GraduationCap className="w-4 h-4" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'teacher': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-6 bg-white/2 border border-white/5 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Total Users</p>
                    <p className="text-3xl font-light text-white">{stats.total}</p>
                </div>
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60 mb-2">Students</p>
                    <p className="text-3xl font-light text-white">{stats.students}</p>
                </div>
                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/60 mb-2">Teachers</p>
                    <p className="text-3xl font-light text-white">{stats.teachers}</p>
                </div>
                <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400/60 mb-2">Admins</p>
                    <p className="text-3xl font-light text-white">{stats.admins}</p>
                </div>
            </div>

            {/* Search & Filters */}
            <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-light text-white/90 tracking-tight">
                            User <span className="font-semibold text-white">Management</span>
                        </h1>
                        <p className="text-sm text-white/40 font-medium max-w-sm">
                            Manage all registered users. Update roles or remove accounts.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { fetchUsers(); fetchStats(); }}
                            className="p-2 text-white/20 hover:text-white/60 transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>

                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="bg-transparent border-b border-white/10 py-2 pl-7 pr-4 text-sm text-white focus:outline-none focus:border-white/40 transition-all w-full md:w-64 placeholder:text-white/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-2 transition-colors ${showFilters ? 'text-white' : 'text-white/20 hover:text-white/60'}`}
                        >
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="p-6 bg-white/2 border border-white/5 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">User Role</label>
                            <div className="flex flex-wrap gap-2">
                                {(['all', 'student', 'teacher', 'admin'] as const).map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRoleFilter(r)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${roleFilter === r ? 'bg-white text-black' : 'text-white/40 bg-white/4 hover:bg-white/8'}`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* User List */}
            <div className="space-y-px">
                {loading ? (
                    <div className="py-32 text-center opacity-40">
                        <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin" />
                        <p className="text-sm font-medium">Loading users...</p>
                    </div>
                ) : error ? (
                    <div className="py-32 text-center opacity-40">
                        <XCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                        <p className="text-sm font-medium text-red-400">{error}</p>
                        <button
                            onClick={fetchUsers}
                            className="mt-4 text-xs font-bold text-white/60 hover:text-white"
                        >
                            Try again
                        </button>
                    </div>
                ) : users.length === 0 ? (
                    <div className="py-32 text-center opacity-20">
                        <User className="w-12 h-12 mx-auto mb-4 stroke-[1px]" />
                        <p className="text-sm font-medium">No users found.</p>
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="group flex flex-col md:flex-row md:items-center gap-6 py-6 px-2 border-b border-white/3 transition-all hover:bg-white/1">
                            {/* Avatar */}
                            <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                                <User className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                {/* Name & Email */}
                                <div className="lg:col-span-4 space-y-1">
                                    <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors truncate">
                                        {user.name}
                                    </h3>
                                    <p className="text-xs text-white/30 font-medium truncate">{user.email}</p>
                                </div>

                                {/* Role Badge */}
                                <div className="lg:col-span-2">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRoleColor(user.role)}`}>
                                        {getRoleIcon(user.role)}
                                        {user.role}
                                    </span>
                                </div>

                                {/* Verified Status */}
                                <div className="lg:col-span-2">
                                    <div className="flex items-center gap-2">
                                        {user.isVerified ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500/60">Verified</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-4 h-4 text-amber-500" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500/60">Pending</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Department */}
                                <div className="lg:col-span-2">
                                    <span className="text-xs text-white/40 truncate block">{user.department || '-'}</span>
                                </div>

                                {/* Created Date */}
                                <div className="lg:col-span-2 text-right">
                                    <span className="text-[10px] font-medium text-white/30">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-1 md:pl-6">
                                <div className="relative">
                                    <button
                                        onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                                        className={`p-3 rounded-xl transition-all ${activeMenuId === user.id ? 'text-white' : 'text-white/20 hover:text-white'}`}
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {activeMenuId === user.id && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                                            <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/5 rounded-2xl shadow-2xl py-2 z-50">
                                                <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Change Role</p>
                                                {(['student', 'teacher', 'admin'] as const).filter(r => r !== user.role).map((role) => (
                                                    <button
                                                        key={role}
                                                        onClick={() => updateUserRole(user.id, role)}
                                                        className="w-full px-4 py-3 text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center gap-3 capitalize"
                                                    >
                                                        {getRoleIcon(role)} Make {role}
                                                    </button>
                                                ))}
                                                <div className="mx-4 my-2 border-t border-white/3" />
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="w-full px-4 py-3 text-left text-xs font-bold text-red-400/60 hover:text-red-400 transition-all flex items-center gap-3"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete User
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
