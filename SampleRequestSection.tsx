import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Sparkles, Upload, Loader2, RefreshCw, AlertCircle, FileText, CheckCircle, BrainCircuit } from "lucide-react";

export default function AIDiagnosisTool() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingMessages = [
    "Uploading raw pixel data...",
    "Analyzing gold and platinum specular reflections...",
    "Critiquing diamond clarity & facet sparkle ratios...",
    "Scanning gemstone depth and contrast profiles...",
    "Evaluating background lighting & ground shadow alignment...",
    "Drafting master retouching suggestions..."
  ];

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file.");
      return;
    }

    setErrorMsg(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const runAnalysis = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    setLoadingStep(0);
    setErrorMsg(null);

    // Step-by-step loading animation
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: imagePreview })
      });

      const data = await response.json();
      clearInterval(interval);

      if (data.success) {
        setAnalysisResult(data.analysis);
      } else {
        setErrorMsg(data.message || "Failed to analyze image. Please ensure API key is configured.");
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorMsg("Server connection failed. Please ensure the dev server is active.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetTool = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setErrorMsg(null);
    setLoadingStep(0);
  };

  return (
    <section id="ai-diagnosis" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/10">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="ai-header">
          <div className="inline-flex items-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            Master QC Suite
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-white mb-4">
            AI-Powered Jewelry <span className="italic font-serif text-[#D4AF37]">Photo Diagnosis</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm font-light leading-relaxed">
            Upload a raw jewelry photograph. Our server-side neural engine will run a real-time retouching diagnostic evaluation to detect scratches, lighting gradients, stone fire clarity, and background quality.
          </p>
        </div>

        {/* Diagnostic Stage */}
        <div className="bg-[#080808] border border-white/10 p-6 sm:p-10 rounded-none shadow-2xl" id="ai-stage">
          {!imagePreview ? (
            /* Upload State */
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerSelect}
              className="border border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] bg-white/3 hover:bg-white/5 transition-all duration-300 py-16 px-6 text-center rounded-none cursor-pointer flex flex-col items-center group"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <div className="w-14 h-14 rounded-none border border-white/10 bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                <Upload className="w-6 h-6" />
              </div>
              <p className="font-display text-base font-semibold text-white mb-2">
                Drag & Drop Jewelry Photo
              </p>
              <p className="font-sans text-xs text-gray-500 max-w-xs leading-relaxed mb-4 font-light">
                Support high-resolution raw camera inputs, studio PNG, or JPEG files. Max 10MB.
              </p>
              <button 
                type="button"
                className="px-5 py-2.5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white font-sans text-[10px] uppercase tracking-widest bg-white/5 rounded-none transition-all"
              >
                Browse Local File
              </button>
            </div>
          ) : (
            /* Active Image State */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" id="ai-active-grid">
              
              {/* Image Preview Box (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="aspect-square bg-black border border-white/10 rounded-none overflow-hidden relative flex items-center justify-center p-4">
                  <img
                    src={imagePreview}
                    alt="Jewelry to analyze"
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                      <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mb-4" />
                      <p className="font-mono text-xs text-[#D4AF37] animate-pulse">
                        {loadingMessages[loadingStep]}
                      </p>
                    </div>
                  )}
                </div>

                {!isAnalyzing && !analysisResult && (
                  <div className="flex gap-3">
                    <button
                      onClick={runAnalysis}
                      className="flex-1 py-3 bg-[#D4AF37] text-black font-sans font-bold text-xs uppercase tracking-widest rounded-none transition-all"
                    >
                      Analyze Image
                    </button>
                    <button
                      onClick={resetTool}
                      className="p-3 border border-white/10 text-gray-400 hover:text-white rounded-none transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Analysis Result Box (7 cols) */}
              <div className="md:col-span-7 text-left" id="ai-result-box">
                {isAnalyzing && (
                  <div className="py-12 flex flex-col items-start gap-4">
                    <h4 className="font-display text-base font-semibold text-white flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                      Evaluating Jewelry Quality profile...
                    </h4>
                    <div className="space-y-3 w-full">
                      {loadingMessages.map((msg, index) => (
                        <div key={index} className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-none ${index < loadingStep ? "bg-green-500" : index === loadingStep ? "bg-[#D4AF37] animate-ping" : "bg-white/10"}`} />
                          <span className={`font-sans text-xs ${index <= loadingStep ? "text-gray-300" : "text-gray-600"} font-light`}>
                            {msg}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-none text-red-400 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-semibold text-sm text-white">Diagnostics Offline</h4>
                      <p className="font-sans text-xs mt-1 leading-relaxed text-red-400/80">
                        {errorMsg}
                      </p>
                    </div>
                  </div>
                )}

                {analysisResult && (
                  <div className="flex flex-col gap-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="font-display text-base font-semibold text-[#D4AF37] flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                        Retouching Diagnostic Assessment
                      </h4>
                      <button
                        onClick={resetTool}
                        className="font-sans text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Analyze Another
                      </button>
                    </div>

                    {/* Report Content */}
                    <div className="space-y-4 font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light bg-[#080808] p-6 border border-white/10 rounded-none max-h-[300px] overflow-y-auto">
                      {analysisResult.split("\n").map((para, pIdx) => {
                        if (para.trim() === "") return null;
                        
                        // Bold title highlights
                        if (para.startsWith("1.") || para.startsWith("2.") || para.startsWith("3.") || para.startsWith("4.") || para.toLowerCase().includes("section")) {
                          return (
                            <p key={pIdx} className="font-display font-semibold text-[#D4AF37] pt-3 border-t border-white/10 first:border-none first:pt-0">
                              {para}
                            </p>
                          );
                        }

                        return (
                          <p key={pIdx}>
                            {para}
                          </p>
                        );
                      })}
                    </div>

                    <div className="flex gap-4">
                      <a 
                        href="#contact"
                        className="flex-1 py-3 border border-white/10 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white font-sans text-xs text-center uppercase tracking-widest rounded-none transition-all duration-300"
                      >
                        Inquire About This Retouching Quote
                      </a>
                    </div>
                  </div>
                )}

                {!isAnalyzing && !analysisResult && !errorMsg && (
                  <div className="py-12 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                    <BrainCircuit className="w-10 h-10 text-gray-700 mb-3" />
                    <p className="font-sans text-xs">Ready for neural analysis. Click "Analyze Image" below the preview panel.</p>
                  </div>
                )}

              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
