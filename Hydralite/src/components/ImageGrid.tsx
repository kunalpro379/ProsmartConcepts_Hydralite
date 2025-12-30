// src/components/ImageGrid.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Asset {
  path: string;
  type?: "image" | "video";
}

interface ImageGridProps {
  assets?: Asset[];
  className?: string;
}

export default function ImageGrid({ assets = defaultAssets, className }: ImageGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (assets.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % assets.length);
    }, 5000); // Change every 5 seconds for a smoother experience

    return () => clearInterval(interval);
  }, [assets]);

  const currentAsset = assets[currentIndex];

  return (
    <div className={className || "relative w-full aspect-square md:aspect-auto md:h-[400px] flex items-center justify-center overflow-hidden rounded-3xl bg-muted/5 border shadow-inner"}>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotateY: 45, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, rotateY: -45, scale: 0.9, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.7, 
            ease: [0.4, 0, 0.2, 1]
          }}
            className="w-full h-full flex items-center justify-center p-2 md:p-8"
        >
          {currentAsset.type === "video" || currentAsset.path.endsWith(".mp4") || currentAsset.path.endsWith(".webm") ? (
            <video
              src={currentAsset.path}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={currentAsset.path}
              alt={`Asset ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicators */}
      {assets.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {assets.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
