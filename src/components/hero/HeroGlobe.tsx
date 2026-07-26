"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Accessibility: Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {};
    }

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let isVisible = true;

    // Track theme changes dynamically
    let primaryColor = "#0A3D91";
    let accentColor = "#D81F2A";

    const updateColorsFromTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      primaryColor = isDark ? "#80ADFF" : "#0A3D91";
      accentColor = "#D81F2A";
    };
    updateColorsFromTheme();

    // Listen for theme modifications
    const observer = new MutationObserver(() => {
      updateColorsFromTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 2. IntersectionObserver: Pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    try {
      scene = new THREE.Scene();
      scene.background = null;

      const w = canvas.clientWidth || 500;
      const h = canvas.clientHeight || 500;
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.set(0, 0, 3.2);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Generate flight/travel trails procedurally
      const curves: THREE.CatmullRomCurve3[] = [];
      const curveLines: THREE.Line[] = [];
      const particleProgress: number[] = [];
      const particleSpeeds: number[] = [];
      const particleGroup = new THREE.Group();
      scene.add(particleGroup);

      const numTrails = 16;
      for (let i = 0; i < numTrails; i++) {
        // Source and destination coordinates mapped on a virtual sphere of radius 1
        const theta1 = Math.random() * Math.PI * 2;
        const phi1 = Math.acos(Math.random() * 2 - 1);
        const start = new THREE.Vector3().setFromSphericalCoords(1.05, phi1, theta1);

        const theta2 = theta1 + (Math.random() * 1.5 - 0.75);
        const phi2 = phi1 + (Math.random() * 1.5 - 0.75);
        const end = new THREE.Vector3().setFromSphericalCoords(1.05, phi2, theta2);

        // Control point lifted off the sphere to create a graceful arc
        const mid = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(1.25 + Math.random() * 0.2);

        const curve = new THREE.CatmullRomCurve3([start, mid, end]);
        curves.push(curve);

        // Create a faint path line
        const points = curve.getPoints(32);
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const pathMaterial = new THREE.LineBasicMaterial({
          color: i % 3 === 0 ? accentColor : primaryColor,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
        });
        const pathLine = new THREE.Line(pathGeometry, pathMaterial);
        particleGroup.add(pathLine);
        curveLines.push(pathLine);

        // Track speeds and progress for animating traveler dots along the arcs
        particleProgress.push(Math.random());
        particleSpeeds.push(0.003 + Math.random() * 0.005);
      }

      // Animated glowing points representing students moving between destinations
      const dotGeometry = new THREE.BufferGeometry();
      const dotPositions = new Float32Array(numTrails * 3);
      const dotColors = new Float32Array(numTrails * 3);

      for (let i = 0; i < numTrails; i++) {
        const point = curves[i].getPointAt(particleProgress[i]);
        dotPositions[i * 3] = point.x;
        dotPositions[i * 3 + 1] = point.y;
        dotPositions[i * 3 + 2] = point.z;

        const color = new THREE.Color(i % 3 === 0 ? accentColor : primaryColor);
        dotColors[i * 3] = color.r;
        dotColors[i * 3 + 1] = color.g;
        dotColors[i * 3 + 2] = color.b;
      }

      dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
      dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

      // Draw high-quality rounded particles
      const canvasSprite = document.createElement("canvas");
      canvasSprite.width = 16;
      canvasSprite.height = 16;
      const ctx = canvasSprite.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const texture = new THREE.CanvasTexture(canvasSprite);

      const dotMaterial = new THREE.PointsMaterial({
        size: 0.12,
        map: texture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const dots = new THREE.Points(dotGeometry, dotMaterial);
      particleGroup.add(dots);

      // Handle window resizing
      const handleResize = () => {
        if (!canvas || !camera || !renderer) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      window.addEventListener("resize", handleResize);

      // Slow, luxurious rotation state
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      canvas.addEventListener("mousemove", handleMouseMove);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Pause state check
        if (!isVisible) return;

        // Luxurious inertia tracking
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        particleGroup.rotation.y += 0.0018;
        particleGroup.rotation.x = targetY * 0.2;
        particleGroup.rotation.y += targetX * 0.2;

        // Move dots along the flight arcs
        const positions = dotGeometry.attributes.position.array as Float32Array;
        const colors = dotGeometry.attributes.color.array as Float32Array;

        for (let i = 0; i < numTrails; i++) {
          particleProgress[i] += particleSpeeds[i];
          if (particleProgress[i] > 1) {
            particleProgress[i] = 0;
          }

          const point = curves[i].getPointAt(particleProgress[i]);
          positions[i * 3] = point.x;
          positions[i * 3 + 1] = point.y;
          positions[i * 3 + 2] = point.z;

          // Make the paths dynamically align with color themes
          const pathMat = curveLines[i].material as THREE.LineBasicMaterial;
          const currThemeColor = new THREE.Color(i % 3 === 0 ? accentColor : primaryColor);
          pathMat.color.copy(currThemeColor);

          colors[i * 3] = currThemeColor.r;
          colors[i * 3 + 1] = currThemeColor.g;
          colors[i * 3 + 2] = currThemeColor.b;
        }

        dotGeometry.attributes.position.needsUpdate = true;
        dotGeometry.attributes.color.needsUpdate = true;

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("mousemove", handleMouseMove);
        observer.disconnect();
        intersectionObserver.disconnect();
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (e) {
      console.warn("WebGL not supported, falling back to CSS animation.", e);
      setWebglError(true);
      return () => {};
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: "320px" }}
    >
      {!webglError ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none max-w-[500px] max-h-[500px]"
          style={{ aspectRatio: "1" }}
        />
      ) : (
        // CSS Elegant Fallback if WebGL fails
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#0A3D91]/10 to-[#D81F2A]/10 blur-2xl animate-pulse" />
        </div>
      )}
    </div>
  );
}

