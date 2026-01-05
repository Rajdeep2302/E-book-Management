import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/notes/NoteCard';
import NoteFilter from '../components/notes/NoteFilter';
import { Loader2 } from 'lucide-react';

// MOCK DATA GENERATOR
const generateMockNotes = (count: number) => {
    const subjects = ['Computer Science', 'Mathematics', 'Physics', 'History', 'Literature', 'Psychology', 'Business'];
    const titles = [
        'Data Structures - Week 5 Trees',
        'Thermodynamics Formulas',
        'Calculus II Final Review',
        'Linear Algebra Cheat Sheet',
        'Operating Systems Notes',
        'Database Management Summary',
        'Quantum Mechanics Lecture 3',
        'World War II Timeline',
        'Shakespeare Analysis',
        'Cognitive Psychology Notes'
    ];
    const types = ['PDF', 'DOC', 'DOCX', 'PPT', 'TXT'];

    return Array.from({ length: count }, (_, i) => ({
        id: `note-${i}`,
        title: `${titles[i % titles.length]} - Part ${Math.floor(i / 10) + 1}`,
        author: `Student ${i}`,
        category: subjects[i % subjects.length],
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
        downloads: Math.floor(Math.random() * 5000) + 100,
        imageUrl: `https://source.unsplash.com/random/300x400?notes,study,sig=${i}`,
        type: types[i % types.length],
    }));
};

const ALL_NOTES = generateMockNotes(100); // Simulate database of 100 notes
const ITEMS_PER_LOAD = 10; // Load 10 notes at a time (5 rows of 2)

const NotesPage = () => {
    const [displayedNotes, setDisplayedNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter & Sort Logic
    const filteredNotes = useMemo(() => {
        let result = ALL_NOTES.filter(note => {
            const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        result.sort((a, b) => a.title.localeCompare(b.title));

        return result;
    }, [searchQuery, selectedCategory]);

    // Reset when filters change
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setDisplayedNotes(filteredNotes.slice(0, ITEMS_PER_LOAD));
            setHasMore(filteredNotes.length > ITEMS_PER_LOAD);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [filteredNotes]);

    // Load more function
    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        setTimeout(() => {
            const currentLength = displayedNotes.length;
            const nextNotes = filteredNotes.slice(currentLength, currentLength + ITEMS_PER_LOAD);
            setDisplayedNotes(prev => [...prev, ...nextNotes]);
            setHasMore(currentLength + nextNotes.length < filteredNotes.length);
            setLoading(false);
        }, 800);
    }, [loading, hasMore, displayedNotes.length, filteredNotes]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading, loadMore]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-32">

                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-5xl font-bold mb-4 tracking-tighter">
                        Study <span className="text-blue-500">Notes.</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl">
                        Access comprehensive study notes shared by students. Filter by subject, search for specific topics, and accelerate your learning.
                    </p>
                </div>

                {/* Controls Section (Moved to Top) */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-end justify-between">

                    <div className="flex-1 w-full md:max-w-2xl">
                        <NoteFilter
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">

                        {/* Stats Badge */}
                        <div className="bg-blue-900/20 border border-blue-500/20 px-6 py-2 rounded-xl h-full flex flex-col justify-center min-h-[46px]">
                            <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold text-center">
                                {filteredNotes.length} Notes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area: Grid */}
                <div className="w-full">

                    {/* The Grid - 2 columns on mobile, up to 4 on desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {displayedNotes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {!loading && displayedNotes.length === 0 && (
                        <div className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-white/5 border-dashed">
                            <p className="text-gray-500 text-lg">No notes found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="mt-4 text-blue-500 hover:text-blue-400 font-bold text-sm uppercase tracking-wide"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Infinite Scroll Trigger */}
                    {hasMore && (
                        <div ref={observerTarget} className="mt-12 flex items-center justify-center py-8">
                            {loading && (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="text-sm font-medium">Loading more notes...</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
