import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING EXPERIENCE');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatusText('READY // SYSTEM ARSHAD 1.0');
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600);
          }, 250);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 85) setStatusText('SYNCHRONIZING THREE.JS WEBGL');
        else if (next >= 50) setStatusText('COMPILING SHADER PIPELINES');
        else if (next >= 25) setStatusText('CALIBRATING GRID GEOMETRY');
        return Math.min(next, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-nx-ink-950 flex flex-col justify-between p-8 md:p-14 text-nx-paper-100 transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest text-nx-stone-400">
        <div className="flex items-center gap-2">
          <span className="ui-point bg-nx-yellow-400 animate-pulse" />
          <span className="text-nx-paper-100 font-bold">SAYYAD ARSHAD</span>
        </div>
        <p className="text-[11px] text-nx-stone-500">PORTFOLIO EDITION 2026</p>
      </div>

      {/* Center Large Progress Display */}
      <div className="my-auto max-w-4xl">
        <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none text-nx-paper-100">
          {progress.toString().padStart(3, '0')}
          <span className="text-nx-yellow-400 text-3xl sm:text-5xl font-mono ml-2">%</span>
        </div>
        <div className="w-full bg-nx-ink-800 h-1 mt-6 overflow-hidden relative border border-dashed border-nx-line-dark">
          <div
            className="bg-nx-yellow-400 h-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Status Readout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 font-mono text-[11px] uppercase tracking-widest text-nx-stone-400 border-t border-dashed border-nx-line-dark pt-4">
        <div className="flex items-center gap-3">
          <span className="text-nx-yellow-400">↳</span>
          <span>{statusText}</span>
        </div>
        <div className="text-[10px] text-nx-stone-500">
          LOCATION: MAHARASHTRA, IN [18.72° N, 75.31° E]
        </div>
      </div>
    </div>
  );
};
