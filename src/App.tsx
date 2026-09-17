import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { isMobileDevice } from './lib/performance';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { MobileMenu } from './components/MobileMenu';
import { HeroSection } from './sections/HeroSection';
import { IntroTickerSection } from './sections/IntroTickerSection';
import { ActivitySection } from './sections/ActivitySection';
import { ServicesSection } from './sections/ServicesSection';
import { SelectedWorkSection } from './sections/SelectedWorkSection';
import { AboutSection } from './sections/AboutSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { TechInteractiveSection } from './sections/TechInteractiveSection';
import { MetricsSection } from './sections/MetricsSection';
import { Creative3DSection } from './sections/Creative3DSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';

export function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const isMobile = isMobileDevice();
    const lenis = new Lenis({
      duration: isMobile ? 0.75 : 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-nx-ink-900 text-nx-paper-100 selection:bg-nx-yellow-400 selection:text-nx-ink-950">
      {/* Hardware-Accelerated Global Film Grain Overlay */}
      <div className="nx-global-grain" aria-hidden="true" />

      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Initial 0-100% Loader Sequence */}
      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      {/* Global Minimal Navigation */}
      <Navigation onOpenMenu={() => setMobileMenuOpen(true)} />

      {/* Full-Screen Split Mobile & Desktop Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Single-Page Scroller */}
      <main className="relative overflow-hidden">
        {/* 01 — HERO */}
        <HeroSection />

        {/* 02 — INTRO & TICKER */}
        <IntroTickerSection />

        {/* 03 — FIELD OF ACTIVITY */}
        <ActivitySection />

        {/* 04 — SERVICES */}
        <ServicesSection />

        {/* 05 — SELECTED WORK */}
        <SelectedWorkSection />

        {/* 06 — ABOUT ME */}
        <AboutSection />

        {/* 07 — EXPERTISE & SKILLS */}
        <ExpertiseSection />

        {/* 08 — TECHNOLOGIES LIST */}
        <TechInteractiveSection />

        {/* 09 — NUMBERS & STATS */}
        <MetricsSection />

        {/* 10 — DEDICATED 3D CREATIVE LAB */}
        <Creative3DSection />

        {/* 11 — FAQ */}
        <FAQSection />

        {/* 12 — CONTACT & LEAD FORM */}
        <ContactSection />
      </main>

      {/* 13 — FOOTER */}
      <FooterSection />
    </div>
  );
}

export default App;
