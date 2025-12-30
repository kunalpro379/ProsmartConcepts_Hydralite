import { Link } from "react-router-dom";
import { Linkedin, Instagram, Target, Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="min-h-[600px] bg-background relative pb-8 md:pb-0">
      {/* Main Footer Content */}
      <div className="px-6 py-12 md:px-12 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Vision, Mission & Founders Section */}
            <div className="border-b border-border/50 pb-16 mb-16">
              <div className="grid gap-12 lg:grid-cols-2 mb-16">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" /> Our Vision
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                      To become India’s leader in sustainable consumer solutions by transforming everyday lives through eco-friendly innovations focused on health, energy, safety, and environmental responsibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-primary" /> Our Mission
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                      To continuously innovate and deliver critical, affordable, and sustainable products that enhance quality of life for mass consumers across India.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-lg font-bold uppercase tracking-widest text-foreground border-b border-border/50 pb-2">Founders</h3>
                  <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Atul Suresh Anand <span className="text-xs text-muted-foreground font-normal ml-1 opacity-70">(Director)</span></h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        30+ years in product development. Pioneer behind India’s first portable medical oxygen cylinder and water-powered LED lamps. Leads technical innovation at Hydralite.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Fizaa Anand <span className="text-xs text-muted-foreground font-normal ml-1 opacity-70">(Director)</span></h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Expert in digital & social media marketing. Heads branding, product presentation, and packaging.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Uttam Anand <span className="text-xs text-muted-foreground font-normal ml-1 opacity-70">(Director)</span></h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Business administration professional with focus on finance, statistics & AI. Manages operations and financial efficiency.
                      </p>
                    </div>
                  </div>
                </div>
            </div>

          <div className="grid gap-12 lg:grid-cols-12 mb-16">

            {/* Left - Brand Content */}
            <div className="lg:col-span-5">
  
              <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                We believe nature holds powerful solutions — and through science, engineering, and innovation, we are learning to harness them responsibly.
              </p>
              
              {/* Connect Section */}
              <div className="mb-8">
                <button className="bg-foreground px-8 py-4 text-sm font-semibold uppercase text-background transition-all hover:bg-foreground/90 active:scale-95 whitespace-nowrap mb-4">
                  CONNECT WITH US
                </button>
                    <p className="text-lg text-muted-foreground font-bold">
                      Contact: <a href="mailto:atul.anand@prosmart.in" className="hover:text-foreground transition-colors">atul.anand@prosmart.in</a> | <a href="tel:+919821310229" className="hover:text-foreground transition-colors">+91 9821310229</a>
                    </p>
                    <div className="mt-4 text-[10px] uppercase tracking-wider text-muted-foreground/80 leading-relaxed max-w-sm">
                      <p className="font-bold text-foreground/90">ProSmart Concepts</p>
                      <p>Unit No 25/26, Vaibhav Industrial Estate, PROSMART CONCEPTS,</p>
                      <p>Opposite ADONIS RAHEJA ACROPOLIS, Near Govandi Police Station Lane, Chembur</p>
                      <p>Postcode: 400088 | City/Parish: MUMBAI | Country: India</p>
                    </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/hydralite-nature-power-pvt-ltd/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Follow Hydralite on LinkedIn" 
                    className="w-10 h-10 flex items-center justify-center bg-foreground text-background hover:bg-foreground/80 transition-all rounded-sm"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/hydra_lite24x7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Follow Hydralite on Instagram" 
                    className="w-10 h-10 flex items-center justify-center bg-foreground text-background hover:bg-foreground/80 transition-all rounded-sm"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Navigation */}
            <div className="flex gap-16 lg:col-span-7 lg:justify-end">
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Company</h3>
                  <nav className="flex flex-col gap-3">
                      <Link to="/our-story" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Our Story</Link>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Technology</a>

                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sustainability</a>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Blog</a>
                </nav>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Support</h3>
                <nav className="flex flex-col gap-3">
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Shop</a>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Find a Dealer</a>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Track Order</a>
                </nav>
              </div>
            </div>
          </div>

          {/* Core Values Row */}
            <div className="mt-12 flex justify-center border-t border-border/50 py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
                Sustainability <span className="mx-3 opacity-30">•</span> Innovation <span className="mx-3 opacity-30">•</span> Affordability <span className="mx-3 opacity-30">•</span> Excellence
              </p>
            </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-8 md:px-12">
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-6">
              <div className="text-center">

              <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground uppercase tracking-widest">Privacy Policy</a>
                <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground uppercase tracking-widest">Terms & Conditions</a>
                <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground uppercase tracking-widest">Cookie Policy</a>
              </div>
              <p className="text-xs text-muted-foreground opacity-70">© 2025 Hydralite. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Large Brand Watermark */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none w-full overflow-hidden pl-4 md:pl-8" style={{ lineHeight: 0 }}>
        <h1 
          className="uppercase leading-none font-black select-none whitespace-nowrap bg-gradient-to-r from-foreground/10 via-foreground/6 to-transparent bg-clip-text text-transparent" 
          style={{ 
            fontSize: '16vw', 
            transform: 'scaleX(1.8)', 
            transformOrigin: 'left', 
            width: '100%', 
            marginBottom: 0, 
            lineHeight: 1, 
            paddingBottom: 0 
          }}
        >
          HYDRALITE
        </h1>
      </div>

      {/* Bottom black fade overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/5 to-transparent" />
    </footer>
  );
};

export default Footer;