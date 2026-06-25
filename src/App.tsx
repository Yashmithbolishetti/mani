import { useState, useEffect } from "react";
import { Appointment, BeforeAfterItem, GalleryItem } from "./types";

// Component imports
import LoadingScreen from "./components/LoadingScreen";
import CursorEffect from "./components/CursorEffect";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Transformations from "./components/Transformations";
import Gallery from "./components/Gallery";
import BridalShowcase from "./components/BridalShowcase";
import Packages from "./components/Packages";
import HappyClients from "./components/HappyClients";
import BookingForm from "./components/BookingForm";
import MapAndReviews from "./components/MapAndReviews";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import AiAssistant from "./components/AiAssistant";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Dynamic content states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [beforeAfterList, setBeforeAfterList] = useState<BeforeAfterItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Load and sync dynamic data from Express API
  const fetchData = async () => {
    try {
      const [apptRes, baRes, galRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/before-after"),
        fetch("/api/gallery")
      ]);

      if (apptRes.ok) setAppointments(await apptRes.json());
      if (baRes.ok) setBeforeAfterList(await baRes.json());
      if (galRes.ok) setGalleryItems(await galRes.json());
    } catch (err) {
      console.error("Failed to synchronize with salon database.", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Theme Sync effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* 1. PREMIUM INTRO LOADING SCREEN */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Main Container hidden until initial loading animations finish */}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 min-h-screen bg-[#F9F6F1] text-[#111111] dark:bg-[#1E1E1E] dark:text-[#F9F6F1]"}`}>
        
        {/* 2. CUSTOM CURSOR HALO (Hidden on mobile automatically) */}
        <CursorEffect />

        {/* 3. FIXED HEADER NAVIGATION */}
        <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

        {/* 4. HERO SECTION WITH SPARKLING PARTICLES */}
        <Hero />

        {/* 5. ABOUT STORY & SALON PHILOSOPHY */}
        <About />

        {/* 6. CATEGORIZED 16 SERVICES ATELIER */}
        <Services />

        {/* 7. VALUE PROPOSITIONS */}
        <WhyChooseUs />

        {/* 8. COMPARISON BEFORE/AFTER INTERACTIVE DRAG-SLIDER */}
        <Transformations beforeAfterList={beforeAfterList} />

        {/* 9. BRIDAL BEAUTY SHOWCASE AND WATERMARK ELEMENTS */}
        <BridalShowcase />

        {/* 10. STUDIO MASONRY GALLERY WITH PAGINATING LIGHTBOX */}
        <Gallery galleryItems={galleryItems} />

        {/* 11. LUXURY CARD PACKAGES & DETAILED PRICING */}
        <Packages />

        {/* 12. CLIENT SOCIAL PROOF TESTIMONIALS */}
        <HappyClients />

        {/* 13. ONLINE BOOKING RESERVATION DESK */}
        <BookingForm onRefreshData={fetchData} />

        {/* 14. CONTACT INFORMATION & GOOGLE BUSINESS CARD */}
        <MapAndReviews />

        {/* 15. BRAND FOOTER AND BACK-TO-TOP BUTTON */}
        <Footer />

        {/* 16. OWNER BACKOFFICE ADMINISTRATION SUITE */}
        <AdminPanel
          onRefreshData={fetchData}
          appointments={appointments}
          beforeAfterList={beforeAfterList}
          galleryItems={galleryItems}
        />

        {/* 17. FLOATING AI BEAUTY & BRIDAL CONSULTANT "AURA" */}
        <AiAssistant />

      </div>
    </>
  );
}
