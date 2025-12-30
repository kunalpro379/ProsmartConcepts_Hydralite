
const ImageWrapper = ({ src, alt, className = "", aspect = "aspect-square" }) => (
  <div className={`${aspect} overflow-hidden rounded-none flex items-center justify-center ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain transition-transform duration-300 hover:scale-[1.02]"
    />
  </div>
);

const CommunitySection = ({ product }) => {
  if (!product) return null;

  const features = product.key_features || [];
  const assets = product.assets || [];

  // Filter to only get images (exclude videos)
  const imageAssets = assets.filter(asset => {
    const path = asset.path?.toLowerCase() || '';
    return !path.endsWith('.mp4') && !path.endsWith('.webm') && !path.endsWith('.mov') && !path.endsWith('.avi');
  });

  // Get first 5 images for display
  const displayImages = imageAssets.slice(0, 5).map((asset, index) => ({
    src: asset.path,
    alt: `${product.name} - Image ${index + 1}`
  }));

  const renderGallery = () => {
    const count = displayImages.length;
    if (count === 0) return null;

    if (count === 1) {
      return (
        <div className="grid grid-cols-1 gap-0.5">
          <ImageWrapper src={displayImages[0].src} alt={displayImages[0].alt} aspect="aspect-video sm:aspect-square" />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
          <ImageWrapper src={displayImages[0].src} alt={displayImages[0].alt} aspect="aspect-[4/5]" />
          <ImageWrapper src={displayImages[1].src} alt={displayImages[1].alt} aspect="aspect-[4/5]" />
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-0.5">
          <div className="col-span-2">
            <ImageWrapper src={displayImages[0].src} alt={displayImages[0].alt} aspect="aspect-[16/9] sm:aspect-video" />
          </div>
          <ImageWrapper src={displayImages[1].src} alt={displayImages[1].alt} aspect="aspect-square" />
          <ImageWrapper src={displayImages[2].src} alt={displayImages[2].alt} aspect="aspect-square" />
        </div>
      );
    }

    if (count === 4) {
      return (
        <div className="grid grid-cols-2 gap-0.5">
          <ImageWrapper src={displayImages[0].src} alt={displayImages[0].alt} aspect="aspect-square" />
          <ImageWrapper src={displayImages[1].src} alt={displayImages[1].alt} aspect="aspect-square" />
          <ImageWrapper src={displayImages[2].src} alt={displayImages[2].alt} aspect="aspect-square" />
          <ImageWrapper src={displayImages[3].src} alt={displayImages[3].alt} aspect="aspect-square" />
        </div>
      );
    }

    if (count === 5) {
      return (
        <div className="grid grid-cols-2 gap-0.5">
          <ImageWrapper src={displayImages[0].src} alt={displayImages[0].alt} aspect="aspect-[4/5]" />
          <ImageWrapper src={displayImages[1].src} alt={displayImages[1].alt} aspect="aspect-[4/5]" />
          <div className="col-span-2 grid grid-cols-3 gap-0.5">
            <ImageWrapper src={displayImages[2].src} alt={displayImages[2].alt} aspect="aspect-square" />
            <ImageWrapper src={displayImages[3].src} alt={displayImages[3].alt} aspect="aspect-square" />
            <ImageWrapper src={displayImages[4].src} alt={displayImages[4].alt} aspect="aspect-square" />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="bg-gradient-to-br from-background via-muted/10 to-background px-6 py-5 md:px-10 lg:px-16 lg:py-5 border-t border-border/70">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-10">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-normal">
              {product.subcategory}
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight text-foreground">
                {product.name}
                <span className="block text-primary font-normal">{product.category}</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            <div className="pt-6">
              <div className="relative group overflow-hidden rounded-2xl border border-white/40 bg-white/10 backdrop-blur-xl p-8 shadow-2xl transition-all duration-700 hover:bg-white/20">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5"></div>

                {/* Decorative background element */}
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-[80px] transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/30"></div>
                <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-primary/10 blur-[80px] transition-all duration-700 group-hover:scale-150"></div>

                <div className="relative space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-1 bg-primary rounded-none shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
                    <h3 className="text-xs md:text-sm text-foreground font-normal uppercase tracking-[0.3em]">
                      Key Features
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-center gap-4 group/item translate-y-0 hover:-translate-y-0.5 transition-transform duration-300">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:ring-primary group-hover/item:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-sm md:text-base text-muted-foreground/90 font-medium leading-none transition-colors group-hover/item:text-foreground">
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 text-sm text-muted-foreground/80 font-normal">
              <span className="h-px w-12 bg-border"></span>
              {product.subcategory}
            </div>
          </div>

          {/* Right - UV Images Grid */}
          <div className="lg:col-span-5 flex items-center">
            <div className="bg-white rounded-none p-0.5 shadow-none w-full">
              {renderGallery()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
