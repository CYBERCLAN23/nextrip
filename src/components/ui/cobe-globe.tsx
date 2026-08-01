'use client'

import { useEffect, useRef } from 'react'
import createGlobe, { type COBEOptions, type Arc, type Marker } from 'cobe'

export interface CobeGlobeProps {
  className?: string
  width?: number
  height?: number
  baseColor?: [number, number, number]
  markerColor?: [number, number, number]
  glowColor?: [number, number, number]
  arcColor?: [number, number, number]
  dark?: number
  phiOffset?: number
  markers?: Marker[]
  arcs?: Arc[]
  speed?: number
}

// Default network: African hubs → Chinese campuses, drawn in jade on a warm ink world.
const DEFAULT_ARK = [
  [14.7167, -17.4677], // Dakar
  [6.5244, 3.3792], // Lagos
  [5.6037, -0.187], // Accra
  [-1.2864, 36.8172], // Nairobi
  [9.0054, 38.7636], // Addis Ababa
  [-4.4419, 15.2663], // Kinshasa
  [-33.9189, 18.4233], // Cape Town
] as [number, number][]

const CN_HUBS = [
  [39.9042, 116.4074], // Beijing
  [31.2304, 121.4737], // Shanghai
  [30.2741, 120.1551], // Hangzhou
] as [number, number][]

function buildDefaultArcs(): Arc[] {
  const arcs: Arc[] = []
  for (const from of DEFAULT_ARK) {
    for (const to of CN_HUBS) {
      arcs.push({ from, to })
    }
  }
  return arcs
}

export function CobeGlobe({
  className,
  width = 800,
  height = 800,
  baseColor = [0.078, 0.063, 0.039],
  markerColor = [0.247, 0.706, 0.604],
  glowColor = [0.878, 0.694, 0.361],
  arcColor = [0.247, 0.706, 0.604],
  dark = 0.92,
  phiOffset = 1.6,
  markers,
  arcs,
  speed = 0.28,
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const defaultMarkers: Marker[] = [
      ...DEFAULT_ARK.map((location) => ({ location, size: 0.045, color: [0.247, 0.706, 0.604] as [number, number, number] })),
      ...CN_HUBS.map((location) => ({ location, size: 0.05, color: [0.878, 0.694, 0.361] as [number, number, number] })),
    ]

    const opts: COBEOptions & { onRender: (state: { phi: number }) => void } = {
      width: width * 2,
      height: height * 2,
      devicePixelRatio: 2,
      phi: phiOffset,
      theta: 0.28,
      dark,
      diffuse: 0.6,
      mapSamples: 24000,
      mapBrightness: 5,
      mapBaseBrightness: 0.1,
      baseColor,
      markerColor,
      glowColor,
      markers: markers ?? defaultMarkers,
      arcs: arcs ?? buildDefaultArcs(),
      arcColor,
      arcWidth: 1.4,
      arcHeight: 0.9,
      scale: 1.05,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          state.phi += speed / 100
        } else {
          state.phi = phiOffset + pointerInteractionMovement.current / 200
        }
      },
    }

    const globe = createGlobe(canvas, opts)

    return () => {
      globe.destroy()
    }
  }, [baseColor, markerColor, glowColor, arcColor, dark, phiOffset, width, height, markers, arcs, speed])

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = e.clientX
    canvasRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      pointerInteractionMovement.current = e.clientX - pointerInteracting.current
    }
  }

  const handlePointerUp = () => {
    pointerInteracting.current = null
  }

  return (
    <canvas
      ref={canvasRef}
      aria-label="World map showing NexTrip routes from Africa to China"
      role="img"
      className={className}
      style={{ width: '100%', height: 'auto', aspectRatio: `${width} / ${height}`, touchAction: 'none', cursor: 'grab' }}
      width={width}
      height={height}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  )
}
