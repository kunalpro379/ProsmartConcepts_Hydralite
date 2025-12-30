import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Instagram, ShoppingBag, Store } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
              <img
                src="/prosmart_logo_lg.png"
                alt="ProSmart Concepts"
                className="h-10 w-auto"
              />
            </div>
              <span className="font-display font-bold text-xl text-background">
                Prosmart Concepts
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Mumbai-based corporation with 25+ years of experience in high-tech product development 
              for Medical, Disposable & Defense sectors.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/company/prosmartconcepts7/posts/?feedView=all" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.indiamart.com/prosmart-concepts-mumbai/profile.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="IndiaMART"
              >
                <Store className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/prosmartconcepts7/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.amazon.in/s?i=merchant-items&me=A3K6ZY5V7V8V9O" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Amazon Store"
              >
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-background/70 hover:text-primary transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Our Products</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Medical & Diagnostics" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Medical & Diagnostics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Healthcare Essentials" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Healthcare Essentials
                </Link>
              </li>
              <li>
                <Link to="/products?category=Personal Care" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/70 hover:text-primary transition-colors text-sm">
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919821310229" className="text-background/70 hover:text-primary transition-colors text-sm">
                  +91 9821310229
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@prosmartconcepts.com" className="text-background/70 hover:text-primary transition-colors text-sm">
                  info@prosmartconcepts.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2025 Prosmart Concepts. All rights reserved.
          </p>
          <p className="text-background/50 text-sm">
            MSME (Udyam) Registered | Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
