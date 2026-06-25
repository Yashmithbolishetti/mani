import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, Calendar, Image as ImageIcon, Sparkles, MessageSquare, 
  Check, X, Trash2, Clock, CheckCircle2, AlertCircle, PlusCircle, LogOut, ChevronRight
} from "lucide-react";
import { Appointment, BeforeAfterItem, GalleryItem } from "../types";

interface AdminPanelProps {
  onRefreshData: () => void;
  appointments: Appointment[];
  beforeAfterList: BeforeAfterItem[];
  galleryItems: GalleryItem[];
}

export default function AdminPanel({ onRefreshData, appointments, beforeAfterList, galleryItems }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'bookings' | 'gallery' | 'transformations' | 'ai-leads'>('bookings');
  
  // Forms states
  const [newGallery, setNewGallery] = useState({ imageUrl: "", category: "Hair" as any, title: "" });
  const [newBA, setNewBA] = useState({ beforeUrl: "", afterUrl: "", serviceName: "", description: "" });
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Load chat logs if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchChatLogs();
    }
  }, [isAuthenticated, activeTab]);

  const fetchChatLogs = async () => {
    try {
      const res = await fetch("/api/chats-log");
      if (res.ok) {
        const data = await res.json();
        setChatLogs(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "dreamsadmin") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect luxury desk passcode.");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment booking?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (res.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.imageUrl || !newGallery.title) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGallery)
      });
      if (res.ok) {
        setNewGallery({ imageUrl: "", category: "Hair", title: "" });
        onRefreshData();
        alert("Gallery photo added successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddBA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBA.beforeUrl || !newBA.afterUrl || !newBA.serviceName) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/before-after", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBA)
      });
      if (res.ok) {
        setNewBA({ beforeUrl: "", afterUrl: "", serviceName: "", description: "" });
        onRefreshData();
        alert("Before & After transformation added successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm("Delete gallery photo?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBA = async (id: string) => {
    if (!window.confirm("Delete this transformation?")) return;
    try {
      const res = await fetch(`/api/before-after/${id}`, { method: "DELETE" });
      if (res.ok) onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Entry Button (Styled subtle in bottom-left corner of the page) */}
      <button
        id="owner-desk-toggle"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 text-xs font-serif tracking-widest text-[#D4AF37] hover:text-[#F9F6F1] bg-[#1E1E1E]/95 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#4B224E] rounded-full transition-all duration-300 shadow-xl backdrop-blur-md"
      >
        <Lock className="w-3.5 h-3.5" />
        OWNER DESK
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="admin-sidebar-backdrop"
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Sidebar content container */}
            <motion.div
              id="admin-sidebar"
              className="relative w-full max-w-4xl h-full bg-[#F9F6F1] text-[#111111] dark:bg-[#1E1E1E] dark:text-[#F9F6F1] shadow-2xl flex flex-col z-10 overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-[#4B224E] text-[#F9F6F1]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg tracking-wider">Dreams Luxury Suite</h2>
                    <p className="text-[10px] font-mono tracking-widest text-[#B76E79] uppercase">Salon Administration Desk</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#F9F6F1]" />
                </button>
              </div>

              {/* AUTH SHIELD */}
              {!isAuthenticated ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
                  <Lock className="w-12 h-12 text-[#D4AF37] mb-4" />
                  <h3 className="font-serif text-xl mb-2">Access Restrained</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    Enter the salon owner passcode to unlock appointments, lead logs, and content management.
                  </p>
                  <form onSubmit={handleLogin} className="w-full space-y-3">
                    <input
                      type="password"
                      placeholder="Passcode (use: dreamsadmin)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg text-center font-mono focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    />
                    {error && (
                      <p className="text-xs text-red-500 flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#4B224E] hover:bg-[#4B224E]/90 text-[#F9F6F1] font-serif tracking-widest uppercase text-xs rounded-lg border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300"
                    >
                      Authenticate Desk
                    </button>
                  </form>
                </div>
              ) : (
                // AUTHENTICATED PANEL WORKSPACE
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  {/* Left Column Tabs */}
                  <div className="w-full md:w-56 border-r border-black/5 dark:border-white/5 bg-black/5 dark:bg-black/20 p-4 space-y-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 px-4 py-2.5 rounded-lg text-xs font-serif tracking-wider transition-all whitespace-nowrap ${activeTab === 'bookings' ? 'bg-[#4B224E] text-white border-l-2 border-[#D4AF37]' : 'hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'}`}
                    >
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      Client Bookings ({appointments.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 px-4 py-2.5 rounded-lg text-xs font-serif tracking-wider transition-all whitespace-nowrap ${activeTab === 'gallery' ? 'bg-[#4B224E] text-white border-l-2 border-[#D4AF37]' : 'hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'}`}
                    >
                      <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                      Manage Gallery
                    </button>
                    <button
                      onClick={() => setActiveTab('transformations')}
                      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 px-4 py-2.5 rounded-lg text-xs font-serif tracking-wider transition-all whitespace-nowrap ${activeTab === 'transformations' ? 'bg-[#4B224E] text-white border-l-2 border-[#D4AF37]' : 'hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'}`}
                    >
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      Before & After
                    </button>
                    <button
                      onClick={() => setActiveTab('ai-leads')}
                      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 px-4 py-2.5 rounded-lg text-xs font-serif tracking-wider transition-all whitespace-nowrap ${activeTab === 'ai-leads' ? 'bg-[#4B224E] text-white border-l-2 border-[#D4AF37]' : 'hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'}`}
                    >
                      <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                      AI Chat Leads ({chatLogs.length})
                    </button>

                    <div className="flex-1 hidden md:block" />
                    
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-red-500 font-serif hover:bg-red-500/10 transition-all text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>

                  {/* Right Column Content Workspace */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    
                    {/* 1. BOOKINGS LIST */}
                    {activeTab === 'bookings' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-serif text-lg tracking-wider text-[#4B224E] dark:text-[#D4AF37]">Active Salon Bookings</h3>
                          <span className="text-[10px] font-mono px-2 py-1 bg-black/5 dark:bg-white/10 rounded-full">{appointments.length} Total</span>
                        </div>

                        {appointments.length === 0 ? (
                          <div className="text-center py-12 text-gray-500 font-serif text-sm">
                            No appointment bookings received yet.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {appointments.map((appt) => (
                              <div
                                key={appt.id}
                                className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-black/30 shadow-md relative group overflow-hidden"
                              >
                                {/* Status Flag */}
                                <div className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1 text-[9px] font-mono tracking-widest uppercase rounded-bl-xl bg-gradient-to-l from-black/5 to-black/10 text-[#111111] dark:text-[#F9F6F1]">
                                  {appt.status === "Confirmed" && <CheckCircle2 className="w-3 h-3 text-green-500 inline" />}
                                  {appt.status === "Pending" && <Clock className="w-3 h-3 text-amber-500 inline" />}
                                  {appt.status === "Cancelled" && <X className="w-3 h-3 text-red-500 inline" />}
                                  {appt.status}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                  <div className="space-y-1">
                                    <h4 className="font-serif text-base font-semibold">{appt.fullName}</h4>
                                    <p className="text-xs font-mono text-gray-500 dark:text-gray-400">Phone: {appt.mobileNumber}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email: {appt.email || "N/A"}</p>
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded text-[10px] font-mono text-[#D4AF37]">
                                      Slot: {appt.preferredDate} @ {appt.preferredTime}
                                    </div>
                                  </div>

                                  <div className="space-y-1 bg-black/5 dark:bg-white/5 p-3 rounded-lg text-xs">
                                    <p className="font-serif font-medium text-[#4B224E] dark:text-[#B76E79]">Service: {appt.serviceRequired}</p>
                                    <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-300">Concern:</strong> {appt.beautyConcern}</p>
                                    <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-300">Notes:</strong> {appt.specialRequests}</p>
                                  </div>
                                </div>

                                {/* Controls */}
                                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleUpdateStatus(appt.id, "Confirmed")}
                                      className="px-2 py-1 text-[10px] font-serif tracking-widest uppercase bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center gap-1"
                                    >
                                      <Check className="w-3 h-3" /> Confirm
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(appt.id, "Cancelled")}
                                      className="px-2 py-1 text-[10px] font-serif tracking-widest uppercase bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center gap-1"
                                    >
                                      <X className="w-3 h-3" /> Cancel
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {/* Action link for Owner to text directly on WhatsApp */}
                                    <a
                                      href={`https://wa.me/${appt.mobileNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${appt.fullName}, this is Dreams Beauty Care Mancherial. We are confirming your booking request for ${appt.serviceRequired} on ${appt.preferredDate} at ${appt.preferredTime}.`)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-2.5 py-1 text-[10px] font-mono border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded transition-all"
                                    >
                                      WhatsApp Client
                                    </a>
                                    <button
                                      onClick={() => handleDeleteAppointment(appt.id)}
                                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 2. MANAGE GALLERY */}
                    {activeTab === 'gallery' && (
                      <div className="space-y-6">
                        <h3 className="font-serif text-lg tracking-wider text-[#4B224E] dark:text-[#D4AF37]">Add Gallery Masterpiece</h3>
                        
                        <form onSubmit={handleAddGallery} className="p-4 bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-xl space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-serif text-[#B76E79]">Photo Title</label>
                              <input
                                type="text"
                                placeholder="e.g. Traditional Telugu Bridal Glow"
                                value={newGallery.title}
                                onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                                className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-serif text-[#B76E79]">Category</label>
                              <select
                                value={newGallery.category}
                                onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })}
                                className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm text-[#111111] dark:text-[#F9F6F1]"
                              >
                                <option value="Interior" className="text-black">Salon Interior</option>
                                <option value="Treatments" className="text-black">Beauty Treatments</option>
                                <option value="Hair" className="text-black">Hair Styling</option>
                                <option value="Makeup" className="text-black">Makeup Sessions</option>
                                <option value="Bridal" className="text-black">Bridal Makeovers</option>
                                <option value="Customers" className="text-black">Happy Customers</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs font-serif text-[#B76E79]">Image URL</label>
                            <input
                              type="url"
                              placeholder="e.g. https://images.unsplash.com/photo-..."
                              value={newGallery.imageUrl}
                              onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                              className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm"
                              required
                            />
                            <p className="text-[10px] text-gray-500">Provide an editorial image URL. Unsplash links are recommended.</p>
                          </div>

                          <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-[#4B224E] text-white hover:bg-[#4B224E]/90 text-xs font-serif tracking-widest uppercase border border-[#D4AF37]/50 rounded transition-all disabled:opacity-50"
                          >
                            {submitting ? "Publishing..." : "Add to Live Gallery"}
                          </button>
                        </form>

                        <div className="pt-4 border-t border-black/10 dark:border-white/10">
                          <h4 className="font-serif text-sm tracking-wider mb-4 text-[#4B224E] dark:text-[#B76E79]">Current Photos ({galleryItems.length})</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {galleryItems.map((g) => (
                              <div key={g.id} className="relative group rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/5">
                                <img src={g.imageUrl} alt={g.title} referrerPolicy="no-referrer" className="w-full h-24 object-cover" />
                                <div className="p-2 bg-white dark:bg-black text-[10px]">
                                  <p className="font-serif font-semibold truncate">{g.title}</p>
                                  <p className="font-mono text-[8px] text-[#B76E79]">{g.category}</p>
                                </div>
                                <button
                                  onClick={() => handleDeleteGallery(g.id)}
                                  className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. MANAGE TRANSFORMATIONS */}
                    {activeTab === 'transformations' && (
                      <div className="space-y-6">
                        <h3 className="font-serif text-lg tracking-wider text-[#4B224E] dark:text-[#D4AF37]">Create Before & After Transformation</h3>

                        <form onSubmit={handleAddBA} className="p-4 bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-xl space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-serif text-[#B76E79]">Service / Makeover Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Ultimate Keratin Infusion"
                              value={newBA.serviceName}
                              onChange={(e) => setNewBA({ ...newBA, serviceName: e.target.value })}
                              className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-serif text-[#B76E79]">Before Photo URL</label>
                              <input
                                type="url"
                                placeholder="https://..."
                                value={newBA.beforeUrl}
                                onChange={(e) => setNewBA({ ...newBA, beforeUrl: e.target.value })}
                                className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-serif text-[#B76E79]">After Photo URL</label>
                              <input
                                type="url"
                                placeholder="https://..."
                                value={newBA.afterUrl}
                                onChange={(e) => setNewBA({ ...newBA, afterUrl: e.target.value })}
                                className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-serif text-[#B76E79]">Description of treatment</label>
                            <textarea
                              placeholder="Describe specific products used, timing, or results..."
                              value={newBA.description}
                              onChange={(e) => setNewBA({ ...newBA, description: e.target.value })}
                              className="w-full px-3 py-2 bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded focus:outline-none focus:border-[#D4AF37] text-sm h-16"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-[#4B224E] text-white hover:bg-[#4B224E]/90 text-xs font-serif tracking-widest uppercase border border-[#D4AF37]/50 rounded transition-all disabled:opacity-50"
                          >
                            {submitting ? "Publishing..." : "Add Transformation"}
                          </button>
                        </form>

                        <div className="pt-4 border-t border-black/10 dark:border-white/10">
                          <h4 className="font-serif text-sm tracking-wider mb-4 text-[#4B224E] dark:text-[#B76E79]">Active Comparisons ({beforeAfterList.length})</h4>
                          <div className="space-y-4">
                            {beforeAfterList.map((ba) => (
                              <div key={ba.id} className="p-3 bg-white dark:bg-black rounded-lg flex items-center justify-between border border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                  <div className="flex gap-1">
                                    <img src={ba.beforeUrl} alt="Before" referrerPolicy="no-referrer" className="w-10 h-10 rounded object-cover" />
                                    <img src={ba.afterUrl} alt="After" referrerPolicy="no-referrer" className="w-10 h-10 rounded object-cover" />
                                  </div>
                                  <div>
                                    <p className="font-serif font-semibold text-xs">{ba.serviceName}</p>
                                    <p className="text-[10px] text-gray-500 truncate max-w-sm">{ba.description}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteBA(ba.id)}
                                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. AI CHAT LEADS LOGS */}
                    {activeTab === 'ai-leads' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-serif text-lg tracking-wider text-[#4B224E] dark:text-[#D4AF37]">Organic AI Chat Leads</h3>
                          <button
                            onClick={fetchChatLogs}
                            className="text-[10px] font-mono px-3 py-1 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                          >
                            Refresh logs
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Monitor real-time conversations of website guests interacting with Aura, your AI beauty consultant. Discover which treatments clients are exploring and follow up actively!
                        </p>

                        {chatLogs.length === 0 ? (
                          <div className="text-center py-12 text-gray-500 font-serif text-sm">
                            No AI conversations logged yet.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {chatLogs.slice().reverse().map((log: any) => (
                              <div key={log.id} className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-black/20 text-xs space-y-3">
                                <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                                  <span>ID: {log.id}</span>
                                  <span>{new Date(log.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="space-y-1 bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] p-2.5 rounded-r">
                                  <strong className="text-[#B76E79] font-serif uppercase tracking-wider text-[10px]">Client Inquiry:</strong>
                                  <p className="text-gray-800 dark:text-gray-150">{log.message}</p>
                                </div>
                                <div className="space-y-1 bg-[#4B224E]/5 border-l-2 border-[#4B224E] p-2.5 rounded-r">
                                  <strong className="text-[#4B224E] dark:text-[#D4AF37] font-serif uppercase tracking-wider text-[10px]">Aura's Consultation:</strong>
                                  <p className="text-gray-600 dark:text-gray-300 italic">{log.reply.replace(/###/g, '').replace(/\*\*/g, '')}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
