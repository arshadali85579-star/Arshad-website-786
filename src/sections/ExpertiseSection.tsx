import React, { useState } from 'react';
import { skillsCategories } from '../data/skills';
import { DashedRail } from '../components/DashedRail';
import { ChevronDown } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (name: string) => {
    setOpenItem((prev) => (prev === name ? null : name));
  };

  return (
    <section id="expertise" className="bg-nx-ink-900 text-nx-paper-100 py-24 md:py-32 relative nx-grain border-b border-dashed border-nx-line-dark">
      <DashedRail dark />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-5 items-end gap-6 lg:gap-16 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="ui-point bg-nx-yellow-400 shrink-0" />
              <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                05 // Technical Competence
              </p>
            </div>
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Architectural mastery across modern frontend, 3D graphics &amp; backends.
            </h2>
          </div>

          <div className="lg:col-span-2 flex flex-wrap gap-2 justify-start lg:justify-end">
            {['Three.js', 'React', 'TypeScript', 'Node.js', 'WebGL', 'AI Logic'].map((item) => (
              <span key={item} className="ui-hash white">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 3-Column Accordion Layout (inspired by Peter Csipkay's layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsCategories.slice(0, 3).map((categoryGroup) => (
            <div key={categoryGroup.category} className="space-y-3">
              <div className="border-b border-dashed border-nx-line-dark pb-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-nx-yellow-400">
                  // {categoryGroup.category}
                </span>
              </div>

              {categoryGroup.items.map((skill) => {
                const isOpen = openItem === skill.name;
                return (
                  <div
                    key={skill.name}
                    className={`border border-dashed transition-all duration-200 ${
                      isOpen
                        ? 'border-nx-yellow-400 bg-nx-ink-800'
                        : 'border-nx-line-dark hover:border-nx-stone-400 bg-nx-ink-950/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(skill.name)}
                      className="w-full flex items-center justify-between p-4 text-left font-display font-bold uppercase text-sm md:text-base tracking-tight cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className={isOpen ? 'text-nx-yellow-400' : 'text-nx-paper-100'}>
                        {skill.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-nx-stone-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-nx-yellow-400' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-nx-stone-300 border-t border-dashed border-nx-line-dark/60 space-y-3 animate-fadeIn">
                        <p className="leading-relaxed">{skill.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] uppercase border border-dashed border-nx-line-dark px-1.5 py-0.5 text-nx-stone-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Second Row: Tools & AI/Automation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-dashed border-nx-line-dark">
          {skillsCategories.slice(3, 5).map((categoryGroup) => (
            <div key={categoryGroup.category} className="space-y-3">
              <div className="border-b border-dashed border-nx-line-dark pb-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-nx-yellow-400">
                  // {categoryGroup.category}
                </span>
              </div>

              {categoryGroup.items.map((skill) => {
                const isOpen = openItem === skill.name;
                return (
                  <div
                    key={skill.name}
                    className={`border border-dashed transition-all duration-200 ${
                      isOpen
                        ? 'border-nx-yellow-400 bg-nx-ink-800'
                        : 'border-nx-line-dark hover:border-nx-stone-400 bg-nx-ink-950/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(skill.name)}
                      className="w-full flex items-center justify-between p-4 text-left font-display font-bold uppercase text-sm md:text-base tracking-tight cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className={isOpen ? 'text-nx-yellow-400' : 'text-nx-paper-100'}>
                        {skill.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-nx-stone-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-nx-yellow-400' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-nx-stone-300 border-t border-dashed border-nx-line-dark/60 space-y-3 animate-fadeIn">
                        <p className="leading-relaxed">{skill.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] uppercase border border-dashed border-nx-line-dark px-1.5 py-0.5 text-nx-stone-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
