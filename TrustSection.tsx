@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Playfair Display", serif;
  --font-brand: "Cinzel", serif;
  --font-mono: "JetBrains Mono", monospace;
  
  --color-gold-50: #fefcf3;
  --color-gold-100: #faf3d4;
  --color-gold-200: #f3e2a5;
  --color-gold-300: #ebcf70;
  --color-gold-400: #e2b740;
  --color-gold-500: #d4af37; /* Luxury Gold */
  --color-gold-600: #b49129;
  --color-gold-700: #8c6f1f;
  --color-gold-800: #644e17;
  --color-gold-900: #3d3010;
}

@layer base {
  body {
    background-color: #080808;
    color: #e5e5e5;
    font-family: var(--font-sans);
    overflow-x: hidden;
  }
}

/* Glassmorphism utility */
.glass-panel {
  background: rgba(15, 15, 15, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.15);
}

.glass-panel-hover:hover {
  background: rgba(20, 20, 20, 0.85);
  border-color: rgba(212, 175, 55, 0.35);
  box-shadow: 0 10px 30px -10px rgba(212, 175, 55, 0.1);
}

/* Custom comparative slider styles */
.slider-container {
  position: relative;
  overflow: hidden;
  user-select: none;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #d4af37;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #f3e2a5;
}

/* Base64 filters to simulate before/after editing */
.preset-ring-before {
  filter: saturate(0.65) brightness(0.85) contrast(0.9) blur(0.5px);
}
.preset-emerald-before {
  filter: saturate(0.5) brightness(0.7) contrast(0.8) hue-rotate(15deg);
}
.preset-watch-before {
  filter: saturate(0.8) brightness(0.75) contrast(0.85) blur(0.8px);
}
