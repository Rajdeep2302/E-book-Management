import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import DataTable, { type Column } from '../components/DataTable';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    isVerified: boolean;
    createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Users = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({ students: 0, teachers: 0, admins: 0, total: 0 });

    const fetchUsers = async () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            // Build query params
            const params = new URLSearchParams();
            if (activeTab !== 'all') {
                params.append('role', activeTab);
            }
            if (searchQuery) {
                params.append('search', searchQuery);
            }
            params.append('limit', '100');

            const response = await fetch(`${API_BASE_URL}/users?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/users/stats/roles`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch stats');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [activeTab]);

    useEffect(() => {
        fetchStats();
    }, []);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== '') {
                fetchUsers();
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const columns: Column<User>[] = [
        {
            header: 'User',
            accessor: (user) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            accessor: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${user.role === 'admin'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    : user.role === 'teacher'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                    {user.role}
                </span>
            )
        },
        {
            header: 'Status',
            accessor: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isVerified
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                </span>
            )
        },
        {
            header: 'Joined',
            accessor: (user) => new Date(user.createdAt).toLocaleDateString()
        },
        {
            header: 'Actions',
            accessor: (user) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/users/${user._id}`)
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                    View
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 text-sm">
                        {stats.total} total users • {stats.students} students • {stats.teachers} teachers • {stats.admins} admins
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <GlassCard className="flex items-center gap-2 px-4 py-2 !rounded-xl" hover={false}>
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-40 md:w-64"
                        />
                    </GlassCard>
                    <button
                        onClick={fetchUsers}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Role Filter Tabs */}
            <div className="flex gap-4 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-3 px-2 text-sm font-medium transition-all relative ${activeTab === 'all' ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    All Users
                    {activeTab === 'all' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />}
                </button>
                <button
                    onClick={() => setActiveTab('student')}
                    className={`pb-3 px-2 text-sm font-medium transition-all relative ${activeTab === 'student' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Students ({stats.students})
                    {activeTab === 'student' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />}
                </button>
                <button
                    onClick={() => setActiveTab('teacher')}
                    className={`pb-3 px-2 text-sm font-medium transition-all relative ${activeTab === 'teacher' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Teachers ({stats.teachers})
                    {activeTab === 'teacher' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500" />}
                </button>
                <button
                    onClick={() => setActiveTab('admin')}
                    className={`pb-3 px-2 text-sm font-medium transition-all relative ${activeTab === 'admin' ? 'text-red-400' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Admins ({stats.admins})
                    {activeTab === 'admin' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            ) : (
                <GlassCard className="p-0 overflow-hidden">
                    {users.length > 0 ? (
                        <DataTable
                            data={users}
                            columns={columns}
                            onRowClick={(user) => navigate(`/admin/users/${user._id}`)}
                        />
                    ) : (
                        <div className="p-12 text-center text-gray-400">
                            No users found
                        </div>
                    )}
                </GlassCard>
            )}
        </div>
    );
};

export default Users;
