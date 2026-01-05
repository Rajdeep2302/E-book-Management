import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/books/BookCard';
import BookFilter from '../components/books/BookFilter';
import { Loader2 } from 'lucide-react';

// MOCK DATA GENERATOR
const generateMockBooks = (count: number) => {
  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'History', 'Literature', 'Psychology', 'Business'];
  const titles = ['Introduction to Algorithms', 'Clean Code', 'The Pragmatic Programmer', 'Structure and Interpretation', 'Design Patterns', 'Artificial Intelligence', 'Calculus Early Transcendentals', 'University Physics', 'The Republic', 'Critique of Pure Reason'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `book-${i}`,
    title: `${titles[i % titles.length]} - Vol ${Math.floor(i / 10) + 1}`,
    author: `Author Name ${i}`,
    category: subjects[i % subjects.length],
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    downloads: Math.floor(Math.random() * 5000) + 100,
    imageUrl: `https://source.unsplash.com/random/300x400?book,sig=${i}`,
  }));
};

const ALL_BOOKS = generateMockBooks(100); // Simulate database of 100 books
const ITEMS_PER_LOAD = 10; // Load 10 books at a time (5 rows of 2)

const BooksPage = () => {
  const [displayedBooks, setDisplayedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Categories extraction
  const categories = useMemo(() => Array.from(new Set(ALL_BOOKS.map(b => b.category))), []);

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    let result = ALL_BOOKS.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [searchQuery, selectedCategory, sortOrder]);

  // Reset when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDisplayedBooks(filteredBooks.slice(0, ITEMS_PER_LOAD));
      setHasMore(filteredBooks.length > ITEMS_PER_LOAD);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filteredBooks]);

  // Load more function
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedBooks.length;
      const nextBooks = filteredBooks.slice(currentLength, currentLength + ITEMS_PER_LOAD);
      setDisplayedBooks(prev => [...prev, ...nextBooks]);
      setHasMore(currentLength + nextBooks.length < filteredBooks.length);
      setLoading(false);
    }, 800);
  }, [loading, hasMore, displayedBooks.length, filteredBooks]);

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
            Full <span className="text-blue-500">Library.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            Explore our extensive collection of academic resources. Filter by subject, search for specific titles, and enhance your learning journey.
          </p>
        </div>

        {/* Controls Section (Moved to Top) */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-end justify-between">
          
          <div className="flex-1 w-full md:max-w-2xl">
              <BookFilter 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                categories={categories}
              />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">

             {/* Stats Badge */}
             <div className="bg-blue-900/20 border border-blue-500/20 px-6 py-2 rounded-xl h-full flex flex-col justify-center min-h-[46px]">
                <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold text-center">
                    {filteredBooks.length} Books
                </p>
             </div>
          </div>
        </div>

        {/* Main Content Area: Grid */}
        <div className="w-full">
            
            {/* The Grid - 2 columns on mobile, up to 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {displayedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
            </div>

            {/* Empty State */}
            {!loading && displayedBooks.length === 0 && (
            <div className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-white/5 border-dashed">
                <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
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
                    <span className="text-sm font-medium">Loading more books...</span>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
