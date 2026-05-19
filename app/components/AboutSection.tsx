'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-[80vh] bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 border-t border-zinc-900 relative overflow-hidden">
      
      {/* Background Graphic Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] font-sans font-black text-[14rem] md:text-[24rem] text-zinc-900/15 leading-none select-none uppercase tracking-tighter z-0">
        MRA
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Grid: Structural Meta Info Labels */}
        <div className="lg:col-span-4 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// DIRECTORY_METRICS</span>
          <h3 className="font-sans text-3xl font-black tracking-tight uppercase">The Profile.</h3>
          
          <div className="pt-6 space-y-3 font-mono text-xs text-zinc-500 uppercase">
            <div><span className="text-zinc-400">ROLE:</span> Creative Director / Motion Architect</div>
            <div><span className="text-zinc-400">LOCATION:</span> Sydney, Australia</div>
            <div><span className="text-zinc-400">PIPELINE:</span> Broadcast Broadcast Focus / Web Systems</div>
            <div><span className="text-zinc-400">STATUS:</span> Active Production Mode</div>
          </div>
        </div>

        {/* Right Grid: Heavy Editorial Narrative Column */}
        <div className="lg:col-span-8 space-y-8">
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-100 leading-snug">
            Bridging high-concept broadcast television identity frames with high-performance web engineering. I build digital spaces where motion language dictates the layout layout rules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 font-sans text-sm text-zinc-400 leading-relaxed">
            <p>
              With an extensive track record developing visual packaging structures for national broadcast networks like <span className="text-zinc-100 font-bold">SBS</span>, my execution spans from raw storyboard sketches to final animated title cards and comprehensive out-of-home (OOH) media campaigns.
            </p>
            <p>
              When decoupled from commercial production monitors, I construct low-level JavaScript animation engines, canvas-driven retro game physics components, and modular framework layouts. I focus strictly on absolute design fidelity, utility speed, and uncompromised interface elegance.
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
