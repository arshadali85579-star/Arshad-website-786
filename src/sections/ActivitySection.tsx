import React, { useState } from 'react';
import { activitiesData } from '../data/services';
import { DashedRail } from '../components/DashedRail';
import { ArrowUpRight } from 'lucide-react';

export const ActivitySection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-nx-paper-100 text-nx-ink-950 py-24 md:py-32 relative nx-grain nx-grain--paper border-b border-dashed border-nx-line-light">
      <DashedRail dark={false} />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-5 items-end gap-6 lg:gap-16 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="ui-point bg-nx-ink-950 shrink-0" />
              <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
                01 // Field of Activity
              </p>
            </div>
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              I create digital architectures that unlock new dimensions in user experience.
            </h2>
          </div>

          <div className="lg:col-span-2 flex flex-wrap gap-2">
            {[
              'Web Development',
              'Creative 3D',
              'Frontend Architecture',
              'Backend Systems',
              'Interaction Design',
              'AI & Automation'
            ].map((tag) => (
              <span key={tag} className="ui-hash">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Rows */}
        <div className="border-t border-dashed border-nx-line-light">
          {activitiesData.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group border-b border-dashed border-nx-line-light py-8 md:py-10 px-4 transition-all duration-300 hover:bg-nx-paper-200 cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Number & Badge */}
                  <div className="md:col-span-2 flex items-center gap-4">
                    <span className="font-mono text-sm font-bold text-nx-stone-400 group-hover:text-nx-ink-950 transition-colors">
                      {`{${item.number}}`}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest border border-dashed border-nx-line-light px-2 py-0.5 text-nx-stone-500 bg-nx-paper-100">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-4">
                    <h3 className="font-display font-extrabold uppercase text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <div className="md:col-span-4">
                    <p className="text-sm md:text-base text-nx-stone-500 leading-relaxed group-hover:text-nx-ink-950 transition-colors">
                      {item.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wide border border-dashed border-nx-line-light px-2 py-0.5 text-nx-stone-500 bg-nx-paper-0"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center border border-dashed transition-all duration-300 ${
                        isHovered
                          ? 'bg-nx-yellow-400 border-nx-yellow-400 text-nx-ink-950 rotate-45 scale-110'
                          : 'border-nx-line-light text-nx-stone-400'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
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
