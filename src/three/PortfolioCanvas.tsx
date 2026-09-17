import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ProjectItem } from '../types';
import { isMobileDevice, getOptimalPixelRatio } from '../lib/performance';

interface PortfolioCanvasProps {
  activeProject: ProjectItem;
}

export const PortfolioCanvas: React.FC<PortfolioCanvasProps> = ({ activeProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeMeshRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = isMobileDevice();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    renderer.setSize(width, height);
    renderer.setPixelRatio(getOptimalPixelRatio(isMobile));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.2);

    // Group representing the 3D viewport mockup
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    activeMeshRef.current = mainGroup;

    // 3D Browser Window Frame: Beveled Box
    const frameGeo = new THREE.BoxGeometry(3.6, 2.3, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e14,
      metalness: 0.85,
      roughness: 0.25,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    mainGroup.add(frameMesh);

    // Screen Inner Face
    const screenGeo = new THREE.PlaneGeometry(3.4, 2.0);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x141a24,
      metalness: 0.5,
      roughness: 0.6,
      emissive: 0x050a12,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.045;
    mainGroup.add(screenMesh);

    // Top Header Bar
    const barGeo = new THREE.PlaneGeometry(3.4, 0.2);
    const barMat = new THREE.MeshBasicMaterial({
      color: 0x222a36,
    });
    const barMesh = new THREE.Mesh(barGeo, barMat);
    barMesh.position.set(0, 0.9, 0.05);
    mainGroup.add(barMesh);

    // Three Micro Window Dots
    const dotGeo = new THREE.CircleGeometry(0.035, 12);
    const dotMats = [
      new THREE.MeshBasicMaterial({ color: 0x4a5568 }),
      new THREE.MeshBasicMaterial({ color: 0xfbe052 }),
      new THREE.MeshBasicMaterial({ color: 0x4a5568 }),
    ];
    [-1.5, -1.4, -1.3].forEach((xPos, idx) => {
      const dot = new THREE.Mesh(dotGeo, dotMats[idx]);
      dot.position.set(xPos, 0.9, 0.052);
      mainGroup.add(dot);
    });

    // Outer Yellow Architectural Frame Outline
    const edges = new THREE.EdgesGeometry(frameGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xfbe052,
      transparent: true,
      opacity: 0.65,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    mainGroup.add(wireframe);

    // Orbiting Floating Tech Ring (Segment-optimized)
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 10, isMobile ? 36 : 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfbe052,
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    mainGroup.add(ring);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const pLight = new THREE.PointLight(0xfbe052, 3.5, 10);
    pLight.position.set(2, 2, 3);
    scene.add(pLight);

    const rimLight = new THREE.PointLight(0x60a5fa, 2.0, 10);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    // Mouse tilt tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };

    if (!isMobile) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Debounced resize
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Visibility-driven animation loop
    let animId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      curRotX += (targetRotX - curRotX) * 0.06;
      curRotY += (targetRotY - curRotY) * 0.06;

      mainGroup.rotation.x = curRotX + Math.sin(time * 0.8) * 0.04;
      mainGroup.rotation.y = curRotY + Math.cos(time * 0.6) * 0.05;
      mainGroup.position.y = Math.sin(time * 1.2) * 0.08;

      ring.rotation.z = time * 0.2;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          animate();
        } else if (!nowVisible && isVisible) {
          isVisible = false;
          if (animId !== null) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Start loop
    animate();

    return () => {
      observer.disconnect();
      if (!isMobile) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      if (animId !== null) {
        cancelAnimationFrame(animId);
      }

      frameGeo.dispose();
      frameMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      barGeo.dispose();
      barMat.dispose();
      dotGeo.dispose();
      dotMats.forEach((m) => m.dispose());
      edges.dispose();
      lineMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [activeProject.id]);

  return (
    <div className="relative w-full h-[360px] md:h-[480px] bg-nx-ink-950/80 border border-dashed border-nx-line-dark flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating HUD Badges inside Canvas */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-nx-stone-400 bg-nx-ink-900/80 px-3 py-1.5 border border-dashed border-nx-line-dark">
        <span className="ui-point bg-nx-yellow-400 animate-ping" />
        <span>3D VIEWPORT // {activeProject.title}</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none font-mono text-[10px] uppercase tracking-widest text-nx-yellow-400 bg-nx-ink-900/80 px-3 py-1.5 border border-dashed border-nx-yellow-400/40">
        INTERACTIVE 3D PERSPECTIVE
      </div>
    </div>
  );
};
