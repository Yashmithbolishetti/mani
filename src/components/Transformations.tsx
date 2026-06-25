import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Sliders } from "lucide-react";
import { BeforeAfterItem } from "../types";

interface TransformationsProps {
  beforeAfterList: BeforeAfterItem[];
}

export default function Transformations({ beforeAfterList }: TransformationsProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Active comparison item in list
  const [activeIndex, setActiveIndex] = useState(0);

  const [containerWidth, setContainerWidth] = useState(500);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();

    // Use ResizeObserver to reactively update on element size change
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    window.addEventListener("resize", updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const activeItem = beforeAfterList[activeIndex];

  return (
    <section
      id="transformations"
      className="py-24 bg-[#F9F6F1] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F9F6F1] transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-serif text-xs tracking-[0.3em] text-[#B76E79] uppercase block font-semibold">
            THE MAGIC
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#4B224E] dark:text-[#F9F6F1]">
            Real Transformations
          </h2>
          <div className="w-20 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
          <p className="max-w-xl mx-auto text-xs text-gray-500 dark:text-gray-400 font-light mt-3 leading-relaxed">
            Drag the slider right and left to witness the absolute elegance and high-end results crafted by our senior artists.
          </p>
        </div>

        {beforeAfterList.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-serif">
            No transformations added yet. Open Owner Desk to create some!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Interactive comparison slider box */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div 
                ref={containerRef}
                className="relative w-full max-w-xl h-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#1E1E1E] select-none cursor-ew-resize"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => { isDragging.current = true; }}
                onMouseUp={() => { isDragging.current = false; }}
                onTouchStart={() => { isDragging.current = true; }}
                onTouchEnd={() => { isDragging.current = false; }}
              >
                {/* Background Image: AFTER (the final gorgeous result) */}
                <img
                  src={activeItem?.afterUrl}
                  alt="Transformation After"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                
                {/* Overlay Image: BEFORE (the initial status) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeItem?.beforeUrl}
                    alt="Transformation Before"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-[350px] md:h-[450px] max-w-none object-cover pointer-events-none"
                    style={{ width: containerWidth }}
                  />
                </div>

                {/* Vertical Divider Slider Line */}
                <div 
                  className="absolute inset-y-0 w-0.5 bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Handle Bubble */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#4B224E] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-xl">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-[#1E1E1E]/80 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono tracking-widest text-white uppercase select-none">
                  Before
                </div>
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-[#4B224E]/80 backdrop-blur-md rounded border border-[#D4AF37]/30 text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase select-none">
                  After
                </div>
              </div>

              <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-4">
                ← DRAG HANDLE TO COMPARE BEFORE AND AFTER →
              </p>
            </div>

            {/* Right side: Transformation details and list switcher */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div 
                key={activeItem?.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 p-6 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 shadow-md"
              >
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono text-[10px] tracking-widest uppercase">Makeover Spotlight</span>
                </div>
                
                <h3 className="font-serif text-2xl font-light text-[#4B224E] dark:text-[#F9F6F1]">
                  {activeItem?.serviceName}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  {activeItem?.description}
                </p>
              </motion.div>

              {/* Selector thumbnails */}
              <div className="space-y-3">
                <h4 className="font-serif text-[10px] tracking-widest uppercase text-[#B76E79]">Explore Transformations</h4>
                <div className="flex flex-col gap-2">
                  {beforeAfterList.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveIndex(idx); setSliderPosition(50); }}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        activeIndex === idx
                          ? "bg-white dark:bg-black border-[#D4AF37] shadow-md shadow-[#4B224E]/5"
                          : "bg-white/40 dark:bg-black/10 border-black/5 dark:border-white/5 hover:border-[#D4AF37]/30"
                      }`}
                    >
                      <div className="flex gap-0.5 rounded overflow-hidden border border-black/10">
                        <img src={item.beforeUrl} alt="Before" referrerPolicy="no-referrer" className="w-8 h-8 object-cover" />
                        <img src={item.afterUrl} alt="After" referrerPolicy="no-referrer" className="w-8 h-8 object-cover" />
                      </div>
                      <span className="font-serif text-xs font-semibold tracking-wide truncate">{item.serviceName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
