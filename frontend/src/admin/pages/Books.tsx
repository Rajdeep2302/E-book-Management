import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatusBadge, { type Status } from '../components/StatusBadge';
import ActionButtons from '../components/ActionButtons';
import DataTable, { type Column } from '../components/DataTable';

interface Book {
    id: string;
    title: string;
    author: string;
    uploader: string;
    uploadDate: string;
    status: Status;
    category: string;
}

const Books = () => {
    const [filter, setFilter] = useState<Status | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const [books, setBooks] = useState<Book[]>([
        { id: '1', title: 'Advanced Physics Vol. 1', author: 'H.C. Verma', uploader: 'John Doe', uploadDate: '2023-12-10', status: 'accepted', category: 'Physics' },
        { id: '2', title: 'Start with Why', author: 'Simon Sinek', uploader: 'Jane Smith', uploadDate: '2024-01-02', status: 'pending', category: 'Self Help' },
        { id: '3', title: 'Calculus Made Easy', author: 'S.P. Thompson', uploader: 'Mike Brown', uploadDate: '2023-11-15', status: 'rejected', category: 'Mathematics' },
        { id: '4', title: 'Clean Code', author: 'Robert C. Martin', uploader: 'Alex Johnson', uploadDate: '2024-01-05', status: 'unverified', category: 'Computer Science' },
        { id: '5', title: 'Introduction to Algorithms', author: 'CLRS', uploader: 'John Doe', uploadDate: '2023-10-20', status: 'accepted', category: 'Computer Science' },
    ]);

    const handleAction = (id: string, newStatus: Status) => {
        setBooks(books.map(book => book.id === id ? { ...book, status: newStatus } : book));
    };

    const filteredBooks = books.filter(book => {
        const matchesFilter = filter === 'all' || book.status === filter;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const columns: Column<Book>[] = [
        {
            header: 'Book Details',
            accessor: (book) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-white">{book.title}</div>
                        <div className="text-xs text-gray-500">{book.author}</div>
                    </div>
                </div>
            )
        },
        { header: 'Category', accessor: 'category' },
        { header: 'Uploader', accessor: 'uploader' },
        { header: 'Status', accessor: (book) => <StatusBadge status={book.status} /> },
        {
            header: 'Actions',
            accessor: (book) => (
                <div className="flex items-center gap-2">
                    {book.status === 'pending' || book.status === 'unverified' ? (
                        <ActionButtons
                            onAccept={() => handleAction(book.id, 'accepted')}
                            onReject={() => handleAction(book.id, 'rejected')}
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
        { id: 'all', label: 'All Books' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'pending', label: 'Pending' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'unverified', label: 'Not Verified' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Books Management</h1>
                    <p className="text-gray-400 text-sm">Review and manage uploaded books</p>
                </div>

                <div className="flex items-center gap-3">
                    <GlassCard className="flex items-center gap-2 px-4 py-2 !rounded-xl" hover={false}>
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search books..."
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
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }
             `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <GlassCard className="p-0 overflow-hidden">
                <DataTable data={filteredBooks} columns={columns} />
            </GlassCard>
        </div>
    );
};

export default Books;
