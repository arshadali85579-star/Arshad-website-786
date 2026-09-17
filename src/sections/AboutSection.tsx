import React, { useRef, useState, useEffect } from 'react';
import { personalData } from '../data/personal';
import { DashedRail } from '../components/DashedRail';
import { isTouchDevice } from '../lib/performance';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver for clean, GPU-accelerated viewport entry animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle hardware-accelerated photo parallax (Desktop only, 0 React re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || !photoImgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    photoImgRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1.035)`;
  };

  const handleMouseLeave = () => {
    if (photoImgRef.current) {
      photoImgRef.current.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-nx-ink-900 text-nx-paper-100 py-24 sm:py-32 md:py-40 relative nx-grain border-b border-dashed border-nx-line-dark overflow-hidden"
    >
      <DashedRail dark />

      <div className="ui-cont relative z-10">
        {/* Editorial Sub-Label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="ui-point bg-nx-yellow-400 shrink-0" />
          <span className="font-mono text-xs uppercase tracking-widest text-nx-stone-400">
            04 // PERSONAL IDENTITY
          </span>
        </div>

        {/* Large Editorial Heading */}
        <div
          className={`transition-all duration-700 delay-75 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display font-extrabold uppercase leading-[0.92] tracking-tighter text-[clamp(2.4rem,6.5vw,5.6rem)] text-nx-paper-100">
            Nice To Meet You.
          </h2>
        </div>

        {/* Thin Horizontal Divider Below Heading */}
        <div
          className={`h-[1px] bg-nx-line-dark w-full mt-8 sm:mt-10 mb-12 sm:mb-16 lg:mb-20 origin-left transition-all duration-1000 delay-150 ease-out ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
        />

        {/* Two-Column Balanced Editorial Grid (45% Left / 55% Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* LEFT COLUMN: Large Editorial Portrait Treatment */}
          <div
            className={`lg:col-span-5 w-full max-w-lg mx-auto lg:mx-0 transition-all duration-1000 delay-250 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div
              ref={photoFrameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative border border-nx-line-dark bg-nx-ink-950 p-3 sm:p-4 group overflow-hidden select-none"
            >
              {/* Minimal Architectural Yellow Corner Ticks */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-nx-yellow-400 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-nx-yellow-400 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-nx-yellow-400 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-nx-yellow-400 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />

              {/* Portrait Image Frame */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-nx-ink-950">
                <img
                  ref={photoImgRef}
                  src="/assets/arshad-profile.jpg"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/arshad-profile.svg';
                  }}
                  alt="Sayyad Arshad — Creative Web Developer"
                  className="w-full h-full object-cover object-[center_12%] filter grayscale contrast-[1.12] brightness-[0.96] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out will-change-transform"
                />

                {/* Subtle Editorial Vignette Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-nx-ink-950/80 via-nx-ink-950/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              </div>

              {/* Technical Readout Caption Below Portrait */}
              <div className="mt-3.5 pt-3.5 border-t border-dashed border-nx-line-dark flex justify-between items-center font-mono text-[11px] uppercase tracking-widest text-nx-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nx-yellow-400 animate-pulse" />
                  <span className="text-nx-paper-100 font-semibold">{personalData.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-nx-stone-500">MAHARASHTRA, IN</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Personal Introduction, Credentials & Animated Journey Link */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between transition-all duration-1000 delay-350 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Main Editorial Introduction Paragraph */}
            <div className="space-y-6">
              <p className="font-display text-xl sm:text-2xl md:text-[26px] lg:text-[28px] xl:text-[31px] font-normal leading-[1.42] text-nx-stone-200 tracking-tight max-w-2xl">
                <span className="text-nx-paper-100 font-semibold">Hi, I'm Sayyad Arshad.</span> I'm a self-driven web developer focused on building modern digital experiences with clean interfaces, smooth interactions and thoughtful development. I work across frontend and backend development, with a strong interest in creative web experiences, 3D and animation. I enjoy turning ideas into polished, functional websites that feel as good as they work.
              </p>
            </div>

            {/* Technical Metadata & Credentials Grid */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-dashed border-nx-line-dark grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest">
              <div className="space-y-1.5">
                <span className="text-nx-stone-500 text-[10px] block">// CORE DISCIPLINES</span>
                <p className="text-nx-paper-100 font-bold">Creative Web &amp; 3D</p>
                <p className="text-nx-stone-400 text-[11px]">Frontend + Backend</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-nx-stone-500 text-[10px] block">// ACADEMIC BACKGROUND</span>
                <p className="text-nx-paper-100 font-bold">B.E. AIDS — 4th Year</p>
                <p className="text-nx-stone-400 text-[11px]">Engineering Faculty</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-nx-stone-500 text-[10px] block">// LOCATION &amp; BASE</span>
                <p className="text-nx-paper-100 font-bold">Maharashtra, India</p>
                <p className="text-nx-stone-400 text-[11px]">Sarola Baddi, 414201</p>
              </div>
            </div>

            {/* Thin Horizontal Divider Below Introduction */}
            <div
              className={`h-[1px] bg-nx-line-dark w-full mt-10 sm:mt-12 mb-8 origin-left transition-all duration-1000 delay-500 ease-out ${
                isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />

            {/* Editorial Journey Link With Animated Arrow & Yellow Indicator */}
            <div
              className={`transition-all duration-700 delay-600 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="#expertise"
                className="group inline-flex items-center gap-3.5 font-mono text-xs sm:text-sm uppercase tracking-widest text-nx-paper-100 hover:text-nx-yellow-400 transition-colors py-2"
              >
                {/* Yellow Square Indicator */}
                <span className="w-2.5 h-2.5 bg-nx-yellow-400 inline-block transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-45" />

                {/* Label with underline animation */}
                <span className="relative font-bold tracking-wider">
                  EXPLORE MY JOURNEY
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-nx-yellow-400 transition-all duration-300 group-hover:w-full" />
                </span>

                {/* Animated Arrow */}
                <span className="font-sans text-base transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1 text-nx-yellow-400">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
