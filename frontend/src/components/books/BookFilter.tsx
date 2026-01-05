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
    <div className="w-full mb-8 space-y-4">
      
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

    
    </div>
  );
};

export default BookFilter;
