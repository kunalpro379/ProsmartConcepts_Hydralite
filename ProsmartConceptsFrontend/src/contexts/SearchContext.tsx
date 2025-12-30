import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';

interface SearchContextType {
  searchTerm: string;
  searchResults: Product[];
  isSearching: boolean;
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Product[]) => void;
  setIsSearching: (searching: boolean) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const value = {
    searchTerm,
    searchResults,
    isSearching,
    setSearchTerm,
    setSearchResults,
    setIsSearching,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
