'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ZoomIn } from 'lucide-react';

/* ==========================================================================
   ⚡ PERFORMANCE ENGINE: LAZY AUTOPLAY COMPONENT
   Uses IntersectionObserver to protect network threads while retaining autoplay motion.
   ========================================================================== */
function LazyAutoplayVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is visible: permit asset download and trigger immediate autoplay
          setIsLoaded(true);
          videoNode.play().catch((err) => console.log("Autoplay blocked by browser policy:", err));
        } else {
          // Element slid off-screen: pause playback and kill running background render cycles
          videoNode.pause();
        }
      },
      { threshold: 0.1 } // Triggers when at least 10% of the video box breaks into view
    );

    observer.observe(videoNode);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={isLoaded ? src : undefined} // 🛑 Completely blocks data transfer until element scrolls onto screen
      loop
      muted
      playsInline
      preload="none"
      className="w-full h-full object-cover"
    />
  );
}

/* ==========================================================================
   🎛️ CORE COMPONENT: ASYMMETRIC PORTFOLIO INDEX
   ========================================================================== */
export default function AsymmetricPortfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Memory-isolated lightbox state managers to kill ghost video streams
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [lightboxType, setLightboxType] = useState<'video' | 'image' | null>(null);

  // Dynamic directory scanner fetch stream initialization hook
  useEffect(() => {
    async function loadDynamicMedia() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (err) {
        console.error('FAILED_TO_CONNECT_TO_SCANNER_API_STREAM', err);
      }
    }
    loadDynamicMedia();
  }, []);

  // Tracks cursor placement inside row blocks for the floating element
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Explicit unmount handler to forcefully wipe the video node out of browser memory
  const closeLightbox = () => {
    setLightboxUrl(null);
    setLightboxType(null);
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 relative select-none"
    >
      {/* 1. INTRO HEADER */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// EDITORIAL_INDEX_v7.5_STABLE</span>
          <h2 className="font-sans text-4xl font-black tracking-tighter sm:text-6xl uppercase">Selected Productions.</h2>
        </div>
      </div>

      {/* 2. THE STRETCHED FULL-WIDTH INDEX GRID */}
      <div 
        className="relative max-w-7xl mx-auto border-t border-zinc-900"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredId(null)}
      >
        <div className="w-full">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onClick={() => setSelected(project)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-zinc-900 cursor-pointer transition-colors duration-300 hover:border-zinc-700"
            >
              {/* Left Column: Index Number + Full-Width Headings */}
              <div className="flex items-baseline gap-6 md:gap-12 z-10">
                <span className="font-mono text-xs text-zinc-600 group-hover:text-[#ff4e3e] transition-colors duration-300">
                  [0{idx + 1}]
                </span>
                <h3 className="font-sans text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter text-zinc-100 group-hover:text-[#ffe66c] transition-colors duration-300 uppercase">
                  {project.title}
                </h3>
              </div>

              {/* Right Column: Meta Category Badges */}
              <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0 z-10 pl-14 md:pl-0">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-500 px-2.5 py-1 rounded">
                  {project.category}
                </span>
                <div className="rounded-full border border-zinc-800 p-2 bg-zinc-950 text-zinc-500 group-hover:text-zinc-100 group-hover:border-zinc-50 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CINEMATIC FLOATING HOVER PREVIEW IMAGE ENGINE */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              className="absolute pointer-events-none z-20 w-80 h-48 rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl hidden lg:block"
              style={{
                left: mousePos.x + 24,
                top: mousePos.y - 96,
              }}
            >
              {(() => {
                const activeProj = projects.find(p => p.id === hoveredId);
                if (!activeProj || !activeProj.mediaUrl) return null;
                return activeProj.mediaType === 'video' ? (
                  <video 
                    src={activeProj.mediaUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="none" 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <img 
                    src={activeProj.mediaUrl} 
                    alt={activeProj.title} 
                    loading="lazy" 
                    className="h-full w-full object-cover" 
                  />
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. FULL-WIDTH PROJECT DISPLAY OVERLAY */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/98 backdrop-blur-2xl">
            <div className="absolute inset-0 -z-10" onClick={() => setSelected(null)} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 32, stiffness: 220 }}
              className="relative flex h-screen w-full flex-col bg-zinc-950 overflow-y-auto px-6 py-12 md:px-16 lg:px-24 justify-between"
            >
              <button 
                onClick={() => setSelected(null)} 
                className="absolute top-8 right-6 md:right-16 lg:right-24 z-30 rounded-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* OVERHEAD CASE DETAILS */}
              <div className="space-y-4 max-w-4xl pt-8">
                <span className="inline-block rounded bg-[#ff4e3e]/10 border border-[#ff4e3e]/20 px-2.5 py-0.5 font-mono text-[9px] text-[#ff4e3e] uppercase tracking-widest">
                  {selected.category}
                </span>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-zinc-50 leading-none">
                  {selected.title}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                  {selected.longDesc}
                </p>
              </div>

              {/* EXPANSIVE MULTI-IMAGE SCROLL GALLERY */}
              <div className="w-full py-8">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffe66c] animate-pulse" />
                  // CASE_STUDY_PRODUCTION_ASSETS (CLICK ANY MEDIA TO EXPAND / SWIPE HORIZONTALLY →)
                </div>
                
                <div 
                  className="flex gap-6 overflow-x-auto w-full h-[280px] md:h-[420px] pb-4 scrollbar-hide snap-x"
                  style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                  {/* Primary Feature Hero Block */}
                  {selected.mediaUrl && (
                    <div 
                      onClick={() => {
                        setLightboxUrl(selected.mediaUrl);
                        setLightboxType(selected.mediaType);
                      }}
                      className="relative h-full aspect-video flex-shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-900 cursor-zoom-in group/item snap-start"
                    >
                      <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover/item:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <ZoomIn className="text-zinc-100 h-6 w-6 transform scale-75 group-hover/item:scale-100 transition-transform duration-300" />
                      </div>
                      {selected.mediaType === 'video' ? (
                        <LazyAutoplayVideo src={selected.mediaUrl} />
                      ) : (
                        <img src={selected.mediaUrl} alt={selected.title} loading="lazy" className="w-full h-full object-cover" />
                      )}
                    </div>
                  )}

                  {/* Interior Secondary Gallery Items */}
                  {selected.gallery && selected.gallery.map((item: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        setLightboxUrl(item.url);
                        setLightboxType(item.type);
                      }}
                      className="relative h-full aspect-video flex-shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-900 cursor-zoom-in group/item snap-start"
                    >
                      <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover/item:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <ZoomIn className="text-zinc-100 h-6 w-6 transform scale-75 group-hover/item:scale-100 transition-transform duration-300" />
                      </div>
                      {item.type === 'video' ? (
                        <LazyAutoplayVideo src={item.url} />
                      ) : (
                        <img src={item.url} alt={`Asset ${i}`} loading="lazy" className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ISOLATED LIGHTBOX CINEMATIC DRAWER VIEW */}
      <AnimatePresence>
        {lightboxUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md p-4 md:p-12">
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 rounded-full bg-zinc-900 border border-zinc-800 p-2 text-zinc-400 hover:text-zinc-50 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute inset-0" onClick={closeLightbox} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl max-h-full aspect-video w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 flex items-center justify-center shadow-2xl"
            >
              {lightboxType === 'video' ? (
                <video src={lightboxUrl} autoPlay controls loop muted playsInline className="w-full h-full object-contain" />
              ) : (
                <img src={lightboxUrl} alt="Expanded presentation asset" className="w-full h-full object-contain" />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}











