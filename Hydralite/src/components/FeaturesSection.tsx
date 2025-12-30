import { Award, Lightbulb, Shield, Zap } from "lucide-react";

const achievementCards = [
  {
    icon: Award,
    title: "30+ Years of Innovation Experience",
    description: "Led by industry veterans with decades of hands-on experience in developing products for healthcare and defense sectors.",
    highlight: "3 Decades"
  },
  {
    icon: Lightbulb,
    title: "First-of-Its-Kind Technologies in India",
    description: "Pioneers behind innovations such as water-powered LED lighting, antimicrobial ambient disinfection systems, and advanced hospital safety devices.",
    highlight: "Patent Applied"
  },
  {
    icon: Shield,
    title: "Healthcare & Defense Focus",
    description: "Specialized solutions designed for critical applications where reliability and performance are non-negotiable.",
    highlight: "Mission Critical"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24 px-6 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl translate-y-40 -translate-x-40" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm font-normal text-primary-foreground">Innovation Since 1994</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] md:leading-[0.9] tracking-tight font-semibold">
                  Built on <span className="font-semibold bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">Experience</span>.<br />
                  Driven by <span className="font-semibold bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">Purpose</span>.
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl font-normal">
                  Hydralite Nature Power Pvt. Ltd. is an Indian innovation-driven startup incorporated in May 2024.
                </p>
                <p className="text-base md:text-lg text-primary-foreground/70 leading-relaxed max-w-2xl font-normal">
                  We specialize in developing sustainable, affordable, and life-enhancing products for healthcare, safety, and everyday living. Our solutions are designed specifically for Indian conditions, where accessibility, affordability, and reliability matter most.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
                  <span className="text-sm font-normal text-primary-foreground">Healthcare</span>
                </div>
                <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
                  <span className="text-sm font-normal text-primary-foreground">Safety</span>
                </div>
                <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
                  <span className="text-sm font-normal text-primary-foreground">Sustainability</span>
                </div>
              </div>
            </div>

            {/* Right Content - Achievement Cards */}
            <div className="hidden md:block space-y-6">
              {achievementCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-primary-foreground/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300" />
                      <div className="relative flex items-center md:items-start gap-4 md:gap-6 bg-primary-foreground/8 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-primary-foreground/20 hover:border-primary-foreground/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-primary-foreground/15 rounded-xl border border-primary-foreground/20">
                            <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="space-y-1 md:space-y-3 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base sm:text-xl md:text-2xl font-semibold text-primary-foreground leading-tight">
                              {card.title}
                            </h3>
                            <div className="hidden md:block px-3 py-1 bg-primary-foreground/15 rounded-full border border-primary-foreground/25">
                              <span className="text-xs font-normal text-primary-foreground whitespace-nowrap">
                                {card.highlight}
                              </span>
                            </div>
                          </div>
                          <p className="hidden md:block text-sm md:text-base text-primary-foreground/75 leading-relaxed font-normal">
                            {card.description}
                          </p>
                        </div>
                      </div>
                  </div>
                );
              })}

            {/* Bottom highlight */}
            <div className="mt-8 p-6 ">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                <span className="">Patent Portfolio</span>
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Several of our core technologies are patent-applied and designed to be scalable across healthcare institutions, rural programs, and consumer markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
