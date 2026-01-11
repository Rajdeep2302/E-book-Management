import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import { Loader2, Search } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilter = async () => {
            setLoading(true);
            try {
                // Fetch all books and notes (limit might need to be higher or paginated in reality)
                // Since we are doing client-side filtering as requested, we fetch a larger batch
                const response = await fetch(`${API_BASE_URL}/upload/getBook?limit=100`);
                const data = await response.json();

                if (data.success) {
                    const allResources = data.resources;
                    const filtered = allResources.filter((item: any) =>
                        item.title.toLowerCase().includes(query.toLowerCase()) ||
                        item.author.toLowerCase().includes(query.toLowerCase()) ||
                        item.category.toLowerCase().includes(query.toLowerCase())
                    );
                    setResults(filtered);
                }
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchAndFilter();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [query]);

    // Format Drive URLs for display images if needed (though backend handles this now)
    const getCoverUrl = (item: any) => {
        return item.coverFile ? `${API_BASE_URL.replace('/api', '')}${item.coverFile}` : 'https://via.placeholder.com/300x400?text=No+Cover';
    };

    return (
        <PageTransition className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Search results for <span className="text-blue-500">"{query}"</span>
                    </h1>
                    <p className="text-gray-400">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(item.isABook ? `/books/${item.uploadId}` : `/notes/${item.uploadId}`)}
                                className="group relative aspect-[3/4] bg-[#111] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Cover Image */}
                                <img
                                    src={getCoverUrl(item)}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                                {/* Badge (P/B) as drawn in sketch */}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold uppercase">
                                    {item.isABook ? 'B' : 'P'}
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-4">
                                    <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{item.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Search className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-xl">No results found for "{query}"</p>
                        <p className="text-sm mt-2">Try searching for something else</p>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default SearchPage;
