'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type AboutMedia = { url: string; type: 'video' | 'image' };

// Edit these freely. Images come from the "About" folder in Vercel Blob,
// matched to panels in filename order (01.jpg goes to the first panel, the intro).
const PASSIONS = [
  {
    title: "Hi, I'm Ricardo",
    blurb:
      "A multidisciplinary graphic designer working across static, motion and digital, and immersed in the full marketing and design discipline. I'm a full-blown tinkerer, always picking up new tools.\n\nI'm a sucker for functionality and frictionless surfaces. Design should feel witty and effortless, and serve the brief. I like pretty things for the sake of pretty, but in design it either communicates and serves the mission, or it's noise.\n\nI love strategy and frameworks, and I want my work to carry a kind of effortless grace.\n\nOff the screen, I build electrical gadgets by hand. When I say I tinker, I mean it. I just love making things exist in the real world.",
  },
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
    <div className="space-y-5 max-w-lg">
      <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
      <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-50">
        {title}
      </h2>
      {blurb.split('\n\n').map((para) => (
        <p key={para.slice(0, 24)} className="font-sans text-base xl:text-lg text-zinc-400 leading-relaxed">
          {para}
        </p>
      ))}
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

  // One scroll gesture = one panel, with an eased glide between them
  useEffect(() => {
    let animating = false;
    let lockUntil = 0;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;

    // Stops are derived from the section's real rendered height so they always
    // line up exactly with where each panel sits.
    const bounds = () => {
      const el = trackRef.current;
      if (!el || el.offsetHeight === 0) return null; // hidden on mobile
      const vh = window.innerHeight;
      const start = window.scrollY + el.getBoundingClientRect().top;
      const end = start + el.offsetHeight - vh;
      const gap = (end - start) / (count - 1);
      return { vh, start, end, gap, stop: (i: number) => start + i * gap };
    };

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const glideTo = (target: number) => {
      cancelAnimationFrame(frame);
      const from = window.scrollY;
      const distance = target - from;
      if (Math.abs(distance) < 2) return;
      const duration = 900;
      const t0 = performance.now();
      animating = true;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, from + distance * ease(t));
        if (t < 1) frame = requestAnimationFrame(tick);
        else {
          animating = false;
          lockUntil = performance.now() + 250;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    // Works out where one step in `dir` should land, or null to let the page
    // scroll normally (past the last panel, or above the first).
    const stepTarget = (dir: number) => {
      if (document.body.style.overflow === 'hidden') return null; // a project gallery is open
      const b = bounds();
      if (!b) return null;
      const y = window.scrollY;
      if (dir > 0) {
        if (y < b.start - 1 || y >= b.end - 1) return null;
        const pos = (y - b.start) / b.gap;
        return b.stop(Math.min(count - 1, Math.floor(pos + 0.01) + 1));
      }
      if (y <= b.start + 1) return null;
      // Coming back up from the work: pull the last panel in cleanly
      // instead of letting the page drift halfway into the gallery.
      if (y > b.end + 1) return y < b.end + b.vh ? b.stop(count - 1) : null;
      const pos = (y - b.start) / b.gap;
      return b.stop(Math.max(0, Math.ceil(pos - 0.01) - 1));
    };

    const onWheel = (e: WheelEvent) => {
      const dir = Math.sign(e.deltaY);
      if (!dir) return;
      const now = performance.now();
      // Swallow the rest of a gesture that already moved us (trackpad momentum, fast wheel ticks)
      if (animating || now < lockUntil) {
        if (stepTarget(dir) !== null || animating) {
          e.preventDefault();
          lockUntil = Math.max(lockUntil, now + 120);
        }
        return;
      }
      const target = stepTarget(dir);
      if (target === null) return;
      e.preventDefault();
      glideTo(target);
    };

    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return;
      const down = ['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
      const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
      if (!down && !up) return;
      const target = stepTarget(down ? 1 : -1);
      if (target === null) return;
      e.preventDefault();
      if (!animating) glideTo(target);
    };

    // Scrollbar, keyboard or touch: settle on the nearest panel once scrolling stops
    const onScroll = () => {
      if (animating) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        const b = bounds();
        if (!b || animating) return;
        const y = window.scrollY;
        if (y <= b.start || y >= b.end) return;
        glideTo(b.stop(Math.round((y - b.start) / b.gap)));
      }, 150);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [count]);

  return (
    <div id="about" className="text-zinc-50">
      {/* Passions: side scroller on desktop */}
      <section ref={trackRef} className="relative hidden md:block" style={{ height: `${count * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x, width: `${count * 100}vw` }} className="flex h-full">
            {PASSIONS.map((p, i) => (
              <div key={p.title} className="w-screen h-full flex-shrink-0 flex items-center">
                <div className="master grid grid-cols-2 gap-16 lg:gap-24 items-center">
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
      <section className="md:hidden master pt-32 pb-24 space-y-20">
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
