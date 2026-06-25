import { motion } from "motion/react";
import { Sparkles, CheckCircle2, Star, Calendar } from "lucide-react";
import { PackageItem } from "../types";

export default function Packages() {
  const packages: PackageItem[] = [
    {
      id: "pkg_1",
      name: "The Golden Glow Ritual",
      price: "₹5,999",
      duration: "3 Hours",
      description: "A comprehensive pre-festive skin and grooming package to restore cellular hydration and overall organic luminosity.",
      features: [
        "Advanced Hydra Facial Treatment",
        "Royal Spa Manicure & Pedicure with Scrub",
        "Deep Hydrating Organic Hair Spa",
        "Complimentary Herbal Tea & Scalp Massage"
      ],
      benefits: "Guarantees 7-day intense skin radiance and tames frizzy strands",
      isPopular: false
    },
    {
      id: "pkg_2",
      name: "The Royal Bride Suite",
      price: "₹24,999",
      duration: "Full Wedding Day",
      description: "Our ultra-premium signature bridal makeover session. Fully customized for traditional South Indian muhurthams.",
      features: [
        "Signature Waterproof Airbrush HD Makeup",
        "Pre-Wedding Trial Makeover Vanity Session",
        "Saree Pleating, Jewelry Framing & Flowers Draping",
        "Luxury Hair Bun & Jasmine Floral Weaving",
        "Special Private Vanity Suite Access"
      ],
      benefits: "12+ Hour transfer-proof glow designed for high-resolution photography",
      isPopular: true
    },
    {
      id: "pkg_3",
      name: "The Silk Sleek Formula",
      price: "₹7,499",
      duration: "4 Hours",
      description: "The ultimate restorative treatment to completely transform coarse or frizzy hair into liquid silk.",
      features: [
        "Elite Brazilian Gold Keratin Therapy",
        "Certified Dermal Scale Scalp Treatment",
        "Creative Designer Hair Styling & Trim",
        "Premium Home Care Hair Serum (Gifted)"
      ],
      benefits: "Keeps hair straight, silky, and gloss-finished for up to 6 months",
      isPopular: false
    }
  ];

  const triggerBooking = (packageName: string) => {
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Pre-fill if possible (or trigger scrolling down)
      const serviceSelect = document.getElementById("booking-service") as HTMLSelectElement;
      if (serviceSelect) {
        // Set to relevant category
        if (packageName.includes("Bride")) {
          serviceSelect.value = "Bridal Makeup";
        } else if (packageName.includes("Silk")) {
          serviceSelect.value = "Keratin Treatment";
        } else {
          serviceSelect.value = "Pre-Bridal Packages";
        }
      }
    }
  };

  return (
    <section
      id="packages"
      className="py-24 bg-[#F9F6F1] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F9F6F1] transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#B76E79] uppercase block font-semibold">
            THE PACKAGES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#4B224E] dark:text-[#F9F6F1]">
            Luxury Beauty Rituals
          </h2>
          <div className="w-20 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-500 dark:text-gray-400 font-light mt-3 leading-relaxed">
            Choose from our curated wellness and makeover packages. Each ritual is designed to deliver immediate, breathtaking results in absolute comfort.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              className={`rounded-3xl border p-6 md:p-8 flex flex-col justify-between relative transition-all ${
                pkg.isPopular
                  ? "bg-[#4B224E] text-white border-[#D4AF37] shadow-2xl scale-[1.03] lg:translate-y-[-10px] shadow-[#4B224E]/20"
                  : "bg-white dark:bg-black/20 border-black/5 dark:border-white/5 shadow-md hover:border-[#D4AF37]/30"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-black text-[9px] font-mono tracking-widest font-bold uppercase shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-black text-black" /> POPULAR SIGNATURE
                </div>
              )}

              <div>
                {/* Header */}
                <div className="space-y-2 mb-6 text-center lg:text-left">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79]">{pkg.duration} Journey</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center lg:justify-start gap-1 pt-2">
                    <span className={`text-3xl sm:text-4xl font-serif font-light ${pkg.isPopular ? "text-[#D4AF37]" : "text-[#4B224E] dark:text-[#D4AF37]"}`}>{pkg.price}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">/ Inclusive</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-light pt-2 leading-relaxed">{pkg.description}</p>
                </div>

                {/* Features list */}
                <div className="space-y-4 py-6 border-y border-black/5 dark:border-white/5">
                  <h4 className="font-serif text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold">What is Included:</h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.isPopular ? "text-[#D4AF37]" : "text-[#B76E79]"}`} />
                        <span className="font-light leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits Box & Button */}
              <div className="mt-6 space-y-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 text-[11px] font-light leading-relaxed">
                  <strong className={pkg.isPopular ? "text-[#D4AF37]" : "text-[#B76E79]"}>Client Benefit:</strong> {pkg.benefits}
                </div>
                
                <button
                  onClick={() => triggerBooking(pkg.name)}
                  className={`w-full py-3 rounded-full text-xs font-serif tracking-widest uppercase border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-black border-transparent hover:scale-105 active:scale-95"
                      : "bg-[#4B224E] text-white hover:bg-[#B76E79] border-[#D4AF37]/50 hover:border-[#D4AF37] hover:scale-105 active:scale-95"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Beauty Ritual
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
