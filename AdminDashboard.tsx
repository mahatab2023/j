import { Sparkles, ArrowRight, MessageCircle, FileText, CheckCircle } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  phone: string;
  businessHours: string;
  responseTime: string;
}

export default function Hero({ onNavigate, phone, businessHours, responseTime }: HeroProps) {
  // Clean phone number for whatsapp link (remove spaces/dashes)
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#080808]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-[0.03] rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.02] rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none z-0"></div>
      
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.012)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col text-left" id="hero-left-content">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-6">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              Elite Retouching Agency
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-7xl leading-[1.1] text-white tracking-tight mb-6">
              The <span className="italic text-[#D4AF37] font-serif font-normal">Diamond</span><br/>Standard of Editing
            </h1>

            {/* Agency Introduction / Value Prop */}
            <p className="font-sans text-gray-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-8">
              We are a dedicated collective of 25 elite image specialists in Bangladesh. We meticulously polish metals, enhance diamonds, refine gemstones, and craft pristine shadows to convert raw catalog photos into pure luxury desires.
            </p>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-xs text-gray-500 font-sans tracking-wide">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                24/7 Global Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                Unlimited Revisions
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% Strict NDA
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4" id="hero-cta-buttons">
              <button
                onClick={() => onNavigate("sample-edit")}
                className="px-8 py-4 bg-[#D4AF37] text-black font-sans font-bold text-xs uppercase tracking-widest rounded-none hover:bg-white transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.15)] flex items-center justify-center gap-2"
              >
                Request Free Sample
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("portfolio")}
                className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-none hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Portfolio
              </button>

              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 flex items-center gap-3 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-none hover:bg-white/10 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                WhatsApp Us
              </a>
            </div>

            {/* Response Time & Support Info */}
            <div className="mt-6 flex items-center gap-4 text-[11px] text-gray-500 font-sans tracking-wider">
              <span>Support: <strong>{businessHours}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Response: <strong>{responseTime}</strong></span>
            </div>
          </div>

          {/* Hero Right Visuals - High-Contrast Statistics Grid (Theme Match) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center" id="hero-right-visuals">
            {/* Ambient Background Glow behind grid */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-none blur-[60px] -z-10" />

            <div className="w-full max-w-md bg-[#080808] border border-white/10 p-1 relative z-10">
              {/* Decorative inner line */}
              <div className="border border-white/5 p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-6 font-bold">
                  PRODUCTION CAPACITY
                </span>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-none overflow-hidden">
                  <div className="p-5 bg-[#080808]">
                    <div className="text-3xl sm:text-4xl font-serif text-[#D4AF37] font-semibold">25+</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Editors</div>
                  </div>
                  <div className="p-5 bg-[#080808]">
                    <div className="text-3xl sm:text-4xl font-serif text-[#D4AF37] font-semibold">100K+</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Edited Images</div>
                  </div>
                  <div className="p-5 bg-[#080808]">
                    <div className="text-3xl sm:text-4xl font-serif text-[#D4AF37] font-semibold">10K+</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Projects</div>
                  </div>
                  <div className="p-5 bg-[#080808]">
                    <div className="text-3xl sm:text-4xl font-serif text-[#D4AF37] font-semibold">98%</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Satisfaction</div>
                  </div>
                </div>

                {/* Additional metadata info matching layout */}
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-wider text-gray-400">
                  <span>LIVE WORKFLOW SYNC</span>
                  <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                    ACTIVE
                  </span>
                </div>

                <div className="mt-4 text-center">
                  <button 
                    onClick={() => onNavigate("ai-diagnosis")}
                    className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                    Try Live AI Retouch Analysis
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
