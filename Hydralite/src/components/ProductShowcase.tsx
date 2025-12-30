import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Battery, Bell, Lightbulb, Shield, Zap, ArrowRight } from "lucide-react";
import { ImageViewer } from "@/components/ImageViewer";
import { useNavigate } from "react-router-dom";

const iconMap = {
  Hospital: Shield,
  Lightbulb: Lightbulb,
  Bell: Bell,
  Shield: Shield,
  Activity: Activity,
  Zap: Zap,
  Battery: Battery,
  Utensils: Battery,
};

// Map category to icon
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
  if (category === "Power Tech") return "Battery";
  if (category === "Wearable Tech") return "Activity";
  if (category === "Health Tech") return "Activity";
  if (category === "Lifestyle") return "Utensils";
  return "Battery";
};

const FeatureShowcase = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchRemainingProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch priority list
        const priorityResponse = await fetch('https://api.prosmart.in/api/hydralite/priority');
        
        if (!priorityResponse.ok) {
          throw new Error(`Priority API error: ${priorityResponse.status}`);
        }
        
        const priorityData = await priorityResponse.json();

        if (priorityData.success && priorityData.data.products && priorityData.data.products.length > 4) {
          // Skip first 4 and get remaining priority product IDs
          const remainingIds = priorityData.data.products.slice(4);
          console.log('🔍 Remaining product IDs after skipping first 4:', remainingIds);

            // Fetch all products
            const productsResponse = await fetch('https://api.prosmart.in/api/hydralite/products');
          
          if (!productsResponse.ok) {
            throw new Error(`Products API error: ${productsResponse.status}`);
          }
          
          const productsData = await productsResponse.json();

          if (productsData.success && productsData.data) {
            // Find remaining priority products and map to component format
            const remainingProducts = remainingIds.map((id) => {
              const product = productsData.data.find((p) => p._id === id);
              if (!product) {
                console.warn(`⚠️ Product with ID ${id} not found in products data`);
                return null;
              }
              
              return {
                id: product._id,
                title: product.name?.toUpperCase() || 'UNTITLED',
                description: product.description || '',
                link: "LEARN MORE",
                image: product.assets?.length > 0 ? product.assets[0].path : "/hydralite/placeholder.jpg",
                cardTitle: product.name || 'Untitled Product',
                cardDescription: product.description?.length > 100 ? product.description.substring(0, 100) + "..." : (product.description || ''),
                cardLink: "EXPLORE",
                icon: getCategoryIcon(product.category, product.subcategory)
              };
            }).filter(Boolean); // Remove null entries

            setFeatures(remainingProducts);
            console.log('✅ Loaded remaining priority products:', remainingProducts.length, remainingProducts);
          } else {
            throw new Error('Products API returned no data');
          }
        } else {
          console.log('ℹ️ Not enough priority products (need >4), hiding showcase section');
          setFeatures([]);
        }
      } catch (error) {
        console.error('❌ Error fetching remaining priority products:', error);
        setError(error.message);
        setFeatures([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemainingProducts();
  }, []);

  useEffect(() => {
    if (features.length > 0) {
      const intervalId = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [features.length]);

  if (isLoading) {
    return (
      <section className="relative min-h-[100vh] bg-secondary">
        <div className="flex min-h-screen items-center justify-center px-6 py-16 md:px-12 lg:px-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading remaining priority products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-[100vh] bg-secondary">
        <div className="flex min-h-screen items-center justify-center px-6 py-16 md:px-12 lg:px-20">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Showcase</h2>
            <p className="text-muted-foreground mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (features.length === 0) {
    console.log('ℹ️ No remaining products to showcase, hiding section');
    return null; // Don't show section if no products
  }

  const activeFeature = features[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary overflow-hidden"
    >
      <div className="flex items-center px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="mb-6 hidden md:block">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                        {React.createElement(iconMap[activeFeature.icon], { className: "h-6 w-6" })}
                      </div>
                    </div>
                    
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary/70 uppercase font-normal mb-4 block">
                      Advanced Solution
                    </span>

                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-3xl md:text-4xl uppercase leading-[1.1] tracking-tighter text-foreground lg:text-6xl font-normal">
                        {activeFeature.title}
                      </h2>
                    </div>
                    
                    <p className="mb-8 max-w-lg text-sm md:text-base text-muted-foreground leading-relaxed">
                      {activeFeature.description}
                    </p>

                    
                    <button
                      onClick={() => navigate(`/products/${activeFeature.id}`)}
                      className="inline-flex items-center gap-2 text-sm font-normal uppercase text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      {activeFeature.link}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="mt-12 flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === activeIndex ? "w-12 bg-primary" : "w-6 bg-primary/20 hover:bg-primary/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full flex items-center justify-center"
                  >
                      <div 
                        className="relative group/img p-6 md:p-10 lg:p-14 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-border/40 shadow-2xl shadow-primary/5 transition-all duration-700 hover:bg-white/60 hover:border-primary/30 cursor-zoom-in"
                        onClick={() => setLightboxOpen(true)}
                      >
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700"></div>
                        
                          <img
                            src={activeFeature.image}
                            alt={activeFeature.cardTitle}
                            className="h-64 w-64 md:h-64 md:w-64 lg:h-[350px] lg:w-[350px] object-contain transition-transform duration-700 group-hover/img:scale-110 drop-shadow-2xl"
                          />
                        
                        {/* Animated corner accents */}
                        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-primary/20 rounded-tl-lg transition-all duration-500 group-hover/img:border-primary/40 group-hover/img:scale-110"></div>
                        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-primary/20 rounded-br-lg transition-all duration-500 group-hover/img:border-primary/40 group-hover/img:scale-110"></div>
                      </div>

                        <ImageViewer 
                          isOpen={lightboxOpen} 
                          onClose={() => setLightboxOpen(false)}
                          images={[activeFeature.image]}
                          title={activeFeature.cardTitle}
                        />

                  </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;