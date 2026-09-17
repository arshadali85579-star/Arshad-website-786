import React, { useEffect, useRef, useState } from 'react';
import { isTouchDevice } from '../lib/performance';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const stateRef = useRef<'default' | 'hover' | 'project' | 'canvas'>('default');

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'project' | 'canvas'>('default');
  const [cursorText, setCursorText] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Completely disable on touch / mobile devices
    if (isTouchDevice()) {
      return;
    }
    setEnabled(true);

    let lastCheckTime = 0;
    let lastTarget: EventTarget | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      const now = performance.now();
      if (e.target === lastTarget && now - lastCheckTime < 40) {
        return;
      }
      lastTarget = e.target;
      lastCheckTime = now;

      const targetEl = e.target as HTMLElement | null;
      if (!targetEl) return;

      const interactive = targetEl.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = targetEl.closest('[data-cursor="project"]');
      const canvasEl = targetEl.closest('canvas, [data-cursor="canvas"]');

      let nextState: 'default' | 'hover' | 'project' | 'canvas' = 'default';
      let nextText = '';

      if (projectCard) {
        nextState = 'project';
        nextText = 'VIEW';
      } else if (canvasEl) {
        nextState = 'canvas';
        nextText = 'ROTATE';
      } else if (interactive) {
        nextState = 'hover';
        nextText = '';
      }

      if (stateRef.current !== nextState) {
        stateRef.current = nextState;
        setCursorState(nextState);
        setCursorText(nextText);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Hardware-accelerated direct DOM transform loop (ZERO React re-renders)
    let rafId: number;
    const lerp = () => {
      const pos = posRef.current;
      const target = targetRef.current;

      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      rafId = requestAnimationFrame(lerp);
    };
    rafId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const isExpanded = cursorState === 'hover' || cursorState === 'project' || cursorState === 'canvas';

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300 select-none hidden md:block will-change-transform"
      style={{
        transform: `translate3d(-100px, -100px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Outer Circle Ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center ${
          isExpanded
            ? 'w-14 h-14 bg-nx-yellow-400 text-nx-ink-950 border-nx-yellow-400 scale-100'
            : 'w-8 h-8 border-nx-yellow-400/60 scale-75'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </div>

      {/* Central Center Dot */}
      {!isExpanded && (
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-nx-yellow-400" />
      )}
    </div>
  );
};
