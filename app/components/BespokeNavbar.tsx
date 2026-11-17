'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAVIGATION_LINKS = [
  { index: '01', title: 'Work', href: '/#projects' },
  { index: '02', title: 'About', href: '/#about' },
  { index: '03', title: 'Contact', href: '/#contact' },
];

export default function BespokeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-zinc-950/80 pointer-events-none">
        <div className="master flex justify-between items-center">
        <Link href="/" className="pointer-events-auto font-sans uppercase tracking-wider text-sm font-bold text-zinc-100">
          Ricardo Moreira
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto font-sans uppercase tracking-wider text-sm text-zinc-100 underline-offset-[6px] decoration-zinc-500 hover:underline cursor-pointer"
        >
          Menu
        </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-zinc-950 py-8 md:py-24 text-zinc-50 overflow-hidden"
          >
            <div className="master h-full flex flex-col justify-between">

            <div className="flex items-center justify-end border-b border-zinc-900 pb-6">
              <button
                onClick={() => setIsOpen(false)}
                className="font-sans uppercase tracking-wider text-sm text-zinc-400 hover:text-zinc-50 underline-offset-[6px] hover:underline transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col space-y-6 md:space-y-10 my-auto">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 md:gap-8 border-b border-zinc-900 pb-6 overflow-hidden"
                >
                  <span className="font-sans text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase text-zinc-50 transition-transform duration-500 group-hover:text-brand-yellow group-hover:translate-x-6">
                    {link.title}
                  </span>
                </Link>
              ))}
            </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
