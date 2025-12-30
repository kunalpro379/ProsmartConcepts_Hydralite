import { useState } from "react";
import { Activity, Battery, Bell, Lightbulb, Shield, Zap } from "lucide-react";
import { ImageViewer } from "@/components/ImageViewer";

const iconMap = {
  Hospital: Shield,
  Lightbulb: Lightbulb,
  Bell: Bell,
  Shield: Shield,
  Activity: Activity,
  Zap: Zap,
  Battery: Battery,
  Utensils: Battery,
};

const features = [
  {
    id: 1,
    title: "ADVANCING HOSPITAL CARE WITH REFRESH BEDSKIN",
    description: "Refresh Bedskin is a new-age multilayer disposable hospital bed fabric designed to improve patient hygiene and comfort. It is water-absorbent yet waterproof, breathable, and has a cotton-soft feel. The fabric is anti-microbial, disposable, and eliminates the need for laundry, helping reduce hospital-acquired infections.",
    link: "LEARN MORE",
    image: "/hydralite/1.png",
    cardTitle: "Refresh Bedskin",
    cardDescription: "New-age hospital fabric replacing traditional linen for safer patient care.",
    cardLink: "EXPLORE",
    icon: "Hospital",
    cardFeatures: [
      { title: "Water Absorbent", description: "Quickly absorbs fluids to keep patients dry and comfortable." },
      { title: "Waterproof Layer", description: "Prevents leakage and protects hospital bedding." },
      { title: "Breathable Fabric", description: "Ensures airflow for long-term patient comfort." },
      { title: "Disposable Use", description: "Eliminates laundry, reducing infection risk." },
      { title: "Anti-Microbial", description: "Helps reduce hospital-acquired infections." }
    ]
  },
  {
    id: 2,
    title: "WATER-POWERED LED EMERGENCY LAMP & BATTERIES",
    description: "An eco-friendly lighting solution powered only by water (saltwater)—no electricity, batteries, or solar panels required. It can provide up to 120 hours of continuous light, making it ideal for rural areas, emergencies, outdoor use, and disaster relief.",
    link: "LEARN MORE",
    image: "/hydralite/2.jpg",
    cardTitle: "Water-Powered LED Emergency Lamp & Batteries",
    cardDescription: "Reliable lighting and power using water-based energy.",
    cardLink: "EXPLORE",
    icon: "Zap",
    cardFeatures: [
      { title: "Water Powered", description: "No batteries or solar panels required." },
      { title: "Long Runtime", description: "Provides up to 120 hours of light." },
      { title: "Emergency Ready", description: "Ideal for disasters and power cuts." },
      { title: "Rural Focused", description: "Designed for off-grid regions." },
      { title: "Eco-Friendly", description: "Reduces energy dependence and supports sustainable living." }
    ]
  },
  {
    id: 3,
    title: "AMBIENT DISINFECTION LIGHTING (APP CONTROLLED)",
    description: "Ambient Disinfection Lighting uses special visible light (non-UV) to kill bacteria, viruses, fungi, and mold in indoor spaces. It continuously sanitizes rooms such as hospitals, clinics, homes, and offices without harsh chemicals. The system is app-controlled and works over time to create safer, cleaner environments.",
    link: "LEARN MORE",
    image: "/hydralite/3.png",
    cardTitle: "Ambient Disinfection Lighting",
    cardDescription: "Continuous antimicrobial protection using visible light.",
    cardLink: "EXPLORE",
    icon: "Lightbulb",
    cardFeatures: [
      { title: "Visible Light Tech", description: "Non-UV light kills bacteria, fungi, and viruses safely." },
      { title: "Chemical-Free", description: "No harsh disinfectants or UV exposure." },
      { title: "Hospital Ready", description: "Ideal for clinics, wards, ICUs, homes, and offices." },
      { title: "Continuous Protection", description: "Works over time to inhibit microbial growth." },
      { title: "App Controlled", description: "Smart control for modern healthcare environments." }
    ]
  },
  {
    id: 4,
    title: "I.V. ALERT ALARM - LIFE-SAVING MONITORING",
    description: "The I.V. Alert Alarm is a life-saving hospital device that continuously monitors saline levels. It alerts medical staff when IV fluid drops below critical levels, preventing air entry and medical emergencies. This allows nurses and doctors to focus on other tasks while ensuring patient safety.",
    link: "LEARN MORE",
    image: "/hydralite/4.png",
    cardTitle: "I.V. Alert Alarm",
    cardDescription: "Automated saline monitoring to prevent medical emergencies.",
    cardLink: "EXPLORE",
    icon: "Bell",
    cardFeatures: [
      { title: "Real-Time Alerts", description: "Instant notification when saline runs low." },
      { title: "Easy Attachment", description: "Seamlessly fits on standard IV bottles." },
      { title: "Improved Staff Efficiency", description: "Reduces manual checking workload." },
      { title: "Emergency Prevention", description: "Prevents air entry and medical emergencies." },
      { title: "Patient Safety", description: "Ensures continuous IV monitoring and reduces hospital stays." }
    ]
  },
  {
    id: 5,
    title: "MOTHER-INFANT ANTI-THEFT DEVICE",
    description: "This device is designed to prevent infant theft and accidental baby mismatching in hospitals. It provides real-time security for newborns, offering peace of mind to mothers and families. The system ensures infants are securely tracked within healthcare facilities.",
    link: "LEARN MORE",
    image: "/hydralite/5.png",
    cardTitle: "Mother–Infant Anti-Theft Device",
    cardDescription: "Advanced alert system ensuring infant safety.",
    cardLink: "EXPLORE",
    icon: "Shield",
    cardFeatures: [
      { title: "Infant Security", description: "Prevents theft and mismatching of newborns." },
      { title: "Instant Alerts", description: "Triggers alarms during unauthorized movement." },
      { title: "Hospital Integrated", description: "Designed for maternity and neonatal wards." },
      { title: "Parent Peace of Mind", description: "Reassures families about infant safety." },
      { title: "Real-Time Tracking", description: "Ensures infants are securely tracked within facilities." }
    ]
  },
  {
    id: 6,
    title: "MUSCLE HAND DYNAMOMETER (APP CONTROLLED)",
    description: "The Muscle Hand Dynamometer is a smart grip-strength measurement and rehabilitation device. It is used to measure and rehabilitate muscle strength, especially for patients recovering from injuries, arthritis, nerve issues, or post-surgery. The device is app-controlled, making it suitable for home therapy.",
    link: "LEARN MORE",
    image: "/hydralite/6.png",
    cardTitle: "Muscle Hand Dynamometer",
    cardDescription: "Accurate muscle strength analysis for rehabilitation.",
    cardLink: "EXPLORE",
    icon: "Activity",
    cardFeatures: [
      { title: "Strength Measurement", description: "Accurately measures grip and muscle force." },
      { title: "Rehabilitation Support", description: "Helps track recovery progress." },
      { title: "App Controlled", description: "Digital data tracking and insights." },
      { title: "Home Therapy", description: "Suitable for home therapy and virtual physiotherapy." },
      { title: "Post-Surgery Recovery", description: "Ideal for injuries, arthritis, nerve issues recovery." }
    ]
  },
  {
    id: 7,
    title: "SELF-HEATING FOOD HEATING BOXES",
    description: "Self-Heating Food Boxes are designed to instantly heat food without external electricity. They help maintain food hygiene and are extremely useful for travel, hospitals, outdoor use, and emergency situations. This solution ensures safe, warm meals anytime, anywhere.",
    link: "LEARN MORE",
    image: "/hydralite/7.png",
    cardTitle: "Self-Heating Food Heating Boxes",
    cardDescription: "Instant food heating without external power.",
    cardLink: "EXPLORE",
    icon: "Utensils",
    cardFeatures: [
      { title: "No Electricity Needed", description: "Heats food instantly without power." },
      { title: "Hygienic Heating", description: "Keeps food safe and contamination-free." },
      { title: "Portable Use", description: "Ideal for travel, hospitals, and outdoors." },
      { title: "Emergency Ready", description: "Perfect for emergency situations." },
      { title: "Safe & Warm Meals", description: "Ensures warm meals anytime, anywhere." }
    ]
  }
];

