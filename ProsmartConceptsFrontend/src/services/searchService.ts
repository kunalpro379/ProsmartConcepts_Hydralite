import { Product } from '@/types/product';

export interface SearchFilters {
  categories?: string[];
  subcategories?: string[];
  priceRange?: { min: number; max: number };
}

export const searchProducts = (
  products: Product[],
  searchTerm: string,
  filters?: SearchFilters
): Product[] => {
  if (!searchTerm && !filters) {
    return products;
  }

  let filteredProducts = [...products];

  // Text search
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase().trim();
    
    filteredProducts = filteredProducts.filter(product => {
      // Search in product name
      const nameMatch = product.product_name?.toLowerCase().includes(searchLower);
      
      // Search in product title
      const titleMatch = product.product_title?.toLowerCase().includes(searchLower);
      
      // Search in product description
      const descriptionMatch = product.product_description?.toLowerCase().includes(searchLower);
      
      // Search in category
      const categoryMatch = product.category_name?.toLowerCase().includes(searchLower);
      
      // Search in subcategory
      const subcategoryMatch = product.subcategory?.toLowerCase().includes(searchLower) ||
                               product.subcategory_name?.toLowerCase().includes(searchLower);
      
      // Search in main category
      const mainCategoryMatch = product.main_category?.toLowerCase().includes(searchLower);

      return nameMatch || titleMatch || descriptionMatch || categoryMatch || subcategoryMatch || mainCategoryMatch;
    });
  }

  // Apply additional filters if provided
  if (filters) {
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.categories!.includes(product.category_name || '')
      );
    }

    // Subcategory filter
    if (filters.subcategories && filters.subcategories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.subcategories!.includes(product.subcategory || product.subcategory_name || '')
      );
    }

    // Price filter
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.product_price || 0;
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
      });
    }
  }

  return filteredProducts;
};

export const getSearchSuggestions = (
  products: Product[],
  searchTerm: string,
  limit: number = 5
): string[] => {
  if (!searchTerm) {
    return [];
  }

  const searchLower = searchTerm.toLowerCase().trim();
  const suggestions = new Set<string>();

  products.forEach(product => {
    // Add product names that start with the search term
    if (product.product_name?.toLowerCase().startsWith(searchLower)) {
      suggestions.add(product.product_name);
    }
    
    // Add category names that start with the search term
    if (product.category_name?.toLowerCase().startsWith(searchLower)) {
      suggestions.add(product.category_name);
    }
    
    // Add subcategory names that start with the search term
    if (product.subcategory?.toLowerCase().startsWith(searchLower)) {
      suggestions.add(product.subcategory);
    }
    
    // Add main category names that start with the search term
    if (product.main_category?.toLowerCase().startsWith(searchLower)) {
      suggestions.add(product.main_category);
    }
  });

  return Array.from(suggestions).slice(0, limit);
};

export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm || !text) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
};
