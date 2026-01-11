import { useState, useEffect } from 'react';
import { ChevronRight, File, ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api';

const TrendingNotes = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/upload/getBook?type=note&limit=3`);
                const data = await response.json();
                if (data.success) {
                    const mappedNotes = data.resources.map((note: any, index: number) => ({
                        ...note,
                        color: index === 0 ? "from-blue-500/10 to-transparent" :
                            index === 1 ? "from-purple-500/10 to-transparent" :
                                "from-indigo-500/10 to-transparent"
                    }));
                    setNotes(mappedNotes);
                }
            } catch (error) {
                console.error("Failed to fetch trending notes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleNoteClick = (note: any) => {
        navigate(`/notes/${note.uploadId}`);
    };

    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-32 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12 relative">
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-white tracking-tighter mb-2">
                            Trending <span className="text-blue-500">Notes.</span>
                        </h2>
                        <p className="text-gray-500 font-light text-lg">Most viewed Computer Science resources this week.</p>
                    </div>
                    <a href="/notes" className="group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 uppercase tracking-widest text-[10px] font-black pb-2">
                        See All Notes <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notes.map((note, i) => (
                            <div
                                key={i}
                                onClick={() => handleNoteClick(note)}
                                className={`group relative flex items-center justify-between p-8 rounded-[2rem] border border-white/5 bg-gradient-to-r ${note.color} hover:border-blue-500/20 hover:bg-[#070707] transition-all duration-500 cursor-pointer overflow-hidden`}
                            >
                                {/* Animated Background Glow */}
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="w-16 h-16 flex items-center justify-center bg-black border border-white/10 text-gray-400 rounded-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                                        <File className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{note.title}</h3>
                                        <div className="flex items-center gap-4">
                                            <p className="text-sm text-gray-500 font-medium">Author: <span className="text-gray-300">{note.author}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 relative z-10">
                                    <span className="hidden sm:block text-[10px] font-black px-4 py-2 bg-white/5 text-gray-400 rounded-full uppercase tracking-[0.2em] border border-white/5">
                                        {note.documentType || 'PDF'}
                                    </span>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-500">
                                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrendingNotes;