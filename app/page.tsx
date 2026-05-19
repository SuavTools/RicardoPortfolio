import BespokeNavbar from './components/BespokeNavbar';
import HeroSection from './components/HeroSection';
import AsymmetricPortfolio from './components/AsymmetricPortfolio';

export default function Home() {
  return (
    <main className="bg-zinc-950 overflow-x-hidden antialiased selection:bg-brand-yellow selection:text-zinc-950">
      {/* Avant-Garde Fullscreen HUD Overlay Navigation */}
      <BespokeNavbar />

      {/* Premium Typographic Introductory Frame */}
      <HeroSection />

      {/* Irregular Asymmetric Bento Layout Index */}
      <AsymmetricPortfolio />
    </main>
  );
}


