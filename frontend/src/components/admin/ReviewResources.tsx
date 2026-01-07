import { useState } from 'react';
import { toast } from 'react-toastify';
import { Check, X, Eye, FileText, BookOpen, Clock, User, Tag, Filter, ArrowUpDown } from 'lucide-react';

interface Resource {
    id: string;
    title: string;
    author: string;
    type: 'book' | 'note';
    category: string;
    uploadedBy: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: number;
}

const ReviewResources = () => {
    const [filterType, setFilterType] = useState<'all' | 'book' | 'note'>('all');
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState<'title' | 'newest' | 'oldest'>('newest');

    const [resources, setResources] = useState<Resource[]>([
        {
            id: '1',
            title: 'Advanced Quantum Mechanics',
            author: 'David J. Griffiths',
            type: 'book',
            category: 'Physics',
            uploadedBy: 'John Doe',
            timestamp: '2h ago',
            status: 'pending',
            createdAt: Date.now() - 7200000
        },
        {
            id: '2',
            title: 'Intro to Data Structures',
            author: 'Jane Smith',
            type: 'note',
            category: 'Computer Science',
            uploadedBy: 'Alice Johnson',
            timestamp: '5h ago',
            status: 'pending',
            createdAt: Date.now() - 18000000
        },
        {
            id: '3',
            title: 'Constitutional Law Case Studies',
            author: 'B.R. Ambedkar',
            type: 'book',
            category: 'Law',
            uploadedBy: 'Robert Brown',
            timestamp: 'Yesterday',
            status: 'pending',
            createdAt: Date.now() - 86400000
        }
    ]);

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setResources((prev: Resource[]) => prev.filter((r: Resource) => r.id !== id));
        if (action === 'approve') {
            toast.success("Resource successfully added to library");
        } else {
            toast.warn("Resource rejected and discarded from queue");
        }
    };

    const filteredAndSortedResources = resources
        .filter(r => filterType === 'all' || r.type === filterType)
        .sort((a, b) => {
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            if (sortBy === 'oldest') return a.createdAt - b.createdAt;
            return b.createdAt - a.createdAt;
        });

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            {/* Header Section - Opinionated Spacing */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-light text-white/90 tracking-tight">
                        Review <span className="font-semibold text-white">Queue</span>
                    </h1>
                    <p className="text-sm text-white/40 font-medium max-w-sm leading-relaxed">
                        Manually verify new academic contributions before they reach the public library.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="text-xs font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 py-2 px-1"
                        >
                            <Filter className="w-3 h-3" />
                            {filterType === 'all' ? 'All Content' : filterType.toUpperCase()}
                        </button>
                        {showFilter && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowFilter(false)} />
                                <div className="absolute right-0 mt-2 w-36 bg-[#111] border border-white/5 rounded-xl shadow-2xl p-1 z-50">
                                    {(['all', 'book', 'note'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => { setFilterType(type); setShowFilter(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${filterType === type ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : sortBy === 'oldest' ? 'title' : 'newest')}
                        className="text-xs font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 py-2 px-1"
                    >
                        <ArrowUpDown className="w-3 h-3" />
                        {sortBy.toUpperCase()}
                    </button>
                </div>
            </header>

            {/* List Section */}
            <div className="space-y-px">
                {filteredAndSortedResources.length === 0 ? (
                    <div className="py-24 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/5 text-white/20">
                            <Check className="w-5 h-5" />
                        </div>
                        <p className="text-white/30 font-medium text-sm">Perfectly clear. No pending reviews.</p>
                    </div>
                ) : (
                    filteredAndSortedResources.map((resource: Resource) => (
                        <div
                            key={resource.id}
                            className="group relative flex flex-col md:flex-row md:items-center gap-8 py-8 px-2 border-b border-white/3 transition-all hover:bg-white/1"
                        >
                            {/* Type Indicator - Subtle and Opinionated */}
                            <div className="hidden md:block w-1 h-8 rounded-full bg-white/5 group-hover:bg-blue-500/40 transition-colors" />

                            <div className="flex-1 min-w-0 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                                        {resource.type}
                                    </span>
                                    <span className="text-[10px] font-medium text-white/30 flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 opacity-50" /> {resource.timestamp}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-white/90 leading-snug group-hover:text-white transition-colors">
                                        {resource.title}
                                    </h3>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                                        <span className="text-white/50 font-medium">{resource.author}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                        <span className="text-white/30">{resource.category}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[11px] font-medium text-white/20">
                                    <span>Contributor:</span>
                                    <span className="text-white/40">{resource.uploadedBy}</span>
                                </div>
                            </div>

                            {/* Actions - Human Centric & Dominant-Submissive Balance */}
                            <div className="flex items-center gap-6 md:pl-8">
                                <button className="text-white/30 hover:text-white transition-colors hidden sm:block">
                                    <Eye className="w-4 h-4" />
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleAction(resource.id, 'reject')}
                                        className="h-10 px-6 rounded-full text-xs font-bold text-white/40 hover:text-red-400 hover:bg-red-500/5 border border-white/5 hover:border-red-500/20 transition-all active:scale-95"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleAction(resource.id, 'approve')}
                                        className="h-10 px-8 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/5 transition-all active:scale-95"
                                    >
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <footer className="pt-12 flex justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">
                    End of review queue
                </p>
            </footer>
        </div>
    );
};

export default ReviewResources;
