import ImageGrid from "./ImageGrid";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const ByTheNumbers = ({ product }) => {
  if (!product) return null;

  const features = product.key_features || [];

  return (
    <section className="bg-background px-4 md:px-6 lg:px-10 py-12 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start text-left">
          
              {/* HEADER WITH IMAGE AND PRODUCT INFO SIDE BY SIDE */}
              <header className="space-y-8 flex flex-col items-start w-full">
                <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-normal uppercase tracking-[0.2em]">
                  <Sparkles className="w-3 h-3" />
                  Featured Innovation
                </div>
                
                  <div className="w-full">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            <div className="shrink-0 w-80 h-80 md:w-72 md:h-72 lg:w-[380px] lg:h-[380px]">
                          <ImageGrid 
                            assets={product?.assets} 
                            className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[1.5rem] bg-white border border-border/40 shadow-sm"
                          />
                        </div>
                        
                        <div className="flex flex-col items-start text-left gap-4 md:gap-5 flex-1">
                          <div className="space-y-1 md:space-y-2">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground leading-[0.95] uppercase">
                              {product.name}
                            </h2>
                            <span className="text-base md:text-xl text-muted-foreground/60 font-medium uppercase tracking-tight block">
                              {product.subcategory}
                            </span>
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="w-1 bg-primary/20 rounded-full self-stretch mt-1 mb-1 shrink-0" />
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl font-medium">
                              {product.description}
                            </p>
                          </div>
    
                          {/* Features List moved here */}
                          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4 w-full">
                          {features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 group/feat bg-white p-3 md:p-4 rounded-2xl border border-border/40 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover/feat:bg-primary group-hover/feat:text-white transition-colors duration-300">
                                <Zap className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs md:text-sm font-medium text-foreground leading-none uppercase tracking-tight">
                                  {feature.title}
                                </h4>
                                <p className="text-[10px] md:text-[11px] text-muted-foreground/80 leading-snug font-normal">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                    </div>
                  </div>
                </div>
            </header>


          </div>
        </div>
      </section>

  );
};

export default ByTheNumbers;
