import { useState, useEffect, FormEvent } from "react";
import { Service, BeforeAfterProject, GalleryItem, TeamMember, Testimonial, WebsiteSettings } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import BeforeAfterSection from "./components/BeforeAfterSection";
import GallerySection from "./components/GallerySection";
import AIDiagnosisTool from "./components/AIDiagnosisTool";
import TrustSection from "./components/TrustSection";
import TeamSection from "./components/TeamSection";
import FAQSection from "./components/FAQSection";
import SampleRequestSection from "./components/SampleRequestSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { Loader2, Lock, X, AlertCircle } from "lucide-react";
import { 
  defaultServices, 
  defaultBeforeAfter, 
  defaultGallery, 
  defaultTeam, 
  defaultTestimonials, 
  defaultSettings 
} from "./data";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Database core states with static defaults for full client resiliency
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterProject[]>(defaultBeforeAfter);
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [settings, setSettings] = useState<WebsiteSettings | null>(defaultSettings);

  // Navigation / Scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pre-fill target project type
  const [prefilledType, setPrefilledType] = useState("High-End Jewelry Retouching");
  const handleSelectService = (serviceName: string) => {
    setPrefilledType(serviceName);
    handleNavigate("contact");
  };

  // Authentication & Admin Toggles
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Fetch core settings from backend API on mount
  const fetchAllData = async () => {
    try {
      const res = await fetch("/api/init");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services);
        setBeforeAfter(data.beforeAfter);
        setGallery(data.gallery);
        setTeam(data.team);
        setTestimonials(data.testimonials);
        setSettings(data.settings);
      } else {
        console.warn("Backend not detected or returned non-ok status. Utilizing seamless local static database parameters.");
      }
      setError(null);
    } catch (err: any) {
      console.warn("Express backend server offline or running in standalone static client-mode (e.g., Netlify CDN). App is perfectly operational with native local asset storage.");
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Login handler
  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (loginUser === "M.R Mahatab" && loginPass === "mahatab") {
      setIsAdmin(true);
      setShowLoginModal(false);
      setShowDashboard(true);
      // Reset form
      setLoginUser("");
      setLoginPass("");
    } else {
      setLoginError("Invalid Administrator credentials.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowDashboard(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin mb-4" />
        <p className="font-brand text-lg text-[#D4AF37] uppercase tracking-[0.2em] animate-pulse">Jewelry Perfection</p>
        <p className="font-sans text-xs text-gray-500 mt-2">Loading luxury assets and synchronizing cloud parameters...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 text-center text-red-400 font-sans">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="font-display font-semibold text-lg text-white mb-2">Configuration Required</h3>
        <p className="text-xs text-gray-400 max-w-md leading-relaxed">
          Could not retrieve website config parameters. Please verify default static configurations.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden relative selection:bg-[#D4AF37] selection:text-black">
      
      {/* GLOBAL NAVBAR */}
      <Navbar 
        isAdmin={isAdmin}
        onAdminClick={() => isAdmin ? setShowDashboard(true) : setShowLoginModal(true)}
        onLogout={handleAdminLogout}
        onNavigate={handleNavigate}
      />

      {/* DYNAMIC VIEWPORT RENDERER */}
      <main>
        {/* HERO SECTION */}
        <Hero 
          onNavigate={handleNavigate}
          phone={settings.phone}
          businessHours={settings.businessHours}
          responseTime={settings.responseTime}
        />

        {/* SERVICES SECTION */}
        <ServicesSection 
          services={services}
          onSelectService={handleSelectService}
        />

        {/* BEFORE & AFTER COMPARISON SECTION */}
        <BeforeAfterSection 
          projects={beforeAfter}
        />

        {/* EXHIBITION GALLERY SECTION */}
        <GallerySection 
          items={gallery}
        />

        {/* AI QC DIAGNOSIS SECTION */}
        <AIDiagnosisTool />

        {/* STORY, CORE VALUES & PIPELINE PROCESS SECTION */}
        <TrustSection />

        {/* SPECIALISTS TEAM SECTION */}
        <TeamSection 
          team={team}
        />

        {/* ACCORDION FAQS SECTION */}
        <FAQSection 
          phone={settings.phone}
        />

        {/* FREE SAMPLE REQUEST (LEAD ENGINE) */}
        <SampleRequestSection />

        {/* INQUIRIES & COORDINATES CONTACT FORM */}
        <ContactSection 
          phone={settings.phone}
          email={settings.email}
          facebook={settings.facebook}
          instagram={settings.instagram}
          behance={settings.behance}
          fiverr={settings.fiverr}
          businessHours={settings.businessHours}
          responseTime={settings.responseTime}
          prefilledProjectType={prefilledType}
        />
      </main>

      {/* FOOTER */}
      <Footer 
        onNavigate={handleNavigate}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        responseTime={settings.responseTime}
      />

      {/* ADMIN DASHBOARD COMPONENT */}
      {showDashboard && isAdmin && (
        <AdminDashboard 
          onClose={() => setShowDashboard(false)}
          onRefreshData={fetchAllData}
          services={services}
          beforeAfter={beforeAfter}
          gallery={gallery}
          team={team}
          testimonials={testimonials}
          settings={settings}
        />
      )}

      {/* GLASS LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm border border-white/10 rounded-none p-6 sm:p-8 bg-[#080808] text-left relative animate-scale-up shadow-2xl" id="login-modal-panel">
            
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-white">
                Admin Authentication
              </h3>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1.5 font-bold">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="Enter username"
                  className="w-full py-2.5 px-3 rounded-none bg-[#0c0c0c] border border-white/10 text-white font-sans text-xs focus:border-[#D4AF37] focus:outline-none font-light"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1.5 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter password"
                  className="w-full py-2.5 px-3 rounded-none bg-[#0c0c0c] border border-white/10 text-white font-sans text-xs focus:border-[#D4AF37] focus:outline-none font-light"
                />
              </div>

              {loginError && (
                <p className="text-red-400 text-[11px] font-sans leading-relaxed italic">
                  * {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-white text-black font-bold font-sans text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                Access CMS Engine
              </button>
            </form>

            <p className="text-[10px] text-gray-500 font-sans mt-4 font-light text-center leading-relaxed">
              Designed exclusively for Jewelry Perfection.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
