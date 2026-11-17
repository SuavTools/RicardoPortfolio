'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AsymmetricPortfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryItems: { url: string; type: 'video' | 'image' }[] = selected
    ? [
        ...(selected.mediaUrl ? [{ url: selected.mediaUrl, type: selected.mediaType }] : []),
        ...(selected.gallery ?? []),
      ]
    : [];
  const activeItem = galleryItems[activeIndex];

  const step = (dir: number) => {
    if (galleryItems.length < 2) return;
    setActiveIndex((i) => (i + dir + galleryItems.length) % galleryItems.length);
  };

  const openProject = (project: any) => {
    setActiveIndex(0);
    setSelected(project);
  };

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

  // Gallery: lock page scroll; Escape closes, arrow keys step through
  const galleryCount = galleryItems.length;
  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      else if (galleryCount > 1 && e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % galleryCount);
      else if (galleryCount > 1 && e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + galleryCount) % galleryCount);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected, galleryCount]);

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

      {/* 3. FULL-SCREEN GALLERY */}
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
            className="fixed inset-0 z-50 flex flex-col bg-zinc-950 text-zinc-50"
          >
            {/* Top bar */}
            <div className="master flex items-start justify-between gap-6 py-5 flex-shrink-0">
              <div className="max-w-2xl space-y-2">
                <h3 className="font-sans text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
                  {selected.title}
                </h3>
                <p className="hidden md:block font-sans text-sm text-zinc-400 leading-relaxed">
                  {selected.longDesc}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="font-sans uppercase tracking-wider text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Media */}
            <div className="master relative flex-1 min-h-0">
              <AnimatePresence mode="wait" initial={false}>
                {activeItem && (
                  <motion.div
                    key={`${selected.id}-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    drag={galleryItems.length > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) step(1);
                      else if (info.offset.x > 60) step(-1);
                    }}
                    className="h-full flex items-center justify-center"
                  >
                    {activeItem.type === 'video' ? (
                      <video
                        src={activeItem.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        preload="auto"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <img
                        src={activeItem.url}
                        alt={`${selected.title} ${activeIndex + 1}`}
                        draggable={false}
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="master flex items-center justify-between py-5 flex-shrink-0 font-sans uppercase tracking-wider text-sm text-zinc-400">
              {galleryItems.length > 1 ? (
                <>
                  <button
                    onClick={() => step(-1)}
                    className="hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="text-zinc-600 tabular-nums">
                    {activeIndex + 1} / {galleryItems.length}
                  </span>
                  <button
                    onClick={() => step(1)}
                    className="hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </>
              ) : (
                <span />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
