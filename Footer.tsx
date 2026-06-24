import { Award, ShieldCheck, Clock, CheckCircle2, RefreshCw } from "lucide-react";

export default function TrustSection() {
  const steps = [
    {
      num: "01",
      title: "Receive Images",
      desc: "Clients upload raw camera files, high-res catalog images, or PSD files securely via FTP, Google Drive, or our portal."
    },
    {
      num: "02",
      title: "Requirement Discussion",
      desc: "We discuss exact reflection control requirements, background settings, metal alloy shine, and gemstone presets."
    },
    {
      num: "03",
      title: "Precision Editing",
      desc: "Our team of 25 specialists executes clipping paths, dust cleaning, gemstone enhancement, and metal repolishing."
    },
    {
      num: "04",
      title: "Quality Control (QC)",
      desc: "Senior directors and M.R Mahatab scrutinize every file at 300% magnification to verify reflection curves and prongs."
    },
    {
      num: "05",
      title: "Final Delivery",
      desc: "Perfect high-end product files are delivered securely in layered TIF, transparent PNG, or web-optimized JPEGs."
    }
  ];

  const coreValues = [
    {
      icon: <Award className="w-5 h-5 text-[#d4af37]" />,
      title: "High-End Quality",
      desc: "We do not compromise. We focus on microscopic adjustments, restoring genuine metal luster and gemstone refraction index."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#d4af37]" />,
      title: "Dedicated QC Team",
      desc: "A multi-layered quality control pipeline ensures every file delivered aligns perfectly with luxury catalog guidelines."
    },
    {
      icon: <Clock className="w-5 h-5 text-[#d4af37]" />,
      title: "Fast Delivery & Bulk",
      desc: "With 25 professional editors operating in rotating shifts, we can easily process up to 5,000 pristine edits every single week."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#d4af37]" />,
      title: "Unlimited Revisions",
      desc: "Client satisfaction is our absolute baseline. We offer unlimited, immediate revision adjustments until your files look impeccable."
    }
  ];

  return (
    <section id="trust-section" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.015] rounded-full blur-[120px] -mr-30 -mt-30 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story & Mission grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Story & Vision (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              The Agency
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl text-white mb-6 leading-tight">
              Our Legacy of <span className="italic font-serif text-[#D4AF37]">Perfection</span>
            </h2>
            <div className="space-y-4 font-sans text-sm text-gray-400 leading-relaxed font-light">
              <p>
                Founded in Bangladesh, <strong>Jewelry Perfection</strong> has grown into an elite, dedicated jewelry photo retouching and e-commerce product image editing agency serving brands, luxury photographers, and catalog houses worldwide.
              </p>
              <p>
                Unlike generic editing services that handle everything from clothing to cars, we maintain a strict, singular focus: <strong>Jewelry</strong>. Our 25 specialists have studied how light flows through emeralds, diamonds, pearls, and gold alloy curves, mastering the unique reflection physics that separate basic edits from high-end retail masterpieces.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <div className="p-6 bg-[#080808] border border-white/10 rounded-none text-left relative overflow-hidden">
                <h4 className="font-display text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-3">
                  Our Mission
                </h4>
                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                  To provide world-class, premium jewelry image editing solutions that help global brands showcase their fine creations with exceptional quality, micro-precision, and consistent retail alignment.
                </p>
              </div>

              <div className="p-6 bg-[#080808] border border-white/10 rounded-none text-left relative overflow-hidden">
                <h4 className="font-display text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-3">
                  Our Vision
                </h4>
                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                  To become the most trusted and sought-after jewelry retouching collective in the global luxury market, recognized for flawless accuracy and seamless bulk capacity.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values / Strengths (5 cols) */}
          <div className="lg:col-span-5 text-left bg-[#080808] border border-white/10 p-8 rounded-none shadow-xl">
            <h3 className="font-display text-base font-semibold text-white mb-6 border-b border-white/10 pb-3 uppercase tracking-widest">
              Why Brands Trust Us
            </h3>
            <div className="space-y-6">
              {coreValues.map((value, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 p-2.5 bg-white/5 border border-white/10 rounded-none">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">
                      {value.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Workflow Diagram Section */}
        <div className="border-t border-white/10 pt-20" id="workflow-diagram">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              The Process
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            </div>
            <h3 className="font-display font-light text-2xl sm:text-3xl text-white">
              Professional <span className="italic font-serif text-[#D4AF37]">Agency</span> Workflow
            </h3>
          </div>

          {/* Horizontal/Vertical Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Connection line helper */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-white/10 -z-10" />

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col text-center items-center group">
                {/* Step Square */}
                <div className="w-14 h-14 rounded-none bg-[#080808] border border-white/10 flex items-center justify-center text-[#D4AF37] font-mono text-sm font-bold shadow-lg shadow-black group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all duration-300 rotate-45">
                  <span className="-rotate-45">{step.num}</span>
                </div>
                
                {/* Step Content */}
                <h4 className="font-display text-sm font-semibold text-white mt-8 mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h4>
                
                <p className="font-sans text-xs text-gray-500 font-light leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
