import { useState } from "react";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQSection({ phone }: { phone: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast is your jewelry image delivery?",
      a: "Our standard delivery turnaround time is 24 hours. For urgent or smaller catalog projects, we can deliver pristine final files within 12 hours. Massive bulk collections (500+ files) are delivered on a rolling progressive timeline depending on client requirements."
    },
    {
      q: "Can you handle high-volume bulk projects?",
      a: "Yes, absolutely! With a dedicated, expert collective of 25 image retouchers, our agency has a progressive capacity of handling over 5,000 professional high-resolution edits every week. We excel in maintaining consistent contrast, metallic shine, and shadow angles across large-scale e-commerce lines."
    },
    {
      q: "Do you offer revisions if adjustments are needed?",
      a: "Client satisfaction is our highest metric. We offer unlimited, immediate revisions on all projects. If you need reflection positions shifted, gold hue adjustments, or gemstone shadow depth tweaked, our QC directors coordinate immediate revisions."
    },
    {
      q: "What file formats do you provide for final jewelry images?",
      a: "We provide files in whatever format your photography or e-commerce catalog requires. Our standard outputs include multi-layer high-end TIF/PSD files (with transparent paths separated), transparent PNGs, and web-optimized sRGB JPEGs matching Shopify, Amazon, and Etsy specs."
    },
    {
      q: "Do you provide transparent PNG clipping path separation?",
      a: "Yes, of course. Every background removal service is executed using hand-drawn vector pen-tool clipping paths. This ensures perfectly crisp, natural-looking edges with zero pixel leakage, isolated perfectly on a transparent PNG or separate layer in your TIF file."
    },
    {
      q: "How do we ensure our proprietary designs remain confidential?",
      a: "We maintain 100% strict data security protocols. Jewelry Perfection operates under strict Non-Disclosure Agreements (NDAs). Your raw photography files and custom metal molds are stored on secure local servers and will never be shared, published, or sold."
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  return (
    <section id="faq" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="faq-header">
          <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            Common Inquiries
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-white mb-4">
            Frequently <span className="italic font-serif text-[#D4AF37]">Asked</span> Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left" id="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-none transition-all duration-300 ${
                  isOpen 
                    ? "bg-[#0c0c0c] border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(212,175,55,0.05)]" 
                    : "bg-[#080808] border-white/10 hover:border-[#D4AF37]/30"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between gap-4 text-left font-display text-sm sm:text-base font-semibold text-white hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    {faq.q}
                  </span>
                  <span className="shrink-0 p-1 rounded-none bg-white/5 border border-white/10 text-[#D4AF37]">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Accordion Panel Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-white/10 text-gray-400 font-sans text-xs sm:text-sm font-light leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Help Box */}
        <div className="mt-16 text-center bg-[#080808] border border-white/10 rounded-none p-8 max-w-2xl mx-auto">
          <h4 className="font-display text-base font-semibold text-white mb-2">
            Have a different technical specification?
          </h4>
          <p className="font-sans text-xs text-gray-500 font-light max-w-md mx-auto mb-6 leading-relaxed">
            Our directors are online 24/7 to discuss layered file exports, custom background textures, and strict brand style sheets.
          </p>
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#D4AF37] text-black text-xs font-sans font-bold uppercase tracking-widest rounded-none transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with QC Lead on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
