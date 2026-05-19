'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ZoomIn } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';

export default function AsymmetricPortfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Lightbox view state manager
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Tracks cursor placement inside row blocks for the floating element
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="projects" className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 relative select-none">
      
      {/* 1. INTRO HEADER */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// EDITORIAL_INDEX_v5.2</span>
          <h2 className="font-sans text-4xl font-black tracking-tighter sm:text-6xl uppercase">Selected Productions.</h2>
        </div>
      </div>

      {/* 2. EDGE-TO-EDGE TIMELINE ROW INDEX GRID */}
      <div 
        className="relative max-w-7xl mx-auto border-t border-zinc-900" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => setHoveredId(null)}
      >
        <div className="w-full">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onClick={() => setSelected(project)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-zinc-900 cursor-pointer transition-colors duration-300 hover:border-zinc-700"
            >
              {/* Left Side elements */}
              <div className="flex items-baseline gap-6 md:gap-12 z-10">
                <span className="font-mono text-xs text-zinc-600 group-hover:text-[#ff4e3e] transition-colors duration-300">[0{idx + 1}]</span>
                <h3 className="font-sans text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter text-zinc-100 group-hover:text-[#ffe66c] transition-colors duration-300 uppercase">{project.title}</h3>
              </div>
              
              {/* Right Side Category Badges */}
              <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0 z-10 pl-14 md:pl-0">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-500 px-2.5 py-1 rounded">{project.category}</span>
                <div className="rounded-full border border-zinc-800 p-2 bg-zinc-950 text-zinc-500 group-hover:text-zinc-100 group-hover:border-zinc-50 transition-all"><ArrowUpRight className="h-4 w-4" /></div>
              </div>
            </div>
          ))}
        </div>

        {/* FLOATING HOVER CARD PREVIEW */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              className="absolute pointer-events-none z-20 w-80 h-48 rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl hidden lg:block"
              style={{ left: mousePos.x + 24, top: mousePos.y - 96 }}
            >
              {(() => {
                const activeProj = PROJECTS.find(p => p.id === hoveredId);
                if (!activeProj) return null;
                return activeProj.mediaType === 'video' ? (
                  <video src={activeProj.mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={activeProj.mediaUrl} alt={activeProj.title} className="h-full w-full object-cover" />
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. IMAGES & VIDEOS MIXED DEEP-DIVE OVERLAY DISPLAY CHASSIS */}
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
              {/* Main Close Action Trigger Control */}
              <button onClick={() => setSelected(null)} className="absolute top-8 right-6 md:right-16 lg:right-24 z-30 rounded-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 transition cursor-pointer"><X className="h-4 w-4" /></button>

              {/* Case Information Header */}
              <div className="space-y-4 max-w-4xl pt-8">
                <span className="inline-block rounded bg-[#ff4e3e]/10 border border-[#ff4e3e]/20 px-2.5 py-0.5 font-mono text-[9px] text-[#ff4e3e] uppercase tracking-widest">{selected.category}</span>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-zinc-50 leading-none">{selected.title}</h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-3xl font-light">{selected.longDesc}</p>
              </div>

              {/* DYNAMIC HORIZONTAL MULTI-MEDIA GALLERY TRACK ENGINE */}
              <div className="w-full py-8">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffe66c] animate-pulse" />
                  // CASE_STUDY_PRODUCTION_ASSETS (SWIPE HORIZONTALLY)
                </div>
                
                <div 
                  className="flex gap-6 overflow-x-auto w-full h-[280px] md:h-[420px] pb-4 scrollbar-hide snap-x" 
                  style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                  {/* Primary Feature Hero Block */}
                  <div 
                    onClick={() => selected.mediaType === 'image' && setLightboxImg(selected.mediaUrl)}
                    className={`w-[360px] md:w-[640px] h-full bg-zinc-900 border border-zinc-900 rounded-2xl overflow-hidden shrink-0 snap-start shadow-2xl relative group/hero ${selected.mediaType === 'image' ? 'cursor-zoom-in' : ''}`}
                  >
                    {selected.mediaType === 'video' ? (
                      <video src={selected.mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <img src={selected.mediaUrl} alt={selected.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/hero:opacity-100 flex items-center justify-center transition-opacity duration-300"><ZoomIn className="h-6 w-6 text-zinc-100" /></div>
                      </>
                    )}
                  </div>

                  {/* Fully Rectified: Mapping parameters from the active .gallery array framework */}
                  {selected.gallery.map((asset, assetIdx) => (
                    <div 
                      key={assetIdx}
                      onClick={() => asset.type === 'image' && setLightboxImg(asset.url)}
                      className={`w-[360px] md:w-[640px] h-full bg-zinc-900 border border-zinc-900 rounded-2xl overflow-hidden shrink-0 snap-start relative flex flex-col justify-between p-4 group/asset shadow-2xl ${asset.type === 'image' ? 'cursor-zoom-in' : ''}`}
                    >
                      {asset.type === 'video' ? (
                        <video src={asset.url} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-85 group-hover/asset:scale-[1.01] transition-transform duration-500" />
                      ) : (
                        <>
                          <img src={asset.url} alt={`Production slide frame ${assetIdx + 1}`} className="absolute inset-0 h-full w-full object-cover opacity-85 group-hover/asset:scale-[1.01] transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/asset:opacity-100 flex items-center justify-center transition-opacity duration-300"><ZoomIn className="h-6 w-6 text-zinc-100" /></div>
                        </>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                      <span className="z-10 font-mono text-[8px] text-zinc-400 bg-zinc-950/80 px-2.5 py-1 rounded w-fit border border-zinc-900 uppercase tracking-wider">
                        //_{asset.type.toUpperCase()}_0{assetIdx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Specifications Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-zinc-900 pt-6 gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map(t => <span key={t} className="rounded bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400 uppercase tracking-wide">{t}</span>)}
                </div>
                <div className="font-mono text-[9px] text-zinc-600 flex justify-between gap-6 shrink-0 w-full sm:w-auto uppercase tracking-wider">
                  <span>REG_ID: {selected.id.toUpperCase()}</span>
                  <span>OUTPOST: AUS_SYS_OK</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. PREMIUM CINEMATIC LIGHTBOX MODAL OVERLAY SHEET */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl cursor-zoom-out p-4 md:p-12"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={lightboxImg}
              alt="High resolution active frame"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-zinc-900"
            />
            <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">[ CLICK_ANYWHERE_TO_CLOSE ]</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}






