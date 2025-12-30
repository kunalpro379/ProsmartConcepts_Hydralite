import { Building2, Users, Globe, Award } from "lucide-react";

const About = () => {
  const stats = [
    { value: "25+", label: "Years Experience", icon: Building2 },
    { value: "12+", label: "Years in Corporate", icon: Users },
    { value: "3", label: "Pioneering Products", icon: Award },
    { value: "100%", label: "Made in India", icon: Globe },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">
                Mumbai-Based Innovation Leader Since 1999
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Prosmart Concepts is a Mumbai-based corporation with over 25 years of experience 
                in developing high-tech and critically needed products for Medical Electronics, 
                Disposable & Defense sectors.
              </p>
              <p>
                We are pioneers of innovative devices including the <strong className="text-foreground">Portable Oxygen Cylinder - Oxycare</strong> (first in India) 
                and <strong className="text-foreground">HEED - Helicopter Emergency Egress Device</strong> for the Ministry of Defense, 
                one of only 3 such products available worldwide.
              </p>
              <p>
                As an MSME (Udyam) registered company, we maintain our own warehousing and 
                manufacturing facilities near Mumbai's shipping port, enabling efficient import 
                and export logistics.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {["Technical Excellence", "Quality Warranty", "Ethical Business", "Self-Reliance"].map((value, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card p-8 text-center hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
