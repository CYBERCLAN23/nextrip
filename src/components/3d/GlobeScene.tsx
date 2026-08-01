'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

// ── Brand colors (must match CSS vars) ────────────────────────
const C = {
  rose:      new THREE.Color('#E4A530'), // Gold
  blush:     new THREE.Color('#E8F2FF'), // Light paper/blush
  maroon:    new THREE.Color('#08172B'), // Dark maroon
  navy:      new THREE.Color('#0F1D32'), // Ink
  sky:       new THREE.Color('#2ECDA5'), // Jade
  peach:     new THREE.Color('#E85D4A'), // Coral
  void_:     new THREE.Color('#070E1B'), // Midnight
  coral:     new THREE.Color('#E85D4A'), // Coral
  jade:      new THREE.Color('#2ECDA5'), // Jade
  violet:    new THREE.Color('#7B3FF2'), // Violet
}

// ── lat/lon → 3-D sphere position ─────────────────────────────
function latLon(lat: number, lon: number, r = 1.18): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
     (r * Math.cos(phi)),
     (r * Math.sin(phi) * Math.sin(theta))
  )
}

// ── 12 global city nodes ──────────────────────────────────────
const CITIES = [
  { lat: 39.9,  lon: 116.4  }, // Beijing
  { lat: 31.2,  lon: 121.5  }, // Shanghai
  { lat: 6.5,   lon: 3.4    }, // Lagos
  { lat: -1.3,  lon: 36.8   }, // Nairobi
  { lat: 30.1,  lon: 31.2   }, // Cairo
  { lat: 19.1,  lon: 72.9   }, // Mumbai
  { lat: 24.9,  lon: 67.0   }, // Karachi
  { lat: 51.5,  lon: -0.1   }, // London
  { lat: 40.7,  lon: -74.0  }, // New York
  { lat: 25.2,  lon: 55.3   }, // Dubai
  { lat: 5.6,   lon: -0.2   }, // Accra
  { lat: 41.0,  lon: 29.0   }, // Istanbul
]

// ── Wireframe globe with lat/lon grid ─────────────────────────
function GlobeWireframe() {
  const groupRef = useRef<THREE.Group>(null)

  const latMat = useMemo(() => new THREE.LineBasicMaterial({
    color: C.rose, transparent: true, opacity: 0.18,
  }), [])

  const lonMat = useMemo(() => new THREE.LineBasicMaterial({
    color: C.blush, transparent: true, opacity: 0.07,
  }), [])

  // latitude parallels
  const latLines = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => {
      const lat = -80 + i * 20
      const pts: THREE.Vector3[] = []
      for (let lon = 0; lon <= 361; lon += 2) pts.push(latLon(lat, lon - 180))
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts), latMat
      )
    })
  }, [latMat])

  // longitude meridians
  const lonLines = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const lon = i * 30
      const pts: THREE.Vector3[] = []
      for (let lat = -90; lat <= 90; lat += 2) pts.push(latLon(lat, lon))
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts), lonMat
      )
    })
  }, [lonMat])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.09
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.055
  })

  return (
    <group ref={groupRef} position={[1.8, 0, -0.5]}>
      {/* Solid dark core */}
      <Sphere args={[1.13, 64, 64]}>
        <meshPhysicalMaterial
          color={C.maroon}
          metalness={0.15}
          roughness={0.88}
          emissive={C.rose}
          emissiveIntensity={0.06}
        />
      </Sphere>

      {/* Inner atmosphere — warm blush */}
      <Sphere args={[1.20, 48, 48]}>
        <meshBasicMaterial color={C.blush} transparent opacity={0.022} side={THREE.BackSide} />
      </Sphere>

      {/* Outer atmosphere haze — rose */}
      <Sphere args={[1.28, 32, 32]}>
        <meshBasicMaterial color={C.rose} transparent opacity={0.010} side={THREE.BackSide} />
      </Sphere>

      {/* Grid lines */}
      {latLines.map((l, i) => <primitive key={`lat${i}`} object={l} />)}
      {lonLines.map((l, i) => <primitive key={`lon${i}`} object={l} />)}

      {/* City nodes */}
      {CITIES.map((c, i) => {
        const pos = latLon(c.lat, c.lon)
        const isChina = i === 0 || i === 1 // Beijing and Shanghai are China
        return (
          <group key={i} position={pos}>
            <mesh>
              <sphereGeometry args={[0.011, 8, 8]} />
              <meshBasicMaterial color={isChina ? C.coral : C.rose} />
            </mesh>
            {/* Pulse ring */}
            <mesh>
              <ringGeometry args={[0.016, 0.022, 14]} />
              <meshBasicMaterial color={isChina ? C.coral : C.sky} transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )
      })}

      {/* Animated great-circle arcs */}
      <ConnectionArcs />
    </group>
  )
}

