import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, ChevronRight, ChevronLeft, Quote } from "lucide-react";
import customBridalImg from "../assets/images/bridal_makeover_1782365446243.jpg";

interface BridalLook {
  title: string;
  category: "Bridal" | "Reception" | "Engagement" | "Traditional" | "Modern";
  imageUrl: string;
  description: string;
  elements: string[];
}

export default function BridalShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const bridalLooks: BridalLook[] = [
    {
      title: "Royal Telugu Muhurtham Look",
      category: "Traditional",
      imageUrl: customBridalImg, // Our custom generated bridal masterpiece!
      description: "A timeless Muhurtham presentation featuring flawless HD waterproof base, precise traditional winged kohl eyes, deep crimson lips, and a beautifully draped red-gold Kanjeevaram silk saree with traditional heavy temple jewelry.",
      elements: ["Flawless Temple HD Base", "Winged Kohl Eyes", "Crimson Lips & Bold Bindi", "Fresh Jasmine Poo Jada Braids", "Jewelry Saree Mapping"]
    },
    {
      title: "Contemporary Evening Reception",
      category: "Reception",
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
      description: "A highly sophisticated modern reception makeover with soft, sultry brown smokey eyes, rose-gold highlighter sculpting, elegant dusty-rose matte lips, and a high-fashion sleek low-profile chignon bun.",
      elements: ["Sultry Smokey Eye", "Rose-Gold Sculpting", "Dusty-Rose Lip Shading", "Sleek Low Chignon", "Diamond Setting Prep"]
    },
    {
      title: "Pastel Elegance Engagement Look",
      category: "Engagement",
      imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
      description: "Soft, romantic glow-focused look designed for high-definition photography. Subtle champagne eyelids paired with a dewy peach lip tint, soft voluminous curls, and delicate floral hair vine accents.",
      elements: ["Champagne Eyelid Tint", "Dewy Peach Lip Glaze", "Voluminous Hair Curls", "Hydrated Skin Hydration", "Floral Vine Settings"]
    },
    {
      title: "North Indian Bridal Glitz",
      category: "Bridal",
      imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800",
      description: "A magnificent regal presentation with gold-bronzed double-cut-crease eyelids, dramatic false lashes, soft contouring, a classic dark velvet red lip, and customized heavy dupatta draping.",
      elements: ["Double-Cut-Crease Gold", "Dramatic Elite Lashes", "Chiseled Cheek Contours", "Velvet Red Lip Glaze", "Double Dupatta Draping"]
    },
    {
      title: "Sleek Minimalist Indowestern Look",
      category: "Modern",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
      description: "High-contrast minimalist glam for the contemporary modern bride. Glass skin effect with subtle nude lips, brushed eyebrows, bold cat-eyeliner, and an artistic sleek middle-parted architectural bun.",
      elements: ["Dewy Glass Skin Effect", "Brushed Brow Feathering", "Bold Graphic Cat-Eye", "Monochromatic Nude Lips", "Architectural Sleek Bun"]
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? bridalLooks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === bridalLooks.length - 1 ? 0 : prev + 1));
  };

  const activeLook = bridalLooks[activeIndex];

  return (
    <section
      id="bridal-showcase"
      className="py-24 bg-[#F9F6F1] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F9F6F1] transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#B76E79] uppercase block font-semibold">
            THE SHOWCASE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#4B224E] dark:text-[#F9F6F1]">
            Bridal Beauty Stories
          </h2>
          <div className="w-20 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-500 dark:text-gray-400 font-light mt-3 leading-relaxed">
            Every bride deserves a masterpiece. Browse through our premier bridal signatures designed to make you unforgettable.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto border border-[#D4AF37]/30 rounded-3xl bg-white dark:bg-black/30 p-6 md:p-10 shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Slide Image (Col 1-5) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 aspect-[3/4] shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={activeLook.imageUrl}
                    alt={activeLook.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Float Category Flag */}
                <div className="absolute top-4 left-4 z-20 bg-[#4B224E] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase shadow">
                  {activeLook.category} Look
                </div>
              </div>

              {/* Slider controls overlayed on mobile */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-gray-700 dark:text-white bg-black/5 dark:bg-white/5 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1.5">
                  {bridalLooks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${activeIndex === i ? "bg-[#4B224E] dark:bg-[#D4AF37] w-5" : "bg-gray-300 dark:bg-gray-600"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-gray-700 dark:text-white bg-black/5 dark:bg-white/5 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Metadata (Col 6-12) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79]">Exquisite Bridal Design</span>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeIndex}
                    className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#4B224E] dark:text-[#F9F6F1]"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    {activeLook.title}
                  </motion.h3>
                </AnimatePresence>
                <div className="w-12 h-[1px] bg-[#D4AF37] mt-3" />
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 font-light leading-relaxed italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  "{activeLook.description}"
                </motion.p>
              </AnimatePresence>

              {/* Look elements highlights */}
              <div className="space-y-3">
                <h4 className="font-serif text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold">Key Makeover Elements</h4>
                <div className="flex flex-wrap gap-2">
                  {activeLook.elements.map((el, i) => (
                    <motion.span
                      key={el}
                      className="px-2.5 py-1 bg-[#4B224E]/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] text-gray-600 dark:text-gray-300 rounded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      ✓ {el}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bridal Reservation Callout */}
              <div className="p-4 bg-[#B76E79]/5 rounded-xl border border-[#B76E79]/20 flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#B76E79] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-serif font-bold text-[#4B224E] dark:text-[#B76E79]">Book A Trial Session</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Contact our Senior Bridal Director today to book a trial vanity session. Pre-booking slots are highly limited.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
