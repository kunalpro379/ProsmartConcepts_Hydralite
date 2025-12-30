import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductsLoading from '@/components/products/ProductsLoading';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';
import { fetchCategoriesWithProducts } from '@/services/api';
import { searchProducts } from '@/services/searchService';
import { useSearch } from '@/contexts/SearchContext';
import { Product, ProductData } from '@/types/product';
const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('All Items');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  // Data is now fetched via React Query for caching/prefetching
  // Keep initial render light; progressively reveal more for faster first paint
  const INITIAL_PAGE_SIZE = 48;
  const LOAD_MORE_STEP = 24;
  const [displayedCount, setDisplayedCount] = useState(INITIAL_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { searchTerm } = useSearch();
  // shimmer is tied strictly to the API/DB call lifecycle
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { data: productData, isLoading: isQueryLoading, error: queryError, isFetching } = useQuery<ProductData, Error>({
    queryKey: ['categoriesWithProducts'],
    queryFn: () => fetchCategoriesWithProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes: keep data fresh during typical browsing session
    gcTime: 30 * 60 * 1000,   // 30 minutes: cache for quick back-and-forth navigation
    refetchOnWindowFocus: false,
  });

  const safeProductData: ProductData | null = productData ?? null;

  // React Query handles data fetching and caching. No manual fetch effect needed.

  

  // Extract all products, main categories, categories, and subcategories from data
  const { allProducts, mainCategories, categories, subcategories } = useMemo(() => {
    if (!safeProductData) {
      return {
        allProducts: [],
        mainCategories: [],
        categories: [],
        subcategories: [],
      };
    }

    const products: Product[] = [];
    const mainCats = new Set<string>();
    const cats: string[] = [];
    const subcats: string[] = [];

  Object.values(safeProductData.categories).forEach((category) => {
      cats.push(category.category_name);
      if (category.main_category) {
        mainCats.add(category.main_category);
      }
      Object.values(category.subcategories).forEach((subcategory) => {
        subcats.push(subcategory.subcategory_name);
    // Keep backend ordering (_id desc) as-is
    products.push(...subcategory.products);
      });
    });

  // Keep backend ordering (_id desc) as-is
  const sortedProducts = products;

    return {
  allProducts: sortedProducts,
      mainCategories: Array.from(mainCats),
      categories: [...new Set(cats)],
      subcategories: [...new Set(subcats)],
    };
  }, [safeProductData]);

  const categoryIdToName = useMemo(() => {
    const map = new Map<string, string>();
    if (!safeProductData) return map;
    Object.values(safeProductData.categories).forEach((cat) => {
      map.set(cat.category_id, cat.category_name);
    });
    return map;
  }, [safeProductData]);

  // Get subcategories for the active category tab
  const filteredSubcategories = useMemo(() => {
    if (!safeProductData || activeTab === 'All Items') return subcategories;

    const subcats: string[] = [];
    Object.values(safeProductData.categories).forEach((category) => {
      if (category.category_name === activeTab) {
        Object.values(category.subcategories).forEach((subcategory) => {
          subcats.push(subcategory.subcategory_name);
        });
      }
    });

    return [...new Set(subcats)];
  }, [activeTab, safeProductData, subcategories]);

  // Apply category from URL param if present, else default to "All Items"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawCategory = params.get('category');

    // Reset other filters when navigating via shareable category link
    setSelectedCategories([]);
    setSelectedSubcategories([]);

    if (!rawCategory) {
      setActiveTab('All Items');
      return;
    }

    if (categories.length === 0) {
      // Wait until categories are available
      return;
    }

    // Decode and match against known categories (case-insensitive fallback)
    const decoded = rawCategory;
    const exact = categories.find((c) => c === decoded);
    const ci = exact ?? categories.find((c) => c.toLowerCase() === decoded.toLowerCase());
    setActiveTab(ci ?? 'All Items');
  }, [location.search, categories]);

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by active tab (category)
    if (activeTab !== 'All Items') {
      filtered = filtered.filter((product) => categoryIdToName.get(product.category_id) === activeTab);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0 && safeProductData) {
      filtered = filtered.filter((product) => {
        const category = Object.values(safeProductData.categories).find(
          (cat) => cat.category_id === product.category_id
        );
        return category && selectedCategories.includes(category.category_name);
      });
    }

    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      );
    }

    // Filter by price range (if set)
    if (priceRange) {
      filtered = filtered.filter((product) => {
        const price = product.product_price ?? 0;
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // Text search (header search box)
    if (searchTerm.trim()) {
      filtered = searchProducts(filtered, searchTerm);
    }

    return filtered;
  }, [
    allProducts,
    activeTab,
    selectedCategories,
    selectedSubcategories,
    safeProductData,
    categoryIdToName,
    priceRange,
    searchTerm,
  ]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayedCount);
  }, [filteredProducts, displayedCount]);

  const hasMoreProducts = displayedCount < filteredProducts.length;
  const loadingSkeletonCount = 8;

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setDisplayedCount(INITIAL_PAGE_SIZE);
  }, []);

  const handleSubcategoryChange = useCallback((subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
    setDisplayedCount(INITIAL_PAGE_SIZE);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setActiveTab('All Items');
    setPriceRange(null);
    setDisplayedCount(INITIAL_PAGE_SIZE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Simulate a small delay for smooth UX
    setTimeout(() => {
      setDisplayedCount((prev) => prev + LOAD_MORE_STEP);
      setIsLoadingMore(false);
    }, 300);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setSelectedCategories(tab === 'All Items' ? [] : []);
    setSelectedSubcategories([]);
    setDisplayedCount(INITIAL_PAGE_SIZE);
  }, []);

  // Infinite scroll observer (all breakpoints)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && displayedCount < filteredProducts.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.2 }
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayedCount, filteredProducts.length, isLoadingMore, handleLoadMore]);

  // Error state
  const errorMessage = queryError ? (queryError instanceof Error ? queryError.message : 'Failed to load products. Please try again later.') : null;
  if (errorMessage) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <ProductsHeader />
        <main className="flex-1 bg-white overflow-hidden flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-red-500 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Loading/Shimmer state - show while data is loading
  if (isQueryLoading) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <ProductsHeader />
        <main className="relative flex-1 bg-white overflow-hidden mt-20 lg:mt-24 pt-4">
          <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 lg:px-10">
            {/* Cards-only shimmer for faster perceived load */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 min-h-0">
              {/* Mobile: 2 Column Grid */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-2 pb-6">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardSkeleton key={index} index={index} isMobile={true} />
                  ))}
                </div>
              </div>
              {/* Tablet: 2 Column Grid */}
              <div className="hidden md:block lg:hidden">
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardSkeleton key={index} index={index} />
                  ))}
                </div>
              </div>
              {/* Desktop: Grid Layout */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardSkeleton key={index} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
      <ProductsHeader />

      <main className="mt-20 relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-6 px-4 sm:px-6 md:px-8 lg:px-10 mx-3 lg:mx-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col h-full">

          {/* Page Header - Responsive Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4 mb-4 lg:mb-2 flex-shrink-0">
            {/* Top Row: OUR PRODUCTS + Filters Button (Mobile) / H1 (Desktop) */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-2 lg:gap-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold text-foreground flex-shrink-0"
              >
                OUR PRODUCTS
              </motion.h1>
              {/* Filters Button - Mobile Only */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-card border border-border rounded-lg text-muted-foreground text-xs font-medium shadow-sm hover:bg-muted transition-colors flex-shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Filters</span>
                {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                  <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {selectedCategories.length + selectedSubcategories.length}
                  </span>
                )}
              </button>
            </div>

            {/* Category Tabs - Desktop inline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.05 }} 
              className="hidden lg:flex flex-wrap gap-1.5 justify-end ml-auto"
            >
              <button onClick={() => handleTabChange('All Items')} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${activeTab === 'All Items' ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>All Items</button>
              {categories.map((c) => (
                <button key={c} onClick={() => handleTabChange(c)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${activeTab === c ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>{c}</button>
              ))}
            </motion.div>

            {/* Category Tabs - Mobile full-width below header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.05 }} 
              className="flex lg:hidden flex-nowrap gap-1.5 overflow-x-auto no-scrollbar w-screen -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-10 pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-4 sm:pr-6 md:pr-8 lg:pr-10"
            >
              <button onClick={() => handleTabChange('All Items')} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${activeTab === 'All Items' ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>All Items</button>
              {categories.map((c) => (
                <button key={c} onClick={() => handleTabChange(c)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${activeTab === c ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>{c}</button>
              ))}
            </motion.div>
          </div>

          {/* Filters Card Modal - Mobile Only (shows when filter button is clicked) */}
          {showFilters && (
            <>
              {/* Backdrop - Mobile Only */}
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowFilters(false)}
              />
              {/* Filters Card - Mobile Only - Bottom Sheet Style */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl shadow-2xl border-2 border-border border-b-0 z-50 max-h-[85vh] overflow-hidden flex flex-col"
              >
                {/* Card Header - Drag Handle + Close */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/50">
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-foreground">Filters</h3>
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Filters Content - Scrollable */}
                <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                  {/* 3. In <ProductFilters ...> component calls, DO NOT pass category-related props (remove categories, selectedCategories, onCategoryChange, etc) */}
                  <ProductFilters
                    subcategories={filteredSubcategories}
                    selectedSubcategories={selectedSubcategories}
                    onSubcategoryChange={handleSubcategoryChange}
                    onResetFilters={handleResetFilters}
                    priceRange={[priceRange?.min || 0, priceRange?.max || 500]}
                    onPriceChange={(range) => setPriceRange({ min: range[0], max: range[1] })}
                  />
                </div>

                {/* Card Footer - Apply Button */}
                <div className="p-4 sm:p-6 border-t border-border bg-muted/50 flex gap-3 flex-shrink-0">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 px-4 py-2.5 border border-border rounded-lg text-muted-foreground font-medium hover:bg-muted transition-colors text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}

          <div className="flex gap-0 flex-1 overflow-hidden">
            {/* Left Sidebar Filters - Desktop Only (Always Visible) */}
            <aside className="hidden lg:block w-80 flex-shrink-0 bg-card rounded-xl border-2 border-border shadow-lg overflow-hidden flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                <h3 className="font-bold text-base text-foreground">Filters</h3>
                {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>
              {/* Filters Content - Scrollable */}
              <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
                {/* 3. In <ProductFilters ...> component calls, DO NOT pass category-related props (remove categories, selectedCategories, onCategoryChange, etc) */}
                <ProductFilters
                  subcategories={filteredSubcategories}
                  selectedSubcategories={selectedSubcategories}
                  onSubcategoryChange={handleSubcategoryChange}
                  onResetFilters={handleResetFilters}
                  priceRange={[priceRange?.min || 0, priceRange?.max || 500]}
                  onPriceChange={(range) => setPriceRange({ min: range[0], max: range[1] })}
                />
              </div>
            </aside>

            {/* Dotted Vertical Separator */}
            <div className="hidden lg:block w-px border-l-2 border-dashed border-cyan-500/50 mx-3 flex-shrink-0"></div>

            {/* Products Section - Active filters and products in one scrollable container */}
            <div className="flex-1 h-full min-h-0 flex flex-col relative">
              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 min-h-0">
                {/* Active Filters - always above products list and inside scroll */}
                {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-2 flex-shrink-0">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        {cat}
                        <X className="w-3 h-3" />
                      </span>
                    ))}
                    {selectedSubcategories.map((sub) => (
                      <span
                        key={sub}
                        onClick={() => handleSubcategoryChange(sub)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-xs text-foreground cursor-pointer hover:bg-accent/30 transition-colors"
                      >
                        {sub}
                        <X className="w-3 h-3" />
                      </span>
                    ))}
                  </div>
                )}
                {/* Products Grid - All layouts */}
                {filteredProducts.length > 0 ? (
                  <>
                    {/* Mobile: 2 Column Grid */}
                    <div className="md:hidden">
                      <motion.div className="grid grid-cols-2 gap-2 pb-2">
                        {paginatedProducts.map((product, index) => (
                          <motion.div
                            key={product.product_id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index % 4) * 0.1 }}
                          >
                            <ProductCard product={product} index={index} isMobile={true} />
                          </motion.div>
                        ))}
                        {/* Shimmer cards while loading more (infinite scroll) */}
                        {isLoadingMore &&
                          hasMoreProducts &&
                          Array.from({ length: loadingSkeletonCount }).map((_, i) => (
                            <div
                              key={`mobile-skel-${i}`}
                              className="rounded-xl border border-border bg-white/70 overflow-hidden animate-pulse"
                            >
                              <div className="aspect-square w-full bg-muted/60" />
                              <div className="p-3 space-y-2">
                                <div className="h-3 w-4/5 bg-muted/60 rounded" />
                                <div className="h-3 w-2/3 bg-muted/60 rounded" />
                                <div className="h-3 w-1/2 bg-muted/60 rounded" />
                              </div>
                            </div>
                          ))}
                      </motion.div>
                    </div>
                    {/* Tablet: 2 Column Grid */}
                    <div className="hidden md:block lg:hidden">
                      <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {paginatedProducts.map((product, index) => (
                          <ProductCard key={product.product_id} product={product} index={index} />
                        ))}
                        {/* Shimmer cards while loading more (infinite scroll) */}
                        {isLoadingMore &&
                          hasMoreProducts &&
                          Array.from({ length: loadingSkeletonCount }).map((_, i) => (
                            <div
                              key={`tablet-skel-${i}`}
                              className="rounded-2xl border border-border bg-white/70 overflow-hidden animate-pulse"
                            >
                              <div className="aspect-[4/3] w-full bg-muted/60" />
                              <div className="p-4 space-y-3">
                                <div className="h-3 w-4/5 bg-muted/60 rounded" />
                                <div className="h-3 w-2/3 bg-muted/60 rounded" />
                                <div className="h-3 w-1/2 bg-muted/60 rounded" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    {/* Desktop: Grid Layout */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
                        {paginatedProducts.map((product, index) => (
                          <ProductCard key={product.product_id} product={product} index={index} />
                        ))}
                        {/* Shimmer cards while loading more (infinite scroll) */}
                        {isLoadingMore &&
                          hasMoreProducts &&
                          Array.from({ length: loadingSkeletonCount }).map((_, i) => (
                            <div
                              key={`desktop-skel-${i}`}
                              className="rounded-2xl border border-border bg-white/70 overflow-hidden animate-pulse"
                            >
                              <div className="aspect-[4/3] w-full bg-muted/60" />
                              <div className="p-4 space-y-3">
                                <div className="h-3 w-4/5 bg-muted/60 rounded" />
                                <div className="h-3 w-2/3 bg-muted/60 rounded" />
                                <div className="h-3 w-1/2 bg-muted/60 rounded" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Infinite scroll loader + trigger (shared across breakpoints) */}
                    <div className="flex flex-col items-center py-6">
                      {/* Keep a subtle loader, but shimmer cards above are the main UX */}
                      {isLoadingMore && hasMoreProducts && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      )}
                      <div ref={loadMoreTriggerRef} className="h-6 w-full" />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <p className="text-muted-foreground text-sm sm:text-base">No products found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
