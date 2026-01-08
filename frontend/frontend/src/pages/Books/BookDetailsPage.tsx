import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { BookOpen, Download, Heart, Share2, ArrowLeft } from 'lucide-react';

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);

    // CENTRALIZED DATA (Ensure pdfUrl matches filenames in your /public folder)
    const booksData = [
        { 
            id: "1", 
            title: "Introduction to Algorithms", 
            author: "Thomas H. Cormen",  
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/6709987-L.jpg",
            description: "A comprehensive guide to algorithms, design, and analysis.",
            pages: 1312,
            pdfUrl: "/Algorithms.pdf" 
        },
        { 
            id: "2",
            title: "Clean Code", 
            author: "Robert C. Martin",  
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/15126503-L.jpg",
            description: "A handbook of agile software craftsmanship.",
            pages: 464,
            pdfUrl: "/CleanCode.pdf"
        },
        { 
            id: "3",
            title: "Modern Operating Systems", 
            author: "Andrew S. Tanenbaum", 
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/14418671-L.jpg",
            description: "Concepts every OS designer needs to master.",
            pages: 1136,
            pdfUrl: "/OS.pdf"
        },
        { 
            id: "4",
            title: "Artificial Intelligence", 
            author: "Stuart Russell", 
            category: "Computer Science",
            image: "https://aima.cs.berkeley.edu/cover.jpg",
            description: "The long-anticipated revision of this best-selling text.",
            pages: 1152,
            pdfUrl: "/Ai.pdf" 
        },
        { 
            id: "5",
            title: "The Pragmatic Programmer", 
            author: "Andrew Hunt", 
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/15136784-L.jpg",
            description: "Your journey to mastery in software development.",
            pages: 352,
            pdfUrl: "/Pragmatic.pdf"
        },
        { 
            id: "6",
            title: "Design Patterns", 
            author: "Erich Gamma", 
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/1754351-L.jpg",
            description: "Elements of reusable object-oriented software.",
            pages: 395,
            pdfUrl: "/DesignPatterns.pdf"
        },
        { 
            id: "7",
            title: "Deep Learning", 
            author: "Ian Goodfellow", 
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/8086288-L.jpg",
            description: "The definitive text on the mathematical foundations of AI.",
            pages: 800,
            pdfUrl: "/DeepLearning.pdf"
        },
        { 
            id: "8",
            title: "Computer Networking", 
            author: "Andrew S. Tanenbaum", 
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/8883332-L.jpg",
            description: "A top-down approach to computer networks.",
            pages: 900,
            pdfUrl: "/Networking.pdf"
        }
    ];

    const book = booksData.find(b => b.id === id) || booksData[0];

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    const handleReadNow = () => {
        if (book.pdfUrl && book.pdfUrl !== "#") {
            // Opens PDF in new tab using browser's built-in reader
            window.open(book.pdfUrl, '_blank', 'noopener,noreferrer');
        } else {
            alert("PDF file not found in public folder. Make sure it is named correctly.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/books')}
                    className="absolute top-24 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Library
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left: Image & Primary Actions */}
                    <div className="space-y-6">
                        <div className="aspect-[2/3] w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/5">
                            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={handleReadNow}
                                className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <BookOpen className="w-4 h-4" /> Read Now
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={book.pdfUrl}
                                    download={`${book.title}.pdf`}
                                    className="py-3 bg-[#111] border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download
                                </a>
                                <button className="py-3 bg-[#111] border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <Heart className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                                {book.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{book.title}</h1>
                            <p className="text-xl text-gray-400 font-light">by <span className="text-white">{book.author}</span></p>
                        </div>

                        <div className="h-px w-full bg-white/5" />

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-lg font-light">{book.description}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Language</p>
                                <p className="font-bold">English</p>
                            </div>
                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Pages</p>
                                <p className="font-bold">{book.pages}</p>
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

export default BookDetailsPage;