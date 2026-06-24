import { Service } from "../types";
import { Sparkles, Scissors, Gem, Zap, Sun, Paintbrush, ShieldCheck, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  // Map icon names to lucide components
  const renderIcon = (name: string) => {
    const iconClass = "w-6 h-6 text-[#d4af37]";
    switch (name) {
      case "Sparkles": return <Sparkles className={iconClass} />;
      case "Scissors": return <Scissors className={iconClass} />;
      case "Gem": return <Gem className={iconClass} />;
      case "Zap": return <Zap className={iconClass} />;
      case "Sun": return <Sun className={iconClass} />;
      case "Paintbrush": return <Paintbrush className={iconClass} />;
      default: return <ShieldCheck className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.02] rounded-full blur-[120px] -ml-20 -mt-20 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20" id="services-header">
          <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            Expertise & Specialties
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-white mb-4">
            World-Class Retouching <span className="italic font-serif text-[#D4AF37]">Solutions</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Our team of 25 dedicated specialists leverages high-end pixel manipulation to elevate every gold curve, diamond facet, and colored gemstone reflection to absolute commercial perfection.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-[#080808] border border-white/10 p-8 rounded-none relative overflow-hidden transition-all duration-300 group hover:border-[#D4AF37]/40 hover:bg-[#121212] shadow-xl"
              id={`service-card-${service.id}`}
            >
              {/* Background ambient light on hover */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none pointer-events-none" />

              {/* Icon and Price Container */}
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                  {renderIcon(service.iconName)}
                </div>
                {service.price && (
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#D4AF37] px-2.5 py-1 rounded-none bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                    {service.price}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-lg font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {service.description}
              </p>

              {/* Bullet Benefits list */}
              <ul className="space-y-2 border-t border-white/10 pt-4 mb-8">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs text-gray-400 font-sans font-light">
                    <span className="text-[#D4AF37] mt-1 text-[10px]">✦</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full py-3 bg-white hover:bg-[#D4AF37] text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none flex items-center justify-center gap-1.5"
              >
                Inquire For Bulk
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic CTA at the bottom */}
        <div className="mt-16 text-center bg-[#080808] border border-white/10 p-8 rounded-none max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37] opacity-[0.015] rounded-full blur-3xl pointer-events-none" />
          <div className="text-left relative z-10">
            <h4 className="font-display text-lg font-semibold text-white mb-1">
              Need custom technical specifications?
            </h4>
            <p className="font-sans text-xs text-gray-400 font-light">
              We work with specialized jewelry guidelines, high-fidelity color presets, and multi-layered TIF files.
            </p>
          </div>
          <button
            onClick={() => onSelectService("Custom Jewelry Retouching Protocol")}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-white text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none shadow-md shrink-0 relative z-10"
          >
            Request custom quote
          </button>
        </div>

      </div>
    </section>
  );
}
