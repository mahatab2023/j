import { useState } from "react";
import { Menu, X, Lock, Settings, LogOut, Check } from "lucide-react";

interface NavbarProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onAdminClick, isAdmin, onLogout, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick("hero")} 
            className="flex items-center gap-3 cursor-pointer group py-1"
            id="nav-logo-container"
          >
            <img 
              src="/logo.svg" 
              alt="Jewelry Perfection" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" id="nav-desktop-links">
            <button onClick={() => handleLinkClick("services")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              Services
            </button>
            <button onClick={() => handleLinkClick("before-after")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              Before/After
            </button>
            <button onClick={() => handleLinkClick("portfolio")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              Gallery
            </button>
            <button onClick={() => handleLinkClick("ai-diagnosis")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-[#f3e2a5] transition-colors flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              AI Studio
            </button>
            <button onClick={() => handleLinkClick("team")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              Team
            </button>
            <button onClick={() => handleLinkClick("faq")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              FAQ
            </button>
            <button onClick={() => handleLinkClick("contact")} className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors">
              Contact
            </button>
          </div>

          {/* Call To Actions */}
          <div className="hidden md:flex items-center gap-4" id="nav-actions">
            {isAdmin ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={onAdminClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] rounded-none font-sans text-xs uppercase tracking-wider hover:bg-[#D4AF37]/20 transition-all"
                >
                  <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                  Dashboard
                </button>
                <button 
                  onClick={onLogout}
                  className="p-1.5 border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 rounded-none transition-all"
                  title="Logout Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onAdminClick}
                className="text-gray-400 hover:text-[#D4AF37] p-2 transition-colors"
                title="Admin Panel"
                id="btn-admin-login-lock"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <button 
              onClick={() => handleLinkClick("sample-edit")}
              className="px-6 py-2.5 bg-[#D4AF37] text-black font-sans font-bold text-[11px] uppercase tracking-widest rounded-none hover:bg-white transition-all shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
            >
              Free Sample Edit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={onAdminClick}
                className="p-2 border border-white/10 bg-[#D4AF37]/10 text-[#D4AF37] rounded-none"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#D4AF37] p-1.5 hover:bg-white/5 rounded-none transition-all cursor-pointer"
              id="btn-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808] border-b border-white/10 px-6 pt-4 pb-8 flex flex-col gap-4 animate-fade-in" id="nav-mobile-drawer">
          <button onClick={() => handleLinkClick("services")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-gray-300 hover:text-[#D4AF37]">
            Our Services
          </button>
          <button onClick={() => handleLinkClick("before-after")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-gray-300 hover:text-[#D4AF37]">
            Before / After Comparison
          </button>
          <button onClick={() => handleLinkClick("portfolio")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-gray-300 hover:text-[#D4AF37]">
            Portfolio Gallery
          </button>
          <button onClick={() => handleLinkClick("ai-diagnosis")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-[#D4AF37] font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            AI Diagnostics
          </button>
          <button onClick={() => handleLinkClick("team")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-gray-300 hover:text-[#D4AF37]">
            Our Team
          </button>
          <button onClick={() => handleLinkClick("faq")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-gray-300 hover:text-[#D4AF37]">
            Frequently Asked Questions
          </button>
          <button onClick={() => handleLinkClick("contact")} className="text-left font-sans text-xs uppercase tracking-widest py-2.5 border-b border-white/5 text-gray-300 hover:text-[#D4AF37]">
            Contact Us
          </button>
          
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => handleLinkClick("sample-edit")}
              className="flex-1 text-center py-3 bg-[#D4AF37] hover:bg-white text-black font-sans font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer"
            >
              Request Free Sample
            </button>
            {!isAdmin ? (
              <button 
                onClick={() => { setMobileMenuOpen(false); onAdminClick(); }}
                className="p-3 border border-white/10 bg-white/5 rounded-none text-gray-400 hover:text-[#D4AF37]"
              >
                <Lock className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="p-3 border border-red-900/40 bg-red-950/10 text-red-400 rounded-none"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
