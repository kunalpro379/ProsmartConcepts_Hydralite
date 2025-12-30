import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Download } from "lucide-react";
import { fetchProductById } from "@/services/api";

interface ImageViewerProps {}

const ImageViewer = () => {
  // Accept productIdimages param, extract productId
  const { productIdimages } = useParams();
  // Remove trailing 'images' to get productId
  const productId = productIdimages?.replace(/images$/, "");
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
    const location = useLocation();
    const state = location.state as { images?: string[]; productName?: string } | null;

    // Prefer using state passed from ProductDetail (works on Vercel without API)
    useEffect(() => {
      if (state?.images && state.images.length) {
        setImages(state.images);
        if (state.productName) setProductName(state.productName);
        setLoading(false);
      }
    }, [state]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // If no state or direct link, fetch product data via API as fallback
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (state?.images?.length) return; // already set from state
        if (!productId) return;
        const prod = await fetchProductById(productId);
        setImages(prod.image_urls || []);
        setProductName(prod.product_name || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, state]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.min(Math.max(prev + delta, 1), 5));
  };

  // Mouse drag/pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        goBack();
      } else if (e.key === "ArrowLeft") {
        previousImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [images.length, navigate]);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[selectedImageIndex];
    link.download = `${productName}-${selectedImageIndex + 1}.jpg`;
    link.click();
  };

  if (loading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>No images available</p>
          <button
            onClick={goBack}
            className="mt-4 px-6 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-white font-bold text-lg md:text-xl truncate">{productName}</h1>
            <p className="text-gray-300 text-sm">Image {selectedImageIndex + 1} of {images.length}</p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={downloadImage}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
            title="Download image"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.img
          ref={imageRef}
          src={images[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          }}
          key={selectedImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black flex items-center justify-center transition-colors shadow-md group border-none p-0"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
          >
            <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black flex items-center justify-center transition-colors shadow-md group border-none p-0"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
          >
            <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent px-6 py-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Zoom Controls */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
            <button
              onClick={() => setZoom((prev) => Math.max(prev - 0.2, 1))}
              className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-medium min-w-[50px] text-center text-sm">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((prev) => Math.min(prev + 0.2, 5))}
              className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Thumbnail Carousel */}
          {images.length > 1 && (
            <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-cyan-500 ring-2 ring-cyan-500/50"
                      : "border-gray-600 hover:border-gray-500 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="w-24" />
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="fixed bottom-6 right-6 text-xs text-gray-400 text-right pointer-events-none">
        <p>← → Arrow keys to navigate</p>
        <p>Scroll to zoom • Drag to pan</p>
        <p>ESC to close</p>
      </div>
    </div>
  );
};

export default ImageViewer;
