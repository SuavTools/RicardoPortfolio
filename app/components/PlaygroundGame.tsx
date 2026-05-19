'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Keyboard } from 'lucide-react';

interface Invader {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
  scoreValue: number;
}

interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

export default function PlaygroundGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const keysRef = useRef<{ left: boolean; right: boolean; space: boolean }>({
    left: false,
    right: false,
    space: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 600;
        canvas.height = 340;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keysRef.current.right = true;
      if (e.key === ' ') {
        e.preventDefault();
        keysRef.current.space = true;
      }
    };

    const handleMouseUpOrKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keysRef.current.right = false;
      if (e.key === ' ') keysRef.current.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleMouseUpOrKey);

    let playerX = canvas.width / 2 - 15;
    const playerY = canvas.height - 30;
    const playerWidth = 30;
    const playerHeight = 12;
    const playerSpeed = 5;

    let invaders: Invader[] = [];
    let bullets: Bullet[] = [];
    let lastShotTime = 0;
    
    // Explicitly synchronized variable tags to permanently drop compiling issues
    let invDirection = 1;
    let invaderSpeed = 1.2;
    let localScore = 0;
    let localHealth = 100;
    let animId: number;

    const initializeInvaders = () => {
      invaders = [];
      const rows = 3;
      const cols = 6;
      const invWidth = 24;
      const invHeight = 16;
      const spacingX = 45;
      const spacingY = 32;
      const startX = (canvas.width - (cols * spacingX)) / 2;
      const startY = 40;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          invaders.push({
            x: startX + c * spacingX,
            y: startY + r * spacingY,
            width: invWidth,
            height: invHeight,
            alive: true,
            scoreValue: (3 - r) * 20,
          });
        }
      }
    };
    initializeInvaders();

    const drawInvaderShape = (cx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      cx.fillStyle = '#ffe66c';
      cx.fillRect(x + w * 0.2, y, w * 0.6, h * 0.2);
      cx.fillRect(x, y + h * 0.3, w, h * 0.4);
      cx.fillRect(x + w * 0.1, y + h * 0.8, w * 0.2, h * 0.2);
      cx.fillRect(x + w * 0.7, y + h * 0.8, w * 0.2, h * 0.2);
      
      cx.fillStyle = '#09090b';
      cx.fillRect(x + w * 0.25, y + h * 0.4, w * 0.15, h * 0.15);
      cx.fillRect(x + w * 0.6, y + h * 0.4, w * 0.15, h * 0.15);
    };

    const loop = () => {
      if (localHealth <= 0) {
        setGameOver(true);
        return;
      }

      const activeInvaders = invaders.filter(i => i.alive);
      if (activeInvaders.length === 0) {
        setVictory(true);
        return;
      }

      animId = requestAnimationFrame(loop);

      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      if (keysRef.current.left) playerX = Math.max(0, playerX - playerSpeed);
      if (keysRef.current.right) playerX = Math.min(canvas.width - playerWidth, playerX + playerSpeed);

      if (keysRef.current.space) {
        const now = Date.now();
        if (now - lastShotTime > 250) {
          bullets.push({
            x: playerX + playerWidth / 2 - 1.5,
            y: playerY - 6,
            width: 3,
            height: 8,
            active: true,
          });
          lastShotTime = now;
        }
      }

      ctx.fillStyle = '#ff4e3e';
      ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
      ctx.fillRect(playerX + playerWidth / 2 - 3, playerY - 4, 6, 4);

      bullets.forEach((b) => {
        if (!b.active) return;
        b.y -= 7;

        if (b.y < -10) b.active = false;

        ctx.fillStyle = '#ff4e3e';
        ctx.fillRect(b.x, b.y, b.width, b.height);

        invaders.forEach((inv) => {
          if (!inv.alive || !b.active) return;

          if (
            b.x > inv.x &&
            b.x < inv.x + inv.width &&
            b.y > inv.y &&
            b.y < inv.y + inv.height
          ) {
            inv.alive = false;
            b.active = false;
            localScore += inv.scoreValue;
            setScore(localScore);
          }
        });
      });
      bullets = bullets.filter(b => b.active);

      let shiftDown = false;
      invaders.forEach((inv) => {
        if (!inv.alive) return;

        if (inv.x + inv.width > canvas.width - 15 && invDirection > 0) shiftDown = true;
        if (inv.x < 15 && invDirection < 0) shiftDown = true;
      });

      if (shiftDown) {
        invDirection *= -1;
        invaders.forEach(inv => { inv.y += 14; });
      }

      invaders.forEach((inv) => {
        if (!inv.alive) return;
        inv.x += invaderSpeed * invDirection;

        drawInvaderShape(ctx, inv.x, inv.y, inv.width, inv.height);

        if (inv.y + inv.height >= playerY) {
          localHealth = 0;
          setHealth(0);
        }
      });
    };

    if (!gameOver && !victory) loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleMouseUpOrKey);
    };
  }, [gameOver, victory]);

  const restartAll = () => {
    setScore(0);
    setHealth(100);
    setGameOver(false);
    setVictory(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 font-mono text-xs">
        <div className="border border-zinc-900 p-3 rounded bg-zinc-900/40">SCORE: <span className="text-[#ffe66c] font-black">{score}</span></div>
        <div className="border border-zinc-900 p-3 rounded bg-zinc-900/40">SHIELD: <span className={health < 40 ? 'text-[#ff4e3e] font-black animate-pulse' : 'text-emerald-400'}>{health}%</span></div>
      </div>

      <div className="relative border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950 h-[340px]">
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        {gameOver && (
          <div className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center space-y-3">
            <span className="font-mono text-xs text-[#ff4e3e] tracking-wider uppercase">// INTRUDERS_BREACHED_DEFENSE</span>
            <h3 className="font-sans text-3xl font-black text-zinc-50">DEFENSE CRITICAL</h3>
            <button onClick={restartAll} className="font-mono text-[10px] tracking-widest bg-[#ffe66c] text-[#09090b] px-6 py-2.5 font-bold rounded transition flex items-center gap-2"><RotateCcw className="h-3 w-3" /> REBOOT_SYSTEM</button>
          </div>
        )}

        {victory && (
          <div className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center space-y-3">
            <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase">// MATRIX_CLEARED_SUCCESSFULLY</span>
            <h3 className="font-sans text-3xl font-black text-[#ffe66c]">VICTORY</h3>
            <button onClick={restartAll} className="font-mono text-[10px] tracking-widest bg-[#ffe66c] text-[#09090b] px-6 py-2.5 font-bold rounded transition flex items-center gap-2"><RotateCcw className="h-3 w-3" /> LOOP_AGAIN</button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-600 tracking-wider uppercase">
        <Keyboard className="h-3.5 w-3.5 text-zinc-500" />
        <span>CONTROLS: <span className="text-zinc-400 font-bold">[A/D]</span> OR <span className="text-zinc-400 font-bold">[ARROW_KEYS]</span> TO MOVE // <span className="text-zinc-400 font-bold">[SPACEBAR]</span> TO LASER BLAST</span>
      </div>
    </div>
  );
}


