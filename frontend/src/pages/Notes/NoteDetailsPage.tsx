import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { FileText, Download, Heart, Share2, ArrowLeft, Lock } from 'lucide-react';

const NoteDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isReading, setIsReading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // Mock Note Data (In real app, fetch based on ID)
    const note = {
        id,
        title: "Data Structures - Week 5 Trees",
        author: "Alex Chen",
        description: "Comprehensive notes covering binary trees, AVL trees, and red-black trees. Includes detailed examples, diagrams, and practice problems with solutions.",
        pages: 25, // Simulated total pages
        category: "Computer Science",
        rating: 4.7,
        type: "PDF",
        imageUrl: "https://source.unsplash.com/random/400x600?notes,study"
    };

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    // Simulated Reader View
    const ReaderView = () => {
        // Generate mock pages
        const pages = Array.from({ length: 15 }, (_, i) => ({
            num: i + 1,
            content: `Page ${i + 1} Content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
        }));

        return (
            <div className="fixed inset-0 z-[60] bg-black text-white overflow-y-auto">
                <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                    <h2 className="font-bold truncate max-w-md">{note.title}</h2>
                    <button onClick={() => setIsReading(false)} className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200">
                        Close Reader
                    </button>
                </div>

                <div className="max-w-3xl mx-auto py-12 px-6 space-y-12">
                    {pages.map((page) => {
                        const isLocked = !userId && page.num > 7;

                        return (
                            <div key={page.num} className="relative bg-[#111] p-8 min-h-[500px] shadow-2xl rounded-sm">
                                <span className="absolute top-4 right-4 text-gray-600 text-xs">Page {page.num}</span>

                                <div className={isLocked ? "blur-md select-none opacity-30 pointer-events-none" : ""}>
                                    <h3 className="text-2xl font-serif mb-6 text-gray-300">Section {page.num}</h3>
                                    <p className="text-gray-400 leading-loose font-serif text-lg">
                                        {page.content} {page.content} {page.content}
                                        <br /><br />
                                        {page.content} {page.content}
                                    </p>
                                </div>

                                {isLocked && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                        <Lock className="w-12 h-12 text-blue-500 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">Sample Limit Reached</h3>
                                        <p className="text-gray-400 mb-6 text-center max-w-xs">
                                            Sign in to continue reading these notes and access all {note.pages} pages.
                                        </p>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                                        >
                                            Login to Unlock
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (isReading) return <ReaderView />;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/notes')}
                    className="absolute top-24 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left: Note Cover & Actions */}
                    <div className="space-y-6">
                        <div className="aspect-[2/3] w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/5">
                            <img
                                src={note.imageUrl}
                                alt={note.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Type Badge Overlay */}
                            <div className="absolute top-4 right-4 px-3 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-xs uppercase tracking-widest font-bold text-blue-400">
                                {note.type}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setIsReading(true)}
                                className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText className="w-4 h-4" /> Read Now
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-3 bg-[#111] border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" /> Download
                                </button>
                                <button className="py-3 bg-[#111] border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <Heart className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest">
                                    {note.category}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <span className="font-bold text-lg">{note.rating}</span>
                                    <span className="text-gray-600 text-sm">/ 5.0</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{note.title}</h1>
                            <p className="text-xl text-gray-400 font-light">by <span className="text-white">{note.author}</span></p>
                        </div>

                        <div className="h-px w-full bg-white/5" />

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                {note.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Format</p>
                                <p className="font-bold">{note.type}</p>
                            </div>
                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Uploaded</p>
                                <p className="font-bold">2024</p>
                            </div>
                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Pages</p>
                                <p className="font-bold">{note.pages}</p>
                            </div>
                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5 transition-colors group">
                                <div className="flex items-center justify-center h-full text-gray-500 group-hover:text-white">
                                    <Share2 className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailsPage;
