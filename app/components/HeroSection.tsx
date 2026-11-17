'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-16 lg:px-24 relative overflow-hidden select-none bg-zinc-950 text-zinc-50">
      
      <div className="max-w-5xl space-y-6 pt-12">
        {/* Clear, high-contrast typography stack with no bleeding colors */}
        <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.82] uppercase">
          {/* Locked music project red hex — completely bulletproof */}
          <span className="text-[#ff4e3e] block">
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
        <p className="font-sans text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed">
          Hi, I&apos;m Ricardo. I design key art, motion and campaigns for networks like SBS, and build the odd website.
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
        <span className="font-sans text-xs text-zinc-500">
          Scroll
        </span>
      </div>
    </section>
  );
}




