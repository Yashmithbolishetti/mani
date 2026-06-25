import { motion } from "motion/react";
import { Sparkles, Calendar, MessageSquare, ShieldCheck, Heart, Award, Sparkle, Leaf } from "lucide-react";
import heroImage from "../assets/images/luxury_salon_interior_1782365430512.jpg";

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    { text: "Certified Beauty Experts", icon: Award },
    { text: "Bridal Specialists", icon: Heart },
    { text: "Premium Products", icon: Sparkles },
    { text: "Personalized Treatments", icon: Leaf },
    { text: "Hygienic Environment", icon: ShieldCheck }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#1E1E1E] text-[#F9F6F1] overflow-hidden pt-20"
    >
      {/* Editorial Dark Overlay Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Dreams Beauty Care Luxury Studio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter blur-[1px] md:blur-0 transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/80 to-[#1E1E1E]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1E] via-transparent to-transparent hidden lg:block" />
      </div>

      {/* Floating Sparkles & Beauty Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute p-1 text-[#D4AF37]/30"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + (i * i * 15) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkle className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center lg:text-left py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] uppercase text-[10px] font-mono tracking-[0.25em]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin delay-1000" />
              World-Class Luxury Boutique Salon
            </motion.div>

            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-[#F9F6F1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Reveal The Most <br className="hidden sm:inline" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#F9F6F1]">
                Beautiful Version
              </span> Of Yourself
            </motion.h2>

            <motion.p
              className="font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 text-gray-300 font-light leading-relaxed"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience premium beauty treatments, expert stylists, luxury makeovers, and personalized care designed to make you shine. Indulge in an atmosphere designed strictly for comfort and class.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4B224E] to-[#B76E79] text-[#F9F6F1] font-serif tracking-widest text-xs uppercase rounded-full border border-[#D4AF37]/40 shadow-xl hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                Book Appointment
              </button>

              <a
                href="https://wa.me/916305423546"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#F9F6F1] hover:text-[#D4AF37] font-serif tracking-widest text-xs uppercase rounded-full border border-[#F9F6F1]/20 hover:border-[#D4AF37] bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4 text-[#B76E79]" />
                Chat On WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Luxury Floating Badge Details Column */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl max-w-xs mx-auto overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {/* background vector accent */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#4B224E]/30 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />

              <h3 className="font-serif text-sm tracking-widest uppercase text-[#D4AF37] mb-4 pb-2 border-b border-white/10">The Dreams Seal</h3>
              
              <ul className="space-y-4">
                {features.map((feat, idx) => {
                  const IconComp = feat.icon;
                  return (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-3 text-xs text-gray-300 font-light"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                    >
                      <div className="p-1 rounded bg-[#B76E79]/20 border border-[#B76E79]/30">
                        <IconComp className="w-3.5 h-3.5 text-[#B76E79]" />
                      </div>
                      <span>{feat.text}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Horizontal Mobile features bar */}
        <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-5 gap-4 lg:hidden">
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <div key={idx} className="flex items-center gap-2 justify-center p-3 rounded bg-white/5 border border-white/5">
                <IconComp className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] tracking-wider uppercase text-gray-300">{f.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative luxury footer line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
}
