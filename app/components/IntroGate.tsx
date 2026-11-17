'use client';

import { motion } from 'framer-motion';
import AmbientBackground from './AmbientBackground';

interface IntroGateProps {
  onUnlock: () => void;
}

export default function IntroGate({ onUnlock }: IntroGateProps) {
  return (
    <motion.div
      exit={{ 
        y: '-100%', 
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#09090b] text-zinc-50 py-8 md:py-20 select-none overflow-hidden"
    >
      <AmbientBackground contained />

      {/* 1. HEADER */}
      <div className="master flex justify-between items-center font-sans text-xs text-zinc-500 z-20">
        <span>Ricardo Moreira</span>
        <span>Sydney</span>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-20 my-auto relative px-8 py-16">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h2 className="font-sans text-5xl sm:text-7xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.85] text-zinc-50">
            ricardo <br />
            <span className="text-zinc-50">moreira.</span>
          </h2>
          
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-zinc-400 text-xs md:text-sm max-w-md font-light leading-relaxed tracking-wide mt-8"
        >
          Designer working across key art, motion and campaigns for TV, plus the odd website.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={onUnlock}
          className="font-sans uppercase tracking-wider text-sm md:text-base block mx-auto mt-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 link-accent"
        >
          See the work
        </motion.button>
      </div>

      {/* 3. BASELINE FOOTER */}
      <div className="master flex justify-end items-center z-20 text-zinc-600 font-sans text-xs">
        <span>© 2026</span>
      </div>
    </motion.div>
  );
}







