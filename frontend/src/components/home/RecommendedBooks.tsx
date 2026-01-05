import { Star, ChevronRight } from 'lucide-react';


const RecommendedBooks = () => {
    const recommendedBooks = [
        { title: "Introduction to Algorithms", author: "Thomas H. Cormen", rating: 4.8, color: "bg-zinc-800" },
        { title: "Clean Code", author: "Robert C. Martin", rating: 4.9, color: "bg-stone-800" },
        { title: "Modern Operating Systems", author: "Andrew S. Tanenbaum", rating: 4.7, color: "bg-neutral-800" },
        { title: "Artificial Intelligence", author: "Stuart Russell", rating: 4.8, color: "bg-slate-800" },
    ];

    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-24 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10 border-b border-gray-900 pb-4">
                    <h2 className="text-2xl font-light text-white tracking-wide">
                        Recommended Reading
                    </h2>
                    <a href="/books" className="text-gray-500 text-sm hover:text-white transition-colors flex items-center gap-1">
                        View all <ChevronRight className="w-3 h-3" />
                    </a>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommendedBooks.map((book, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className={`aspect-[3/4] rounded shadow-none mb-5 overflow-hidden relative ${book.color} group-hover:scale-105 transition-transform duration-500 ease-out`}>
                                {/* Minimal Cover */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-80">
                                    <div className="w-12 h-1 border border-white/20 mb-4"></div>
                                    <span className="font-serif font-light text-white/90 text-lg leading-snug">{book.title}</span>
                                </div>
                            </div>
                            <h3 className="font-medium text-gray-200 group-hover:text-white transition-colors truncate text-sm">{book.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 mb-2">{book.author}</p>
                            <div className="flex items-center gap-1 text-white/40 text-xs">
                                <Star className="w-3 h-3 fill-current text-white/60" />
                                <span>{book.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedBooks;
