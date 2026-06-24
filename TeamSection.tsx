import { useState, useEffect } from "react";
import { GalleryItem } from "../types";
import { ZoomIn, X, ChevronLeft, ChevronRight, Eye, Grid3X3, Layers } from "lucide-react";

interface GallerySectionProps {
  items: GalleryItem[];
}

const CATEGORIES = [
  "All Projects",
  "Jewelry Retouching",
  "Background Removal",
  "Diamond Enhancement",
  "Product Editing",
  "Color Correction",
  "Luxury Retouching"
];

export default function GallerySection({ items }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  // Filter items based on selected category
  const filteredItems = selectedCategory === "All Projects"
    ? items
    : items.filter(item => item.category === selectedCategory);

  useEffect(() => {
    if (lightboxIndex !== null) {
      const el = document.getElementById("gallery-lightbox");
      if (el) {
        el.focus();
      }
    }
  }, [lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomedIn(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomedIn(false);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    setIsZoomedIn(false);
    let newIndex = direction === "prev" ? lightboxIndex - 1 : lightboxIndex + 1;
    if (newIndex < 0) newIndex = filteredItems.length - 1;
    if (newIndex >= filteredItems.length) newIndex = 0;
    setLightboxIndex(newIndex);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.02] rounded-full blur-[120px] -mr-30 -mt-30 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="gallery-header">
          <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            The Exhibition
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-white mb-4">
            Luxury <span className="italic font-serif text-[#D4AF37]">Portfolio</span> Gallery
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Delve into our curated gallery of fine jewelry editing. Click on any piece to open the high-fidelity magnifier lightbox and inspect our microscopic diamond polishing and setting alignments.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" id="gallery-category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-none font-sans text-[11px] uppercase tracking-widest transition-all duration-300 border ${
                cat === selectedCategory
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                  : "bg-[#080808] text-gray-400 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-md max-w-xl mx-auto">
            <Layers className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 font-sans text-sm">No portfolio items loaded under this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative bg-[#080808] border border-white/10 rounded-none overflow-hidden cursor-pointer hover:border-[#D4AF37]/40 transition-all duration-300 shadow-xl"
                id={`gallery-item-${item.id}`}
              >
                {/* Image Wrapper */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#121212] flex items-center justify-center p-6">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <div className="p-3 rounded-none bg-white/10 border border-white/20 hover:bg-[#D4AF37] hover:text-black transition-all">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-5 border-t border-white/10 bg-[#080808] relative">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-[#D4AF37] block mb-1 font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-display text-sm font-semibold text-white truncate group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-sans text-[11px] text-gray-500 mt-1.5 truncate font-light">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Stats Info Ribbon */}
        <div className="mt-16 text-center border-t border-white/5 pt-10 flex flex-wrap justify-center gap-10 text-xs text-gray-500 font-sans" id="gallery-ribbon">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-[#d4af37]" />
            <span>Showing <strong>{filteredItems.length}</strong> Curated Masterpieces</span>
          </div>
          <span className="hidden sm:inline-block">|</span>
          <div>
            <span>Bulk Order Capacity: <strong>5,000+ images per week</strong></span>
          </div>
          <span className="hidden sm:inline-block">|</span>
          <div>
            <span>Formats Supplied: <strong>Layered TIF, Transparent PNG, High-Res JPG</strong></span>
          </div>
        </div>

        {/* Premium Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between items-center p-4"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") navigateLightbox("prev");
              if (e.key === "ArrowRight") navigateLightbox("next");
              if (e.key === "Escape") closeLightbox();
            }}
            tabIndex={0}
            id="gallery-lightbox"
          >
            {/* Top Bar inside Lightbox */}
            <div className="w-full max-w-7xl flex items-center justify-between py-4 border-b border-white/10">
              <div className="flex flex-col text-left">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#d4af37]">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="font-display text-sm sm:text-base font-semibold text-white mt-0.5">
                  {filteredItems[lightboxIndex].title}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomedIn(!isZoomedIn)}
                  className="px-3 py-1.5 border border-white/10 hover:border-[#d4af37]/40 bg-white/5 hover:text-[#d4af37] text-white rounded font-sans text-xs uppercase tracking-wider transition-all"
                >
                  {isZoomedIn ? "Fit Screen" : "Zoom 100%"}
                </button>
                
                <button
                  onClick={closeLightbox}
                  className="p-2 border border-white/10 bg-white/5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  title="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Stage (With Navigation Arrows) */}
            <div className="w-full flex-1 flex items-center justify-between gap-4 max-w-7xl my-4 relative">
              {/* Left Arrow Button */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="p-3 border border-white/5 bg-black/50 hover:bg-[#d4af37] text-gray-400 hover:text-black rounded-full transition-all shrink-0 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image Viewport */}
              <div className="flex-1 h-full flex items-center justify-center overflow-hidden p-2 relative bg-[#080808] border border-white/5 rounded-lg">
                <div className={`w-full h-full flex items-center justify-center transition-all ${isZoomedIn ? "scale-150 cursor-zoom-out" : "scale-100"}`} onClick={() => setIsZoomedIn(!isZoomedIn)}>
                  <img
                    src={filteredItems[lightboxIndex].imageUrl}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => navigateLightbox("next")}
                className="p-3 border border-white/5 bg-black/50 hover:bg-[#d4af37] text-gray-400 hover:text-black rounded-full transition-all shrink-0 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer Navigation and Metadata */}
            <div className="w-full max-w-7xl border-t border-white/10 py-4 flex items-center justify-between text-xs text-gray-500 font-sans">
              <span>
                Exhibition {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <span className="italic font-light">
                {filteredItems[lightboxIndex].description || "Double-click image or use Zoom button for magnification view."}
              </span>
              <span>
                Jewelry Perfection • Dhaka
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
