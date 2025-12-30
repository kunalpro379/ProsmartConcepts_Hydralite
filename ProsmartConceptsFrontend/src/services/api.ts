import { Product, ProductData, Category, APIResponse } from '@/types/product';

// In local dev, use Vite's proxy (same-origin) to avoid CORS.
// In production builds, prefer a configurable API base URL (set via Vite env vars).
//
// Set `VITE_API_BASE_URL` in your deployment environment, e.g.
// - VITE_API_BASE_URL=https://<your-api-host>/api
// If not set, we fall back to the legacy admin-portal host for backward compatibility.
const API_BASE_URL = import.meta.env.DEV
  ? '/api' // Use Vite proxy in development
  : (import.meta.env.VITE_API_BASE_URL?.trim() ||
      'https://api.prosmart.in/api'); // Legacy fallback
export const fetchProducts = async (filters?: {
  category_id?: string;
  subcategory_id?: string;
  main_category?: string;
}): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const url = `${API_BASE_URL}/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: APIResponse<Product[]> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch products');
    }

  // Reverse order on the frontend (newest/last inserted first)
  return [...result.data];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: APIResponse<Product> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch product');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Fetch all categories with their subcategories and products
 * Returns data in the nested structure needed by the Products page
 */
export const fetchCategoriesWithProducts = async (opts?: { signal?: AbortSignal }): Promise<ProductData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories-with-products`, {
      signal: opts?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: APIResponse<ProductData> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch categories');
    }

    // Reverse order on the frontend for each subcategory's products
    const reversed: ProductData = {
      ...result.data,
      categories: Object.fromEntries(
        Object.entries(result.data.categories ?? {}).map(([categoryId, category]) => [
          categoryId,
          {
            ...category,
            subcategories: Object.fromEntries(
              Object.entries(category.subcategories ?? {}).map(([subId, sub]) => [
                subId,
                {
                  ...sub,
                  products: [...(sub.products ?? [])],
                },
              ])
            ),
          },
        ])
      ),
    };

    return reversed;
  } catch (error) {
    console.error('Error fetching categories with products:', error);
    throw error;
  }
};

/**
 * Fetch all categories
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: APIResponse<Category[]> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch categories');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch subcategories, optionally filtered by category_id
 */
export const fetchSubcategories = async (categoryId?: string) => {
  try {
    const url = categoryId
      ? `${API_BASE_URL}/subcategories?category_id=${categoryId}`
      : `${API_BASE_URL}/subcategories`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch subcategories');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

const normalizeCatToken = (catid: string) => (catid.startsWith('cat-') || catid.startsWith('cat_') ? catid : `cat-${catid}`);
const normalizeSubcatToken = (subcatid: string) =>
  subcatid.startsWith('subcat-') || subcatid.startsWith('subcat_') ? subcatid : `subcat-${subcatid}`;

// Legacy function - replaced by fetchProductById for simpler API calls
// export const fetchProductByCatSubcatId = async (
//   catid: string,
//   subcatid: string,
//   productid: string
// ): Promise<Product> => {
//   // Backend expects a single param: :catidsubcatid in the form `cat-<id>subcat-<id>` (or underscore).
//   // The frontend route is `/ :categoryId / :subcategoryId / :productId`, so normalize raw IDs here.
//   const catidsubcatid = `${normalizeCatToken(catid)}${normalizeSubcatToken(subcatid)}`;
//   const url = `${API_BASE_URL}/products/${encodeURIComponent(catidsubcatid)}/${encodeURIComponent(productid)}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   const result: APIResponse<Product> = await response.json();
//   if (!result.success) throw new Error(result.message || 'Failed to fetch product');
//   return result.data;
// };

