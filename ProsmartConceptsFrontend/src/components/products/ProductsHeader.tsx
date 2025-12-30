import { Search, Heart, Menu, MapPin, User, Phone, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/contexts/SearchContext';

const ProductsHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();

  // Initialize local search term from context
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    // Live search as the user types (and clear when empty)
    if (value.trim()) {
      setSearchTerm(value);
    } else {
      clearSearch();
    }
  }, [setSearchTerm, clearSearch]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = localSearchTerm.trim();
    
    if (trimmedTerm) {
      setSearchTerm(trimmedTerm);
      // Navigate to products page if not already there
      if (location.pathname !== '/products') {
        navigate('/products');
      }
    } else {
      clearSearch();
    }
  }, [localSearchTerm, setSearchTerm, clearSearch, location.pathname, navigate]);

  const handleSearchKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e as any);
    }
  }, [handleSearchSubmit]);

  const handleClearSearch = useCallback(() => {
    setLocalSearchTerm('');
    clearSearch();
  }, [clearSearch]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  const isActive = (path: string) => {
    if (path.startsWith("/#")) return false;
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 animate-fade-in">
            <img
              src="/prosmart_logo_lg.png"
              alt="Prosmart Concepts"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
              <input
                type="text"
                placeholder="Search products"
                value={localSearchTerm}
                onChange={handleSearchInput}
                onKeyPress={handleSearchKeyPress}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 placeholder:text-gray-400"
              />
              {localSearchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span>Mumbai</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <User className="w-4 h-4 text-cyan-500" />
              <a href="mailto:online@prosmart.com" className="hover:text-[#0d3d0d] transition-colors">
                online@prosmart.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <Phone className="w-4 h-4 text-cyan-500" />
              <a href="tel:+919082230962" className="hover:text-[#0d3d0d] transition-colors">
                +919082230962
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-800 hover:text-gray-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ marginTop: '64px' }}
                  />
                  
                  {/* Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={(e) => {
                          setIsMenuOpen(false);
                          if (link.path === '/') {
                            navigate('/');
                          }
                        }}
                        className={`block px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(link.path)
                            ? 'bg-cyan-50 text-cyan-600 border-l-2 border-cyan-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProductsHeader;

