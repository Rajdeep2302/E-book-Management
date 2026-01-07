import { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatusBadge, { type Status } from '../components/StatusBadge';
import ActionButtons from '../components/ActionButtons';
import DataTable, { type Column } from '../components/DataTable';

interface Note {
    id: string;
    title: string;
    subject: string;
    uploader: string;
    uploadDate: string;
    status: Status;
}

const Notes = () => {
    const [filter, setFilter] = useState<Status | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const [notes, setNotes] = useState<Note[]>([
        { id: '1', title: 'Thermodynamics Class Notes', subject: 'Physics', uploader: 'John Doe', uploadDate: '2023-12-12', status: 'accepted' },
        { id: '2', title: 'Organic Chemistry Reactions', subject: 'Chemistry', uploader: 'Jane Smith', uploadDate: '2024-01-08', status: 'pending' },
        { id: '3', title: 'Linear Algebra Formulas', subject: 'Mathematics', uploader: 'Mike Brown', uploadDate: '2023-11-25', status: 'rejected' },
        { id: '4', title: 'Java Cheat Sheet', subject: 'Computer Science', uploader: 'Alex Johnson', uploadDate: '2024-01-01', status: 'unverified' },
        { id: '5', title: 'Modern History Summary', subject: 'History', uploader: 'Sarah Wilson', uploadDate: '2023-10-30', status: 'accepted' },
    ]);

    const handleAction = (id: string, newStatus: Status) => {
        setNotes(notes.map(note => note.id === id ? { ...note, status: newStatus } : note));
    };

    const filteredNotes = notes.filter(note => {
        const matchesFilter = filter === 'all' || note.status === filter;
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const columns: Column<Note>[] = [
        {
            header: 'Note Details',
            accessor: (note) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-white">{note.title}</div>
                        <div className="text-xs text-gray-500">{note.subject}</div>
                    </div>
                </div>
            )
        },
        { header: 'Uploader', accessor: 'uploader' },
        { header: 'Date', accessor: 'uploadDate' },
        { header: 'Status', accessor: (note) => <StatusBadge status={note.status} /> },
        {
            header: 'Actions',
            accessor: (note) => (
                <div className="flex items-center gap-2">
                    {note.status === 'pending' || note.status === 'unverified' ? (
                        <ActionButtons
                            onAccept={() => handleAction(note.id, 'accepted')}
                            onReject={() => handleAction(note.id, 'rejected')}
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
        { id: 'all', label: 'All Notes' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'pending', label: 'Pending' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'unverified', label: 'Not Verified' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Notes Management</h1>
                    <p className="text-gray-400 text-sm">Review and manage uploaded notes</p>
                </div>

                <div className="flex items-center gap-3">
                    <GlassCard className="flex items-center gap-2 px-4 py-2 !rounded-xl" hover={false}>
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notes..."
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
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }
             `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <GlassCard className="p-0 overflow-hidden">
                <DataTable data={filteredNotes} columns={columns} />
            </GlassCard>
        </div>
    );
};

export default Notes;
