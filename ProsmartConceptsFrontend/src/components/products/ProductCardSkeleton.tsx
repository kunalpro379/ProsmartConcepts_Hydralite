import { motion } from 'framer-motion';

interface ProductCardSkeletonProps {
  index: number;
  isMobile?: boolean;
}

const ProductCardSkeleton = ({ index, isMobile = false }: ProductCardSkeletonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className={`group relative border border-gray-300 shadow-sm rounded-lg overflow-hidden flex flex-col h-full ${
        isMobile 
          ? 'bg-white/80 backdrop-blur-md' 
          : 'bg-white'
      }`}
    >
      {/* Image Skeleton */}
      <div className={`aspect-square bg-gray-50 flex items-center justify-center overflow-hidden ${isMobile ? 'p-2' : 'p-4'}`}>
        <div className="w-full h-full bg-slate-200 rounded-lg animate-shimmer" />
      </div>

      {/* Product Info Skeleton */}
      <div className={`space-y-2 flex-1 flex flex-col ${isMobile ? 'px-2 pt-2 pb-1.5' : 'px-4 pt-4 pb-3 space-y-3'}`}>
        {/* Category Skeleton */}
        <div className={`bg-slate-200 rounded animate-shimmer ${isMobile ? 'h-2.5 w-16' : 'h-3 w-20'}`} />

        {/* Product Name with Rating Skeleton */}
        <div className="flex items-start justify-between gap-1 flex-1">
          <div className={`bg-slate-200 rounded animate-shimmer flex-1 ${isMobile ? 'h-3' : 'h-4'}`} />
          <div className={`flex items-center gap-0.5 flex-shrink-0 ${isMobile ? 'h-3 w-8' : 'h-4 w-12'}`}>
            <div className={`bg-slate-200 rounded animate-shimmer ${isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
            <div className={`bg-slate-200 rounded animate-shimmer ${isMobile ? 'h-2.5 w-4' : 'h-3 w-6'}`} />
          </div>
        </div>

        {/* Contact Us Button Skeleton */}
        <div className={`bg-slate-200 rounded-full animate-shimmer mt-auto ${isMobile ? 'h-6' : 'h-8'}`} />
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;

