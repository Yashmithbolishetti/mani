import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, User, Phone, Mail, HelpCircle, FileText, CheckCircle2, MessageSquare, Clock } from "lucide-react";

interface BookingFormProps {
  onRefreshData: () => void;
}

export default function BookingForm({ onRefreshData }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    serviceRequired: "Bridal Makeup",
    beautyConcern: "",
    preferredDate: "",
    preferredTime: "10:00",
    specialRequests: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const servicesList = [
    "Bridal Makeup", "Party Makeup", "Pre-Bridal Packages",
    "Hair Styling", "Hair Spa", "Hair Smoothening", "Hair Coloring", "Keratin Treatment",
    "Facials", "Hydra Facial", "Skin Care",
    "Waxing", "Threading", "Manicure", "Pedicure", "Nail Art"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber || !formData.preferredDate) {
      alert("Please complete all required fields, beautiful!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedData(data);
        setSuccess(true);
        onRefreshData(); // Refresh app state
        setFormData({
          fullName: "",
          mobileNumber: "",
          email: "",
          serviceRequired: "Bridal Makeup",
          beautyConcern: "",
          preferredDate: "",
          preferredTime: "10:00",
          specialRequests: ""
        });
      }
    } catch (err) {
      console.error(err);
      alert("Unable to reach our boutique reservation engine. Please call 063054 23546 directly!");
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppLink = () => {
    if (!submittedData) return "https://wa.me/916305423546";
    const text = `Hello Dreams Beauty Care, I have submitted a booking for ${submittedData.serviceRequired} on ${submittedData.preferredDate} at ${submittedData.preferredTime}. My name is ${submittedData.fullName}. Please confirm my elite session!`;
    return `https://wa.me/916305423546?text=${encodeURIComponent(text)}`;
  };

  // Get tomorrow's date for min attribute
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <section
      id="booking-form"
      className="py-24 bg-[#1E1E1E] text-[#F9F6F1] relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4B224E]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#D4AF37] uppercase block font-semibold">
            THE BOOKING DESK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
            Schedule Your Ritual
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B76E79] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Fill out the form below to lock in your luxury treatment. Senior stylists will review your concerns and secure your private suite.
          </p>
        </div>

        <div className="border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="booking-form-element"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyadarshini Rao"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 09876543210"
                      required
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email Address <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priya@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1]"
                    />
                  </div>

                  {/* Service Required */}
                  <div className="space-y-1">
                    <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="booking-service"
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1] [&>option]:text-[#111111]"
                    >
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={getMinDate()}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1]"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-1">
                    <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Time slot <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1] [&>option]:text-[#111111]"
                    >
                      <option value="10:00">10:00 AM (Opening Slot)</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:30">02:30 PM</option>
                      <option value="16:00">04:00 PM (Sunset Slot)</option>
                      <option value="17:30">05:30 PM</option>
                      <option value="19:00">07:00 PM (Late Treatment)</option>
                      <option value="20:30">08:30 PM (Closing Slot)</option>
                    </select>
                  </div>

                </div>

                {/* Beauty Concern */}
                <div className="space-y-1">
                  <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Skin Type / Hair Frizz Concerns
                  </label>
                  <textarea
                    placeholder="e.g. Dry skin, tan spots, split-ends, or requesting a specific stylist..."
                    rows={2}
                    value={formData.beautyConcern}
                    onChange={(e) => setFormData({ ...formData, beautyConcern: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1]"
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-serif text-[#B76E79] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> Custom Saree Draping / Special Requests
                  </label>
                  <textarea
                    placeholder="Describe saree fabric details, jewelry assistance requests, or timing notes..."
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] text-sm transition-all text-[#F9F6F1]"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-[#4B224E] to-[#B76E79] hover:from-[#B76E79] hover:to-[#4B224E] text-white font-serif tracking-widest text-xs uppercase border border-[#D4AF37]/50 hover:border-[#D4AF37] rounded-full transition-all duration-500 shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? "Transmitting Reservation..." : "Submit Reservation Request"}
                </button>

              </motion.form>
            ) : (
              // BOOKING SUCCESS WINDOW
              <motion.div
                key="booking-success"
                className="text-center py-10 space-y-6 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center text-green-500 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#D4AF37]">Reservation Submitted!</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#F9F6F1]">{submittedData?.fullName}</strong>. We have securely saved your request for <strong className="text-[#B76E79]">{submittedData?.serviceRequired}</strong> on {submittedData?.preferredDate} at {submittedData?.preferredTime}.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 max-w-md space-y-1.5">
                  <p>✓ Studio Suite Slot Reserved tentatively</p>
                  <p>✓ Stylist Consultation File created</p>
                  <p>✓ Autoclaved kit reserved for hygienic care</p>
                </div>

                {/* Instant WhatsApp Confirmation Button (Streamlines lead validation!) */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white font-serif tracking-widest text-xs uppercase border border-[#D4AF37]/50 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  WhatsApp to Confirm Instantly
                </a>

                <button
                  onClick={() => setSuccess(false)}
                  className="text-[10px] font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors"
                >
                  Make another booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
