import React, { useState } from 'react';
import { LabCanvas } from '../three/LabCanvas';
import { DashedRail } from '../components/DashedRail';

export const Creative3DSection: React.FC = () => {
  const [wireframe, setWireframe] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [shape, setShape] = useState<'torus' | 'sphere' | 'octahedron'>('torus');

  return (
    <section id="3d-lab" className="bg-nx-ink-900 text-nx-paper-100 py-24 md:py-32 relative nx-grain border-b border-dashed border-nx-line-dark overflow-hidden">
      <DashedRail dark />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="ui-point bg-nx-yellow-400 shrink-0" />
              <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                08 // Experimental Digital Laboratory
              </p>
            </div>
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Kinetic WebGL Shader Playground.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest border border-dashed border-nx-yellow-400/60 text-nx-yellow-400 px-3 py-1.5 bg-nx-yellow-400/5">
              REAL-TIME WEBGL 2.0
            </span>
            <span className="font-mono text-xs uppercase tracking-widest border border-dashed border-nx-line-dark text-nx-stone-400 px-3 py-1.5">
              THREE.JS SHADERS
            </span>
          </div>
        </div>

        {/* Interactive Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-nx-ink-950 border border-dashed border-nx-line-dark font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-nx-stone-500">// GEOMETRY:</span>
            {(['torus', 'sphere', 'octahedron'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-3 py-1 border border-dashed transition-colors cursor-pointer ${
                  shape === s
                    ? 'border-nx-yellow-400 text-nx-yellow-400 bg-nx-yellow-400/10 font-bold'
                    : 'border-nx-line-dark text-nx-stone-400 hover:text-nx-paper-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-nx-stone-500">// RENDER:</span>
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-3 py-1 border border-dashed transition-colors cursor-pointer ${
                wireframe
                  ? 'border-nx-yellow-400 text-nx-yellow-400 bg-nx-yellow-400/10 font-bold'
                  : 'border-nx-line-dark text-nx-stone-400 hover:text-nx-paper-100'
              }`}
            >
              {wireframe ? 'WIREFRAME' : 'SOLID PBR'}
            </button>
            <button
              onClick={() => setSpeed((prev) => (prev === 1.0 ? 1.8 : prev === 1.8 ? 0.5 : 1.0))}
              className="px-3 py-1 border border-dashed border-nx-line-dark text-nx-stone-400 hover:text-nx-yellow-400 transition-colors cursor-pointer"
            >
              SPEED: {speed}X
            </button>
          </div>
        </div>

        {/* 3D Lab Canvas */}
        <LabCanvas
          wireframeMode={wireframe}
          distortionSpeed={speed}
          interactiveShape={shape}
        />

        {/* Technical Explanatory Note */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-nx-stone-400 border-t border-dashed border-nx-line-dark pt-8">
          <div>
            <p className="uppercase text-nx-yellow-400 font-bold mb-1">// Mathematical Topology</p>
            <p className="text-nx-stone-500 leading-relaxed">
              Real-time trigonometric wave equations dynamically mutate vertex positions across continuous animation frames.
            </p>
          </div>
          <div>
            <p className="uppercase text-nx-yellow-400 font-bold mb-1">// Zero Garbage Collection</p>
            <p className="text-nx-stone-500 leading-relaxed">
              Buffer attributes are updated in-place avoiding memory allocation spikes and maintaining a steady 60 FPS profile.
            </p>
          </div>
          <div>
            <p className="uppercase text-nx-yellow-400 font-bold mb-1">// Hardware Parallax</p>
            <p className="text-nx-stone-500 leading-relaxed">
              Pointer kinematics calculate Euler rotations with weighted inertia and dampening for natural physical feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
