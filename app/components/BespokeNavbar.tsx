'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVIGATION_LINKS = [
  { index: '01', title: 'SELECTED WORK', href: '#projects' },
  { index: '02', title: 'THE PLAYGROUND', href: '/playground' },
];

export default function BespokeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 bg-zinc-950/80 border border-zinc-900 rounded-full py-2 px-4 shadow-2xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-zinc-100 font-bold uppercase">// CORE.SYS</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group relative flex items-center justify-center h-10 w-24 rounded-full bg-zinc-950 border border-zinc-900 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-brand-yellow/40 active:scale-95"
        >
          <div className="flex flex-col gap-1.5 w-6 items-end">
            <span className="h-[2px] w-full bg-zinc-50 transition-transform group-hover:w-4" />
            <span className="h-[2px] w-4 bg-zinc-50 transition-transform group-hover:w-full" />
          </div>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-zinc-950 p-8 md:p-24 text-zinc-50 overflow-hidden"
          >
            <div className="absolute top-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand-yellow/5 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand-red/5 blur-[120px]" />

            <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
              <span className="font-mono text-[10px] text-brand-red tracking-widest uppercase">// OVERLAY MAP INDEX</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-4 py-2 text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 transition"
              >
                <span className="font-mono text-[10px] tracking-widest">[ CLOSE ]</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-6 md:space-y-10 my-auto">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 md:gap-8 border-b border-zinc-900 pb-6 overflow-hidden"
                >
                  <span className="font-mono text-xs md:text-xl text-zinc-600 transition-colors group-hover:text-brand-red">//_{link.index}</span>
                  <span className="font-sans text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-zinc-50 transition-transform duration-500 group-hover:text-brand-yellow group-hover:translate-x-6">
                    {link.title}
                  </span>
                </a>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-zinc-900 pt-6 gap-4 font-mono text-[10px] text-zinc-600">
              <span>BROADCAST MASTER PIPELINE</span>
              <span>SIGNAL INTERCEPT: <span className="text-brand-yellow animate-pulse">ACTIVE</span></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
