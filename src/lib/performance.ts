/**
 * Performance & Device Utilities
 */

export const isTouchDevice = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
};

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    isTouchDevice() ||
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getOptimalPixelRatio = (isMobile: boolean): number => {
  if (typeof window === 'undefined') return 1;
  const rawDpr = window.devicePixelRatio || 1;
  // Mobile: cap at 1.0 to prevent mobile GPU fill-rate saturation
  // Desktop: cap at 1.25 for crisp anti-aliasing without wasteful 2x/3x supersampling
  return isMobile ? Math.min(rawDpr, 1.0) : Math.min(rawDpr, 1.25);
};
