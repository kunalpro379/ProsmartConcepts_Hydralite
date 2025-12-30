import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Cpu, Package } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const products = [
    {
      icon: Heart,
      title: "Oxycare",
      subtitle: "Portable Oxygen Cylinder",
      description: "First-in-India portable oxygen solution for emergency and medical use. Compact, reliable, and life-saving.",
      badge: "Medical",
      featured: true,
    },
    {
      icon: Shield,
      title: "HEED Device",
      subtitle: "Emergency Egress System",
      description: "Helicopter Emergency Egress Device developed for Indian Navy. One of only 3 products worldwide.",
      badge: "Defense",
      featured: true,
    },
    {
      icon: Cpu,
      title: "Medical Electronics",
      subtitle: "Advanced Healthcare Tech",
      description: "Cutting-edge medical electronic devices designed and manufactured entirely in India.",
      badge: "Electronics",
    },
    {
      icon: Package,
      title: "Disposable Products",
      subtitle: "Healthcare Consumables",
      description: "High-quality disposable medical products meeting international standards.",
      badge: "Healthcare",
    },
  ];

  return (
    <section className="py-24 gradient-animated relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            OUR PRODUCTS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Innovative Solutions for Critical Needs
          </h2>
          <p className="text-muted-foreground">
            From life-saving medical devices to defense-grade equipment, our products 
            represent the pinnacle of Indian innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className={`glass-card p-6 hover-lift group relative overflow-hidden ${
                product.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {product.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold text-white bg-gradient-to-r from-primary to-accent px-3 py-1 rounded-full">
                    First in India
                  </span>
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all ${
                product.featured ? "w-16 h-16" : ""
              }`}>
                <product.icon className={`text-primary ${product.featured ? "w-8 h-8" : "w-7 h-7"}`} />
              </div>

              <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>

              <h3 className={`font-display font-semibold mb-1 ${product.featured ? "text-xl" : "text-lg"}`}>
                {product.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{product.subtitle}</p>
              <p className={`text-muted-foreground leading-relaxed ${product.featured ? "text-sm" : "text-xs"}`}>
                {product.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
