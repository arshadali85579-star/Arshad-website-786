import React from 'react';
import { metricsData } from '../data/metrics';
import { DashedRail } from '../components/DashedRail';

export const MetricsSection: React.FC = () => {
  return (
    <section className="bg-nx-yellow-400 text-nx-ink-950 py-20 md:py-28 relative nx-grain nx-grain--paper border-b border-dashed border-nx-ink-950/20">
      <DashedRail dark={false} />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="ui-point bg-nx-ink-950 shrink-0" />
          <p className="font-mono text-xs uppercase tracking-widest text-nx-ink-900/80">
            07 // Engineering Metrics
          </p>
        </div>

        <h2 className="font-display font-black uppercase leading-[0.92] tracking-tight text-3xl sm:text-4xl md:text-5xl max-w-3xl mb-16">
          Grounded engineering standards. Zero fabricated numbers.
        </h2>

        {/* 4 Metric Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-dashed border-nx-ink-950/30 pt-10">
          {metricsData.map((metric, idx) => (
            <div key={idx} className="space-y-3 group">
              <div className="font-mono text-xs uppercase tracking-widest text-nx-ink-900/60">
                {`[0${idx + 1}]`}
              </div>

              <div className="font-display font-black text-5xl sm:text-6xl tracking-tight leading-none text-nx-ink-950 group-hover:scale-105 transition-transform duration-200 origin-left">
                {metric.number}
                {metric.suffix && (
                  <span className="text-3xl sm:text-4xl font-mono ml-1 font-bold">
                    {metric.suffix}
                  </span>
                )}
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-mono text-xs uppercase tracking-widest font-bold text-nx-ink-950">
                  {metric.label}
                </p>
                <p className="text-xs text-nx-ink-900/75 leading-relaxed">
                  {metric.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