// const ProductInfo = () => {
//   return (
//     <section className="relative bg-secondary">
//       <div>
//         {features.map((feature, index) => {
//           const isEven = index % 2 === 0;

//           return (
//             <div key={feature.id} className="mx-auto w-full min-h-screen flex items-center">
//               {isEven ? (
//                 // Even Layout: Heading full width, then Description + Features | Image
//                 <div className="w-full space-y-4 px-6 md:px-12 lg:px-20 py-8">
//                   {/* Full Width Heading */}
//                   <h2 className="text-4xl uppercase leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
//                     {feature.title}
//                   </h2>

//                   {/* Three Column Layout */}
//                   <div className="grid gap-4 lg:grid-cols-12">
//                     {/* Description */}
//                     <div className="lg:col-span-4 rounded-lg border border-border bg-card p-6">
//                       <h3 className="mb-3 text-xl text-foreground">Description</h3>
//                       <p className="text-sm text-muted-foreground leading-relaxed">
//                         {feature.description}
//                       </p>
//                     </div>

//                     {/* Features */}
//                     <div className="lg:col-span-4 rounded-lg border border-border bg-card p-6">
//                       <div className="mb-4 flex items-center justify-between">
//                         <h3 className="text-xl text-foreground">Features</h3>
//                         {React.createElement(iconMap[feature.icon], { className: "h-8 w-8 text-muted-foreground" })}
//                       </div>
//                       <div className="space-y-4">
//                         {feature.cardFeatures.slice(0, 3).map((feat, idx) => (
//                           <div key={idx}>
//                             <div className="text-foreground font-medium text-base mb-1">{feat.title}</div>
//                             <div className="text-muted-foreground text-xs leading-relaxed">{feat.description}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Image */}
//                     <div className="lg:col-span-4">
//                       <div className="h-full overflow-hidden rounded-lg border border-border shadow-xl">
//                         <img
//                           src={feature.image}
//                           alt={feature.cardTitle}
//                           className="h-full w-full object-cover min-h-[400px]"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Divider */}
//                   <div className="h-px bg-border"></div>
//                 </div>
//               ) : (
//                 // Odd Layout: Image | Description + Features stacked
//                 <div className="w-full space-y-4 px-6 md:px-12 lg:px-20 py-8">
//                   {/* Heading */}
//                   <h2 className="text-4xl uppercase leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
//                     {feature.title}
//                   </h2>
//                   <div className="grid gap-4 lg:grid-cols-2">
//                     {/* Image */}
//                     <div className="flex items-stretch">
//                       <div className="w-full overflow-hidden rounded-lg border border-border shadow-xl">
//                         <img
//                           src={feature.image}
//                           alt={feature.cardTitle}
//                           className="h-full w-full object-cover min-h-[500px]"
//                         />
//                       </div>
//                     </div>

