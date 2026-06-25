import { motion } from "motion/react";
import { Sparkles, Calendar, MessageCircle, Quote } from "lucide-react";
import aboutImg from "../assets/images/bridal_makeover_1782365446243.jpg";

export default function About() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="py-24 bg-[#F9F6F1] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F9F6F1] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Image Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#1E1E1E]"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Backing Gold Accent Frame */}
              <div className="absolute -top-3 -left-3 w-full h-full border border-[#D4AF37] rounded-2xl z-0 pointer-events-none hidden md:block" />
              
              <img
                src={aboutImg}
                alt="Dreams Beauty Care luxury makeover portrait"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] md:h-[550px] object-cover relative z-10 hover:scale-105 transition-transform duration-700"
              />

              {/* Float branding watermark */}
              <div className="absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-xl text-white">
                <p className="font-serif text-xs text-[#D4AF37] tracking-widest uppercase">Certified Specialists</p>
                <p className="text-[10px] text-gray-300">Dreams Bridal Suite</p>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Content Block */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-2">
              <span className="font-serif text-xs tracking-[0.3em] text-[#B76E79] uppercase block font-medium">
                THE BRAND STORY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#4B224E] dark:text-[#F9F6F1]">
                Dreams Beauty Care
              </h3>
              <div className="w-16 h-[1.5px] bg-[#D4AF37] mt-3" />
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-350 font-light">
              <p>
                At <strong className="text-[#4B224E] dark:text-[#D4AF37] font-medium font-serif">Dreams Beauty Care</strong>, beauty is more than appearance. We help our clients feel confident, elegant, and empowered through expert beauty services and personalized care.
              </p>
              <p>
                From everyday grooming to spectacular, traditional bridal transformations, our highly experienced professionals ensure that every client leaves our luxury studio feeling their absolute, radiant best.
              </p>
            </div>

            {/* Custom Quote callout box */}
            <div className="p-5 rounded-xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 relative">
              <Quote className="absolute top-2 right-4 w-10 h-10 text-[#D4AF37]/15" />
              <p className="italic text-xs font-serif leading-relaxed text-gray-600 dark:text-gray-400">
                "Our philosophy is to design makeovers that honor your authenticity. In our private studio, every highlight, treatment, or drape is applied with world-class artistry, making beauty truly unforgettable."
              </p>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#B76E79] mt-3">- Archana Devi, Senior Stylist & Founder</p>
            </div>

            {/* Micro details block */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border-l-2 border-[#D4AF37] bg-white/40 dark:bg-black/10">
                <h4 className="font-serif text-sm font-semibold">Premium Products</h4>
                <p className="text-[11px] text-gray-500">Only top-tier international brands (M.A.C, L'Oreal Professional, Kryolan, Estee Lauder) touch your hair and skin.</p>
              </div>
              <div className="p-3 border-l-2 border-[#B76E79] bg-white/40 dark:bg-black/10">
                <h4 className="font-serif text-sm font-semibold">Private Suites</h4>
                <p className="text-[11px] text-gray-500">Enjoy private vanity suites for bridal makeovers and relaxing hair spa sessions with complete peace of mind.</p>
              </div>
            </div>

            {/* CTA action */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={scrollToBooking}
                className="px-6 py-3 bg-[#4B224E] hover:bg-[#B76E79] text-[#F9F6F1] font-serif text-[10px] tracking-widest uppercase border border-[#D4AF37]/50 rounded-full transition-all duration-300"
              >
                Inquire For Booking
              </button>
              <a
                href="https://wa.me/916305423546"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-serif text-[#B76E79] hover:text-[#D4AF37] flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> Message Owner Direct
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
