import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Star, Heart, ChevronRight, Check, ShoppingCart, 
  Package, Shield, Truck, Phone, ChevronLeft, ChevronDown, Zap, Award,
  X, ZoomIn, ZoomOut, MessageCircle, Share
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchProductById } from '@/services/api';
import { Product, ProductData } from "@/types/product";

// Shimmer component for loading state
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
);

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full bg-white border-b border-border/60 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-32 bg-gray-200 rounded animate-shimmer" />
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-12 bg-gray-200 rounded animate-shimmer" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-shimmer" />
          </div>
        </div>
      </nav>

      {/* Breadcrumb Skeleton - Outside the card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 mb-0">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 md:h-4 md:w-14 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3.5 w-3.5 md:h-4 md:w-4 bg-gray-200 rounded animate-shimmer" />
          <div className="h-4 w-16 md:h-4 md:w-20 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3.5 w-3.5 md:h-4 md:w-4 bg-gray-200 rounded animate-shimmer" />
          <div className="h-4 w-20 md:h-4 md:w-24 bg-gray-200 rounded animate-shimmer" />
        </div>
      </div>

      <main className="relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-6 px-6 lg:px-10 mx-3 lg:mx-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="container mx-auto px-0 flex-1">
            <div className="bg-transparent px-0 pt-0 pb-0 mb-0">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-12 p-4 md:p-6 lg:p-8">
                {/* Left - Image Skeleton with Professional Card */}
                <motion.div className="relative flex flex-col items-center">
                  <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-lg p-6 md:p-8">
                    {/* Main Image Skeleton */}
                    <div className="relative h-96 w-full max-w-sm mx-auto mb-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                      <Shimmer />
                    </div>
                  </div>
                  
                  {/* Thumbnail Skeleton */}
                  <div className="flex gap-3 mt-6 justify-center">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="relative flex-shrink-0 w-16 h-16 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-300 overflow-hidden ring-2 ring-transparent">
                        <Shimmer />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right - Info Skeleton with Professional Card */}
                <motion.div className="flex flex-col">
                  <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-lg p-6 md:p-8 flex flex-col h-full space-y-6">
                    {/* Category Badges Skeleton */}
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-24 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-full animate-shimmer" />
                      <div className="h-6 w-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full animate-shimmer" />
                    </div>

                    {/* Product Name Skeleton */}
                    <div className="space-y-2">
                      <div className="relative h-8 w-full bg-gray-200 rounded animate-shimmer" />
                      <div className="relative h-8 w-5/6 bg-gray-200 rounded animate-shimmer" />
                    </div>

                    {/* Rating Skeleton with Divider */}
                    <div className="pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-shimmer" />
                          ))}
                        </div>
                        <div className="h-5 w-12 bg-gray-200 rounded animate-shimmer" />
                      </div>
                    </div>

                    {/* Key Highlights Skeleton */}
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-shimmer" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded animate-shimmer" />
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2">
                      <div className="h-5 w-40 bg-gray-200 rounded animate-shimmer" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded animate-shimmer" />
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="pt-2 space-y-3 mt-auto">
                      <div className="relative h-12 w-full bg-gradient-to-r from-cyan-300 to-cyan-200 rounded-lg animate-shimmer" />
                      <div className="relative h-12 w-full bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-lg animate-shimmer border border-cyan-200" />
                    </div>

                    {/* Trust Badges Skeleton */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100/50 shadow-sm">
                          <div className="w-10 h-10 rounded-full bg-cyan-200 mx-auto mb-2 animate-shimmer" />
                          <div className="h-3 w-14 bg-gray-200 rounded mx-auto animate-shimmer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProductDetail = () => {
  const { catidsubcatid, pid, categoryId, subcategoryId, productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [mainImageError, setMainImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinLoadingTime(false), 800);
    const loadProduct = async () => {
      try {
        // Extract product ID from URL params
        let productIdFinal: string | undefined = productId || pid;

        // For legacy URLs, extract product ID from the path
        if (!productIdFinal && catidsubcatid) {
          productIdFinal = pid;
        }

        if (!productIdFinal) {
          toast({ title: 'Invalid product URL', variant: 'destructive' });
          navigate('/products');
          return;
        }

        const prod = await fetchProductById(productIdFinal);
        setProduct(prod);
        setLoading(false);
      } catch (err: any) {
        toast({ title: 'Error loading product', description: err.message, variant: 'destructive' });
        navigate('/products');
        setLoading(false);
      }
      clearTimeout(minTimer);
    };
    loadProduct();
    // eslint-disable-next-line
  }, [catidsubcatid, pid, categoryId, subcategoryId, productId]);

  const handleAddToCart = () => {
    toast({
      title: "Added to Inquiry Cart",
      description: `${product?.product_name} has been added to your inquiry list.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Request Submitted",
      description: "Our team will contact you within 24 hours.",
    });
  };

  const formatPrice = (amount: number | string | undefined) => {
    if (!amount) return "Price on request";
    if (typeof amount === 'string') {
      if (amount.includes('₹')) return amount;
      const num = parseFloat(amount);
      if (isNaN(num)) return amount;
      return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const getPrice = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 15000) + 1000;
  };

  const price = product?.product_price ?? getPrice(product?.product_id ?? "fallback_id");
  const rating = 4.5;
  const reviews = Math.floor(Math.random() * 1000) + 100;

  // Auto-play images every 2s
  useEffect(() => {
    if (!product?.image_urls || product.image_urls.length <= 1) return;
    const id = window.setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.image_urls.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [product?.image_urls]);

  // Show spinner whenever selected image changes
  useEffect(() => {
    if (!product?.image_urls?.length) return;
    setMainImageLoading(true);
    setMainImageError(false);
  }, [selectedImage, product?.image_urls]);

  const handleOpenLightbox = () => {
    if (!product?.image_urls?.length) return;
    // Navigate to dedicated image viewer page and pass images via state for production reliability
    navigate(`/${productId}images`, {
      state: {
        images: product.image_urls,
        productName: product.product_name,
      },
    });
  };

  // Show skeleton while loading OR during minimum loading time
  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  // Debug: show product JSON
  // Remove or comment out after confirming fix
  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full bg-white border-b border-border/60 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/prosmart_logo_lg.png"
              alt="Prosmart Concepts logo"
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb - Outside the card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 mb-0">
        <nav className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="text-foreground">{product.category_name || product.subcategory}</span>
        </nav>
      </div>

      <main className="relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-4 px-2 sm:px-4 md:px-6 lg:px-8 mx-2 lg:mx-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="mx-auto px-0 flex-1 w-full">
            <div className="bg-transparent px-0 pt-0 pb-0 mb-0">
            <div className="grid lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6 p-1 md:p-3 lg:p-8">
            {/* Left - Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center"
            >
              {/* Card container to match desktop mock */}
              <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-lg p-4 md:p-6 lg:p-8">
                {/* Badge */}
                {product.main_category && (
                  <div className="mb-3 md:mb-4">
                    <span className="text-xs font-bold text-cyan-700 bg-transparent border-2 border-cyan-500 px-4 py-2 rounded-full shadow-sm">
                      {product.main_category}
                    </span>
                  </div>
                )}

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link Copied!",
                      description: "Product link has been copied to clipboard.",
                    });
                  }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-md border border-white/50"
                >
                  <Share className="w-5 h-5 text-gray-600" />
                </button>

                {/* Main Image - Optimized Size */}
                <div
                  className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-xl cursor-zoom-in shadow-sm border border-gray-200 w-full max-w-sm mx-auto flex items-center justify-center"
                  style={{ height: "340px" }}
                  onClick={handleOpenLightbox}
                >
                  <AnimatePresence mode="wait">
                    {product.image_urls && product.image_urls.length > 0 && !mainImageError ? (
                      <motion.img
                        key={selectedImage}
                        src={product.image_urls[selectedImage]}
                        alt={product.product_name}
                        className="w-full h-full object-contain p-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onLoad={() => setMainImageLoading(false)}
                        onError={() => {
                          setMainImageLoading(false);
                          setMainImageError(true);
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-48 h-48 text-primary/20" />
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Image Navigation Buttons */}
                  {product.image_urls && product.image_urls.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev === 0 ? product.image_urls!.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors border border-gray-200"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev === product.image_urls!.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors border border-gray-200"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.image_urls && product.image_urls.length > 1 && (
                <div className="flex gap-2 md:gap-3 justify-center mt-4 md:mt-6 w-full">
                  {product.image_urls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 overflow-hidden bg-white border-2 rounded-lg transition-all shadow-sm ${
                        selectedImage === i ? "border-cyan-500 ring-2 ring-cyan-500/30 shadow-md" : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${product.product_name} view ${i + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right - Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* Professional Card Container - Matching Left Section */}
              <div className="w-full md:bg-white/70 md:backdrop-blur-sm md:rounded-2xl md:border md:border-white/80 md:shadow-lg p-3 md:p-6 lg:p-8 flex flex-col h-full space-y-3 md:space-y-6">
                
                {/* Category Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.subcategory_name && (
                    <span className="inline-flex items-center text-xs font-bold text-cyan-700 bg-cyan-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-200/50 shadow-sm">
                      {product.subcategory_name}
                    </span>
                  )}
                  {product.category_name && (
                    <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-200/50 shadow-sm">
                      {product.category_name}
                    </span>
                  )}
                </div>

                {/* Product Name - Large & Prominent */}
                <div>
                  <h1 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight text-gray-900">
                    {product.product_name}
                  </h1>
                </div>

                {/* Rating Section */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
                      />
                    ))}
                    <span className="font-bold ml-2 text-sm md:text-base text-gray-800">{rating}</span>
                  </div>
                </div>

                {/* Product Title / Highlights */}
                {product.product_title && (
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      Key Highlights
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {product.product_title}
                    </p>
                  </div>
                )}

                {/* Description */}
                {product.product_description && (
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">About This Product</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {product.product_description}
                    </p>
                  </div>
                )}

                {/* Action Buttons - Professional Styling */}
                <div className="pt-4 mt-auto space-y-2.5">
                  <a
                    href="tel:+919082230962"
                    className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 px-5 font-semibold text-sm md:text-base text-cyan-700 bg-white border border-cyan-300 hover:bg-cyan-50 hover:border-cyan-400 rounded-lg shadow-sm transition-all duration-150"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919082230962?text=Hi%20Prosmart%2C%20I%20am%20interested%20in%20your%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 px-5 font-semibold text-sm md:text-base text-green-700 bg-white border border-green-300 hover:bg-green-50 hover:border-green-400 rounded-lg shadow-sm transition-all duration-150"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>

                {/* Trust Badges - Enhanced Styling Matching Left Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-1.5">
                      <Shield className="w-4 h-4 text-cyan-700" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">100% Genuine</p>
                  </div>
                  <div className="text-center">
                    <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-1.5">
                      <Truck className="w-4 h-4 text-cyan-700" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Fast Shipping</p>
                  </div>
                  <div className="text-center">
                    <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-1.5">
                      <Phone className="w-4 h-4 text-cyan-700" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">24/7 Support</p>
                  </div>
                  <div className="text-center">
                    <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-1.5">
                      <Award className="w-4 h-4 text-cyan-700" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Certified</p>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
