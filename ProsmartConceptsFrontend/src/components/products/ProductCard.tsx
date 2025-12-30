import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index: number;
  isMobile?: boolean;
}

const ProductCard = ({ product, index, isMobile = false }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Use product_price if available, otherwise generate price based on product_id
  const getPrice = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 15000) + 1000;
  };

  const formatPrice = (amount: number | string) => {
    if (typeof amount === 'string') {
      // If it's already a string with ₹, return as is
      if (amount.includes('₹')) return amount;
      // Try to parse it
      const num = parseFloat(amount);
      if (isNaN(num)) return amount;
      return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const price = product.product_price || getPrice(product.product_id);
  const hasDiscount = product.product_id.charCodeAt(0) % 3 === 0;
  const originalPrice = hasDiscount ? Math.floor(Number(price) * 1.25) : null;
  
  // Category to base rating mapping
  const categoryRatings: { [key: string]: number } = {
    "Healthcare Essentials": 4.6,
    "Personal Care": 4.8,
    "Smart Home": 4.5,
    "Gadgets & Accessories": 4.2,
    "Tools & Hardware": 4.3,
    "Kids & Crafts": 4.7,
  };

  // Generate unique rating per product based on category + product ID
  const getProductRating = (categoryName: string, productId: string) => {
    const baseRating = categoryRatings[categoryName] || 4.5;
    let hash = 0;
    for (let i = 0; i < productId.length; i++) {
      hash = ((hash << 5) - hash) + productId.charCodeAt(i);
      hash |= 0;
    }
    // Add variation (-0.4 to +0.4) to base rating
    const variation = (Math.abs(hash) % 9) / 10 - 0.4;
    const rating = baseRating + variation;
    return Math.min(Math.max(rating, 1), 5); // Clamp between 1 and 5
  };

  const rating = getProductRating(product.category_name || "", product.product_id);

  // Canonical route shape: /<categoryId>/<subcategoryId>/<productId>
  // (Backend may still use cat-*/subcat-* tokens, but those are handled in the API layer.)
  const detailRoute = `/${product.category_id}/${product.subcategory_id}/${product.product_id}`;

  return (
    <Link to={detailRoute} className="h-full flex">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        className={`group relative border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden flex flex-col h-full w-full ${
          isMobile 
            ? 'bg-white/80 backdrop-blur-md' 
            : 'bg-white'
        }`}
      >

      {/* Image Container */}
      <div
        className={`relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden ${
          isMobile ? 'p-2' : 'p-4'
        }`}
      >
        {product.image_urls && product.image_urls.length > 0 && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={product.image_urls[0]}
              alt={product.product_name}
              className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
            <span className={`text-slate-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`space-y-2 flex-1 flex flex-col ${isMobile ? 'px-2 pt-2 pb-1.5' : 'px-4 pt-4 pb-3 space-y-3'}`}>
        {/* Category */}
        <span className={`text-gray-500 font-medium block ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
          {product.subcategory || 'Product'}
        </span>

        {/* Product Name with Rating */}
        <div className="flex items-start justify-between gap-1 flex-1">
          <h3 className={`text-gray-800 font-semibold line-clamp-2 flex-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {product.product_name}
          </h3>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star className={`fill-orange-400 text-orange-400 ${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            <span className={`text-gray-600 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>({rating})</span>
          </div>
        </div>

        {/* Bottom Section: Button and Price */}
        <div className={`flex items-center justify-between gap-2 mt-auto`}>
          {/* Contact Us Button */}
          <button className={`flex items-center gap-1 bg-cyan-500 text-white hover:bg-cyan-500 transition-colors rounded-full font-medium whitespace-nowrap shadow-sm ${isMobile ? 'px-2 py-1 text-[10px]' : 'px-4 py-2 text-xs'}`}>
            Contact Us
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;

