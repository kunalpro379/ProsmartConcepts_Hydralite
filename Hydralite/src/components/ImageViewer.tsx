import { useState, useEffect, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ImageViewer({ images, initialIndex = 0, isOpen, onClose, title }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);

  const constraintsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(100);
    }
  }, [isOpen, initialIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setZoom(100);
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setZoom(100);
  }, [images.length]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Handle scroll to zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return;
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) handleZoomIn();
        else handleZoomOut();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/95 border-none shadow-none flex flex-col items-center justify-center z-[100] outline-none">
        <VisuallyHidden>
          <DialogTitle>{title || "Image Viewer"}</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-start justify-between text-white z-[110] bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-start gap-5">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="pt-1">
              <h2 className="text-xl font-medium tracking-tight leading-none mb-1">{title}</h2>
              <p className="text-sm text-gray-400 font-normal">Image {currentIndex + 1} of {images.length}</p>
            </div>
          </div>
        </div>

        {/* Main Viewport */}
        <div
          ref={constraintsRef}
          className="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-default"
          onClick={onClose}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-6 w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white z-[110] transition-all active:scale-90 border border-white/10 backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white z-[110] transition-all active:scale-90 border border-white/10 backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={images[currentIndex]}
                  alt={`${title} - ${currentIndex + 1}`}
                  style={{
                    scale: zoom / 100,
                  }}
                  drag={zoom > 100}
                  dragConstraints={constraintsRef}
                  dragElastic={0.1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  className={`max-w-full max-h-[75vh] object-contain select-none shadow-2xl ${zoom > 100 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center gap-6 z-[110] bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-end gap-8 w-full justify-between">
            {/* Empty space for alignment */}
            <div className="flex-1 hidden md:block" />

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto max-w-[50%] scrollbar-hide p-1 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    setZoom(100);
                  }}
                  className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg ${idx === currentIndex
                    ? "border-white scale-110 ring-4 ring-white/10"
                    : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
                    }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Instructions */}
            <div className="flex-1 hidden md:block text-right">

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
