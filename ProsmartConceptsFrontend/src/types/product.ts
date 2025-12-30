export interface Product {
  product_id: string;
  product_name: string;
  product_title: string;
  product_description: string;
  image_urls: string[];
  subcategory: string;
  category_id: string;
  subcategory_id: string;
  product_price?: number;
  main_category?: string;
  category_name?: string;
  subcategory_name?: string;

  /**
   * Timestamp fields coming from the backend (Mongo/Node).
   * They may arrive as ISO strings, numbers (ms), or Date-like values.
   */
  created_at?: string | number | Date;
  updated_at?: string | number | Date;
}

export interface Subcategory {
  subcategory_id: string;
  subcategory_name: string;
  products: Product[];
}

export interface Category {
  category_id: string;
  category_name: string;
  main_category?: string;
  subcategories: Record<string, Subcategory>;
}

export interface ProductData {
  categories: Record<string, Category>;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

