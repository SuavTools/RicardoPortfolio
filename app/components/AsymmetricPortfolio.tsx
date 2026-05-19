'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';

export default function AsymmetricPortfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Tracks cursor coordinates specifically inside the index section for the hover media preview card
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
      className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 relative"
    >
      {/* SECTION INTRO */}
      <div className="max-w-3xl mb-24 space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// EDITORIAL_INDEX_v2.0</span>
        <h2 className="font-sans text-4xl font-black tracking-tighter sm:text-6xl">Selected Productions.</h2>
      </div>

      {/* THE FULL-WIDTH INDEX CONTAINER */}
      <div 
        className="relative max-w-7xl mx-auto border-t border-zinc-900"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredId(null)}
      >
        {PROJECTS.map((project, idx) => {
          const isHovered = hoveredId === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onClick={() => setSelected(project)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-zinc-900 cursor-pointer transition-colors duration-300 hover:border-zinc-700"
            >
              {/* Left Column: Number Index + Title */}
              <div className="flex items-baseline gap-6 md:gap-12 z-10">
                <span className="font-mono text-xs text-zinc-600 group-hover:text-[#ff4e3e] transition-colors duration-300">
                  [0{idx + 1}]
                </span>
                <h3 className="font-sans text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-zinc-100 group-hover:text-[#ffe66c] transition-colors duration-300 uppercase">
                  {project.title}
                </h3>
              </div>

              {/* Right Column: Meta Tag Summary */}
              <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0 z-10 pl-14 md:pl-0">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-500 px-2.5 py-1 rounded">
                  {project.category}
                </span>
                <div className="rounded-full border border-zinc-800 p-2 bg-zinc-950 text-zinc-500 group-hover:text-zinc-100 group-hover:border-zinc-50 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}

        {/* DYNAMIC FLOATING PREVIEW CARD (Tracks Cursor Hover) */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute pointer-events-none z-20 w-80 h-48 rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl hidden lg:block"
              style={{
                left: mousePos.x + 24, // Displaces preview window slightly away from cursor point
                top: mousePos.y - 96,  // Centers preview height relative to pointer location
              }}
            >
              {(() => {
                const activeProj = PROJECTS.find(p => p.id === hoveredId);
                if (!activeProj) return null;
                return activeProj.mediaType === 'video' ? (
                  <video 
                    src={activeProj.mediaUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
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

      {/* IMMERSIVE SIDE DRAWER DRAWER PANELS (Unchanged) */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end bg-zinc-950/90 backdrop-blur-xl">
            <div className="absolute inset-0 -z-10" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 260 }}
              className="relative flex h-[90vh] md:h-full w-full max-w-5xl flex-col md:flex-row bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-900 overflow-hidden"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-20 rounded-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 hover:text-zinc-50 transition shadow-md"><X className="h-4 w-4" /></button>
              <div className="relative h-[35%] w-full md:h-full md:w-3/5 bg-zinc-900">
                {selected.mediaType === 'video' ? (
                  <video src={selected.mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={selected.mediaUrl} alt={selected.title} className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
              </div>
              <div className="flex-1 p-6 md:p-12 overflow-y-auto flex flex-col justify-between bg-zinc-950">
                <div className="space-y-6">
                  <span className="inline-block rounded bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 font-mono text-[10px] text-[#ff4e3e] uppercase">{selected.category}</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">{selected.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selected.longDesc}</p>
                  <div className="space-y-2">
                    <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">// DEPLOYMENT_TAGS</h4>
                    <div className="flex flex-wrap gap-1.5">{selected.tags.map(t => <span key={t} className="rounded bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">{t}</span>)}</div>
                  </div>
                </div>
                <div className="border-t border-zinc-900 pt-4 mt-8 font-mono text-[10px] text-zinc-600 flex justify-between"><span>LOG: {selected.id.toUpperCase()}</span><span>OUTPOST: AUS</span></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


