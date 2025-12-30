import Header from "@/components/Header";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ImageViewer } from "@/components/ImageViewer";
import { Search } from "lucide-react";

const getCategoryIcon = (category: string, subcategory: string): string => {
  if (category === "Healthcare") {
    if (subcategory?.includes("Hospital")) return "Hospital";
    if (subcategory?.includes("Infection")) return "Lightbulb";
    if (subcategory?.includes("Monitoring")) return "Bell";
    if (subcategory?.includes("Security")) return "Shield";
    if (subcategory?.includes("Rehabilitation")) return "Activity";
    return "Shield";
  }
  if (category === "Energy") return "Zap";
  return "Battery";
};

const ProductImageSlider = ({ images, title }: { images: string[], title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-full group/slider">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex w-full h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center p-2 md:p-4 cursor-zoom-in"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLightboxOpen(true);
              }}
            >
              <img
                src={img}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 text-[8px] font-bold"
          >
            PREV
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 text-[8px] font-bold"
          >
            NEXT
          </button>
        </>
      )}

      <ImageViewer
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={selectedIndex}
        title={title}
      />
    </div>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="perspective-1000 w-full h-[130px] md:h-[500px]"
      onMouseEnter={() => !isMobile && setIsFlipped(true)}
      onMouseLeave={() => !isMobile && setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden flex flex-row md:flex-col bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-[2.5rem] p-2.5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden">
          <div className="relative aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden mb-0 md:mb-8 rounded-xl md:rounded-2xl bg-white/30 w-[85px] md:w-full flex-shrink-0">
            <ProductImageSlider images={product.images || [product.image]} title={product.title} />
          </div>

          <div className="flex flex-col flex-1 pl-3 md:pl-0 justify-center">
            <div className="flex items-center gap-2 md:gap-4 mb-1 md:mb-3">
              <h3 className="text-[17px] md:text-2xl font-normal text-foreground tracking-tight line-clamp-2 md:line-clamp-1 capitalize">
                {product.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-[14px] md:text-sm leading-snug md:leading-relaxed mb-2 md:mb-6 line-clamp-2 md:line-clamp-3 font-normal">
              {product.description}
            </p>
            <div className="mt-auto inline-flex items-center gap-1 md:gap-2 text-primary font-normal text-[15px] md:text-sm group/btn">
              <span className="relative">
                View Details
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/btn:w-full" />
              </span>
            </div>
          </div>
        </div>

        {/* Back Side (Flip) */}
        {!isMobile && (
          <div
            className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-primary/95 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-normal">{product.title}</h3>
            </div>

            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                {product.description}
              </p>
              <div className="pt-4">
                <p className="text-xs uppercase tracking-wider text-white/60 mb-3 font-normal">Features</p>
                <ul className="space-y-2">
                  {product.key_features?.slice(0, 4).map((f: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1 flex-shrink-0" />
                      <span>{typeof f === 'string' ? f : f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-white/60 font-normal">Tap for more details</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Products = () => {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const filteredFeatures = useMemo(() => {
    if (!searchQuery) return features;
    const query = searchQuery.toLowerCase();
    return features.filter((p: any) => 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.key_features?.some((f: any) => 
        (typeof f === 'string' ? f : f.title).toLowerCase().includes(query)
      )
    );
  }, [features, searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://api.prosmart.in/api/hydralite/products');
        if (!response.ok) {
          throw new Error('API request failed');
        }

        const result = await response.json();
        const productsList = result.data || result.products || (Array.isArray(result) ? result : []);

        if (Array.isArray(productsList) && productsList.length > 0) {
          const mappedProducts = productsList.map((product: any, index: number) => {
            const productImages = product.assets?.filter((a: any) => a.type === 'image').map((a: any) => a.path) || [];

            return {
              id: product.id || product._id || index + 1,
              title: product.name,
              description: product.description,
              images: productImages.length > 0 ? productImages : [`/hydralite/${index + 1}.png`],
              image: productImages[0] || `/hydralite/${index + 1}.png`,
              key_features: product.key_features || [],
            };
          });

          setFeatures(mappedProducts);
        } else {
          throw new Error('No products found');
        }
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="overflow-hidden min-h-screen bg-[#F0EBE0]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground font-normal">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden min-h-screen bg-[#F0EBE0]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-red-100 shadow-xl max-w-md mx-4">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-normal text-foreground mb-2">Oops! Something went wrong</h2>
            <p className="text-muted-foreground mb-6 font-normal">We couldn't load the products. {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-primary-foreground font-normal py-3 rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden min-h-screen bg-[#F0EBE0]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-normal mb-6 uppercase tracking-wider"
          >
            Our Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-normal text-foreground mb-6 tracking-tight"
          >
            <span className="text-primary"> Our Innovative Products </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Discover our range of cutting-edge solutions designed for <span className="text-foreground font-normal">healthcare</span>, <span className="text-foreground font-normal">energy</span>, and <span className="text-foreground font-normal">sustainable living</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-primary/30 mx-auto mt-10 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-16">
          {filteredFeatures.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filteredFeatures.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-normal">No products found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Products;
