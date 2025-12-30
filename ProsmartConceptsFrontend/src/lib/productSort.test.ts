import { describe, expect, it } from 'vitest';
import { sortProductsLatestFirst } from './productSort';
import type { Product } from '@/types/product';

const base = (overrides: Partial<Product>): Product => ({
  product_id: overrides.product_id ?? 'prod_x',
  product_name: 'Name',
  product_title: 'Title',
  product_description: 'Desc',
  image_urls: [],
  subcategory: 'Sub',
  category_id: 'cat_1',
  subcategory_id: 'sub_1',
  ...overrides,
});

describe('sortProductsLatestFirst', () => {
  it('sorts by created_at desc (latest first)', () => {
    const products = [
      base({ product_id: 'p1', created_at: '2024-01-01T00:00:00.000Z' }),
      base({ product_id: 'p2', created_at: '2025-01-01T00:00:00.000Z' }),
      base({ product_id: 'p3', created_at: '2023-01-01T00:00:00.000Z' }),
    ];

    const sorted = sortProductsLatestFirst(products);
    expect(sorted.map((p) => p.product_id)).toEqual(['p2', 'p1', 'p3']);
  });

  it('handles numeric timestamps and missing timestamps', () => {
    const products = [
      base({ product_id: 'missing' }),
      base({ product_id: 'num', created_at: 1700000000000 }),
      base({ product_id: 'stringNum', created_at: '1800000000000' }),
    ];

    const sorted = sortProductsLatestFirst(products);
    expect(sorted.map((p) => p.product_id)).toEqual(['stringNum', 'num', 'missing']);
  });
});
