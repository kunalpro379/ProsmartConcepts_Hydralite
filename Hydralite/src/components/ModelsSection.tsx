import { ArrowRight, Zap, Shield, Activity, Battery, Utensils, Lightbulb, Bell, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const iconMap = {
  Hospital: Shield,
  Lightbulb: Lightbulb,
  Bell: Bell,
  Shield: Shield,
  Activity: Activity,
  Zap: Zap,
  Battery: Battery,
  Utensils: Utensils,
};

const getCategoryIcon = (category: string): string => {
  const cat = category?.toUpperCase();
  if (cat?.includes("HEALTH")) return "Activity";
  if (cat?.includes("ENERGY")) return "Zap";
  if (cat?.includes("POWER")) return "Battery";
  if (cat?.includes("WEARABLE")) return "Activity";
  if (cat?.includes("LIFESTYLE")) return "Utensils";
  return "Zap";
};

const ProductCard = ({ model, index }: { model: any; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const IconComponent = iconMap[getCategoryIcon(model.category)] || Zap;

  return (
    <div
      className="perspective-1000 w-full h-full min-h-[320px] md:min-h-[450px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => {
        if (model.id) {
          navigate(`/products/${model.id}`);
        } else {
          navigate('/products');
        }
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
      >
        {/* Front Side */}
        <div className="relative backface-hidden flex flex-col h-full bg-white border border-border/40 rounded-2xl md:rounded-[2rem] p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
          {/* Category Badge */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
            <span className="bg-black/80 text-white text-[10px] md:text-[11px] font-normal px-2.5 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider">
              {model.category}
            </span>
          </div>

          <div className="relative aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden mb-3 md:mb-4 rounded-xl bg-muted/5 flex-shrink-0">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-2 md:p-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/hydralite/placeholder.jpg";
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2 flex-1">
            <h3 className="text-[16px] md:text-lg font-normal text-foreground tracking-tight line-clamp-2">
              {model.name}
            </h3>
            <p className="text-[12px] md:text-sm text-muted-foreground line-clamp-2 mb-2 font-normal leading-relaxed">
              {model.description}
            </p>
            <div className="mt-auto inline-flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs font-medium text-foreground group/btn uppercase tracking-widest">
              VIEW DETAILS
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col h-full bg-primary rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-2xl text-white"
        >
          <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-6">
            <div className="w-7 h-7 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IconComponent className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
            </div>
            <h3 className="text-[13px] md:text-xl font-normal line-clamp-2">{model.name}</h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 md:pr-2">
            <p className="text-[11px] md:text-sm text-white/90 leading-relaxed font-normal">
              {model.description}
            </p>
          </div>

          <div className="mt-4 md:mt-6 pt-4 md:pt-6 flex items-center justify-between border-t border-white/10">
            <span className="text-[9px] md:text-xs text-white/60 font-normal uppercase tracking-widest">Innovation details</span>
            <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ModelsSection = () => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPriorityProducts = async () => {
      try {
        setIsLoading(true);
        const priorityResponse = await fetch('https://api.prosmart.in/api/hydralite/priority');
        const priorityData = await priorityResponse.json();

        if (priorityData.success && priorityData.data.products && priorityData.data.products.length > 0) {
          const priorityIds = priorityData.data.products.slice(0, 4);
          const productsResponse = await fetch('https://api.prosmart.in/api/hydralite/products');
          const productsData = await productsResponse.json();

          if (productsData.success && productsData.data) {
            const priorityProducts = priorityIds.map(id => {
              const product = productsData.data.find(p => p._id === id);
              if (product) {
                return {
                  id: product._id,
                  name: product.name.toUpperCase(),
                  image: product.assets && product.assets.length > 0 ? product.assets[0].path : "/hydralite/placeholder.jpg",
                  description: product.description,
                  category: product.category.toUpperCase()
                };
              }
              return null;
            }).filter(Boolean);

            setModels(priorityProducts);
          }
        }
      } catch (error) {
        console.error('Error fetching priority products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriorityProducts();
  }, []);

  if (!isLoading && models.length === 0) return null;

  return (
    <section className="bg-background py-10 md:py-20 px-4 md:px-8 lg:px-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-6">
          <h2 className="text-display text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-foreground uppercase font-normal">
            ONE BRAND.<br />
            MULTIPLE INNOVATIONS.
          </h2>
          <p className="text-xs md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed px-4 font-normal">
            Different solutions, same innovation. Choose a Hydralite product designed for your specific needs.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-card rounded-2xl border border-border/50 aspect-[4/5] md:aspect-auto md:min-h-[450px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 items-stretch">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <ProductCard model={model} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 md:mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="group relative inline-flex items-center gap-2 md:gap-3 bg-black text-white px-6 md:px-12 py-3 md:py-6 rounded-full font-normal text-[10px] md:text-sm uppercase tracking-[0.2em] transition-all hover:bg-black/90 shadow-2xl"
          >
            <span>Explore All Products</span>
            <div className="flex items-center justify-center bg-white/20 rounded-full w-5 h-5 md:w-8 md:h-8 transition-transform group-hover:rotate-45">
              <Plus className="w-2.5 h-2.5 md:w-5 md:h-5" />
            </div>
          </motion.button>
        </div>
      </div>

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
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default ModelsSection;
