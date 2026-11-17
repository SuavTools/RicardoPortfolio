import PassionsScroller from './PassionsScroller';

export default function AboutPageContent() {
  return (
    <div className="bg-zinc-950 text-zinc-50">
      {/* Intro */}
      <section className="px-4 pt-40 pb-24 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-10">
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            Who am I
          </h1>
          <p className="font-sans text-xl md:text-3xl font-light text-zinc-300 leading-snug max-w-3xl">
            I&apos;m a graphic designer based in Sydney with a background in motion. Most of my work is for TV, but I&apos;m happiest when I get to touch every part of a project. Here&apos;s what I&apos;m into.
          </p>
        </div>
      </section>

      <PassionsScroller />
    </div>
  );
}
