import { motion } from 'framer-motion';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductsLoading = () => {
  // Generate skeleton cards
  const skeletonCards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <>
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
        <div className="flex gap-2 lg:gap-4 flex-nowrap">
          {/* OUR PRODUCTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            className="h-7 w-40 bg-slate-200 rounded-lg animate-shimmer flex-shrink-0"
            />
        </div>

        {/* Desktop Category Tabs Skeleton (right aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden lg:flex flex-wrap gap-1.5 justify-end ml-auto"
        >
          {/* All Items + 6 main categories = 7 tabs */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="h-7 w-24 bg-slate-200 rounded-full animate-shimmer flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>

      {/* Products Section Skeleton */}
      <div className="flex-1 h-full overflow-hidden flex flex-col min-h-0 relative">
        {/* Products Grid Skeleton */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 min-h-0">
          {/* Mobile: 2 Column Grid */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-2 pb-6">
              {skeletonCards.map((_, index) => (
                <ProductCardSkeleton key={index} index={index} isMobile={true} />
              ))}
            </div>
          </div>

          {/* Tablet: 2 Column Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {skeletonCards.map((_, index) => (
                <ProductCardSkeleton key={index} index={index} />
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
              {skeletonCards.map((_, index) => (
                <ProductCardSkeleton key={index} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsLoading;
