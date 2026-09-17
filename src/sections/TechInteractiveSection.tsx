import React, { useState } from 'react';
import { editorialTechList } from '../data/skills';
import { DashedRail } from '../components/DashedRail';
import { ArrowUpRight } from 'lucide-react';

export const TechInteractiveSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-nx-paper-100 text-nx-ink-950 py-24 md:py-32 relative nx-grain nx-grain--paper border-b border-dashed border-nx-line-light">
      <DashedRail dark={false} />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="ui-point bg-nx-ink-950 shrink-0" />
          <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
            06 // Technology Directory
          </p>
        </div>

        <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-14">
          Core Engine &amp; Creative Tools.
        </h2>

        {/* Editorial Interactive Stack List */}
        <div className="border-t border-dashed border-nx-line-light">
          {editorialTechList.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group border-b border-dashed border-nx-line-light py-6 sm:py-8 px-4 transition-colors duration-200 hover:bg-nx-paper-200 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span className="font-mono text-xs font-bold text-nx-stone-400 group-hover:text-nx-ink-950 transition-colors">
                      {`0${idx + 1}`}
                    </span>
                    <span className="font-display font-extrabold uppercase text-2xl sm:text-4xl md:text-5xl tracking-tighter text-nx-ink-950 group-hover:translate-x-3 transition-transform duration-300">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-12">
                    <div className="text-left sm:text-right">
                      <p className="font-mono text-xs uppercase tracking-widest font-bold text-nx-ink-950">
                        {item.category}
                      </p>
                      <p className="text-xs text-nx-stone-500">
                        {item.exp}
                      </p>
                    </div>

                    <div
                      className={`w-9 h-9 flex items-center justify-center border border-dashed transition-all duration-300 ${
                        isHovered
                          ? 'bg-nx-yellow-400 border-nx-yellow-400 text-nx-ink-950 rotate-45 scale-110'
                          : 'border-nx-line-light text-nx-stone-400'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
