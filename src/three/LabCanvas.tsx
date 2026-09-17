import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isMobileDevice, getOptimalPixelRatio } from '../lib/performance';

interface LabCanvasProps {
  wireframeMode?: boolean;
  distortionSpeed?: number;
  interactiveShape?: 'torus' | 'sphere' | 'octahedron';
}

export const LabCanvas: React.FC<LabCanvasProps> = ({
  wireframeMode = true,
  distortionSpeed = 1.0,
  interactiveShape = 'torus',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fpsRef = useRef<HTMLParagraphElement>(null);
  const [vertexCount, setVertexCount] = useState(0);

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

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    renderer.setSize(width, height);
    renderer.setPixelRatio(getOptimalPixelRatio(isMobile));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Adaptive Geometry based on device capability & prop
    let geo: THREE.BufferGeometry;
    if (interactiveShape === 'sphere') {
      geo = new THREE.SphereGeometry(1.8, isMobile ? 20 : 36, isMobile ? 20 : 36);
    } else if (interactiveShape === 'octahedron') {
      geo = new THREE.OctahedronGeometry(2.0, isMobile ? 2 : 3);
    } else {
      geo = new THREE.TorusKnotGeometry(
        1.4,
        0.45,
        isMobile ? 48 : 80,
        isMobile ? 14 : 24,
        2,
        3
      );
    }

    // Save initial vertex positions for procedural wave distortion
    const positionAttr = geo.getAttribute('position');
    const initialPositions = positionAttr.array.slice() as Float32Array;
    setVertexCount(positionAttr.count);

    // Material
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0f1318,
      emissive: wireframeMode ? 0x221a00 : 0x000000,
      roughness: 0.15,
      metalness: 0.95,
      wireframe: wireframeMode,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Outer wireframe shell
    const outerGeo = new THREE.TorusKnotGeometry(
      1.65,
      0.15,
      isMobile ? 40 : 80,
      isMobile ? 10 : 16,
      2,
      3
    );
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xfbe052,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Volumetric particle cloud
    const cloudCount = isMobile ? 60 : 180;
    const cloudPositions = new Float32Array(cloudCount * 3);
    for (let i = 0; i < cloudCount * 3; i += 3) {
      const r = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      cloudPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      cloudPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      cloudPositions[i + 2] = r * Math.cos(phi);
    }
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
    const cloudMat = new THREE.PointsMaterial({
      color: 0xfbe052,
      size: isMobile ? 0.05 : 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const cloud = new THREE.Points(cloudGeo, cloudMat);
    scene.add(cloud);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    const light1 = new THREE.PointLight(0xfbe052, 4.0, 12);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x406080, 2.5, 12);
    light2.position.set(-3, -2, -2);
    scene.add(light2);

    // Mouse response
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!isMobile) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Debounced Resize
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

    let isScrolling = false;
    let scrollTimeout: number;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Visibility-driven animation loop
    let animId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();
    let waveStep = 0;

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime() * distortionSpeed;

      // Direct DOM FPS tracker (ZERO React re-renders)
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const measuredFps = Math.round((frameCount * 1000) / (now - lastTime));
        if (fpsRef.current) {
          fpsRef.current.textContent = `${measuredFps} FPS / ACTIVE`;
        }
        frameCount = 0;
        lastTime = now;
      }

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mesh.rotation.x = time * 0.3 + mouseY;
      mesh.rotation.y = time * 0.4 + mouseX;
      outerMesh.rotation.x = -time * 0.2;
      outerMesh.rotation.y = -time * 0.25;
      cloud.rotation.y = time * 0.15;

      // Procedural surface wave distortion - suspend VRAM buffer uploads during active scroll to ensure 60 FPS scrolling
      waveStep++;
      if (!isScrolling && (!isMobile || waveStep % 2 === 0)) {
        const pos = geo.getAttribute('position') as THREE.BufferAttribute;
        const arr = pos.array as Float32Array;
        const count = pos.count;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const ox = initialPositions[i3];
          const oy = initialPositions[i3 + 1];
          const oz = initialPositions[i3 + 2];
          const wave = Math.sin(ox * 3.0 + time * 2.0) * Math.cos(oy * 3.0 + time * 1.5) * 0.08;
          arr[i3] = ox + ox * wave;
          arr[i3 + 1] = oy + oy * wave;
          arr[i3 + 2] = oz + oz * wave;
        }
        pos.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause loop when scrolled away
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
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (!isMobile) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      if (animId !== null) {
        cancelAnimationFrame(animId);
      }

      geo.dispose();
      mat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [wireframeMode, distortionSpeed, interactiveShape]);

  return (
    <div className="relative w-full h-[550px] md:h-[650px] bg-nx-ink-950 border border-dashed border-nx-line-dark overflow-hidden flex flex-col justify-between p-6">
      {/* HUD Telemetry Overlay */}
      <div className="flex justify-between items-start z-10 pointer-events-none font-mono text-[11px] uppercase tracking-widest text-nx-stone-400">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="ui-point bg-nx-yellow-400 animate-pulse" />
            <span className="text-nx-paper-100 font-bold">LAB // EXPERIMENTAL WEBGL</span>
          </div>
          <p className="text-[10px] text-nx-stone-500">SHADER SHAPE: {interactiveShape.toUpperCase()}</p>
        </div>
        <div className="text-right space-y-1">
          <p ref={fpsRef} className="text-nx-yellow-400 font-bold">60 FPS / ACTIVE</p>
          <p className="text-[10px] text-nx-stone-500">{vertexCount.toLocaleString()} VERTICES</p>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-crosshair" />

      {/* Bottom Technical HUD Readout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 z-10 pointer-events-none font-mono text-[10px] uppercase tracking-widest text-nx-stone-500 border-t border-dashed border-nx-line-dark/60 pt-4">
        <div className="flex items-center gap-4">
          <span>COORDINATES: [18.72° N, 75.31° E]</span>
          <span className="text-nx-yellow-400">/</span>
          <span>GPU ACCELERATED</span>
        </div>
        <div>
          <span>HOVER &amp; MOVE TO DISTORT TOPOLOGY</span>
        </div>
      </div>
    </div>
  );
};
