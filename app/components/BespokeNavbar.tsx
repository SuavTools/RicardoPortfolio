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
        <a href="#" className="pointer-events-auto font-sans text-sm font-bold text-zinc-100">
          Ricardo Moreira
        </a>

        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto font-sans text-sm text-zinc-100 underline-offset-[6px] decoration-zinc-500 hover:underline cursor-pointer"
        >
          Menu
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

            <div className="flex items-center justify-end border-b border-zinc-900 pb-6">
              <button
                onClick={() => setIsOpen(false)}
                className="font-sans text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
              >
                Close
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
