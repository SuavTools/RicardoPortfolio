'use client';


export default function AboutSection() {
  return (
    <section id="about" className="min-h-[80vh] bg-zinc-950 text-zinc-50 px-4 py-32 md:px-16 lg:px-24 border-t border-zinc-900 relative overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Grid: Structural Meta Info Labels & Contact Links */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-12">
          <div className="space-y-4">
            <h3 className="font-sans text-3xl font-black tracking-tight uppercase">About</h3>
            
            <div className="pt-2 space-y-1 font-sans text-sm text-zinc-400">
              <div>Graphic &amp; motion designer</div>
              <div>Sydney, Australia</div>
            </div>
          </div>

          {/* INTEGRATED CONTACT NETWORK RAILS */}
          <div className="space-y-3 pt-6 lg:pt-0 border-t border-zinc-900/80 max-w-xs">
            
            <a 
              href="https://linkedin.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-fit font-mono text-xs text-zinc-400 hover:text-[#ffe66c] transition-colors py-1 uppercase tracking-wider"
            >
              LinkedIn
            </a>

            <a 
              href="mailto:ricardo.moreira.designs@gmail.com"
              className="block w-fit font-mono text-xs text-zinc-400 hover:text-[#ffe66c] transition-colors py-1 uppercase tracking-wider"
            >
              Email
            </a>
          </div>
        </div>

        {/* Right Grid: Heavy Editorial Narrative Column */}
        <div className="lg:col-span-8 space-y-8">
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-100 leading-snug uppercase">
            Design + direction + motion + tinkering vibes. <br />
            <span className="text-zinc-400 text-lg md:text-xl block mt-4 font-normal tracking-tight normal-case leading-relaxed">
              I’m a designer who works across everything. I like being involved in the whole process, from key art, motion, digital and print to directing music videos and messing around with code. I give anything a crack and care a lot about the craft.
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 font-sans text-sm text-zinc-400 leading-relaxed font-light border-t border-zinc-900/60">
            <p>
              I&apos;ve worked on visuals for national broadcasters like <span className="text-zinc-100 font-bold">SBS</span>, from rough storyboards to animated title cards and outdoor campaigns.
            </p>
            <p>
              Outside of client work I mess around with code and animation, including this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

