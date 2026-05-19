'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance motion coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply fluid physics parameters to eliminate rigid rendering delay
  const springConfig = { damping: 30, stiffness: 320, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12); // Centers the dot relative to the cursor position
      cursorY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    // Detect when the cursor crosses paths with interactive tags or row panels
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('.cursor-pointer') ||
        target.closest('h1 span') ||
        target.closest('h3')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 border border-[#ff4e3e] mix-blend-difference hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? '#ffe66c' : 'rgba(255, 78, 62, 0)', // Fills solid brand yellow on link hover
        borderColor: isHovered ? '#ffe66c' : '#ff4e3e', // Matches your music color keys
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
    />
  );
}
