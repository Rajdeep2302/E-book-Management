import { Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookProps {
    id: string;
    title: string;
    author: string;
    category: string;
    rating: number;
    imageUrl: string;
    downloads: number;
}

const BookCard = ({ book }: { book: BookProps }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/books/${book.id}`)}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        >

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase tracking-widest font-bold text-white/80">
          {book.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-white font-bold text-sm mb-1 truncate leading-tight group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-400 text-[10px] uppercase tracking-wider font-medium truncate">
          by {book.author}
        </p>
      </div>
    </div>
    );
};

export default BookCard;
