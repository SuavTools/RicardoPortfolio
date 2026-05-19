'use client';

import { useEffect, useRef } from 'react';

export default function PlaygroundShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 128; // Increased resolution metrics for rich shader fields inside fullscreen viewports
    canvas.width = size;
    canvas.height = size;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.03;
      animId = requestAnimationFrame(render);

      const imgData = ctx.createImageData(size, size);
      const data = imgData.data;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const c1 = Math.sin(x * 0.08 + time) + Math.cos(y * 0.06 + time);
          const c2 = Math.sin(Math.sqrt(x*x + y*y) * 0.08 - time);
          const total = Math.abs(Math.sin(c1 + c2));

          const index = (x + y * size) * 4;
          if (total > 0.7) {
            data[index] = 255; data[index + 1] = 230; data[index + 2] = 108; // Yellow
          } else if (total > 0.42) {
            data[index] = 255; data[index + 1] = 78;  data[index + 2] = 62;  // Red
          } else {
            data[index] = 9;   data[index + 1] = 9;   data[index + 2] = 11;  // Black
          }
          data[index + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="border border-zinc-900 rounded-2xl bg-zinc-950 h-[380px] relative overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block opacity-90" style={{ imageRendering: 'pixelated' }} />
      <div className="absolute top-3 right-4 font-mono text-[8px] text-zinc-500 tracking-widest uppercase">// COMPILING_VERTEX_ALGEBRA_FIELDS</div>
    </div>
  );
}