//                     {/* Description and Features Stacked */}
//                     <div className="space-y-4">
//                       {/* Description */}
//                       <div className="rounded-lg border border-border bg-card p-6">
//                         <h3 className="text-xl text-foreground mb-4">Description</h3>
//                         <p className="text-sm text-muted-foreground leading-relaxed">
//                           {feature.description}
//                         </p>
//                       </div>

//                       {/* Features */}
//                       <div className="rounded-lg border border-border bg-card p-6">
//                         <div className="mb-4 flex items-center justify-between">
//                           <h3 className="text-xl text-foreground">Features</h3>
//                           {React.createElement(iconMap[feature.icon], { className: "h-8 w-8 text-muted-foreground" })}
//                         </div>
//                         <div className="space-y-4">
//                           {feature.cardFeatures.slice(0, 4).map((feat, idx) => (
//                             <div key={idx}>
//                               <div className="text-foreground font-medium text-base mb-1">{feat.title}</div>
//                               <div className="text-muted-foreground text-xs leading-relaxed">{feat.description}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };
const ProductInfo = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  return (
    <section className="relative bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <ImageViewer 
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={selectedImage ? [selectedImage] : []}
          title={selectedTitle}
        />
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          const IconComponent = iconMap[feature.icon];

          return (
            <div key={feature.id} className="mb-16 md:mb-24 last:mb-0" id={`product-${feature.id}`}>
              {/* Product Title */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight max-w-4xl mx-auto flex items-center justify-center gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <span className="md:hidden">
                    {feature.cardTitle}
                  </span>
                  <span className="hidden md:block">
                    {feature.title}
                  </span>
                </h2>
              </div>

              {/* Dynamic Content-Based Layout */}
                <div className={`flex flex-col lg:flex-row gap-6 lg:items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Left Column - Dynamic Cards */}
                  <div className="flex-1 flex flex-col gap-6">
                    {/* Hero description */}
                    <div className="bg-card/20 backdrop-blur-sm border border-border/60 rounded-xl p-5 md:p-6 shadow-sm">
                      <p className="italic text-sm md:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Features Card */}
                    <div className="flex-1 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl hover:bg-card hover:border-border transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" aria-hidden="true"></div>
                        <h3 className="text-base md:text-lg text-foreground">
                          Key Features
                        </h3>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">At a glance</span>
                    </div>
                    <div className="grid gap-3 md:gap-4">
                      {feature.cardFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/60 p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary text-xs">
                              {idx + 1}
                            </div>
                              <div className="space-y-1">
                                <div className="text-base md:text-base text-foreground font-normal leading-tight">
                                  {feat.title}
                                </div>
                                <div className="text-sm md:text-sm text-muted-foreground leading-relaxed">
                                  {feat.description}
                                </div>
                              </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                  {/* Right Column - Image Card with Standardized Size */}
                  <div 
                    className="flex-1 cursor-zoom-in group"
                    onClick={() => {
                      setSelectedImage(feature.image);
                      setSelectedTitle(feature.cardTitle);
                      setLightboxOpen(true);
                    }}
                  >
                    <div className="rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="border aspect-square w-full bg-gradient-to-br from-muted/10 to-muted/30 flex items-center justify-center p-6">
                        <img
                          src={feature.image}
                          alt={feature.cardTitle}
                          className="w-full h-full object-contain max-w-full max-h-full drop-shadow-xl"
                        />
                      </div>
                    </div>
                  </div>
              </div>

              {/* Divider */}
              {index < features.length - 1 && (
                <div className="mt-16 md:mt-24 flex items-center justify-center">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  <div className="w-2 h-2 bg-primary/30 rounded-full mx-4"></div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default ProductInfo;