import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    Trash2,
    Power,
    Search,
    Filter,
    MoreVertical,
    BookOpen,
    FileText,
    Download,
    Eye,
    Settings,
    Loader2
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

interface Resource {
    id: string;
    uploadId: string;
    title: string;
    type: 'book' | 'note';
    category: string;
    status: 'active' | 'inactive';
    downloads: number;
    dateAdded: string;
    bookFile?: string;
}

const ManageResources = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [typeFilter, setTypeFilter] = useState<'all' | 'book' | 'note'>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${API_BASE_URL}/upload/getBook`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success && data.resources) {
                    const mappedResources = data.resources.map((r: any) => ({
                        id: r.id,
                        uploadId: r.uploadId,
                        title: r.title,
                        type: r.isABook ? 'book' : 'note',
                        category: r.category,
                        status: 'active' as const,
                        downloads: 0,
                        dateAdded: new Date(r.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                        }),
                        bookFile: r.bookFile
                    }));
                    setResources(mappedResources);
                }
            } catch (err) {
                console.error('Failed to fetch resources:', err);
                toast.error('Failed to load resources');
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const toggleStatus = (id: string) => {
        const resource = resources.find(r => r.id === id);
        if (!resource) return;

        const newStatus = resource.status === 'active' ? 'inactive' : 'active';
        setResources((prev: Resource[]) => prev.map((r: Resource) =>
            r.id === id ? { ...r, status: newStatus } : r
        ));
        toast.info(`Resource status updated to ${newStatus}`);
    };

    const deleteResource = async (id: string, uploadId: string) => {
        setActiveMenuId(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/upload/${uploadId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setResources((prev: Resource[]) => prev.filter((r: Resource) => r.id !== id));
                toast.error("Resource permanently removed from library");
            } else {
                toast.error("Failed to delete resource");
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast.error("Failed to delete resource");
        }
    };

    const filteredResources = resources.filter((r: Resource) => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || r.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* Search & Filters */}
            <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-light text-white/90 tracking-tight">
                            Resource <span className="font-semibold text-white">Library</span>
                        </h1>
                        <p className="text-sm text-white/40 font-medium max-w-sm">
                            Manage the public catalog. Toggle visibility or refine metadata.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search gallery..."
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Content Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {(['all', 'book', 'note'] as const).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTypeFilter(t)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${typeFilter === t ? 'bg-white text-black' : 'text-white/40 bg-white/4 hover:bg-white/8'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Availability</label>
                                <div className="flex flex-wrap gap-2">
                                    {(['all', 'active', 'inactive'] as const).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setStatusFilter(s)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${statusFilter === s ? 'bg-white text-black' : 'text-white/40 bg-white/4 hover:bg-white/8'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => { setTypeFilter('all'); setStatusFilter('all'); }}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400/60 hover:text-red-400 transition-colors"
                                >
                                    Reset Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Resource List */}
            <div className="space-y-px">
                {loading ? (
                    <div className="py-32 text-center">
                        <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-500" />
                        <p className="text-sm text-white/40">Loading resources...</p>
                    </div>
                ) : filteredResources.length === 0 ? (
                    <div className="py-32 text-center opacity-20">
                        <Search className="w-12 h-12 mx-auto mb-4 stroke-[1px]" />
                        <p className="text-sm font-medium">No matches found in the library.</p>
                    </div>
                ) : (
                    filteredResources.map((resource: Resource) => (
                        <div key={resource.id} className="group flex flex-col md:flex-row md:items-center gap-6 py-6 px-2 border-b border-white/3 transition-all hover:bg-white/1">

                            {/* Visual Identity */}
                            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${resource.status === 'active' ? 'bg-white/5 text-white/60' : 'bg-red-500/5 text-red-500/40'}`}>
                                {resource.type === 'book' ? <BookOpen className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>

                            <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                <div className="lg:col-span-5 space-y-1">
                                    <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors truncate">
                                        {resource.title}
                                    </h3>
                                    <p className="text-xs text-white/30 font-medium uppercase tracking-wider">{resource.category}</p>
                                </div>

                                <div className="lg:col-span-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${resource.status === 'active' ? 'bg-emerald-500/60' : 'bg-white/10'}`} />
                                        <span className={`text-[11px] font-bold uppercase tracking-wider ${resource.status === 'active' ? 'text-white/60' : 'text-white/20'}`}>
                                            {resource.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white/60">{resource.downloads.toLocaleString()}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/20">Downloads</span>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 text-right">
                                    <span className="text-[10px] font-medium text-white/30">{resource.dateAdded}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-1 md:pl-6">
                                <button
                                    onClick={() => toggleStatus(resource.id)}
                                    className={`p-3 rounded-xl transition-all ${resource.status === 'active' ? 'text-white/20 hover:text-red-400' : 'text-white/20 hover:text-emerald-400'}`}
                                    title={resource.status === 'active' ? 'Archive' : 'Publish'}
                                >
                                    <Power className="w-4 h-4" />
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setActiveMenuId(activeMenuId === resource.id ? null : resource.id)}
                                        className={`p-3 rounded-xl transition-all ${activeMenuId === resource.id ? 'text-white' : 'text-white/20 hover:text-white'}`}
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {activeMenuId === resource.id && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                                            <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/5 rounded-2xl shadow-2xl py-2 z-50">
                                                <button className="w-full px-4 py-3 text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center gap-3">
                                                    <Eye className="w-4 h-4 opacity-40" /> View Live
                                                </button>
                                                <button className="w-full px-4 py-3 text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center gap-3">
                                                    <Settings className="w-4 h-4 opacity-40" /> Metadata
                                                </button>
                                                {resource.bookFile && (
                                                    <a
                                                        href={`${API_BASE_URL.replace('/api', '')}${resource.bookFile}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full px-4 py-3 text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center gap-3"
                                                    >
                                                        <Download className="w-4 h-4 opacity-40" /> Pull File
                                                    </a>
                                                )}
                                                <div className="mx-4 my-2 border-t border-white/3" />
                                                <button
                                                    onClick={() => deleteResource(resource.id, resource.uploadId)}
                                                    className="w-full px-4 py-3 text-left text-xs font-bold text-red-400/60 hover:text-red-400 transition-all flex items-center gap-3"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete
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

export default ManageResources;