// ── Animated arcs (alternate between coral and jade) ───────────
function ConnectionArcs() {
  const PAIRS = useMemo(() => [
    [0, 2], [0, 4], [1, 3], [0, 11], [2, 10],
    [5, 9], [7, 4], [8, 0], [5, 0], [3, 10],
  ], [])

  const arcs = useMemo(() => PAIRS.map(([ai, bi], index) => {
    const a   = latLon(CITIES[ai].lat, CITIES[ai].lon, 1.19)
    const b   = latLon(CITIES[bi].lat, CITIES[bi].lon, 1.19)
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
    const lift = mid.clone().normalize().multiplyScalar(1.54)
    const curve = new THREE.QuadraticBezierCurve3(a, lift, b)
    const pts   = curve.getPoints(56)
    const geom  = new THREE.BufferGeometry().setFromPoints(pts)
    // Alternate color between coral and jade
    const mat = new THREE.LineBasicMaterial({
      color: index % 2 === 0 ? C.coral : C.sky, transparent: true, opacity: 0.45,
    })
    return { line: new THREE.Line(geom, mat), total: pts.length }
  }), [PAIRS])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    arcs.forEach(({ line, total }, i) => {
      const prog = (t * 0.16 + i * 0.31) % 1
      line.geometry.setDrawRange(0, Math.floor(prog * total))
      ;(line.material as THREE.LineBasicMaterial).opacity =
        prog < 0.82 ? 0.45 : 0.45 * (1 - (prog - 0.82) / 0.18)
    })
  })

  return <>{arcs.map((a, i) => <primitive key={i} object={a.line} />)}</>
}

// ── Orbital rings — rose primary ───────────────────────────────
function OrbitalRing({ radius, tilt, speed, opacity = 0.2 }: {
  radius: number; tilt: number; speed: number; opacity?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={ref} position={[1.8, 0, -0.5]} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.003, 12, 160]} />
      <meshBasicMaterial color={C.rose} transparent opacity={opacity} />
    </mesh>
  )
}

// ── Satellite — sky blue (triadic surprise accent, used sparingly) ──
function Satellite({ radius, tilt, speed, offset = 0 }: {
  radius: number; tilt: number; speed: number; offset?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.set(
      1.8 + Math.cos(t) * radius,
           Math.sin(t) * radius * Math.cos(tilt),
     -0.5 + Math.sin(t) * radius * Math.sin(tilt)
    )
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.024, 0.011, 0.024]} />
      {/* Sky (#C0EBFF) — intentional cool surprise in warm composition */}
      <meshBasicMaterial color={C.sky} />
    </mesh>
  )
}

// ── GPU particle cloud around globe ────────────────────────────
function ParticleCloud() {
  const COUNT = 320

  // Two-color particle system: 80% rose, 20% peach
  const { basePos, colorArr } = useMemo(() => {
    const pos  = new Float32Array(COUNT * 3)
    const col  = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.7 + Math.random() * 2.0
      pos[i*3]   = 1.8 + r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] =       r * Math.cos(phi)
      pos[i*3+2] = -0.5 + r * Math.sin(phi) * Math.sin(theta)
      // 80% rose particles, 20% peach
      const c = i % 5 === 0 ? C.peach : C.rose
      col[i*3]   = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
    }
    return { basePos: pos, colorArr: col }
  }, [])

  const geomRef  = useRef<THREE.BufferGeometry>(null)
  const animPos  = useRef(new Float32Array(basePos))

  useFrame(({ clock }) => {
    if (!geomRef.current) return
    const t    = clock.getElapsedTime()
    const attr = geomRef.current.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < COUNT; i++) {
      animPos.current[i*3]   = basePos[i*3]   + Math.sin(t * 0.22 + i * 0.41) * 0.09
      animPos.current[i*3+1] = basePos[i*3+1] + Math.cos(t * 0.17 + i * 0.33) * 0.07
      animPos.current[i*3+2] = basePos[i*3+2] + Math.sin(t * 0.25 + i * 0.57) * 0.08
    }
    attr.array.set(animPos.current)
    attr.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(basePos), 3]} />
        <bufferAttribute attach="attributes-color"    args={[colorArr, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.015}
        transparent
        opacity={0.52}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Scene lights ───────────────────────────────────────────────
function SceneLights() {
  const pulseLightRef = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (!pulseLightRef.current) return
    pulseLightRef.current.intensity = 0.9 + Math.sin(clock.getElapsedTime() * 0.55) * 0.28
  })
  return (
    <>
      <ambientLight intensity={0.12} />
      {/* Key light — warm blush from top-left */}
      <directionalLight position={[-5, 6, 3]} intensity={1.2} color={C.blush} />
      {/* Rose rim — right side */}
      <pointLight ref={pulseLightRef} position={[4, 1, 1]} intensity={1.1} color={C.rose} />
      {/* Navy fill — cool left shadow */}
      <pointLight position={[-3, -2, -2]} intensity={0.45} color={C.navy} />
      {/* Peach under-glow */}
      <pointLight position={[1.8, -3.5, 0]} intensity={0.25} color={C.peach} />
    </>
  )
}

// ── Public export ──────────────────────────────────────────────
export function GlobeScene() {
  return (
    <>
      <SceneLights />
      <GlobeWireframe />
      <OrbitalRing radius={1.54} tilt={0.42} speed={0.30}  opacity={0.24} />
      <OrbitalRing radius={1.80} tilt={1.08} speed={-0.20} opacity={0.14} />
      <OrbitalRing radius={2.08} tilt={0.20} speed={0.13}  opacity={0.09} />
      <Satellite   radius={1.54} tilt={0.42} speed={0.30}  offset={0} />
      <Satellite   radius={1.80} tilt={1.08} speed={-0.20} offset={2.4} />
      <ParticleCloud />
    </>
  )
}
