import { useState } from "react";
import { motion } from "motion/react";
import { Scissors, Sparkles, Footprints, ShieldCheck, Heart } from "lucide-react";
import customBridalImg from "../assets/images/bridal_makeover_1782365446243.jpg";
import hairColoringImg from "../assets/images/hair_coloring_luxury_1782367230822.jpg";

interface ServiceItem {
  name: string;
  category: "Hair" | "Skin" | "Grooming" | "Makeovers";
  description: string;
  imageUrl: string;
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<"All" | "Hair" | "Skin" | "Grooming" | "Makeovers">("All");

  const categories = [
    { id: "All", label: "All Services" },
    { id: "Hair", label: "Hair Artistry" },
    { id: "Skin", label: "Advanced Skincare" },
    { id: "Grooming", label: "Essential Grooming" },
    { id: "Makeovers", label: "Bespoke Makeovers" }
  ];

  const servicesData: ServiceItem[] = [
    // HAIR
    {
      name: "Hair Styling",
      category: "Hair",
      description: "Artistic luxury haircutting, blowouts, and elite curling styled by senior Vogue-trained stylists.",
      imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Hair Spa",
      category: "Hair",
      description: "Restorative deep-conditioning therapy using luxury lipids and oils to nourish locks and eliminate frizz.",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Hair Smoothening",
      category: "Hair",
      description: "Ultra-sleek rebonding and intense hydration wrapping that tames curls into premium liquid-silk strands.",
      imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Hair Coloring",
      category: "Hair",
      description: "Hand-painted global color, custom French balayage, and multi-dimensional highlights using safe vegan dyes.",
      imageUrl: hairColoringImg
    },
    {
      name: "Keratin Treatment",
      category: "Hair",
      description: "Elite Brazilian gold protein reconstructive therapy protecting hair shaft for long-lasting high gloss.",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
    },

    // SKIN
    {
      name: "Facials",
      category: "Skin",
      description: "Bespoke cellular facials restoring skin vitality, texture, and deep organic luminosity.",
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Hydra Facial",
      category: "Skin",
      description: "Multi-step intensive medical-grade exfoliation and antioxidant infusion for immediate dewy, glassy glow.",
      imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Skin Care",
      category: "Skin",
      description: "Personalized aesthetic consultation and organic peeling treatments targeting blemishes and spot reduction.",
      imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600"
    },

    // GROOMING
    {
      name: "Waxing",
      category: "Grooming",
      description: "Gentle organic honey and Italian Rica wax treatments for absolute satin-smooth, hairless skin protection.",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Threading",
      category: "Grooming",
      description: "High-precision expert organic brow mapping, upper lip, and full facial hair sculpting.",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Manicure",
      category: "Grooming",
      description: "Nourishing hand bath, cuticle care, custom scrub, and hand reflexology massage topped with premium gel glaze.",
      imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Pedicure",
      category: "Grooming",
      description: "Aromatic lavender foot soak, exfoliation, herbal clay mask wrap, and stress-relieving massage.",
      imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Nail Art",
      category: "Grooming",
      description: "Avant-garde 3D hand-painted designs, gold foil highlights, and chrome details tailored by certified nail artisans.",
      imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600"
    },

    // MAKEOVERS
    {
      name: "Bridal Makeup",
      category: "Makeovers",
      description: "Signature premium airbrush HD bridal makeovers customized with jewelry setting and South Indian saree pleating.",
      imageUrl: customBridalImg
    },
    {
      name: "Party Makeup",
      category: "Makeovers",
      description: "Glamorous party, engagement, and cocktail makeup looks designed to make you standout in any elite reception.",
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Pre-Bridal Packages",
      category: "Makeovers",
      description: "Curated 15 to 30 day holistic beauty regimes blending full body spa treatments, facials, and hair rejuvenation.",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const filteredServices = activeTab === "All"
    ? servicesData
    : servicesData.filter(s => s.category === activeTab);

  const triggerBooking = () => {
    const el = document.getElementById("booking-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="py-24 bg-[#F9F6F1] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F9F6F1] transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="font-serif text-xs tracking-[0.3em] text-[#B76E79] uppercase block font-semibold">
            THE ATELIER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#4B224E] dark:text-[#F9F6F1]">
            Our Premium Services
          </h2>
          <div className="w-20 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-500 dark:text-gray-400 font-light mt-3 leading-relaxed">
            Indulge in a curated collection of world-class hair, skin, and makeup services tailored to express your finest form of grace.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-serif text-[10px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#4B224E] text-white border-[#D4AF37] shadow-md shadow-[#4B224E]/20"
                  : "bg-white/40 dark:bg-black/10 border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-300 hover:border-[#D4AF37]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid with 3D and Hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.name}
              className="relative rounded-2xl overflow-hidden bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 shadow-md flex flex-col justify-between group transform-gpu cursor-default"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.08, duration: 0.6 }}
              whileHover={{ 
                y: -8,
                rotateX: 1,
                rotateY: -1,
                borderColor: "#D4AF37",
                boxShadow: "0 15px 30px -10px rgba(75, 34, 78, 0.15)"
              }}
            >
              <div>
                {/* Image Wrap */}
                <div className="h-44 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded bg-black/75 border border-[#D4AF37]/30 text-[8px] font-mono tracking-wider text-[#D4AF37] uppercase">
                    {service.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-base font-semibold tracking-wide text-[#111111] dark:text-[#F9F6F1] group-hover:text-[#4B224E] dark:group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed min-h-[3.75rem]">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Booking Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={triggerBooking}
                  className="w-full py-2.5 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[10px] font-serif tracking-widest uppercase text-center bg-[#4B224E]/5 dark:bg-white/5 hover:bg-[#4B224E] hover:text-[#F9F6F1] transition-all duration-300 cursor-pointer"
                >
                  Book Treatment
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
