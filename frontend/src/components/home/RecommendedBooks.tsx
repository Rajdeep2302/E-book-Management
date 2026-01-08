import { ChevronRight } from 'lucide-react';


const RecommendedBooks = () => {
    const recommendedBooks = [
        {
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/6709987-L.jpg"
        },
        {
            title: "Clean Code",
            author: "Robert C. Martin",
            category: "Software Eng",
            image: "https://covers.openlibrary.org/b/id/15126503-L.jpg"
        },
        {
            title: "Modern Operating Systems",
            author: "Andrew S. Tanenbaum",
            category: "Computer Science",
            image: "https://covers.openlibrary.org/b/id/14418671-L.jpg"
        },
        {
            title: "Artificial Intelligence",
            author: "Stuart Russell",
            category: "AI & ML",
            image: "https://aima.cs.berkeley.edu/cover.jpg"
        },
    ];

    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-32 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12 relative">
                    <div className="absolute -left-12 -top-12 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-white tracking-tighter mb-2">
                            Featured <span className="text-blue-500">Books.</span>
                        </h2>
                        <p className="text-gray-500 font-light text-lg">Curated essentials for your academic excellence.</p>
                    </div>
                    <a href="/books" className="group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 uppercase tracking-widest text-[10px] font-black pb-2">
                        Browse Library <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommendedBooks.map((book, i) => (
                        <div key={i} className="group cursor-pointer relative">
                            {/* Card Animation Background */}
                            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

                            <div className="relative bg-[#0a0a0a] border border-white/5 group-hover:border-blue-500/30 rounded-[2rem] p-4 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-2">
                                <div className="aspect-[3/4.2] rounded-[1.5rem] overflow-hidden relative mb-6">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                            {book.category}
                                        </span>

                                    </div>
                                </div>

                                <div className="px-2 pb-2">
                                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors truncate mb-1">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium">by {book.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedBooks;
