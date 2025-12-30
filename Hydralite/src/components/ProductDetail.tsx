import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ImageViewer } from "@/components/ImageViewer";
import { toast } from "sonner";
import { Mail, MessageSquare, Link as LinkIcon } from "lucide-react";

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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const shareToEmail = () => {
    if (!product) return;
    const subject = `Check out this ${product.name}`;
    const body = `I found this interesting product: ${product.name}\n\n${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareToWhatsApp = () => {
    if (!product) return;
    const text = `Check out this ${product.name}: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
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

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('https://api.prosmart.in/api/hydralite/products');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const result = await response.json();
        let productsList = [];
        if (result && typeof result === 'object') {
          productsList = result.data || result.products || (Array.isArray(result) ? result : []);
        } else if (Array.isArray(result)) {
          productsList = result;
        }

        if (!Array.isArray(productsList)) {
          console.error("productsList is not an array:", productsList);
          throw new Error('Invalid data format from server');
        }

        const foundProduct = productsList.find((p: any) => String(p.id) === String(id) || String(p._id) === String(id));

        if (foundProduct) {
          const productImages = foundProduct.assets?.filter((a: any) => a.type === 'image').map((a: any) => a.path) || [];
          
          setProduct({
            ...foundProduct,
            images: productImages.length > 0 ? productImages : [`/hydralite/${foundProduct.id || 1}.png`],
            name: foundProduct.name || foundProduct.title
          });
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('❌ Error fetching product details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0EBE0]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F0EBE0]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-normal mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8 font-normal">{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/products" className="text-primary font-normal">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EBE0]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
        <Link 
          to="/products" 
          className="inline-flex items-center text-xs md:text-sm font-normal text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          Back to all products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Product Image Slider */}
            <div className="relative max-w-[85%] mx-auto lg:max-w-[90%] w-full">
              <div className="sticky top-32 space-y-6">
                <div className="overflow-hidden group/slider relative rounded-3xl bg-white/40 backdrop-blur-sm border border-white/20">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                          {product.images.map((img: string, index: number) => (
                            <div 
                              key={index} 
                              className="flex-[0_0_100%] min-w-0 relative p-8 md:p-12 flex items-center justify-center aspect-square cursor-zoom-in"
                              onClick={() => setLightboxOpen(true)}
                            >
                              <img
                                src={img}
                                alt={`${product.name} - ${index + 1}`}
                                  className="w-full h-full object-contain drop-shadow-2xl scale-75 md:scale-80"
                              />
                            </div>
                          ))}
                        </div>
                    </div>

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollPrev();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 hover:bg-white text-[10px] font-bold"
                        >
                          PREV
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollNext();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 hover:bg-white text-[10px] font-bold"
                        >
                          NEXT
                        </button>
                      </>
                    )}

                    <ImageViewer 
                      isOpen={lightboxOpen} 
                      onClose={() => setLightboxOpen(false)}
                      images={product.images}
                      initialIndex={selectedIndex}
                      title={product.name}
                    />
                  </div>
    
                  {/* Thumbnails Preview */}
                  {product.images.length > 1 && (
                    <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center">
                      {product.images.map((img: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => emblaApi?.scrollTo(index)}
                          className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all p-3 md:p-4 bg-white/60 backdrop-blur-sm hover:scale-105 ${
                            index === selectedIndex 
                              ? "border-primary shadow-lg scale-105 bg-white/80" 
                              : "border-white/40 opacity-70 hover:opacity-100 hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-8 md:space-y-10">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-normal tracking-wider uppercase mb-4 md:mb-6">
                  {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                </div>
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-normal text-foreground mb-4 md:mb-6 leading-tight">
                  {product.name}
                </h1>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>

              {product.key_features && product.key_features.length > 0 && (
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl md:text-2xl font-normal text-foreground">Key Features</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.key_features.map((feature: any, idx: number) => {
                      const title = typeof feature === 'string' ? feature : feature.title;
                      const description = typeof feature === 'string' ? null : feature.description;
                      
                        return (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl md:rounded-[2rem] p-5 md:p-6 hover:bg-white/60 transition-all duration-500"
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/20">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                  <h3 className="font-normal text-foreground text-base md:text-lg group-hover:text-primary transition-colors pt-0.5">
                                    {title}
                                  </h3>
                                </div>
                                {description && (
                                  <p className="text-muted-foreground text-sm md:text-sm leading-relaxed font-normal opacity-80 group-hover:opacity-100 transition-opacity pl-9">
                                    {description}
                                  </p>
                                )}
                            </div>
                          </motion.div>
                        );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-white/20 flex flex-wrap items-center gap-4">
                <button className="flex-1 md:flex-none bg-primary text-primary-foreground font-normal py-3 md:py-4 px-8 md:px-10 rounded-xl md:rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] text-sm md:text-base">
                  Contact Us
                </button>
                
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={shareToEmail}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary hover:bg-white/60 transition-all"
                      title="Share via Email"
                    >
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button 
                      onClick={shareToWhatsApp}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary hover:bg-white/60 transition-all"
                      title="Share via WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary hover:bg-white/60 transition-all"
                      title="Copy Link"
                    >
                      <LinkIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default ProductDetail;
