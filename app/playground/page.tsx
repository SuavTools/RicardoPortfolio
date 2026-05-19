'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Gamepad2, Cpu, X, Play } from 'lucide-react';

// Import your independent engineering sandbox nodes cleanly
import PlaygroundGame from '../components/PlaygroundGame';
import PlaygroundScroll from '../components/PlaygroundScroll';
import PlaygroundShader from '../components/PlaygroundShader';

const MODULE_REGISTRY = [
  { 
    id: '01', 
    title: 'Retro Engine Canvas Game Loop', 
    type: 'CUSTOM_JS_LOOP', 
    desc: 'Custom 60fps retro canvas engine handling rapid collision logic grids and vector rendering frames completely decoupled from React hooks thread timelines.',
    icon: Gamepad2, 
    accent: 'text-[#ff4e3e]',
    component: PlaygroundGame
  },
  { 
    id: '02', 
    title: 'Kinetic Scroll Font Distortion', 
    type: 'WEB_VELOCITY', 
    desc: 'Scroll velocity monitoring array tracking delta coordinates to dynamically twist local system font weights and character stroke metrics.',
    icon: Cpu, 
    accent: 'text-[#ffe66c]',
    component: PlaygroundScroll
  },
  { 
    id: '03', 
    title: 'WebGL Multi-Pass Render Fragment', 
    type: 'VERTEX_CORE', 
    desc: 'High-density fragment shader arrays compiling direct GPU arithmetic patterns to generate real-time ambient lighting fields.',
    icon: Terminal, 
    accent: 'text-indigo-400',
    component: PlaygroundShader
  }
];

export default function Playground() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const CurrentActiveComponent = MODULE_REGISTRY.find(m => m.id === activeModuleId)?.component || null;

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-50 px-6 py-24 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden relative selection:bg-[#ffe66c] selection:text-zinc-950">
      
      {/* Background Core Light Leaks */}
      <div className="absolute top-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#ff4e3e]/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#ffe66c]/5 blur-[120px]" />

      {/* HEADER CONTROLS */}
      <div className="max-w-4xl space-y-6 w-full mx-auto">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 font-mono text-xs text-[#ffe66c] hover:text-zinc-50 transition-colors tracking-widest duration-300"
        >
          ← ESCAPE_TO_MAIN_INDEX
        </Link>
        
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4e3e]">// LABORATORY_SHELL_v5.0</span>
          <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">The Lab.</h1>
        </div>
        
        <p className="font-sans text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
          Isolated development slots hosting technical canvas loops, dynamic typography modifiers, and experimental scripting blocks detached from commercial layout constraints.
        </p>
      </div>

      {/* THE PRIMARY LAB DISPLAY GRID MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-16 max-w-7xl mx-auto items-stretch">
        {MODULE_REGISTRY.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={() => setActiveModuleId(item.id)}
              className="relative rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 md:p-8 flex flex-col justify-between h-[300px] group cursor-pointer backdrop-blur-sm transition-all duration-300 hover:bg-zinc-900/40"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className={`rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 ${item.accent}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    //_SLOT_{item.id}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-bold tracking-tight group-hover:text-[#ffe66c] transition-colors duration-300 uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-4 flex items-center justify-between mt-4">
                <span className="font-mono text-[9px] bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-500 uppercase tracking-wide">
                  {item.type}
                </span>
                <div className="text-zinc-500 group-hover:text-[#ffe66c] transition-colors">
                  <Play className="h-4 w-4 animate-pulse" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-2xl p-4 md:p-12 overflow-y-auto"
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
                className="absolute top-4 right-4 z-30 rounded-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 hover:text-zinc-50 hover:border-zinc-700 transition shadow-md cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Dynamically mount the isolated active engineering node cleanly */}
              <div className="w-full">
                <CurrentActiveComponent />
              </div>

              {/* Operational Subtext Metric */}
              <div className="flex justify-between font-mono text-[9px] text-zinc-600 uppercase tracking-wide border-t border-zinc-900 pt-4">
                <span>LAB_ID: {activeModuleId}</span>
                <span>STATE: DEPLOYED_SANDBOX_CONTEXT</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER DIAGNOSTIC BASELINE */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-zinc-600 font-mono text-[10px] tracking-wider gap-2 border-t border-zinc-900/60 pt-6 w-full max-w-7xl mx-auto">
        <span>// PIPELINE RUNTIME LOGS: STABLE</span>
        <span>SYS_CORE_NODE_POOL: ONLINE</span>
      </div>
    </main>
  );
}


