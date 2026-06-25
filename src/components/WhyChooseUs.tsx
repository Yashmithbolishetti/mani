import { motion } from "motion/react";
import { 
  Users, Award, HelpCircle, Sparkles, Heart, Zap, Sliders, ShieldCheck 
} from "lucide-react";

export default function WhyChooseUs() {
  const highlights = [
    {
      title: "Experienced Professionals",
      desc: "Our senior stylists and dermal specialists are certified by international boards with years of master artistry.",
      icon: Users
    },
    {
      title: "Premium Products Only",
      desc: "We exclusively import top-tier global brands like Kerastase, Kryolan, MAC, and Estée Lauder to treat your hair & skin.",
      icon: Award
    },
    {
      title: "Personalized Consultations",
      desc: "We analyze your skin texture, hair density, and tone first to craft fully customized treatments.",
      icon: HelpCircle
    },
    {
      title: "Luxury Ambience",
      desc: "Indulge in our quiet, high-society studio space designed with elegant acoustics and private dressing suites.",
      icon: Sparkles
    },
    {
      title: "Bridal Specialists",
      desc: "We have dedicated traditional South Indian and contemporary bridal makeover teams for your magical day.",
      icon: Heart
    },
    {
      title: "Modern Equipment",
      desc: "We deploy state-of-the-art sterile facial, hair peeling, and airbrush machinery for pristine precision.",
      icon: Zap
    },
    {
      title: "Exceptional Service",
      desc: "From herbal teas on arrival to dedicated posture care chairs, we guarantee total client pampering.",
      icon: Sliders
    },
    {
      title: "Hygiene & Safety First",
      desc: "Every tool is medical-grade autoclaved, and single-use supplies are discarded after every treatment.",
      icon: ShieldCheck
    }
  ];

  return (
    <section
      id="why-choose-us"
      className="py-24 bg-[#1E1E1E] text-[#F9F6F1] relative overflow-hidden"
    >
      {/* Decorative gradient sphere */}
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#4B224E]/20 blur-[100px]" />
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#D4AF37] uppercase block font-semibold">
            THE DISTINCTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
            Why Clients Love Us
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B76E79] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Discover why our signature care, elite products, and state-of-the-art studio have established Dreams as Mancherial's premier beauty choice.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-[#D4AF37]/40 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
              >
                {/* Micro corner lines */}
                <div className="absolute top-0 left-0 w-4 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 left-0 w-[1px] h-4 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon Wrapper */}
                <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#B76E79]/10 border border-[#B76E79]/30 group-hover:bg-[#4B224E] group-hover:border-[#D4AF37] transition-all duration-300">
                  <IconComp className="w-5 h-5 text-[#B76E79] group-hover:text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>

                {/* Text info */}
                <h3 className="font-serif text-base font-semibold tracking-wide text-[#F9F6F1] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
