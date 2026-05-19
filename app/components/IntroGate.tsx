'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface IntroGateProps {
  onUnlock: () => void;
}

export default function IntroGate({ onUnlock }: IntroGateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions exactly to full screen bounds
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Character loop injecting full name parameters into the rain stream
    const characters = '0123456789ABCDEF//_RICARDO_MOREIRA_SYS_MAPPING_OUTPOST_AUS_';
    const charArray = characters.split('');
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    
    // Tracks the vertical falling coordinates for each text column array
    const rainDrops: number[] = Array(columns).fill(1);

    const drawMatrix = () => {
      // faint black opacity background for trail fades
      ctx.fillStyle = 'rgba(9, 9, 11, 0.08)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Injects brand red into the falling rain strings
      ctx.fillStyle = 'rgba(255, 78, 62, 0.12)'; 
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Randomly resets the drops back to the top viewport frame
        if (y > canvas.height && Math.random() > 0.985) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 33); // Anchors fluid frame loops

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.div
      exit={{ 
        y: '-100%', 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#09090b] text-zinc-50 p-6 md:p-16 select-none overflow-hidden"
    >
      {/* HIGH-PERFORMANCE MATRIX CANVAS ACCENT */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none w-full h-full mix-blend-screen"
      />

      {/* Ambient Visual Identity Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-[#ff4e3e]/5 blur-[150px]" />

      {/* 1. HEADER LOGISTICS */}
      <div className="flex justify-between items-start font-mono text-[10px] text-[#ff4e3e] tracking-widest uppercase z-10">
        <span>// PRE_FLIGHT_MANIFEST</span>
        <span>[ REVAL_v2.0 ]</span>
      </div>

      {/* 2. THE PRE-HERO VISUAL HUB (Now hosting the perfectly centered action anchor) */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-12 z-10 my-auto">
        
        {/* Massive Heavy Typography Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h2 className="font-sans text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter uppercase leading-none text-zinc-50">
            ricardo <span className="text-[#ff4e3e]">moreira .</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase">
            <span>[ cd.01 ]</span>
            <span className="h-1 w-1 bg-zinc-700 rounded-full" />
            <span>[ md.02 ]</span>
            <span className="h-1 w-1 bg-zinc-700 rounded-full" />
            <span>[ sys.03 ]</span>
          </div>
        </motion.div>

        {/* Central Operational Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-mono text-zinc-400 text-[11px] max-w-md uppercase tracking-wider leading-relaxed"
        >
          establishing communication links to television broadcast art packages, interactive game prototypes, and custom engineering frameworks.
        </motion.p>

         {/* Centered Trigger Action Button Layout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onClick={onUnlock}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="font-sans font-black text-xs tracking-[0.25em] bg-[#ffe66c] text-[#09090b] px-12 py-5 rounded-xl shadow-2xl hover:bg-zinc-50 transition-all duration-300 cursor-pointer uppercase block mx-auto border-none outline-none"
        >
          SEE PORTFOLIO
        </motion.button>
      </div>

      {/* 3. BASE BOUNDARY TIMESTAMPS */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-zinc-900/60 pt-6 gap-4 z-10">
        <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-600 tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SIGNAL: LINK_STABLE</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-600 tracking-wider hidden sm:inline">
          © 2026 BROADCAST PIPELINE ENGINEERING
        </span>
      </div>
    </motion.div>
  );
}



