'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-[80vh] bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 border-t border-zinc-900 relative overflow-hidden">
      
      {/* Background Graphic Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] font-sans font-black text-[14rem] md:text-[24rem] text-zinc-900/15 leading-none select-none uppercase tracking-tighter z-0 pointer-events-none">
        MRA
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Grid: Structural Meta Info Labels & Contact Links */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-12">
          <div className="space-y-4">
            <h3 className="font-sans text-3xl font-black tracking-tight uppercase">The Profile.</h3>
            
            <div className="pt-6 space-y-3 font-mono text-xs text-zinc-500 uppercase">
              <div><span className="text-zinc-400">ROLE:</span> Graphic Designer / Motion Designer</div>
              <div><span className="text-zinc-400">LOCATION:</span> Sydney, Australia</div>
              <div><span className="text-zinc-400">PIPELINE:</span> Multidisciplinary </div>
              <div><span className="text-zinc-400">STATUS:</span> Active Production Mode</div>
            </div>
          </div>

          {/* INTEGRATED CONTACT NETWORK RAILS */}
          <div className="space-y-3 pt-6 lg:pt-0 border-t border-zinc-900/80 max-w-xs">
            
            <a 
              href="https://linkedin.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-fit font-sans text-sm text-zinc-300 underline underline-offset-[6px] decoration-zinc-700 hover:decoration-zinc-200 hover:text-zinc-50 transition-colors py-1"
            >
              LinkedIn
            </a>

            <a 
              href="mailto:ricardo.moreira.designs@gmail.com"
              className="block w-fit font-sans text-sm text-zinc-300 underline underline-offset-[6px] decoration-zinc-700 hover:decoration-zinc-200 hover:text-zinc-50 transition-colors py-1"
            >
              ricardo.moreira.designs@gmail.com
            </a>
          </div>
        </div>

        {/* Right Grid: Heavy Editorial Narrative Column */}
        <div className="lg:col-span-8 space-y-8">
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-100 leading-snug uppercase">
            Design + direction + motion + tinkering vibes. <br />
            <span className="text-zinc-400 text-lg md:text-xl block mt-4 font-normal tracking-tight normal-case leading-relaxed">
              I’m a designer who works across everything. I like being involved in the whole process, from executing heavy key art packaging, motion, digital design, print, directing video clips to messing around with web motion code. I give anything a crack and focus strictly on the craft.
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 font-sans text-sm text-zinc-400 leading-relaxed font-light border-t border-zinc-900/60">
            <p>
              With an extensive track record developing visuals for national broadcast networks like <span className="text-zinc-100 font-bold">SBS</span>, my execution spans from raw storyboard sketches to final animated title cards and comprehensive out-of-home (OOH) media campaigns.
            </p>
            <p>
              When decoupled from commercial production monitors, I construct JavaScript animation engines, canvas-driven retro game physics components, and modular framework layouts. I focus strictly on absolute design fidelity, utility speed, and uncompromised interface elegance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

