'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Side drawer: lock page scroll and close on Escape while open
  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (lightboxUrl) {
        setLightboxUrl(null);
        setLightboxType(null);
      } else {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected, lightboxUrl]);

  // Tracks cursor placement inside row blocks for the floating element
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const closeLightbox = () => {
    setLightboxUrl(null);
    setLightboxType(null);
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 relative select-none"
    >
      {/* STYLE INJECTION TO STABILIZE DYNAMIC CAROUSELS AND HIDE SCROLLBARS */}
      <style jsx global>{`
        .no-raw-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-raw-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      {/* 1. INTRO HEADER */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="space-y-2">
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
              <div className="flex items-baseline gap-6 md:gap-12 z-10">
                <span className="font-mono text-xs text-zinc-600 group-hover:text-[#ff4e3e] transition-colors duration-300">
                  0{idx + 1}
                </span>
                <h3 className="font-sans text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter text-zinc-100 group-hover:text-[#ffe66c] transition-colors duration-300 uppercase">
                  {project.title}
                </h3>
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
                    preload="auto" 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <img 
                    src={activeProj.mediaUrl} 
                    alt={activeProj.title} 
                    className="h-full w-full object-cover" 
                  />
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. SIDE DRAWER PROJECT PANEL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
        )}
        {selected && (
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 34, stiffness: 260 }}
            className="fixed top-0 right-0 z-50 h-dvh w-full sm:w-[85vw] md:w-[60vw] lg:w-[48vw] max-w-3xl flex flex-col bg-zinc-950 border-l border-zinc-900 shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-end gap-4 px-6 py-5 md:px-10 border-b border-zinc-900 flex-shrink-0">
              <button
                onClick={() => setSelected(null)}
                className="font-sans text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Scrollable drawer body */}
            <div className="flex-1 overflow-y-auto no-raw-scrollbar px-6 py-8 md:px-10 space-y-10">
              <div className="space-y-4">
                <h3 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-zinc-50 leading-none">
                  {selected.title}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">
                  {selected.longDesc}
                </p>
              </div>

              <div>
                <div className="flex flex-col gap-6">
                  {[
                    ...(selected.mediaUrl ? [{ url: selected.mediaUrl, type: selected.mediaType }] : []),
                    ...(selected.gallery ?? []),
                  ].map((item: any, i: number) => (
                    <div
                      key={`${selected.id}-asset-${i}`}
                      onClick={() => {
                        setLightboxUrl(item.url);
                        setLightboxType(item.type);
                      }}
                      className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-900 cursor-zoom-in group/item shadow-xl"
                    >
                      {item.type === 'video' ? (
                        <video
                          key={`drawer-vid-${selected.id}-${i}`}
                          src={item.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img src={item.url} alt={`${selected.title} asset ${i + 1}`} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 4. ISOLATED LIGHTBOX CINEMATIC DRAWER VIEW */}
      <AnimatePresence>
        {lightboxUrl && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/95 backdrop-blur-md p-4 md:p-12">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 font-sans text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
            >
              Close
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












