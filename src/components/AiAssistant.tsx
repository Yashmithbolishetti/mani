import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, Phone, Check } from "lucide-react";
import Markdown from "react-markdown";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "### Welcome to the world of Dreams, darling!\n\nI am **Aura**, your private AI Beauty & Bridal Consultant. Together, we can discover magnificent makeovers, customize hair spas, and curate your flawless bridal dream.\n\nHow may I pamper your senses today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Lead capture within chat
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-6) // Send recent history for context
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I apologize, darling. My digital connections are momentarily clouded. Please contact our boutique directly at **063054 23546** or fill in the appointment form!"
        }
      ]);
    } finally {
      setLoading(false);
      // Show lead generation form after 3 exchanges to secure booking
      if (messages.length >= 3 && !leadCaptured) {
        setShowLeadForm(true);
      }
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    try {
      // Send as standard appointment lead
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadName,
          mobileNumber: leadPhone,
          serviceRequired: "AI Chat Consultation",
          beautyConcern: "Lead collected via Aura AI Assistant conversation",
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: "10:00",
        })
      });
      setLeadCaptured(true);
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Thank you, beautiful ${leadName}! I have safely forwarded your details to our senior stylist. They will reach out to schedule your elite personalized beauty ritual shortly.`
        }
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        id="ai-consultant-bubble"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#4B224E] to-[#B76E79] text-white border border-[#D4AF37]/40 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] text-[9px] text-[#111111] font-bold items-center justify-center">1</span>
        </span>
        <MessageSquare className="w-6 h-6 text-[#F9F6F1]" />
      </button>

      {/* Elegant Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-consultant-drawer"
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[500px] rounded-2xl bg-[#F9F6F1] dark:bg-[#1E1E1E] border border-[#D4AF37]/30 shadow-2xl flex flex-col overflow-hidden z-40 backdrop-blur-md"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#4B224E] to-[#B76E79] text-white flex items-center justify-between border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-[#D4AF37]/50">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1E1E1E]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm tracking-wider">Aura</h3>
                  <p className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">Elite AI Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/80 hover:text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs line-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#4B224E] text-[#F9F6F1] rounded-tr-none"
                        : "bg-[#1E1E1E]/5 dark:bg-white/5 text-[#111111] dark:text-[#F9F6F1] rounded-tl-none border border-black/5 dark:border-white/5"
                    }`}
                  >
                    {msg.role === "model" ? (
                      <div className="markdown-body prose prose-sm dark:prose-invert leading-relaxed space-y-1">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1E1E1E]/5 dark:bg-white/5 p-3 rounded-2xl rounded-tl-none border border-black/5 dark:border-white/5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#B76E79] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-[#4B224E] rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Lead Capture Overlay Form inside Chat */}
            {showLeadForm && (
              <motion.div
                className="p-4 bg-[#4B224E] text-[#F9F6F1] border-t border-[#D4AF37]/30 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-1.5 text-xs font-serif text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlock Your Free Skincare Formula
                </div>
                <p className="text-[10px] text-gray-300">
                  Provide your name and contact to have Aura arrange a bespoke beauty consultation with our specialists.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <User className="absolute left-2.5 top-2 w-3 h-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 bg-black/20 border border-[#D4AF37]/30 rounded text-[11px] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2 w-3 h-3 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Mobile No."
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 bg-black/20 border border-[#D4AF37]/30 rounded text-[11px] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 rounded text-[10px] font-serif uppercase tracking-widest transition-all"
                  >
                    Secure Invitation
                  </button>
                </form>
              </motion.div>
            )}

            {leadCaptured && (
              <div className="px-4 py-1.5 bg-green-950/20 text-green-500 border-t border-green-500/10 flex items-center justify-center gap-1.5 text-[10px] font-serif">
                <Check className="w-3 h-3" /> Bespoke Beauty Invitation Activated
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-black border-t border-black/5 dark:border-white/5 flex gap-2">
              <input
                type="text"
                placeholder="Ask Aura about bridal makeup, hair spas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/50 text-xs focus:outline-none focus:border-[#4B224E] dark:focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-[#4B224E] hover:bg-[#B76E79] text-white rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#F9F6F1]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
