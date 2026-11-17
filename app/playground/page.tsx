'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Import your independent engineering sandbox nodes cleanly
import PlaygroundGame from '../components/PlaygroundGame';
import PlaygroundScroll from '../components/PlaygroundScroll';
import PlaygroundShader from '../components/PlaygroundShader';

const MODULE_REGISTRY = [
  { 
    id: '01', 
    title: 'Retro game',
    desc: 'A little space shooter, built from scratch on a canvas.',
    component: PlaygroundGame
  },
  { 
    id: '02', 
    title: 'Scroll type',
    desc: 'Type that stretches and skews the faster you scroll.',
    component: PlaygroundScroll
  },
  { 
    id: '03', 
    title: 'Dither field',
    desc: 'A pixel pattern that keeps moving in the brand colours.',
    component: PlaygroundShader
  }
];

export default function Playground() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const CurrentActiveComponent = MODULE_REGISTRY.find(m => m.id === activeModuleId)?.component || null;

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-50 px-6 py-24 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden relative selection:bg-[#ffe66c] selection:text-zinc-950">

      {/* HEADER CONTROLS */}
      <div className="max-w-4xl space-y-6 w-full mx-auto">
        <Link 
          href="/" 
          className="font-sans text-sm text-zinc-300 underline underline-offset-[6px] decoration-zinc-700 hover:decoration-zinc-200 hover:text-zinc-50 transition-colors"
        >
          Back
        </Link>
        
        <div className="space-y-1">
          <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">The Lab.</h1>
        </div>
        
        <p className="font-sans text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
          Small things I&apos;ve built for fun outside of client work.
        </p>
      </div>

      {/* THE PRIMARY LAB DISPLAY GRID MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-16 max-w-7xl mx-auto items-stretch">
        {MODULE_REGISTRY.map((item) => {
          return (
            <motion.div
              key={item.id}
                            onClick={() => setActiveModuleId(item.id)}
              className="relative rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 md:p-8 flex flex-col justify-between h-[300px] group cursor-pointer transition-colors duration-300 hover:bg-zinc-900/40"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-bold tracking-tight group-hover:text-[#ffe66c] transition-colors duration-300 uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULLSCREEN EXPERIMENTAL OVERLAY MODAL SHEET */}
      <AnimatePresence>
        {activeModuleId && CurrentActiveComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 p-4 md:p-12 overflow-y-auto"
          >
            {/* Modal Click Backdrop Escape Capture */}
            <div className="absolute inset-0 -z-10" onClick={() => setActiveModuleId(null)} />

            {/* Main Interactive Laboratory Chassis Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 relative shadow-2xl space-y-6"
            >
              {/* Overlay System Exit Button Control */}
              <button
                onClick={() => setActiveModuleId(null)}
                className="absolute top-4 right-6 z-30 font-sans text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
              >
                Close
              </button>

              {/* Dynamically mount the isolated active engineering node cleanly */}
              <div className="w-full">
                <CurrentActiveComponent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


