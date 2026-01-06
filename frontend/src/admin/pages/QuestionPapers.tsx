import React, { useState } from 'react';
import { ClipboardList, Search, Filter } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatusBadge, { type Status } from '../components/StatusBadge';
import ActionButtons from '../components/ActionButtons';
import DataTable, { type Column } from '../components/DataTable';

interface QuestionPaper {
    id: string;
    title: string;
    year: string;
    exam: string;
    uploader: string;
    uploadDate: string;
    status: Status;
}

const QuestionPapers = () => {
    const [filter, setFilter] = useState<Status | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const [papers, setPapers] = useState<QuestionPaper[]>([
        { id: '1', title: 'JEE Advanced Paper 1', year: '2023', exam: 'JEE Adv', uploader: 'John Doe', uploadDate: '2023-06-10', status: 'accepted' },
        { id: '2', title: 'NEET Practice Set 5', year: '2024', exam: 'NEET', uploader: 'Jane Smith', uploadDate: '2024-01-15', status: 'pending' },
        { id: '3', title: 'CBSE Class 12 Physics', year: '2022', exam: 'Board', uploader: 'Mike Brown', uploadDate: '2022-04-05', status: 'rejected' },
        { id: '4', title: 'GATE CS Solution', year: '2023', exam: 'GATE', uploader: 'Alex Johnson', uploadDate: '2023-03-01', status: 'unverified' },
        { id: '5', title: 'UPSC Prelims GS', year: '2023', exam: 'UPSC', uploader: 'Sarah Wilson', uploadDate: '2023-07-20', status: 'accepted' },
    ]);

    const handleAction = (id: string, newStatus: Status) => {
        setPapers(papers.map(paper => paper.id === id ? { ...paper, status: newStatus } : paper));
    };

    const filteredPapers = papers.filter(paper => {
        const matchesFilter = filter === 'all' || paper.status === filter;
        const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.exam.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const columns: Column<QuestionPaper>[] = [
        {
            header: 'Paper Details',
            accessor: (paper) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-white">{paper.title}</div>
                        <div className="text-xs text-gray-500">{paper.exam} • {paper.year}</div>
                    </div>
                </div>
            )
        },
        { header: 'Uploader', accessor: 'uploader' },
        { header: 'Date', accessor: 'uploadDate' },
        { header: 'Status', accessor: (paper) => <StatusBadge status={paper.status} /> },
        {
            header: 'Actions',
            accessor: (paper) => (
                <div className="flex items-center gap-2">
                    {paper.status === 'pending' || paper.status === 'unverified' ? (
                        <ActionButtons
                            onAccept={() => handleAction(paper.id, 'accepted')}
                            onReject={() => handleAction(paper.id, 'rejected')}
                            size="sm"
                        />
                    ) : (
                        <span className="text-xs text-gray-600 italic">No actions needed</span>
                    )}
                </div>
            )
        }
    ];

    const filterTabs = [
        { id: 'all', label: 'All Papers' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'pending', label: 'Pending' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'unverified', label: 'Not Verified' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Question Papers</h1>
                    <p className="text-gray-400 text-sm">Review and manage usage question papers</p>
                </div>

                <div className="flex items-center gap-3">
                    <GlassCard className="flex items-center gap-2 px-4 py-2 !rounded-xl" hover={false}>
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search papers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-40 md:w-64"
                        />
                    </GlassCard>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10">
                {filterTabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as Status | 'all')}
                        className={`
               px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
               ${filter === tab.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }
             `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <GlassCard className="p-0 overflow-hidden">
                <DataTable data={filteredPapers} columns={columns} />
            </GlassCard>
        </div>
    );
};

export default QuestionPapers;
