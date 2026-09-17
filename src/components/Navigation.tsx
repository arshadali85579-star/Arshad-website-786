import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onOpenMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenMenu }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isOver = window.scrollY > 40;
          setScrolled((prev) => (prev !== isOver ? isOver : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-nx-ink-950/90 backdrop-blur-md border-b border-dashed border-nx-line-dark py-3.5'
          : 'bg-transparent border-b border-dashed border-nx-line-dark/40 py-5 md:py-6'
      }`}
    >
      <div className="ui-cont flex items-center justify-between">
        {/* Left: Brand Monogram & Name */}
        <a
          href="#"
          className="flex items-center gap-3 font-display font-black uppercase tracking-tight text-sm md:text-base text-nx-paper-100 hover:text-nx-yellow-400 transition-colors group"
        >
          {/* Architectural Monogram SVG */}
          <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7 text-nx-yellow-400 shrink-0">
            <rect width="40" height="40" fill="#0e1216" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M12 28L20 12L28 28" stroke="#f7f4ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 23H25" stroke="#fbe052" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="20" cy="18" r="1.5" fill="#fbe052" />
          </svg>
          <span className="leading-tight">
            SAYYAD ARSHAD
            <span className="hidden sm:inline-block text-[10px] font-mono text-nx-stone-400 font-normal ml-2">
              / DEV
            </span>
          </span>
        </a>

        {/* Center: Desktop Nav Anchors */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-nx-stone-300">
          <a href="#services" className="hover:text-nx-yellow-400 transition-colors py-1">
            Services
          </a>
          <a href="#portfolio" className="hover:text-nx-yellow-400 transition-colors py-1">
            Work
          </a>
          <a href="#about" className="hover:text-nx-yellow-400 transition-colors py-1">
            About
          </a>
          <a href="#expertise" className="hover:text-nx-yellow-400 transition-colors py-1">
            Expertise
          </a>
          <a href="#3d-lab" className="hover:text-nx-yellow-400 transition-colors py-1">
            3D Lab
          </a>
          <a href="#faq" className="hover:text-nx-yellow-400 transition-colors py-1">
            FAQ
          </a>
          <a href="#contact" className="hover:text-nx-yellow-400 transition-colors py-1">
            Contact
          </a>
        </nav>

        {/* Right: Availability Badge, Start Project CTA & Menu trigger */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Availability Pill */}
          <div className="hidden xl:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-nx-stone-300 border border-dashed border-nx-line-dark px-3 py-1.5">
            <span className="ui-point bg-nx-yellow-400 animate-pulse" />
            <span>AVAILABLE FOR PROJECTS</span>
          </div>

          {/* Quick CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest border border-dashed border-nx-line-dark text-nx-paper-100 px-4 py-2 hover:bg-nx-yellow-400 hover:text-nx-ink-950 hover:border-nx-yellow-400 transition-colors"
          >
            <span>Start a project</span>
            <span aria-hidden="true">↳</span>
          </a>

          {/* Menu Drawer Toggle */}
          <button
            onClick={onOpenMenu}
            type="button"
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-nx-paper-100 border border-dashed border-nx-line-dark px-3.5 py-2 hover:border-nx-yellow-400 hover:text-nx-yellow-400 transition-colors cursor-pointer"
            aria-label="Open menu drawer"
          >
            <div className="flex flex-col gap-1 w-4">
              <span className="w-full h-0.5 bg-current" />
              <span className="w-full h-0.5 bg-current" />
            </div>
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
