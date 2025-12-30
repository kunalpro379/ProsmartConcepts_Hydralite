import { Menu, X, Search } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Logo from '@/assets/logo.png';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface NavProps {
  className?: string;
}

const Header = ({ className }: NavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const isProductsPage = location.pathname === "/products";

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const navLinks = [
    { label: 'HOME', to: '/', type: 'link' },
    { label: 'OUR STORY', to: '#our-story', type: 'scroll' },
    { label: 'PRODUCTS', to: '/products', type: 'link' },
    { label: 'FEATURES', to: '#features', type: 'scroll' },
  ];

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = '/' + id;
      return;
    }
    
    const element = document.getElementById(id.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

    return (
      <header className={`fixed top-0 left-0 right-0 z-50 w-full h-16 md:h-20 px-4 md:px-8 flex items-center justify-between bg-secondary border-b border-border/50 ${className}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={Logo} className="w-36 md:w-52 h-auto text-display tracking-wider text-foreground" alt="Hydralite Logo" />
        </Link>

        {/* Search Bar - Only on Products Page */}
        {isProductsPage && (
          <div className="flex-1 max-w-md mx-4 md:mx-8 relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearch}
              className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all"
            />
          </div>
        )}

        {/* Desktop Navigation */}

      <nav className="hidden md:flex items-center gap-1">
        <div className="flex items-center bg-primary text-primary-foreground">
          {navLinks.map((link) => (
            link.type === 'scroll' ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleScroll(e, link.to)}
                    className="px-5 py-3 text-xs tracking-widest font-normal hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="px-5 py-3 text-xs tracking-widest font-normal hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
            <a
              href="#"
              className="ml-2 px-5 py-3 text-xs tracking-widest font-normal border border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              CONTACT
            </a>
        </nav>

      {/* Mobile Menu Button */}
      <button 
        className={`md:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors ${isMenuOpen ? 'z-[110]' : 'z-50'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

        {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-background md:hidden">
              <div className="flex flex-col h-full pt-24 px-6 pb-12">
              {/* Mobile Search - Only on Products Page */}
              {isProductsPage && (
                <div className="mb-8 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={handleSearch}
                    className="pl-10 bg-muted/50 border-border/50 focus:bg-background h-12 text-lg"
                  />
                </div>
              )}
              <nav className="flex flex-col gap-6">

              {navLinks.map((link) => (
                link.type === 'scroll' ? (
                  <a
                    key={link.label}
                    href={link.to}
                    onClick={(e) => handleScroll(e, link.to)}
                    className="text-3xl font-display tracking-tight text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-display tracking-tight text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="h-px bg-border/50 my-4" />
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-5 rounded-xl text-sm tracking-widest font-normal hover:bg-accent transition-colors shadow-lg"
              >
                CONTACT US
              </a>
            </nav>
            
            <div className="mt-auto flex justify-center opacity-30">
              <img src={Logo} className="w-40 h-auto" alt="Hydralite Logo" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
