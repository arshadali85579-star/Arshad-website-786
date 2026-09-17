import React, { useState } from 'react';
import { faqsData } from '../data/faqs';
import { DashedRail } from '../components/DashedRail';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-nx-paper-100 text-nx-ink-950 py-24 md:py-32 relative nx-grain nx-grain--paper border-b border-dashed border-nx-line-light">
      <DashedRail dark={false} />

      <div className="ui-cont relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="ui-point bg-nx-ink-950 shrink-0" />
          <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
            09 // Inquiries &amp; Process
          </p>
        </div>

        <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-16">
          Questions, answered.
        </h2>

        {/* Accordion List */}
        <div className="border-t border-dashed border-nx-line-light">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border-b border-dashed border-nx-line-light transition-colors duration-200 ${
                  isOpen ? 'bg-nx-paper-200' : 'hover:bg-nx-paper-200/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full py-6 px-4 flex items-center justify-between text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold uppercase tracking-tight text-lg sm:text-xl text-nx-ink-950 group-hover:translate-x-1 transition-transform duration-200">
                    {faq.question}
                  </span>

                  {/* Morphing Plus/Minus Icon */}
                  <div className="relative w-4 h-4 shrink-0 ml-4">
                    <span className="absolute top-1/2 left-0 w-full h-0.5 bg-nx-ink-950 -translate-y-1/2" />
                    <span
                      className={`absolute top-0 left-1/2 w-0.5 h-full bg-nx-ink-950 -translate-x-1/2 transition-transform duration-300 ${
                        isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
                      }`}
                    />
                  </div>
                </button>

                {/* Answer Drawer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-8 pt-2 text-sm sm:text-base text-nx-stone-500 leading-relaxed max-w-3xl">
                      {faq.answer}
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
