import { Search } from 'lucide-react';

interface BookFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const BookFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}: BookFilterProps) => {
  return (
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm" />
        <div className="relative bg-[#0a0a0a] rounded-xl flex items-center p-2 border border-white/10">
          <Search className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white px-4 py-2 placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
<button
  onClick={() => { 
    setSearchQuery(''); 
    setSelectedCategory('All'); 
  }}
  className="..."
>
  Reset Search
</button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
              selectedCategory === cat
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookFilter;