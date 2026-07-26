'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import type { Marker as CobeMarker, Arc } from 'cobe';

export interface Marker extends CobeMarker {
  label?: string;
}

export interface GlobeProps {
  markers?: Marker[];
  arcs?: Arc[];
  markerColor?: [number, number, number];
  arcColor?: [number, number, number];
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  diffuse?: number;
  scale?: number;
  offset?: [number, number];
  className?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  initialPhi?: number;
  initialTheta?: number;
}

export function Globe({
  markers = [],
  arcs = [],
  markerColor = [0.3, 0.45, 0.85],
  arcColor = [0.3, 0.45, 0.85],
  baseColor = [1, 1, 1],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.8,
  arcHeight = 1.2,
  diffuse = 1.2,
  scale = 1,
  offset,
  className = '',
  autoRotate = true,
  rotationSpeed = 0.005,
  initialPhi = 0,
  initialTheta = 0.3,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = initialPhi;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: 1000,
      height: 1000,
      phi,
      theta: initialTheta,
      dark,
      diffuse,
      scale,
      mapSamples: 16000,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      markers: markers.map(({ location, size, color, id }) => ({
        location,
        size: size ?? markerSize,
        color,
        id,
      })),
      arcs,
      arcColor,
      arcWidth,
      arcHeight,
      markerElevation,
      offset,
      onRender: (state) => {
        if (autoRotate) {
          phi += rotationSpeed;
          state.phi = phi;
        }
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        aspectRatio: '1',
        display: 'block',
      }}
    />
  );
}
