import { CheckCircle2, Factory, MapPin, Truck, Shield, Users } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Factory,
      title: "In-house Manufacturing",
      description: "Complete product development from raw materials to final product, entirely Made in India.",
    },
    {
      icon: MapPin,
      title: "Strategic Location",
      description: "Facilities near Mumbai shipping port for efficient import/export logistics.",
    },
    {
      icon: Shield,
      title: "Quality Warranty",
      description: "All products come with comprehensive quality warranty showing our commitment.",
    },
    {
      icon: Users,
      title: "Ethical Business",
      description: "Strong family values with long-lasting relations through social service activities.",
    },
    {
      icon: Truck,
      title: "Efficient Logistics",
      description: "Own warehousing space ensuring quick delivery and supply chain management.",
    },
    {
      icon: CheckCircle2,
      title: "MSME Registered",
      description: "Government recognized enterprise supporting India's self-reliance policy.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Trusted Partner for Critical Solutions
          </h2>
          <p className="text-muted-foreground">
            With over 25 years of experience and a commitment to excellence, 
            we deliver reliable solutions that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-2xl border border-border/50 hover:border-primary/20 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
