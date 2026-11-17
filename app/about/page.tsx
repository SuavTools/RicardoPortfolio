import type { Metadata } from 'next';
import BespokeNavbar from '../components/BespokeNavbar';
import AboutPageContent from '../components/AboutPageContent';
import AboutSection from '../components/AboutSection';

export const metadata: Metadata = {
  title: 'About | Ricardo Moreira',
  description: 'Graphic and motion designer in Sydney.',
};

export default function AboutPage() {
  return (
    <main className="bg-zinc-950 overflow-x-hidden antialiased selection:bg-brand-yellow selection:text-zinc-950 relative">
      <BespokeNavbar />
      <AboutPageContent />
      <AboutSection />
    </main>
  );
}
