import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";

type DealProduct = {
  product_id: string;
  product_name: string;
  product_title: string;
  product_description: string;
  product_price: string | null;
  image_urls?: string[];
  rating?: number;
  category_id?: string;
};

type DealCategory = {
  category_name: string;
  category_id: string;
  products: DealProduct[];
};

const COUNTDOWN_SECONDS = 12 * 60 * 60 + 45 * 60 + 32; // 12:45:32 in seconds

const BestDeals = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<number>(COUNTDOWN_SECONDS);

  // Hardcoded deals data
  const categories: DealCategory[] = [
    {
      "category_name": "Healthcare Essentials",
      "category_id": "HltaaL2",
      "products": [
        {
          "product_id": "HltaaL2/daootnm2/oORre0034",
          "product_name": "Camry EH101 Electronic Hand Dynamometer",
          "product_title": "Camry EH101 Electronic Hand Dynamometer Grip Strength Meter",
          "product_description": "A digital hand dynamometer with a high-precision strain gauge sensor, adjustable handle, and 8 memory profiles. Measures grip strength up to 90 kg with an LCD display showing strength levels and progress tracking.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078442/oORre0034_img1.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078442/oORre0034_img2.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078444/oORre0034_img3.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/daootnm2/Akitc3193",
          "product_name": "Diabetes Risk Calculator",
          "product_title": "Digital Diabetic Risk Assessment Calculator",
          "product_description": "A digital tool to assess personal diabetes risk using preset measurement parameters. Includes full alphanumeric keypad and large LCD display labelled for diabetic risk, glucose level, and glucose conversion.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078457/Akitc3193_img1.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/daootnm2/ceiap6387",
          "product_name": "Venusia USB Digital Microscope",
          "product_title": "Venusia USB Handheld Digital Microscope 50X–1000X",
          "product_description": "A USB handheld microscope with 8 built-in LED lights and 50X–1000X magnification. Used for inspecting skin, circuits, coins, and micro-objects.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078861/ceiap6387_img1.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/daootnm2/rATus0938",
          "product_name": "ProSmart's Bluetooth SmartWatch",
          "product_title": "SmartSlide Touchscreen Bluetooth SmartWatch",
          "product_description": "A multifunction Bluetooth smartwatch with touchscreen display and daily-use smart features.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078868/rATus0938_img1.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/daootnm2/ahrns7833",
          "product_name": "Fitness Band – Personal Fitness & Health Tracker",
          "product_title": "Fitness Band – Personal Fitness & Health Tracker",
          "product_description": "Fitness tracker to monitor steps, distance and calories.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766078870/ahrns7833_img1.jpg"
          ],
          "product_price": null
        }
      ]
    },
    {
      "category_name": "Personal Care",
      "category_id": "cat_002",
      "products": [
        {
          "product_id": "HltaaL2/upqTiim0/deLgI8603",
          "product_name": "LED Acrylic Message Board",
          "product_title": "LED Dry-Erase Acrylic Glow Message Board",
          "product_description": "A transparent acrylic light-up memo board used for reminders and decorative lighting.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079376/deLgI8603_img1.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079378/deLgI8603_img2.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/upqTiim0/erdfy1211",
          "product_name": "Hydralite Essential Oil Diffuser Base",
          "product_title": "Hydralite Essential Oil Diffuser Base with Acrylic Plate Slot",
          "product_description": "A USB-powered essential oil diffuser base using dry-air diffusion to disperse fragrance.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079388/erdfy1211_img1.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079390/erdfy1211_img2.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/upqTiim0/BxAmi9923",
          "product_name": "Satianu Aromatherapy Box",
          "product_title": "Satianu Essential Oils & Aromatherapy Set",
          "product_description": "A wellness-oriented aromatherapy product box from Satianu, offering natural essential oils and blends.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079399/BxAmi9923_img1.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079402/BxAmi9923_img2.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/upqTiim0/iEvUS4160",
          "product_name": "Sunscreen UV Mirror with Camera",
          "product_title": "Portable UV Camera Compact Mirror for Sunscreen Coverage Check",
          "product_description": "A compact mirror with built-in UV camera for checking sunscreen coverage.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079428/iEvUS4160_img1.jpg"
          ],
          "product_price": null
        }
      ]
    },
    {
      "category_name": "Smart Home",
      "category_id": "raoESM4",
      "products": [
        {
          "product_id": "raoESM4/RVOeMse0/WLTkX1128",
          "product_name": "Advance Portable Bladeless Fan",
          "product_title": "ZERQ 9 Advanced Bladeless Aesthetic Fan – Rechargeable Portable Leafless Fan",
          "product_description": "The ZERQ 9 Advanced Bladeless Aesthetic Fan is a cutting-edge cooling solution that combines safety, portability, and modern design.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766554806/ProsmartProducts/Smart_Home/Home_Comfort_Devices/WLTkX1128/WLTkX1128_img5.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766554805/ProsmartProducts/Smart_Home/Home_Comfort_Devices/WLTkX1128/WLTkX1128_img4.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "raoESM4/IlUrNCO3/sidew3769",
          "product_name": "Vintage Style Antique Brass Fish Shaped Lock with 2 Keys",
          "product_title": "Handcrafted Antique Brass Fish-Shaped Padlock with 2 Keys",
          "product_description": "A traditional handcrafted brass fish-shaped padlock made using Indian sand-casting techniques. Functional and decorative, includes 2 keys and a unique trick-lock opening mechanism.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079769/sidew3769_img2.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "raoESM4/IlUrNCO3/WoPre3906",
          "product_name": "Water-Powered Analog Clock",
          "product_title": "Water-Powered Analog Clock by Emax Traders",
          "product_description": "A small water-powered analog clock utilizing clepsydra-like technology.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079773/WoPre3906_img1.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079775/WoPre3906_img2.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "raoESM4/SLIouhI5/oEIeC8339",
          "product_name": "Scented LED Wax Candle – Rose Cube",
          "product_title": "Rose Cube Scented LED Wax Candle",
          "product_description": "A beautifully designed rose-textured LED candle made from real wax and infused with fragrance.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079788/eUeEc2881_img1.jpg"
          ],
          "product_price": null
        }
      ]
    },
    {
      "category_name": "Gadgets & Accessories",
      "category_id": "isSseE1",
      "products": [
        {
          "product_id": "isSseE1/iOcccsL3/UeElC2430",
          "product_name": "Magnetic Plaster – Premium/Value/Large Pack",
          "product_title": "Premium Magnetic Plaster Pack for Pain Reduction",
          "product_description": "A premium version of magnetic pain-relief plasters designed for long-lasting therapeutic effect.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079798/UeElC2430_img1.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "isSseE1/gstoRlE6/ShsaS0535",
          "product_name": "Pashtush Shawl",
          "product_title": "Pashtush Premium Wool Shawl / Stole",
          "product_description": "A premium Pashtush wool shawl known for its rich texture and traditional Indian craftsmanship.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079800/ShsaS0535_img1.jpg",
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079809/ShsaS0535_img2.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "isSseE1/AcseCco7/Bbpod2579",
          "product_name": "BedBoost Support",
          "product_title": "BedBoost Custom Mattress Support System",
          "product_description": "An inflatable mattress support that restores sagging beds and improves sleep comfort.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079811/Bbpod2579_img1.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/upqTiim0/duEnh9105",
          "product_name": "ProSmart Headphones",
          "product_title": "High Quality Studio-Grade Personal Headphones",
          "product_description": "Premium studio-grade headphones for mobile phones, digital players, and high-quality audio listening.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079435/duEnh9105_img1.jpg"
          ],
          "product_price": null
        },
        {
          "product_id": "HltaaL2/upqTiim0/OstOE7212",
          "product_name": "Retro Wooden Speaker System",
          "product_title": "Vintage Style Wooden Portable Speaker",
          "product_description": "A retro-themed portable speaker system with classic wooden finish, built-in radio, alarm clock and SD/USB playback support.",
          "image_urls": [
            "https://res.cloudinary.com/dstmt1w5p/image/upload/v1766079439/OstOE7212_img1.jpg"
          ],
          "product_price": null
        }
      ]
    }
  ];

  // Countdown that restarts when it reaches zero
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return COUNTDOWN_SECONDS;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTimer = useMemo(() => {
    const hrs = Math.floor(secondsLeft / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((secondsLeft % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(secondsLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }, [secondsLeft]);

  const categoryTabs = useMemo(() => categories.map((c) => c.category_name), []);

  // Set default active category when component mounts
  useEffect(() => {
    if (!activeCategory && categoryTabs.length > 0) {
      setActiveCategory(categoryTabs[0]);
    }
  }, [activeCategory]);

  const productsToShow = useMemo<DealProduct[]>(() => {
    if (!categories.length) {
      console.log("No categories available");
      return [];
    }

    const current = categories.find((c) => c.category_name === activeCategory);
    console.log("Active category:", activeCategory);
    console.log("Found category:", current);
    console.log("Products to show:", current ? current.products : []);
    return current ? current.products : [];
  }, [activeCategory]);

  return (
    <section className="relative z-20 py-12 sm:py-12 lg:py-15 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-gray-900">
              Best Deals <span className="text-cyan-500">For You</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              Deals ends in:{" "}
              <span className="text-orange-500 font-bold">{formattedTimer}</span>
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categoryTabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <Link 
            to="/products"
            className="hidden lg:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12">
          {productsToShow.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading products... or no products available</p>
              <p className="text-sm text-gray-400">Categories: {categories.length}, Active: {activeCategory}</p>
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-4 pb-4">
              {productsToShow.map((product, index) => (
                <Link
                  key={product.product_id}
                  to={`/${product.product_id}`}
                  className="group bg-white border border-black rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-xl transition-all duration-300 flex-shrink-0 w-40 sm:w-48 md:w-56"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image Container */}
                  <div className="relative bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 aspect-square flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image_urls?.[0] ?? "/placeholder.png"}
                      alt={product.product_name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[9px] sm:text-[10px] font-medium text-gray-600">{product.rating ?? 4.8}</span>
                  </div>
                  
                  {/* Product Info */}
                  <h3 className="font-semibold text-[15px] sm:text-xs text-gray-900 line-clamp-2 mb-0.5">
                    {product.product_name}
                  </h3>
                  <p className="text-[9px] sm:text-[12px] text-gray-500 mb-1.5 line-clamp-2">
                    {product.product_title}
                  </p>
                  
                  {/* Price
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-cyan-500">
                      {product.product_price ?? "Price on request"}
                    </span>
                  </div> */}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
