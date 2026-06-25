import { useState, useEffect } from "react";
import { Sun, Moon, Sparkles, Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Story", target: "about" },
    { label: "Services", target: "services" },
    { label: "Why Us", target: "why-choose-us" },
    { label: "Transformations", target: "transformations" },
    { label: "Gallery", target: "gallery" },
    { label: "Bridal", target: "bridal-showcase" },
    { label: "Packages", target: "packages" },
    { label: "Location", target: "location" }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#F9F6F1]/95 dark:bg-[#1E1E1E]/95 py-3 shadow-lg border-b border-[#D4AF37]/20 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => scrollToSection("hero")} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-1.5 rounded-full border border-[#D4AF37]/40 bg-[#4B224E]/10 group-hover:bg-[#4B224E] group-hover:border-[#D4AF37] transition-all duration-300">
            <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-light tracking-[0.18em] text-[#111111] dark:text-[#F9F6F1] uppercase">
              Dreams
            </h1>
            <p className="text-[8px] font-mono tracking-[0.4em] text-[#B76E79] uppercase">
              BEAUTY CARE
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.target)}
              className="font-serif text-xs tracking-widest uppercase text-gray-700 hover:text-[#4B224E] dark:text-[#F9F6F1]/80 dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Utilities & CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] text-gray-700 dark:text-[#F9F6F1] bg-black/5 dark:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            title={darkMode ? "Switch to Luxury Light Mode" : "Switch to Midnight Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#4B224E]" />}
          </button>

          {/* Book Appointment CTA */}
          <button
            onClick={() => scrollToSection("booking-form")}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-serif tracking-widest uppercase bg-[#4B224E] text-[#F9F6F1] hover:bg-[#B76E79] border border-[#D4AF37]/50 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            Book Now
          </button>
        </div>

        {/* Mobile controls & toggle button */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-full border border-[#D4AF37]/30 text-gray-700 dark:text-[#F9F6F1]"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-[#4B224E]" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-md text-gray-700 dark:text-[#F9F6F1]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            className="fixed inset-x-0 top-[60px] p-6 bg-[#F9F6F1] dark:bg-[#1E1E1E] border-b border-[#D4AF37]/30 shadow-xl flex flex-col gap-4 sm:hidden z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.target)}
                  className="py-2.5 text-left font-serif text-[11px] tracking-widest uppercase border-b border-black/5 dark:border-white/5 text-gray-700 hover:text-[#4B224E] dark:text-[#F9F6F1]/80 dark:hover:text-[#D4AF37]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection("booking-form")}
              className="w-full py-3 text-center text-xs font-serif tracking-widest uppercase bg-[#4B224E] text-[#F9F6F1] border border-[#D4AF37] rounded-lg mt-2"
            >
              Book Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
