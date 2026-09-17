import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isMobileDevice, getOptimalPixelRatio, prefersReducedMotion } from '../lib/performance';

export const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglError(true);
        return;
      }
    } catch {
      setWebglError(true);
      return;
    }

    const isMobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 2. Renderer with controlled device pixel ratio
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile, // Disable MSAA on low-end mobile to save GPU cycles
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getOptimalPixelRatio(isMobile));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL Renderer initialization failed', e);
      setWebglError(true);
      return;
    }

    // 3. Central Kinetic 3D Object Group
    const group = new THREE.Group();
    scene.add(group);

    // Main Core: Metallic PBR
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x11161d,
      roughness: 0.18,
      metalness: 0.92,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Wireframe Outer Cage
    const wireGeo = new THREE.IcosahedronGeometry(2.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xfbe052,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // Inner Luminous Core
    const innerGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xfbe052,
      emissive: 0x997711,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Orbital Ring 1 (Smooth white ring)
    const ringSegments = isMobile ? 48 : 80;
    const ringGeo1 = new THREE.TorusGeometry(3.1, 0.018, 12, ringSegments);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Orbital Ring 2 (Yellow accent ring)
    const ringGeo2 = new THREE.TorusGeometry(3.5, 0.012, 12, ringSegments);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xfbe052,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Floating Architectural Micro-cubes (Adaptive density: 28 desktop, 12 mobile)
    const cubesGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x222a35,
      metalness: 0.8,
      roughness: 0.2,
    });

    const cubeCount = isMobile ? 12 : 28;
    const cubeItems: { mesh: THREE.Mesh; speed: number; radius: number; angle: number; yOffset: number }[] = [];

    for (let i = 0; i < cubeCount; i++) {
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      const radius = 3.2 + Math.random() * 2.2;
      const angle = (i / cubeCount) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 2.8;
      cube.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      cubesGroup.add(cube);
      cubeItems.push({
        mesh: cube,
        speed: (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1),
        radius,
        angle,
        yOffset,
      });
    }
    scene.add(cubesGroup);

    // Ambient Stardust Particles (Adaptive count: 200 desktop, 60 mobile)
    const particlesCount = isMobile ? 60 : 200;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfbe052,
      size: isMobile ? 0.045 : 0.035,
      transparent: true,
      opacity: 0.4,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const yellowAccentLight = new THREE.PointLight(0xfbe052, 3.5, 15);
    yellowAccentLight.position.set(-4, 3, 2);
    scene.add(yellowAccentLight);

    const cyanRimLight = new THREE.PointLight(0x406080, 2.0, 15);
    cyanRimLight.position.set(3, -4, -3);
    scene.add(cyanRimLight);

    // 5. Pointer Tracking (Stored directly in variables, NO React re-renders)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.0008;
      targetY = (e.clientY - windowHalfY) * 0.0008;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // 6. Resize Handler (Debounced)
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

    // 7. Visibility-Driven Render Loop (IntersectionObserver)
    let animationFrameId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const speedMultiplier = reducedMotion ? 0.3 : 1.0;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Group cinematic slow rotation + mouse response
      group.rotation.y = elapsedTime * 0.18 + mouseX * 2.0;
      group.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + mouseY * 1.5;

      // Orbiting rings counter-rotation
      ring1.rotation.z = elapsedTime * 0.12;
      ring2.rotation.x = elapsedTime * -0.16;

      // Inner pulsating core
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.06;
      innerMesh.scale.set(pulse, pulse, pulse);
      innerMesh.rotation.y = -elapsedTime * 0.25;

      // Orbiting micro-cubes
      cubeItems.forEach((item) => {
        item.angle += item.speed * 0.01;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = item.yOffset + Math.sin(elapsedTime + item.angle) * 0.35;
        item.mesh.rotation.x += 0.01;
        item.mesh.rotation.y += 0.015;
      });

      // Subtle particle float
      particleSystem.rotation.y = elapsedTime * 0.03;

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
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Start initial loop
    animate();

    // 8. Cleanup & Resource Disposal
    return () => {
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (webglError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="relative w-80 h-80 rounded-full border border-dashed border-nx-yellow-400 animate-spin" style={{ animationDuration: '24s' }}>
          <div className="absolute inset-4 rounded-full border border-dashed border-nx-line-dark" />
          <div className="absolute inset-1/3 rounded-full bg-nx-yellow-400/10 blur-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
