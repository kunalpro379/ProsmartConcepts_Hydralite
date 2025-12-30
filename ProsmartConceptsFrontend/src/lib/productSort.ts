import type { Product } from '@/types/product';

type EpochMs = number;

export const toEpochMs = (value: unknown): EpochMs => {
  if (value == null) return 0;
  if (value instanceof Date) return value.getTime();

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === 'string') {
    const asNum = Number(value);
    if (Number.isFinite(asNum) && value.trim() !== '') return asNum;
    const t = Date.parse(value);
    return Number.isFinite(t) ? t : 0;
  }

  // Mongo extended JSON like: { $date: "..." }
  if (typeof value === 'object' && value && '$date' in (value as any)) {
    const t = Date.parse((value as any).$date);
    return Number.isFinite(t) ? t : 0;
  }

  return 0;
};

export const getProductTimestampMs = (p: Product): EpochMs =>
  Math.max(toEpochMs(p.created_at), toEpochMs(p.updated_at));

/**
 * Returns a *new* array of products sorted latest-first.
 * Products without timestamps sort to the end.
 */
export const sortProductsLatestFirst = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => getProductTimestampMs(b) - getProductTimestampMs(a));
};
