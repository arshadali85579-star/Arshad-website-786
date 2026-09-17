import React from 'react';
import { servicesData } from '../data/services';
import { DashedRail } from '../components/DashedRail';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="bg-nx-paper-200 text-nx-ink-950 py-24 md:py-32 relative nx-grain nx-grain--paper border-b border-dashed border-nx-line-light">
      <DashedRail dark={false} />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-5 items-end gap-6 lg:gap-16 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="ui-point bg-nx-ink-950 shrink-0" />
              <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
                02 // Specialized Services
              </p>
            </div>
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Transforming ambitious concepts into bespoke digital systems.
            </h2>
          </div>

          <div className="lg:col-span-2">
            <p className="text-nx-stone-500 text-base md:text-lg leading-relaxed">
              Every deployment requires tailored craftsmanship. I combine modern engineering, design intuition, and 3D interactivity to deliver digital products that look exceptional, operate reliably, and convert.
            </p>
          </div>
        </div>

        {/* 12 Editorial Grid Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-dashed border-nx-line-light">
          {servicesData.map((service) => (
            <div
              key={service.number}
              className="border-r border-b border-dashed border-nx-line-light p-8 md:p-10 flex flex-col justify-between bg-nx-paper-100 hover:bg-nx-paper-0 transition-colors duration-200 group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs font-bold text-nx-stone-400 group-hover:text-nx-ink-950 transition-colors">
                    {`{${service.number}}`}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-nx-yellow-400 transition-colors" />
                </div>

                <h3 className="font-display font-bold uppercase leading-tight tracking-tight text-xl md:text-2xl text-nx-ink-950 group-hover:translate-x-1 transition-transform duration-200 mb-4">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-nx-stone-500">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-nx-line-light/60 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] uppercase tracking-wide border border-dashed border-nx-line-light px-2 py-0.5 text-nx-stone-500 bg-nx-paper-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest font-bold text-nx-ink-950 hover:text-nx-yellow-600 transition-colors group/link"
                >
                  <span>Inquire service</span>
                  <span className="text-nx-yellow-500 font-bold group-hover/link:translate-x-1 transition-transform">↳</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
