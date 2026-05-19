'use client';

import { useEffect, useState, useRef } from 'react';

export default function PlaygroundScroll() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTimeRef.current;

      if (timeDiff > 0) {
        const distance = Math.abs(currentScroll - lastScrollRef.current);
        setVelocity(Math.min((distance / timeDiff) * 35, 150));
      }
      lastScrollRef.current = currentScroll;
      lastTimeRef.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const interval = setInterval(() => { setVelocity(p => Math.max(0, p * 0.9)); }, 30);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-950 border border-zinc-900 rounded-2xl h-[380px] px-4 overflow-hidden">
      <div className="text-center">
        <h4 
          className="font-sans font-black text-5xl sm:text-7xl uppercase text-zinc-100 transition-all duration-100"
          style={{ 
            letterSpacing: `${(velocity * 0.25).toFixed(2)}px`,
            color: velocity > 15 ? '#ffe66c' : '#fafafa'
          }}
        >
          VELOCITY
        </h4>
        <span className="font-mono text-[10px] text-zinc-500 mt-4 block uppercase tracking-widest">
          DELTA_METRIC: {velocity.toFixed(1)} PX/MS // USE MOUSE SCROLL WHEEL TO DISTORT
        </span>
      </div>
    </div>
  );
}


