'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroGate from './components/IntroGate';
import BespokeNavbar from './components/BespokeNavbar';
import HeroSection from './components/HeroSection';
import AsymmetricPortfolio from './components/AsymmetricPortfolio';
import AboutSection from './components/AboutSection'; // Load the narrative component

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <main className="bg-zinc-950 overflow-x-hidden antialiased selection:bg-brand-yellow selection:text-zinc-950 relative">
      {/* Cinematic Entry Gate Overlay Window */}
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <IntroGate onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* Main Layout Pipeline */}
      {isUnlocked && (
        <>
          {/* HUD Navigation Panel overlay */}
          <BespokeNavbar />

          {/* Intro Identity Statements */}
          <HeroSection />

          {/* Full-Width Row Index Cases */}
          <AsymmetricPortfolio />

          {/* Deep Asymmetric Profile Narrative Column */}
          <AboutSection />
        </>
      )}
    </main>
  );
}



