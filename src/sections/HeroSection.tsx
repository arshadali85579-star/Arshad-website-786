import React, { useRef, useEffect } from 'react';
import { HeroCanvas } from '../three/HeroCanvas';
import { DashedRail } from '../components/DashedRail';
import { ArrowDown, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const timeRef = useRef<HTMLSpanElement>(null);

  // Live IST Clock (Maharashtra, India) — direct DOM mutation avoids re-rendering the Hero every second
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const updateTime = () => {
      if (timeRef.current) {
        timeRef.current.textContent = `${formatter.format(new Date())} IST`;
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-nx-ink-900 text-nx-paper-100 relative nx-grain overflow-hidden flex flex-col justify-between pt-28 md:pt-36 pb-10">
      <DashedRail dark />

      {/* 3D WebGL Kinetic Canvas Scene in Background */}
      <HeroCanvas />

      {/* Hero Content Container */}
      <div className="ui-cont relative z-20 flex-1 flex flex-col justify-between">
        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-nx-stone-300 border border-dashed border-nx-line-dark px-3.5 py-1.5 bg-nx-ink-950/40">
              Creative Web &amp; 3D Developer
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-nx-stone-400">
              <span className="ui-point bg-nx-yellow-400 animate-pulse" />
              <span>B.E. AIDS — 4th Year</span>
            </span>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-widest text-nx-stone-400 hidden sm:flex items-center gap-2">
            <span>Maharashtra, India</span>
            <span className="text-nx-yellow-400">/</span>
            <span ref={timeRef} className="text-nx-paper-100 tabular-nums font-bold">18:00:00 IST</span>
          </div>
        </div>

        {/* Hero Editorial Typography */}
        <div className="my-auto py-12 md:py-16 max-w-5xl">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-nx-yellow-400">
            <span>↳</span>
            <span>Sayyad Arshad // Portfolio</span>
          </div>

          <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-tighter text-[clamp(2.5rem,6.8vw,6.4rem)] text-nx-paper-100">
            <span className="block hover:translate-x-2 transition-transform duration-300">
              Web Development.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-nx-paper-100 via-nx-stone-300 to-nx-paper-100 hover:translate-x-2 transition-transform duration-300">
              3D Experiences.
            </span>
            <span className="block text-nx-yellow-400 hover:translate-x-2 transition-transform duration-300">
              Digital Products.
            </span>
          </h1>

          <p className="font-display text-base md:text-xl text-nx-stone-300 leading-relaxed max-w-2xl mt-7">
            I build modern web experiences that combine engineering, interaction, 3D WebGL graphics, and scalable architecture.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md">
            <a href="#portfolio" className="nx-btn nx-btn--primary group">
              <span className="nx-btn__icon">↳</span>
              <span className="nx-btn__label flex items-center gap-2">
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="#contact" className="nx-btn nx-btn--ghost">
              <span>Let's Work Together</span>
              <span className="text-nx-yellow-400 font-bold">↗</span>
            </a>
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="border-t border-dashed border-nx-line-dark pt-4 flex justify-between items-center font-mono text-[11px] uppercase tracking-widest text-nx-stone-400">
          <div className="flex items-center gap-3">
            <span className="text-nx-yellow-400">●</span>
            <span className="hidden sm:inline">Driven by Curiosity, Engineered for Impact</span>
            <span className="sm:hidden">Engineered for Impact</span>
          </div>

          <a
            href="#intro"
            className="flex items-center gap-2 hover:text-nx-yellow-400 transition-colors group cursor-pointer"
          >
            <span>Scroll Down</span>
            <div className="animate-bob text-nx-yellow-400">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
