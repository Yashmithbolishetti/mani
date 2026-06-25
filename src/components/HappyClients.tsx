import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShieldCheck, ChevronRight, ChevronLeft, Quote } from "lucide-react";
import { Testimonial } from "../types";

export default function HappyClients() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: "t_1",
      name: "Kavitha Reddy",
      avatarUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      text: "My bridal makeup looked absolutely stunning. I was so nervous about my Telugu wedding, but their bridal specialist listened to my preferences and curated a pristine traditional HD look that lasted for 12+ hours! Literally everyone complimented me.",
      service: "Bridal Makeup",
      isVerified: true
    },
    {
      id: "t_2",
      name: "Anusha",
      avatarUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      text: "Best salon experience ever in Mancherial! The Hydra Facial treatment left my skin with a glassy, hydrated morning-dew glow instantly. The staff is extremely polite, professional, and keeps the environment absolutely clean and hygienic.",
      service: "Hydra Facial",
      isVerified: true
    },
    {
      id: "t_3",
      name: "Dr. Shwetha Goud",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      text: "Professional staff and amazing service! I went for a Keratin treatment on my extremely frizzy curly hair. They did a detailed hair analysis first and selected the perfect lipid formula. My hair is now silky straight with a high-end glossy shine.",
      service: "Keratin Treatment",
      isVerified: true
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#1E1E1E] text-[#F9F6F1] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#D4AF37] uppercase block font-semibold">
            THE TRUST
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
            Client Love Stories ❤️
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B76E79] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-400 font-light mt-3 leading-relaxed">
            See why our beautiful family of brides and grooming regulars trust Dreams Beauty Care to deliver supreme, world-class aesthetic perfection.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative max-w-3xl mx-auto border border-white/5 bg-white/5 backdrop-blur-md p-6 sm:p-12 rounded-3xl shadow-2xl overflow-hidden">
          
          <Quote className="absolute top-6 right-8 w-12 h-12 text-[#D4AF37]/10" />

          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            {/* Avatar Wrap */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-xl">
                <img
                  src={activeTestimonial.avatarUrl}
                  alt={activeTestimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {activeTestimonial.isVerified && (
                <span className="absolute bottom-0 right-0 p-1 bg-[#4B224E] border border-[#D4AF37] rounded-full text-white" title="Verified Client">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                </span>
              )}
            </div>

            {/* Stars */}
            <div className="flex gap-1.5 justify-center">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            {/* Review text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                className="font-serif text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 italic font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                "{activeTestimonial.text}"
              </motion.p>
            </AnimatePresence>

            {/* Author */}
            <div className="space-y-1">
              <h4 className="font-serif text-base tracking-wider font-semibold text-[#D4AF37]">
                {activeTestimonial.name}
              </h4>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79]">
                  Verified {activeTestimonial.service} Guest
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${activeIndex === i ? "bg-[#D4AF37] w-4" : "bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
