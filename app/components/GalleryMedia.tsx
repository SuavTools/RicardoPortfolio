'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  url: string;
  type: 'video' | 'image';
  alt: string;
  eager?: boolean;
};

// One piece of project media: dark placeholder until loaded, then fades in.
// Videos only play while on screen so they don't all download and run at once.
export default function GalleryMedia({ url, type, alt, eager = false }: Props) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const fade = `w-full h-auto block transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className={`w-full bg-zinc-900 ${loaded ? '' : 'aspect-video'}`}>
      {type === 'video' ? (
        <video
          ref={videoRef}
          src={url}
          muted
          loop
          playsInline
          controls
          preload={eager ? 'auto' : 'metadata'}
          onLoadedData={() => setLoaded(true)}
          className={fade}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={fade}
        />
      )}
    </div>
  );
}
