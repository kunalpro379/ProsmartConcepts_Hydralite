import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-[#F0EBE0] overflow-hidden">
      <Header />
      
      <main className="pt-48 pb-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <section className="mb-24">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-foreground mb-12 leading-[0.8]">
              Innovation <br /> Since 1994
            </h1>
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl font-medium text-foreground tracking-tight italic opacity-90">
                Built on Experience.
              </p>
              <p className="text-3xl md:text-5xl font-medium text-primary tracking-tight italic">
                Driven by Purpose.
              </p>
            </div>
          </section>

              {/* Founders Section */}
              <section className="mb-24">
                <h2 className="text-lg font-bold uppercase tracking-widest text-foreground border-b border-border/50 pb-4 mb-12">Founders</h2>
                <div className="grid gap-16 md:grid-cols-3">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">Atul Suresh Anand <br /><span className="text-lg text-muted-foreground font-normal opacity-70">(Director)</span></h3>
                    <p className="text-2xl text-muted-foreground leading-relaxed">
                      30+ years in product development. Pioneer behind India’s first portable medical oxygen cylinder and water-powered LED lamps. Leads technical innovation at Hydralite.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">Fizaa Anand <br /><span className="text-lg text-muted-foreground font-normal opacity-70">(Director)</span></h3>
                    <p className="text-2xl text-muted-foreground leading-relaxed">
                      Expert in digital & social media marketing. Heads branding, product presentation, and packaging.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">Uttam Anand <br /><span className="text-lg text-muted-foreground font-normal opacity-70">(Director)</span></h3>
                    <p className="text-2xl text-muted-foreground leading-relaxed">
                      Business administration professional with focus on finance, statistics & AI. Manages operations and financial efficiency.
                    </p>
                  </div>
                </div>
              </section>

            {/* Core Content */}
            <section className="max-w-4xl">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                We believe nature holds powerful solutions — and through science, engineering, and innovation, we are learning to harness them responsibly.
              </p>
              <div className="mt-16 h-px w-full bg-border/50" />
            </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurStory;