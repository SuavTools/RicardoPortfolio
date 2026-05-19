'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

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
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// DIRECTORY_METRICS</span>
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
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 block mb-2">// CONNECTION_CHANNELS</span>
            
            <a 
              href="https://linkedin.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-xs text-zinc-400 hover:text-[#ffe66c] transition-colors group/link py-1 uppercase tracking-wider cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {/* Bulletproof Native SVG Vector Path (Replaces Lucide entirely) */}
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://w3.org">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LINKEDIN_PROFILE
              </span>
              <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover/link:text-[#ffe66c] transition-colors" />
            </a>

            <a 
              href="mailto:ricardo.moreira.designs@gmail.com"
              className="flex items-center justify-between font-mono text-xs text-zinc-400 hover:text-[#ffe66c] transition-colors group/link py-1 uppercase tracking-wider cursor-pointer"
            >
              <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> DIRECT_EMAIL</span>
              <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover/link:text-[#ffe66c] transition-colors" />
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

          {/* Network Validation Badges Row */}
          <div className="pt-12 border-t border-zinc-900/60 flex flex-wrap gap-4 items-center">
            <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase mr-4">// CERTIFIED_LOGS:</span>
            {['SBS_BROADCAST', 'OOH_DYNAMIC_NETWORKS', 'NEXT_JS_CORE', 'HARDWARE_ACCEL_WEB'].map((badge) => (
              <span key={badge} className="font-mono text-[10px] border border-zinc-800 bg-zinc-900/40 text-zinc-400 px-3 py-1 rounded">
                {badge}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

