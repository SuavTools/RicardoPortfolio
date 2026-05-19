'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, Gamepad2, Cpu, ArrowUpRight } from 'lucide-react';

const LAB_EXPERIMENTS = [
  { 
    id: '01', 
    title: 'Retro Engine Canvas Game Loop', 
    type: 'CUSTOM_JS_LOOP', 
    desc: 'Custom 60fps retro canvas engine handling rapid collision logic grids and vector rendering frames completely decoupled from React hooks.',
    icon: Gamepad2, 
    accent: 'text-[#ff4e3e]' 
  },
  { 
    id: '02', 
    title: 'Kinetic Scroll Font Distortion', 
    type: 'WEB_VELOCITY', 
    desc: 'Scroll velocity monitoring array tracking delta coordinates to dynamically twist local system font weights and character stroke metrics.',
    icon: Cpu, 
    accent: 'text-[#ffe66c]' 
  },
  { 
    id: '03', 
    title: 'WebGL Multi-Pass Render Fragment', 
    type: 'VERTEX_CORE', 
    desc: 'High-density fragment shader arrays compiling direct GPU arithmetic patterns to generate real-time ambient lighting fields.',
    icon: Terminal, 
    accent: 'text-indigo-400' 
  }
];

export default function Playground() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-50 px-6 py-24 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden relative selection:bg-[#ffe66c] selection:text-zinc-950">
      
      {/* Background Core Light Leaks */}
      <div className="absolute top-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#ff4e3e]/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#ffe66c]/5 blur-[120px]" />

      {/* HEADER CONTROLS */}
      <div className="max-w-4xl space-y-6">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 font-mono text-xs text-[#ffe66c] hover:text-zinc-50 transition-colors tracking-widest duration-300"
        >
          ← ESCAPE_TO_MAIN_INDEX
        </Link>
        
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// LABORATORY_SHELL_v2.0</span>
          <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">The Lab.</h1>
        </div>
        
        <p className="font-sans text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
          Isolated development slots hosting technical canvas loops, dynamic typography modifiers, and experimental scripting blocks detached from commercial layout constraints.
        </p>
      </div>

      {/* THE ASYMMETRIC LAB MATRIX DISPLAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-16 max-w-7xl mx-auto">
        {LAB_EXPERIMENTS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 md:p-8 flex flex-col justify-between h-[300px] group cursor-pointer backdrop-blur-sm"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div className={`rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 ${item.accent}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    //_SLOT_{item.id}
                  </span>
                </div>
                
                {/* Experiment Content Copy */}
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-bold tracking-tight group-hover:text-[#ffe66c] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Footer Panel Execution Target */}
              <div className="border-t border-zinc-900/60 pt-4 flex items-center justify-between mt-4">
                <span className="font-mono text-[9px] bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-500 uppercase tracking-wide">
                  {item.type}
                </span>
                <div className="text-zinc-600 group-hover:text-zinc-100 transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER DIAGNOSTIC BASELINE */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-zinc-600 font-mono text-[10px] tracking-wider gap-2 border-t border-zinc-900/60 pt-6">
        <span>// PIPELINE RUNTIME LOGS: STABLE</span>
        <span>SYS_CORE_NODE_POOL: ONLINE</span>
      </div>
    </main>
  );
}
