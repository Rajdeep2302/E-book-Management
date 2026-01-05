import { ChevronRight, File, ArrowUpRight } from 'lucide-react';

const TrendingNotes = () => {
    const recentNotes = [
        { title: "Data Structures - Week 5 Trees", author: "Alex Chen", stars: 124, type: "PDF" },
        { title: "Thermodynamics Formulas", author: "Sarah Miller", stars: 89, type: "DOC" },
        { title: "Calculus II Final Review", author: "Mike Ross", stars: 256, type: "PDF" },
    ];

    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-24 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10 border-b border-gray-900 pb-4">
                    <h2 className="text-2xl font-light text-white tracking-wide">
                        Trending Notes
                    </h2>
                    <a href="/notes" className="text-gray-500 text-sm hover:text-white transition-colors flex items-center gap-1">
                        View all <ChevronRight className="w-3 h-3" />
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {recentNotes.map((note, i) => (
                        <div key={i} className="group flex items-center justify-between p-6 rounded-none border-b border-gray-900 hover:bg-gray-900/40 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-900 text-gray-400 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                                    <File className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-light text-white mb-1 group-hover:text-gray-200">{note.title}</h3>
                                    <p className="text-sm text-gray-500">by {note.author} • {note.stars} downloads</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs font-medium px-2 py-1 bg-gray-900 text-gray-500 rounded">{note.type}</span>
                                <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingNotes;
