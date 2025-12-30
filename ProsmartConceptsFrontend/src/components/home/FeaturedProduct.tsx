import { Link } from "react-router-dom";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const FeaturedProduct = () => {
  return (
    <section className="relative z-20 py-8 sm:py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Featured Product */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Left - Main Product */}
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden group min-h-[320px] sm:min-h-[400px]">
            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-2 block">Our Best deals</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
            5-in-1 Derma <br />Roller Kit
            </h2>
            <p className="text-xs sm:text-sm text-gray-900 mb-3 sm:mb-6 max-w-xs">
            Microneedling Kit with Titanium Heads
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 max-w-xs">
            A 5-in-1 derma roller kit with multiple interchangeable microneedle heads made of titanium. Helps improve collagen production, reduce wrinkles, acne scars, and stretch marks.
            </p>
            <Link 
              to="/Erolna6/eakNsIc2/MriTr5524"
              className="inline-flex items-center gap-2 bg-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#0d3d0d] transition-colors group"
            >
              SHOP NOW
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Product Image */}
            <img 
              src="https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078902/MriTr5524_img1.jpg"
              alt="5-in-1 Derma Roller Kit"
              className="absolute bottom-0 right-0 w-24 sm:w-36 lg:w-48 object-contain group-hover:scale-105 transition-transform duration-500 border-b-2 border-r-2 border-gray-200 rounded-br-2xl"
            />
          </div>
          
          {/* Right - Promo Cards */}
          <div className="grid grid-rows-2 gap-4 sm:gap-6">
            {/* Summer Sale Card */}
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden group min-h-[180px] sm:min-h-[200px]">
              <span className="text-[9px] sm:text-[10px] bg-purple-500 text-white px-2 py-0.5 sm:py-1 rounded-full font-bold mb-2 inline-block">SUMMER SALES</span>
              <span className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[10px] sm:text-xs font-bold text-purple-600 bg-white px-2 py-0.5 sm:py-1 rounded-full">25% Off</span>
              <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 mt-2 pr-16">
              Neck Massagers
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-6 max-w-xs pr-16">
              Hydralite F2 Electric Cervical Vertebra Massager
              </p>
              <Link 
                to="/HltaaL2/upqTiim0/yiIre2021"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                SHOP NOW <ArrowRight className="w-3 h-3" />
              </Link>
              <img 
                src="https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670214/Massage__Therapy_Devices/Neck_Massagers/prod_0093/prod_0093_img1.jpg"
                alt="Neck Massager"
                className="absolute bottom-0 right-0 w-16 sm:w-20 lg:w-28 object-contain group-hover:scale-105 transition-transform duration-500 border-b-2 border-r-2 border-purple-200 rounded-br-2xl"
              />
            </div>
            
            {/* Product Card */}
            <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden group min-h-[180px] sm:min-h-[200px]">
            <span className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[10px] sm:text-xs font-bold text-purple-600 bg-white px-2 py-0.5 sm:py-1 rounded-full">25% Off</span>

              <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 pr-16">
              Lighting & Portable Lamps
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-6 max-w-xs pr-16">
              I.M.LAB Portable Smart Wireless LED Lamp
</p>
              <Link 
                to="/HltaaL2/upqTiim0/EtiWB3470"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                SHOP NOW <ArrowRight className="w-3 h-3" />
              </Link>
              <img 
                src="https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670202/Lighting__Portable_Lamps/Portable_LED_Lamps/prod_0096/prod_0096_img1.jpg"
                alt="Portable LED Lamp"
                className="absolute bottom-0 right-0 w-16 sm:w-20 lg:w-28 object-contain group-hover:scale-105 transition-transform duration-500 border-b-2 border-r-2 border-gray-300 rounded-br-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">FASTEST DELIVERY</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Delivery in 24hr</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">24 HOURS RETURN</p>
              <p className="text-[10px] sm:text-xs text-gray-500">100% money-back</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">SECURE PAYMENT</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Your money is safe</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">SUPPORT 24/7</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Live contact/message</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
