import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import { BeforeAfterProject } from "../types";
import { Sparkles, MoveHorizontal, Check } from "lucide-react";

interface BeforeAfterSectionProps {
  projects: BeforeAfterProject[];
}

export default function BeforeAfterSection({ projects }: BeforeAfterSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject: BeforeAfterProject | undefined = projects[activeIdx];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeIdx, activeProject]);

  // Handle calculation of slider percentage based on client coordinate
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: ReactTouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  if (!activeProject) {
    return (
      <section id="before-after" className="py-24 bg-[#0a0a0a] text-center border-t border-[#d4af37]/10">
        <p className="text-gray-400 font-sans">No comparison projects loaded yet.</p>
      </section>
    );
  }

  // Determine if we should use preset filters to simulate Before image
  const beforeImgClass = activeProject.presetFilter 
    ? `${activeProject.presetFilter}-before w-full h-full object-contain`
    : "w-full h-full object-contain";

  return (
    <section id="before-after" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.02] rounded-full blur-[120px] -mr-30 -mt-30 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.01] rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="ba-header">
          <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            Quality Proof
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-white mb-4">
            Interactive <span className="italic font-serif text-[#D4AF37]">Before & After</span> Showcase
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Drag the golden slider to compare the raw camera input directly with our hand-retouched production file. Observe the elimination of scratches, color shift corrections, and enhanced jewelry fire.
          </p>
        </div>

        {/* Project Selector Menu */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" id="ba-project-selector">
          {projects.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => {
                setActiveIdx(idx);
                setSliderPosition(50); // Reset slider
              }}
              className={`px-5 py-2.5 rounded-none font-sans text-xs tracking-widest uppercase transition-all duration-300 border ${
                idx === activeIdx
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                  : "bg-[#080808] text-gray-400 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="ba-comparison-container">
          
          {/* Slider Left Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The interactive slider window */}
            <div 
              ref={containerRef}
              className="slider-container w-full aspect-[4/3] rounded-none border border-white/10 overflow-hidden relative cursor-col-resize shadow-2xl bg-[#121212]"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* After Image (Base Layer underneath) */}
              <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-center">
                <img
                  src={activeProject.afterUrl}
                  alt="Professional Retouched Jeweler After"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </div>

              {/* Before Image (Top Clip Layer) */}
              <div 
                className="absolute inset-0 w-full h-full p-4 flex items-center justify-center bg-[#121212] overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div 
                  className="absolute inset-0 w-full h-full p-4 flex items-center justify-center"
                  style={{ width: containerWidth }}
                >
                  <img
                    src={activeProject.beforeUrl}
                    alt="Raw Unretouched Jeweler Before"
                    className={beforeImgClass}
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Comparison Text Overlays */}
              <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-widest uppercase px-4 py-2 bg-black/80 border border-white/10 text-white pointer-events-none rounded-none select-none">
                Before: Raw Capture
              </div>
              <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest uppercase px-4 py-2 bg-[#D4AF37] text-black font-black pointer-events-none rounded-none select-none shadow-lg">
                After: Elite Retouch
              </div>

              {/* Slider Center Line and Handle Thumb */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center pointer-events-auto shadow-xl">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Instruction */}
            <p className="mt-4 font-sans text-xs text-gray-500 italic flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Drag the golden line left and right to inspect the pixel alignment.
            </p>
          </div>

          {/* Project Details Right (5 cols) */}
          <div className="lg:col-span-5 flex flex-col text-left" id="ba-project-details">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] bg-white/5 border border-white/10 px-3 py-1 self-start rounded-none mb-4">
              {activeProject.category}
            </span>

            <h3 className="font-display text-2xl font-semibold text-white mb-3">
              {activeProject.title}
            </h3>

            <p className="font-sans text-sm text-gray-400 leading-relaxed font-light mb-6">
              {activeProject.description}
            </p>

            <h4 className="font-display text-xs tracking-widest uppercase text-white font-medium mb-3 border-b border-white/10 pb-2">
              Retouching Actions Applied:
            </h4>

            {/* Checklist of actions applied */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="ba-applied-services">
              {activeProject.servicesApplied.map((service, index) => (
                <div key={index} className="flex items-center gap-2.5 py-1">
                  <div className="w-5 h-5 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#D4AF37]" />
                  </div>
                  <span className="font-sans text-xs text-gray-300 font-light">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Pricing Note */}
            <div className="mt-8 p-5 bg-[#080808] border border-white/10 rounded-none flex items-center gap-4">
              <div className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center rotate-45 shrink-0">
                <span className="-rotate-45 font-serif font-bold text-[#D4AF37] text-xs">JP</span>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-500 font-bold">Average Turnaround</p>
                <p className="font-sans text-xs font-semibold text-white mt-0.5">Under 24 Hours • Bulk Discounts Available</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
