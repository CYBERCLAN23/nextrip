"use client";

/**
 * FloatingOrbs — a decorative Three.js R3F scene with floating glowing spheres.
 *
 * This component uses @react-three/fiber Canvas and @react-three/drei helpers
 * to render a subtle, orbiting particle field that can be placed behind any
 * section as a decorative background.
 *
 * Usage:
 *   <FloatingOrbs className="absolute inset-0 -z-10" opacity={0.6} />
 */

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ─────────────────────────────────────────────────────────── */

interface FloatingOrbsProps {
  /** Number of orbs. Default 12 */
  count?: number;
  /** CSS opacity for the canvas. Default 0.4 */
  canvasOpacity?: number;
  /** Base color of the orbs. Default "#0A3D91" */
  color?: string;
  /** Accent color for some orbs. Default "#00D9FF" */
  accentColor?: string;
  /** CSS className for the canvas wrapper. Default "" */
  className?: string;
}

/* ─── Orb instance data ──────────────────────────────────────────── */

interface OrbData {
  position: [number, number, number];
  scale: number;
  color: THREE.Color;
  speed: number;
  floatIntensity: number;
  rotationIntensity: number;
}

/* ─── Single Orb ────────────────────────────────────────────────────── */

function Orb({ data }: { data: OrbData }) {
  return (
    <Float
      speed={data.speed}
      rotationIntensity={data.rotationIntensity}
      floatIntensity={data.floatIntensity}
    >
      <mesh position={data.position} scale={data.scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.04}
          anisotropicBlur={0.1}
          clearcoat={0.1}
          transparent
          opacity={1}
          color={data.color}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────────── */

function OrbsScene({
  count = 12,
  color = "#0A3D91",
  accentColor = "#00D9FF",
}: FloatingOrbsProps) {
  const baseColor = useMemo(() => new THREE.Color(color), [color]);
  const accent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  const orbs = useMemo<OrbData[]>(() => {
    const items: OrbData[] = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos(2 * (i / count) - 1);
      const radius = 2.5 + Math.random() * 3;

      items.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
        scale: 0.15 + Math.random() * 0.35,
        color: i % 3 === 0 ? accent : baseColor,
        speed: 0.5 + Math.random() * 1.5,
        floatIntensity: 0.3 + Math.random() * 0.5,
        rotationIntensity: 0.1 + Math.random() * 0.3,
      });
    }
    return items;
  }, [count, baseColor, accent]);

  return (
    <group>
      {orbs.map((data, i) => (
        <Orb key={i} data={data} />
      ))}
    </group>
  );
}

/* ─── Public Component ──────────────────────────────────────────────── */

export function FloatingOrbs({
  count = 12,
  canvasOpacity = 0.4,
  color = "#0A3D91",
  accentColor = "#00D9FF",
  className = "",
}: FloatingOrbsProps) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          opacity: canvasOpacity,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color={accentColor} />
        <OrbsScene count={count} color={color} accentColor={accentColor} />
      </Canvas>
    </div>
  );
}
