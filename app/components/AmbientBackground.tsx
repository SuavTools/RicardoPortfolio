'use client';

import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

// Large, very faint colour washes behind the whole site. They drift, grow and
// fade as you scroll, smoothed with a little lag so it feels like atmosphere.
function Wash({
  progress,
  color,
  size,
  x,
  y,
  scale,
  opacity,
}: {
  progress: MotionValue<number>;
  color: string;
  size: string;
  x: string[];
  y: string[];
  scale: number[];
  opacity: number[];
}) {
  const stops = x.map((_, i) => i / (x.length - 1));
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: 0,
        top: 0,
        marginLeft: `calc(${size} / -2)`,
        marginTop: `calc(${size} / -2)`,
        background: `radial-gradient(circle, ${color}, transparent 65%)`,
        x: useTransform(progress, stops, x),
        y: useTransform(progress, stops, y),
        scale: useTransform(progress, stops, scale),
        opacity: useTransform(progress, stops, opacity),
      }}
    />
  );
}

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 30, damping: 20, mass: 1 });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Wash
        progress={progress}
        color="rgba(255, 230, 108, 0.09)"
        size="90vmax"
        x={['15vw', '70vw', '30vw', '80vw']}
        y={['10vh', '40vh', '80vh', '30vh']}
        scale={[1, 1.2, 0.9, 1.1]}
        opacity={[1, 0.6, 0.9, 0.5]}
      />
      <Wash
        progress={progress}
        color="rgba(255, 78, 62, 0.08)"
        size="80vmax"
        x={['90vw', '30vw', '75vw', '20vw']}
        y={['90vh', '60vh', '20vh', '85vh']}
        scale={[1.1, 0.9, 1.3, 1]}
        opacity={[0.7, 1, 0.6, 1]}
      />
      <Wash
        progress={progress}
        color="rgba(255, 140, 50, 0.05)"
        size="70vmax"
        x={['50vw', '10vw', '60vw', '50vw']}
        y={['50vh', '20vh', '50vh', '100vh']}
        scale={[0.8, 1.2, 1, 1.3]}
        opacity={[0.5, 0.9, 1, 0.7]}
      />
    </div>
  );
}
