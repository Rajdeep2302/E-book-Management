import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/books/BookCard';
import BookFilter from '../components/books/BookFilter';

// THE SPECIFIC 8 BOOKS DATA
const ALL_BOOKS = [
    { 
        id: "1", 
        title: "Introduction to Algorithms", 
        author: "Thomas H. Cormen",  
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/6709987-L.jpg",
        pdfUrl: "#"
    },
    { 
        id: "2", 
        title: "Clean Code", 
        author: "Robert C. Martin",  
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/15126503-L.jpg",
        pdfUrl: "#"
    },
    { 
        id: "3", 
        title: "Modern Operating Systems", 
        author: "Andrew S. Tanenbaum", 
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/14418671-L.jpg",
        pdfUrl: "#"
    },
    { 
        id: "4", 
        title: "Artificial Intelligence", 
        author: "Stuart Russell", 
        category: "Computer Science", // Changed to match your filter list
        imageUrl: "https://aima.cs.berkeley.edu/cover.jpg",
        pdfUrl: "/Ai.pdf"
    },
    { 
        id: "5", 
        title: "The Pragmatic Programmer", 
        author: "Andrew Hunt", 
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/15136784-L.jpg",
        pdfUrl: "#"
    },
    { 
        id: "6", 
        title: "Design Patterns", 
        author: "Erich Gamma", 
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/1754351-L.jpg",
        pdfUrl: "#"
    },
    { 
        id: "7", 
        title: "Deep Learning", 
        author: "Ian Goodfellow", 
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/8086288-L.jpg",
        pdfUrl: "#"
    },
    { 
        id: "8", 
        title: "Computer Networking", 
        author: "Andrew S. Tanenbaum", 
        category: "Computer Science",
        imageUrl: "https://covers.openlibrary.org/b/id/8883332-L.jpg",
        pdfUrl: "#"
    }
];

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // YOUR SPECIFIC CATEGORIES
  const categories = [
    "Physics", 
    "Chemistry", 
    "Mathematics", 
    "Zoology", 
    "Botany", 
    "Computer Science", 
    "Microbiology"
  ];

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return ALL_BOOKS.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tighter">
            Digital <span className="text-blue-500">Library.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            Access our curated collection of essential engineering and science books. All available in high-quality PDF format.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-end justify-between">
          <div className="flex-1 w-full md:max-w-3xl">
            <BookFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 px-6 py-2 rounded-xl h-[56px] flex flex-col justify-center min-w-[120px]">
            <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold text-center">
              {filteredBooks.length} Results
            </p>
          </div>
        </div>

        {/* Main Content Area: Grid */}
        <div className="w-full">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <div key={book.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-[#050505] rounded-3xl border border-white/5 border-dashed">
              <p className="text-gray-500 text-lg mb-4">No books found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-blue-500 hover:text-blue-400 font-bold text-xs uppercase tracking-widest transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;