'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type AboutMedia = { url: string; type: 'video' | 'image' };

// Edit these freely. Images come from the "About" folder in Vercel Blob,
// matched to panels in filename order (01.jpg goes to the first panel, etc).
const PASSIONS = [
  {
    title: 'Key art',
    blurb: 'Show art, posters and campaign layouts. Finding the one image and the right type to sell a whole show.',
  },
  {
    title: 'Motion',
    blurb: 'End boards, promos and title cards. Making things move with timing that feels right, not just busy.',
  },
  {
    title: 'Directing',
    blurb: 'Music videos from storyboard to final cut. Shooting, editing and grading to the rhythm of the track.',
  },
  {
    title: 'Tinkering',
    blurb: 'Messing around with code and animation on the side. This site is one of those experiments.',
  },
];

function PanelMedia({ item, alt, linkTo }: { item?: AboutMedia; alt: string; linkTo?: string }) {
  const media = !item ? (
    <div className="w-full h-full bg-zinc-900" />
  ) : item.type === 'video' ? (
    <video src={item.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.url} alt={alt} loading="lazy" className="w-full h-full object-cover" />
  );

  if (!linkTo) return media;

  return (
    <a
      href={linkTo}
      onClick={(e) => {
        const target = document.querySelector(linkTo);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }}
      aria-label={`${alt}: see selected work`}
      className="block w-full h-full cursor-pointer"
    >
      {media}
    </a>
  );
}

function PanelText({ index, title, blurb }: { index: number; title: string; blurb: string }) {
  return (
    <div className="space-y-6 max-w-md">
      <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
      <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-50">
        {title}
      </h2>
      <p className="font-sans text-base md:text-lg text-zinc-400 leading-relaxed">{blurb}</p>
    </div>
  );
}

export default function PassionsScroller({ linkTo }: { linkTo?: string }) {
  const [media, setMedia] = useState<AboutMedia[]>([]);
  const trackRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMedia(data);
      })
      .catch(() => {});
  }, []);

  // Vertical scroll through the tall section drives the sideways movement
  const { scrollYProgress } = useScroll({ target: trackRef });
  const count = PASSIONS.length;
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((count - 1) / count) * 100}%`]);

  return (
    <div id="about" className="bg-zinc-950 text-zinc-50">
      {/* Passions: side scroller on desktop */}
      <section ref={trackRef} className="relative hidden md:block" style={{ height: `${count * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x, width: `${count * 100}vw` }} className="flex h-full">
            {PASSIONS.map((p, i) => (
              <div key={p.title} className="w-screen h-full flex-shrink-0 px-16 lg:px-24 flex items-center">
                <div className="grid grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl mx-auto">
                  <PanelText index={i} title={p.title} blurb={p.blurb} />
                  <div className="aspect-[4/5] max-h-[75vh] w-full overflow-hidden">
                    <PanelMedia item={media[i]} alt={p.title} linkTo={linkTo} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Passions: stacked on mobile */}
      <section className="md:hidden px-4 pt-32 pb-24 space-y-20">
        {PASSIONS.map((p, i) => (
          <div key={p.title} className="space-y-8">
            <PanelText index={i} title={p.title} blurb={p.blurb} />
            <div className="aspect-[4/5] w-full overflow-hidden">
              <PanelMedia item={media[i]} alt={p.title} linkTo={linkTo} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
