'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryMedia from './GalleryMedia';

export default function AsymmetricPortfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const galleryItems: { url: string; type: 'video' | 'image' }[] = selected
    ? [
        ...(selected.mediaUrl ? [{ url: selected.mediaUrl, type: selected.mediaType }] : []),
        ...(selected.gallery ?? []),
      ]
    : [];

  const openProject = (project: any) => setSelected(project);

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

  // Gallery: lock page scroll behind it; Escape closes
  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  // Tracks cursor placement inside row blocks for the floating element
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-zinc-950 text-zinc-50 py-32 relative select-none"
    >
      {/* STYLE INJECTION TO STABILIZE DYNAMIC CAROUSELS AND HIDE SCROLLBARS */}
      <style jsx global>{`
        .no-raw-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-raw-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      {/* 1. INTRO HEADER */}
      <div className="master mb-20">
        <div className="space-y-2">
          <h2 className="font-sans text-4xl font-black tracking-tighter sm:text-6xl uppercase">Selected Productions.</h2>
        </div>
      </div>

      {/* 2. THE STRETCHED FULL-WIDTH INDEX GRID */}
      <div 
        className="relative master"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredId(null)}
      >
        <div className="w-full border-t border-zinc-900">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onClick={() => openProject(project)}
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

      {/* 3. FULL-SCREEN GALLERY: scroll down through everything */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="gallery"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-zinc-950 text-zinc-50"
          >
            {/* Pinned top bar */}
            <div className="sticky top-0 z-10 bg-zinc-950/80">
              <div className="master flex items-center justify-between gap-6 py-5">
                <h3 className="font-sans text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
                  {selected.title}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="font-sans uppercase tracking-wider text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="master pt-10 pb-32">
              {selected.longDesc && (
                <p className="font-sans text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-16">
                  {selected.longDesc}
                </p>
              )}

              <div className="flex flex-col gap-6 md:gap-10">
                {galleryItems.map((item, i) => (
                  <GalleryMedia
                    key={`${selected.id}-${i}`}
                    url={item.url}
                    type={item.type}
                    alt={`${selected.title} ${i + 1}`}
                    eager={i < 2}
                  />
                ))}
              </div>

              <div className="mt-20">
                <button
                  onClick={() => setSelected(null)}
                  className="font-sans uppercase tracking-wider text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
                >
                  Back to work
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
