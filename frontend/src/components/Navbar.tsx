import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, MessageCircle, Home, FileText, User, LogIn, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home className="w-4 h-4" />, href: '/' },
    { name: 'Books', icon: <BookOpen className="w-4 h-4" />, href: '/books' },
    { name: 'Notes', icon: <FileText className="w-4 h-4" />, href: '/notes' },
    { name: 'Community', icon: <MessageCircle className="w-4 h-4" />, href: '#' },
  ];

  return (
    <div className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-500 ${scrolled ? 'pt-2' : 'pt-6'}`}>

      <nav className="relative w-[92%] max-w-7xl">

        {/* GEMINI NEON SHIMMER THREAD */}
        <div className="absolute -inset-[1px] rounded-[2rem] overflow-hidden opacity-80">
          <div className="absolute inset-[-250%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,#4285f4_180deg,#9b72f3_210deg,#d96570_240deg,transparent_270deg)]" />
        </div>

        {/* INNER GLASS PILL */}
        <div
          className={`
            relative flex flex-col transition-all duration-500 ease-in-out
            bg-[#050505]/95 backdrop-blur-2xl backdrop-saturate-[1.8]
            rounded-[2.5rem]
          `}
        >
          <div className="px-8 py-2">
            <div className="flex items-center justify-between h-14">

              {/* LOGO */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />

                </div>
                <span className="font-bold text-lg tracking-[0.2em] text-white/90 uppercase">
                  EDU<span className="text-blue-500">HUB</span>
                </span>
              </div>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40 hover:text-white transition-all duration-300 py-1"
                  >
                    {item.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* ACTIONS AREA */}
              <div className="flex items-center gap-3">

                {/* DESKTOP USER ICON (Simulating Logged In State -> Go to Profile) */}
                <button
                  onClick={() => {
                    const userId = localStorage.getItem('userId');
                    if (userId) {
                      navigate('/profile');
                    } else {
                      navigate('/login');
                    }
                  }}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-white/70 hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-90 group/user relative"
                >
                  <User className="w-5 h-5" />
                  {/* Subtle Online Status Dot */}
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 border-2 border-[#050505] rounded-full group-hover:border-white transition-colors" />
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2 text-white/70 hover:bg-white/10 rounded-full transition-colors"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE DROPDOWN */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 space-y-4 border-t border-white/5 bg-black/20">
              {navItems.map((item) => (
                <a key={item.name} href="#" className="flex items-center justify-between group/mob">
                  <div className="flex items-center gap-4">
                    <span className="text-white/60 group-hover/mob:text-blue-400 transition-colors">{item.icon}</span>
                    <span className="tracking-widest uppercase text-[10px] font-bold text-white/40 group-hover/mob:text-white transition-colors">{item.name}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/mob:opacity-100 -translate-x-2 group-hover/mob:translate-x-0 transition-all text-blue-500" />
                </a>
              ))}

              {/* MOBILE VIEW GET STARTED BUTTON */}
              <button
                onClick={() => navigate('/signup')}
                className="w-full mt-4 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-tighter text-sm active:scale-95 transition-transform"
              >
                Get Started <LogIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Navbar;