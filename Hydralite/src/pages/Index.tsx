import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import ModelsSection from "@/components/ModelsSection";
import FeatureShowcase from "@/components/ProductShowcase";
import ByTheNumbers from "@/components/ByTheNumbers";
import Footer from "@/components/Footer";
import HeroSectionImg from "@/assets/hero_section.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [heroProducts, setHeroProducts] = useState({
    firstProduct: null,
    secondProduct: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        // Fetch hero customization
        const heroResponse = await fetch('https://api.prosmart.in/api/hydralite/hero-customization');
        const heroData = await heroResponse.json();

        if (heroData.success && heroData.data.products && heroData.data.products.length >= 2) {
          const [firstProductId, secondProductId] = heroData.data.products;

          // Fetch all products
          const productsResponse = await fetch('https://api.prosmart.in/api/hydralite/products');
          const productsData = await productsResponse.json();

          if (productsData.success && productsData.data) {
            // Find the specific products by ID
            const firstProduct = productsData.data.find(p => p._id === firstProductId);
            const secondProduct = productsData.data.find(p => p._id === secondProductId);

            setHeroProducts({
              firstProduct,
              secondProduct
            });
          }
        }
      } catch (error) {
        console.error('Error fetching hero products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroProducts();
  }, []);
  return (
    <div className="overflow-hidden" style={{ backgroundColor: '#F0EBE0' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen px-4 md:px-12" style={{ backgroundColor: '#F0EBE0' }}>
        {/* Background watermark */}
        <div
          className="absolute bottom-0 left-0 w-full text-left font-display text-foreground/[0.08] leading-none tracking-tight pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: '25vw' }}
        >
          HYDRAlite
        </div>

        <Header />

        <div className="mt-16 md:mt-20 relative px-4 md:px-12 pt-24 md:pt-32 min-h-[calc(100vh-96px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 z-10">
              <h1 className="text-display text-5xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground leading-[1.1] font-semibold">
                RE-DEFINING WELLNESS & SAFETY WITH GREEN TECH.
              </h1>

              <div className="flex flex-col sm:flex-row gap-6">
                <p className="text-body text-base md:text-base text-muted-foreground max-w-sm leading-relaxed font-normal">
                  We design sustainable, science-backed innovations that improve everyday life. From healthcare safety to energy independence, Hydralite builds future-ready solutions that are accessible, reliable, and made for India.
                </p>
                <div className="flex items-start sm:items-end justify-start sm:justify-end">
                  <button
                    onClick={() => navigate('/products')}
                    className="group inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-lg px-6 py-4 text-xs tracking-widest font-normal hover:bg-accent transition-colors cursor-pointer whitespace-nowrap"
                  >
                    EXPLORE SOLUTIONS
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Dynamic Video/Image */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="flex flex-col items-center w-full max-w-lg">
                <button
                  onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block w-full cursor-pointer"
                >
                  {/* Dynamic content based on first product */}
                  {isLoading ? (
                    <div className="w-full h-64 bg-muted/20 rounded-xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : heroProducts.firstProduct && (
                    // Check if first product has video asset
                    (() => {
                      const videoAsset = heroProducts.firstProduct.assets?.find(asset => asset.type === 'video');
                      const firstAsset = heroProducts.firstProduct.assets?.[0];

                      if (videoAsset) {
                        return (
                          <video
                            className="w-full h-auto rounded-xl max-w-lg aspect-video object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src={videoAsset.path} type="video/webm" />
                            <source src={videoAsset.path} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        );
                      } else if (firstAsset) {
                        return (
                          <img
                            src={firstAsset.path}
                            alt={heroProducts.firstProduct.name}
                            className="w-full h-auto rounded-xl max-w-lg aspect-video object-cover"
                          />
                        );
                      }
                      return null;
                    })()
                  )}
                </button>
                {/* Dynamic Product Name & Description */}
                {heroProducts.firstProduct && (
                  <div className="mt-8 text-left flex flex-col items-start gap-4">
                    <span className="text-[8px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase font-normal">
                      {heroProducts.firstProduct.subcategory}
                    </span>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 shadow-sm bg-background/50 backdrop-blur-sm">
                      <div className="text-base md:text-2xl font-semibold tracking-tight text-foreground">
                        {heroProducts.firstProduct.name.length > 20
                          ? heroProducts.firstProduct.name.substring(0, 20) + "..."
                          : heroProducts.firstProduct.name}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-0.5 bg-primary/20 rounded-full self-stretch mt-0.5 mb-0.5 shrink-0" />
                      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed font-normal">
                        {heroProducts.firstProduct.description.substring(0, 60) + "..."}
                      </p>
                    </div>
                    <button
                      onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-normal uppercase text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-end justify-center gap-4 md:gap-12 mt-12 pb-0 max-w-full overflow-hidden">
            <div className="relative order-1 flex-1 md:flex-none flex justify-end min-w-0">
              {/* Dynamic Second Product Image */}
              {isLoading ? (
                <div className="w-full max-w-[280px] md:max-w-md h-64 bg-muted/20 rounded-xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : heroProducts.secondProduct?.assets?.[0] && (
                <img
                  src={heroProducts.secondProduct.assets[0].path}
                  alt={heroProducts.secondProduct.name}
                  className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-md h-auto cursor-pointer drop-shadow-2xl object-contain"
                  onClick={() => document.getElementById('bythenumbers')?.scrollIntoView({ behavior: 'smooth' })}
                />
              )}
            </div>

            {/* Dynamic Second Product Name & Info */}
            {heroProducts.secondProduct && (
              <div className="text-left flex flex-col items-start gap-2 md:gap-4 order-2 mb-8 md:mb-20 flex-1 min-w-0">
                <span className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full font-normal">
                  {heroProducts.secondProduct.subcategory}
                </span>
                <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl border-2 shadow-sm bg-background/50 backdrop-blur-sm shrink-0">
                  <div className="text-sm md:text-2xl font-semibold tracking-tight text-foreground whitespace-nowrap">
                    {heroProducts.secondProduct.name}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-0.5 bg-primary/20 rounded-full self-stretch mt-0.5 mb-0.5 shrink-0" />
                  <p className="text-[10px] md:text-sm text-muted-foreground max-w-xs leading-relaxed line-clamp-2 md:line-clamp-none font-normal">
                    {heroProducts.secondProduct.description.substring(0, 30) + "..."}
                  </p>
                </div>
                <button
                  onClick={() => document.getElementById('bythenumbers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-normal uppercase text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <div id="our-story" className="scroll-mt-24 md:scroll-mt-32">
        <FeaturesSection />
      </div>

      {/* ByTheNumbers Section */}
      <div id="bythenumbers" className="scroll-mt-24 md:scroll-mt-32">
        <ByTheNumbers product={heroProducts.secondProduct} />
      </div>

      {/* Models Section */}
      <div id="models" className="scroll-mt-24 md:scroll-mt-32">
        <ModelsSection />
      </div>

      <div id="features" className="scroll-mt-24 md:scroll-mt-32">
        <FeatureShowcase />
      </div>

      {/* Community Section */}
      <div id="community" className="scroll-mt-24 md:scroll-mt-32">
        <CommunitySection product={heroProducts.firstProduct} />
      </div>


      <Footer />
    </div>
  );
};

export default Index;
