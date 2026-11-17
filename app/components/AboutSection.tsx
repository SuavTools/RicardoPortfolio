'use client';

import { useEffect, useState } from 'react';

type AboutMedia = { url: string; type: 'video' | 'image' };

export default function AboutSection() {
  const [media, setMedia] = useState<AboutMedia[]>([]);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMedia(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans text-4xl font-black tracking-tighter sm:text-6xl uppercase mb-16">About</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 space-y-1 font-sans text-sm text-zinc-400">
            <div className="text-zinc-100">Ricardo Moreira</div>
            <div>Graphic &amp; motion designer</div>
            <div>Sydney, Australia</div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-100 leading-snug uppercase">
              Design + direction + motion + tinkering vibes.
            </p>

            <div className="space-y-6 font-sans text-base md:text-lg text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                I&apos;m a designer who works across everything. I like being involved in the whole process, from key art, motion, digital and print to directing music videos and messing around with code. I give anything a crack and care a lot about the craft.
              </p>
              <p>
                I&apos;ve worked on visuals for national broadcasters like <span className="text-zinc-100">SBS</span>, from rough storyboards to animated title cards and outdoor campaigns.
              </p>
              <p>
                Outside of client work I mess around with code and animation, including this site.
              </p>
            </div>
          </div>
        </div>

        {media.length > 0 && (
          <div className="mt-24 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
            {media.map((item, i) =>
              item.type === 'video' ? (
                <video
                  key={item.url}
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full break-inside-avoid"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item.url}
                  src={item.url}
                  alt={`Ricardo Moreira ${i + 1}`}
                  loading="lazy"
                  className="w-full break-inside-avoid"
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
