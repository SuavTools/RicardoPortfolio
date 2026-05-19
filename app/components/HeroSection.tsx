'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-16 lg:px-24 relative overflow-hidden select-none bg-zinc-950 text-zinc-50">
      
      {/* Immersive Music Brand Light Leaks */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-brand-yellow/5 blur-[130px]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-brand-red/5 blur-[130px]" />

      <div className="max-w-5xl space-y-6 pt-12">
        {/* Minimal Monospace Technical Core Indicator */}
        <div className="inline-flex items-center gap-2.5 rounded-md border border-zinc-900 bg-zinc-900/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff4e3e] animate-pulse" />
          // SYNC_OK // OUTPOST.AUS
        </div>

        {/* Clear, high-contrast typography stack with no bleeding colors */}
        <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.82] uppercase">
          {/* Locked music project red hex — completely bulletproof */}
          <span className="text-[#ff4e3e] block transition-all duration-300 hover:scale-[1.01] origin-left select-all">
            creative
          </span> 
          
          {/* Stark white baseline — completely replaces the old gray mask */}
          <span className="text-zinc-50 block">
            design
          </span> 
          
          {/* Stark white baseline anchor */}
          <span className="text-zinc-50 block">
            &amp; motion.
          </span>
        </h1>

        {/* Crisp Monospace Operational Narrative Subtitle */}
        <p className="font-mono text-xs md:text-sm text-zinc-400 max-w-xl leading-relaxed uppercase tracking-wide">
          hi, i&apos;m ricardo. engineering interactive web spaces, television broadcast art packages, and elevated design for networks like sbs.
        </p>
      </div>

      {/* Minimalist Micro Scroll Vector Cue (Using Brand Red Line Runner) */}
      <div className="absolute bottom-8 left-4 md:left-16 lg:left-24 flex items-center gap-3">
        <div className="h-12 w-[1px] bg-zinc-900 overflow-hidden relative">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-4 bg-[#ff4e3e]"
          />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase">
          [ SCROLL_TO_DISCOVER ]
        </span>
      </div>
    </section>
  );
}




