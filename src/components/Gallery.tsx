import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { GalleryItem } from "../types";

interface GalleryProps {
  galleryItems: GalleryItem[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [filter, setFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: "All", label: "All" },
    { key: "Interior", label: "Salon Interior" },
    { key: "Treatments", label: "Beauty Treatments" },
    { key: "Hair", label: "Hair Styling" },
    { key: "Makeup", label: "Makeup Sessions" },
    { key: "Bridal", label: "Bridal Makeovers" },
    { key: "Customers", label: "Happy Customers" }
  ];

  const filteredItems = filter === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const handleOpenLightbox = (index: number) => {
    // Find the actual item index in the filtered array
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-[#1E1E1E] text-[#F9F6F1] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#D4AF37] uppercase block font-semibold">
            THE GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
            Inside Our Luxury Studio
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B76E79] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Scroll through our premium studio captures. We maintain an immaculate, hygienic workspace of ultimate luxury.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-md font-serif text-[10px] tracking-widest uppercase border transition-all cursor-pointer ${
                filter === cat.key
                  ? "bg-[#D4AF37] text-[#111111] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-[#D4AF37]/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-serif">
            No gallery photos in this category yet.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                className="break-inside-avoid relative rounded-xl overflow-hidden border border-white/5 bg-white/5 shadow-md cursor-pointer group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => handleOpenLightbox(idx)}
              >
                {/* Photo */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <Maximize2 className="absolute top-4 right-4 w-4 h-4 text-[#D4AF37] translate-y-[-10px] group-hover:translate-y-0 transition-transform" />
                    <span className="font-mono text-[8px] tracking-widest uppercase text-[#B76E79]">{item.category}</span>
                    <h4 className="font-serif text-sm text-[#F9F6F1] truncate mt-1">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="gallery-lightbox"
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slider Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <div className="max-w-4xl max-h-[80vh] flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] rounded-xl object-contain border border-white/10 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Image Metadata Footer */}
              <div className="text-center space-y-1">
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2 py-0.5 border border-[#D4AF37]/20 rounded">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-lg tracking-wide text-white mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-[10px] text-gray-500 font-mono">
                  Image {lightboxIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
