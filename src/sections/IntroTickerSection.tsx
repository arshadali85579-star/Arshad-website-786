import React from 'react';

export const IntroTickerSection: React.FC = () => {
  const tickerItems = [
    'THREE.JS WEBGL',
    'REACT & TYPESCRIPT',
    'FULL-STACK ARCHITECTURE',
    'CREATIVE 3D EXPERIENCES',
    'GSAP KINETIC MOTION',
    'RESTFUL APIS',
    'TAILWIND CSS',
    'HIGH PERFORMANCE 60FPS',
    'B.E. AIDS ENGINEERING',
    'DIGITAL PRODUCTS',
  ];

  return (
    <section id="intro" className="relative bg-nx-ink-950 border-b border-dashed border-nx-line-dark py-8 overflow-hidden select-none">
      {/* Ticker Banner */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-nx-stone-400">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="hover:text-nx-yellow-400 transition-colors">{item}</span>
              <span className="text-nx-yellow-400">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
