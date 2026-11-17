'use client';

import { useState, useSyncExternalStore } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroGate from './components/IntroGate';
import BespokeNavbar from './components/BespokeNavbar';
import PassionsScroller from './components/PassionsScroller';
import AmbientBackground from './components/AmbientBackground';
import AsymmetricPortfolio from './components/AsymmetricPortfolio';
import AboutSection from './components/AboutSection';

export default function Home() {
  // Skip the gate if it was already passed this session (e.g. after a reload).
  // Server render returns null so nothing flashes before we know.
  const gatePassed = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return sessionStorage.getItem('gate-passed') === '1';
      } catch {
        return false;
      }
    },
    () => null
  );
  const [unlockedNow, setUnlockedNow] = useState(false);
  const isUnlocked = gatePassed === null ? null : gatePassed || unlockedNow;

  const unlock = () => {
    try {
      sessionStorage.setItem('gate-passed', '1');
    } catch {}
    setUnlockedNow(true);
  };

  return (
    <main className="overflow-x-clip antialiased selection:bg-brand-yellow selection:text-zinc-950 relative">
      {/* Cinematic Entry Gate Overlay Window */}
      <AnimatePresence mode="wait">
        {isUnlocked === false && (
          <IntroGate onUnlock={unlock} />
        )}
      </AnimatePresence>

      {/* Main Layout Pipeline */}
      {isUnlocked && (
        <>
          {/* HUD Navigation Panel overlay */}
          <AmbientBackground />

          <BespokeNavbar />

          <PassionsScroller linkTo="#projects" />

          {/* Full-Width Row Index Cases */}
          <AsymmetricPortfolio />

          {/* Deep Asymmetric Profile Narrative Column */}
          <AboutSection />
        </>
      )}
    </main>
  );
}



