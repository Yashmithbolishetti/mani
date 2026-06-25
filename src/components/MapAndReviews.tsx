import { MapPin, Phone, MessageSquare, Clock, Star, Share2 } from "lucide-react";

export default function MapAndReviews() {
  return (
    <section
      id="location"
      className="py-24 bg-[#F9F6F1] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F9F6F1] transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#B76E79] uppercase block font-semibold">
            THE SANCTUARY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#4B224E] dark:text-[#F9F6F1]">
            Locate Our Boutique
          </h2>
          <div className="w-20 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-500 dark:text-gray-400 font-light mt-3 leading-relaxed">
            Visit us in our private state-of-the-art studio on Market Road for an ultimate, immersive beauty and bridal makeover pampering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Column (Col 1-7) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative h-[350px] md:h-[450px]">
            {/* Embed Map of Mancherial, Telangana, Market Road */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1871.3789078426038!2d79.44474709835773!3d18.875323214152594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3329035179836f%3A0xe67db5cfb11fae7f!2sMarket%20Rd%2C%20Mancherial%2C%20Telangana%20504208!5e0!3m2!1sen!2sin!4v1710188000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05) saturate(0.95)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dreams Beauty Care Location Map"
            />
            
            {/* Float badge detailing exact above jeweller landmark */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white p-4 rounded-xl border border-[#D4AF37]/30 text-xs shadow-lg max-w-xs space-y-1">
              <p className="font-serif font-bold text-[#D4AF37]">Landmark Location</p>
              <p className="text-gray-300 font-light text-[11px]">Located conveniently on the 1st Floor, above Laxmi Ganapathi Jewellers, beside Archana Tex.</p>
            </div>
          </div>

          {/* Details & Google Reviews (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Card 1: Google Reviews Summary */}
            <div className="p-6 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm tracking-widest text-[#B76E79] uppercase font-semibold">Google Reviews</h4>
                  <p className="text-[10px] text-gray-500 font-mono">LIVE FEEDBACK SCORE</p>
                </div>
                
                {/* Score badge */}
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-serif text-[#D4AF37] font-bold">4.8 / 5</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                "Consistently rated the #1 luxury salon in Mancherial. Celebrated for pristine hygiene, elite airbrush makeup, and highly specialized, relaxing organic hair spa therapies by 150+ happy guests."
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#4B224E] dark:text-[#D4AF37] bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full" /> Verified Google Business Listing
              </div>
            </div>

            {/* Card 2: Location and Instant CTA Actions */}
            <div className="p-6 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 shadow-md space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h4 className="font-serif text-sm tracking-widest text-[#B76E79] uppercase font-semibold">Contact & Address</h4>
                
                <div className="space-y-3.5 text-xs font-light">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Dreams Beauty Care</p>
                      <p className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        Beside Archana Tex, Market Rd, above Laxmi Ganapathi Jewellers, Mancherial, Telangana 504208
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#B76E79] shrink-0" />
                    <p className="text-gray-500 dark:text-gray-400">Open Daily: 10:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                <a
                  href="tel:+916305423546"
                  className="py-3 bg-[#4B224E] hover:bg-[#B76E79] text-white rounded-xl border border-[#D4AF37]/40 text-center font-serif text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Call Salon
                </a>
                
                <a
                  href="https://wa.me/916305423546"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl text-center font-serif text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow hover:shadow-green-500/10"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  WhatsApp
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
