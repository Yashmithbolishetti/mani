import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1E1E1E] text-[#F9F6F1]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center px-6 max-w-md">
            {/* Elegant Brand Initials */}
            <motion.div
              className="relative inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full border border-[#D4AF37]/30 bg-gradient-to-br from-[#4B224E]/40 to-transparent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="font-serif text-3xl font-light tracking-widest text-[#D4AF37]">DBC</span>
              <motion.div
                className="absolute inset-0 rounded-full border border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-serif text-3xl md:text-4xl font-light tracking-[0.25em] text-[#F9F6F1] uppercase mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Dreams
            </motion.h1>
            <motion.p
              className="font-serif text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              BEAUTY CARE
            </motion.p>

            {/* Custom Progress Bar */}
            <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden rounded-full mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B76E79] to-[#D4AF37]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status Text */}
            <motion.div
              className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-[#B76E79] uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Designing Elegance... {progress}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
