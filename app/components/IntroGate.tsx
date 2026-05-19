'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface IntroGateProps {
  onUnlock: () => void;
}

export default function IntroGate({ onUnlock }: IntroGateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleFactor = 4; 
    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth / scaleFactor);
      canvas.height = Math.floor(window.innerHeight / scaleFactor);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / scaleFactor;
      mouseRef.current.targetY = e.clientY / scaleFactor;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    const bayerMatrix = [
      [1, 9, 3, 11],
      [13, 5, 15, 7],
      [4, 12, 2, 10],
      [16, 8, 14, 6]
    ];

    let time = 0;

    const renderDitherWarp = () => {
      time += 0.012; // Slightly tuned down velocity for cinematic backdrop pacing

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let lookupX = x;
          let lookupY = y;

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxWarpRadius = 80;

          if (dist < maxWarpRadius && dist > 0) {
            const force = (maxWarpRadius - dist) / maxWarpRadius;
            const warpStrength = Math.sin(dist * 0.1 - time * 4) * (20 * force);
            lookupX += (dx / dist) * warpStrength;
            lookupY += (dy / dist) * warpStrength;
          }

          const n1 = Math.sin(lookupX * 0.04 + time) * Math.cos(lookupY * 0.03 + time);
          const n2 = Math.sin(lookupY * 0.05 - time) * Math.cos(lookupX * 0.02 + time * 0.5);
          const noiseValue = (n1 + n2 + 2) / 4;

          const matrixX = x % 4;
          const matrixY = y % 4;
          const threshold = bayerMatrix[matrixY][matrixX] / 17;

          let r = 0, g = 0, b = 0;

          if (noiseValue > threshold) {
            if (noiseValue > 0.65) {
              // Dimmed slightly from raw 255 to lower background noise levels behind your typography
              r = 210; g = 190; b = 90;
            } else {
              r = 210; g = 50;  b = 40;
            }
          }

          // INJECTING VIGNETTE PROTECTION: Automatically drops background alpha metrics to zero near the outer edge lines
          const normY = y / h;
          const vignette = Math.sin(normY * Math.PI); // Parabolic curve dropping to 0 at top/bottom limits

          const pixelIndex = (x + y * w) * 4;
          data[pixelIndex]     = r;   
          data[pixelIndex + 1] = g;   
          data[pixelIndex + 2] = b;   
          data[pixelIndex + 3] = Math.floor(255 * vignette * 0.7); // Locked opacity ceiling at 70% max background intensity
        }
      }

      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(renderDitherWarp);
    };

    const animFrame = requestAnimationFrame(renderDitherWarp);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      exit={{ 
        y: '-100%', 
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#000000] text-zinc-50 p-8 md:p-20 select-none overflow-hidden"
    >
      {/* THE BACKDROP LAYER */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none w-full h-full mix-blend-screen opacity-40 transition-opacity duration-500"
        style={{ imageRendering: 'pixelated' }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.012] mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://w3.org id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      {/* 1. HEADER */}
      <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500 tracking-[0.3em] uppercase z-20">
        <span>RICARDO MOREIRA</span>
        <span>MELBOURNE / SYDNEY</span>
      </div>

      {/* 2. CORE TYPOGRAPHIC CENTERPIECE (With an absolute contrast guard layout) */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-20 my-auto relative px-8 py-16 bg-[#000000]/80 border border-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        
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
          
          <div className="flex items-center justify-center gap-4 text-zinc-500 font-mono text-[9px] tracking-[0.4em] uppercase">
            <span>CREATIVE DIRECTION</span>
            <span className="h-[1px] w-6 bg-zinc-800" />
            <span>MOTION ARCHITECTURE</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-zinc-400 text-xs md:text-sm max-w-md font-light leading-relaxed tracking-wide mt-8"
        >
          Engineering interactive web environments, television broadcast art packages, and elevated business-as-usual frameworks for national networks.
        </motion.p>

        {/* HIGH-END BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={onUnlock}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="font-mono text-[10px] tracking-[0.25em] border border-zinc-800 bg-zinc-950 hover:border-zinc-200 text-zinc-300 hover:bg-zinc-50 hover:text-[#09090b] px-12 py-4 rounded-none transition-all duration-300 cursor-pointer uppercase block mx-auto outline-none mt-10 shadow-xl"
        >
          SEE PORTFOLIO
        </motion.button>
      </div>

      {/* 3. BASELINE FOOTER */}
      <div className="flex justify-between items-center border-t border-zinc-900 pt-6 z-20 text-zinc-600 font-mono text-[9px] tracking-[0.2em] uppercase">
        <span>LEGIBILITY PIPELINE BUFFER SECURE</span>
        <span>© 2026 ALL RIGHTS RESERVED</span>
      </div>
    </motion.div>
  );
}







