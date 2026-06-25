import { Sparkles, Phone, MapPin, Clock, MessageSquare, ArrowUp, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#111111] text-[#F9F6F1]/80 border-t border-[#D4AF37]/30 pt-16 pb-8 relative overflow-hidden"
    >
      {/* Decorative vertical line accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full border border-[#D4AF37]/40 bg-[#4B224E]/20">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif text-lg tracking-widest text-[#F9F6F1] uppercase">Dreams</h3>
                <p className="text-[7px] font-mono tracking-[0.45em] text-[#B76E79] uppercase">BEAUTY CARE</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Mancherial's premier luxury beauty salon boutique. Where state-of-the-art artistry meets traditional Telugu heritage to draft custom makeup and styling masterpieces.
            </p>

            {/* Social channels */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/916305423546"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37] hover:bg-white/5 text-gray-400 hover:text-[#D4AF37] transition-all"
                title="WhatsApp Client Desk"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/dreamsbeautycare"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37] hover:bg-white/5 text-gray-400 hover:text-[#D4AF37] transition-all"
                title="Instagram Showcase"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/dreamsbeautycare"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-[#D4AF37] hover:bg-white/5 text-gray-400 hover:text-[#D4AF37] transition-all"
                title="Facebook Community"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links block */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs tracking-widest text-[#D4AF37] uppercase font-semibold">Our Boutique</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                  Our Brand Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                  Atelier Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("transformations")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                  Before & After
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("packages")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                  Ritual Packages
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("booking-form")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                  Online Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Location details block */}
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-serif text-xs tracking-widest text-[#D4AF37] uppercase font-semibold">Luxury Address</h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Beside Archana Tex, Market Rd, <br />
                  above Laxmi Ganapathi Jewellers, <br />
                  Mancherial, Telangana 504208
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B76E79] shrink-0" />
                <a href="tel:+916305423546" className="hover:text-[#D4AF37] transition-colors">
                  +91 63054 23546
                </a>
              </div>
            </div>
          </div>

          {/* Operational Hours block */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs tracking-widest text-[#D4AF37] uppercase font-semibold">Elite Hours</h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-[#F9F6F1]">Monday – Sunday</p>
                  <p className="mt-0.5">10:00 AM – 10:00 PM</p>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg text-[10px] leading-relaxed">
                <strong className="text-[#D4AF37]">Holiday Bookings:</strong> Open on all public festivals. Pre-bridal booking of 20 days prior is recommended.
              </div>
            </div>
          </div>

        </div>

        {/* Divider line and bottom copyright & back to top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <div>
            <p>© {new Date().getFullYear()} Dreams Beauty Care. All Rights Reserved.</p>
            <p className="text-[9px] mt-1 text-gray-600">Designed with ultimate luxury and care beside Laxmi Ganapathi Jewellers.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Back to top toggle */}
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded border border-white/10 hover:border-[#D4AF37] text-gray-400 hover:text-white flex items-center gap-1.5 transition-all text-[10px] tracking-widest uppercase font-serif cursor-pointer"
            >
              <ArrowUp className="w-3 h-3 text-[#D4AF37]" /> BACK TO TOP
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
