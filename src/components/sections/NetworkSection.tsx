'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { CobeGlobe } from '@/components/ui/cobe-globe'

gsap.registerPlugin(ScrollTrigger)

const ROUTES = [
  'DAKAR → BEIJING',
  'LAGOS → SHANGHAI',
  'ACCRA → HANGZHOU',
  'NAIROBI → BEIJING',
  'ADDIS ABABA → SHANGHAI',
  'KINSHASA → HANGZHOU',
  'CAPE TOWN → BEIJING',
  'LAGOS → HANGZHOU',
  'DAKAR → SHANGHAI',
  'ACCRA → BEIJING',
]

const destinations = [
  {
    name: 'China',
    code: 'CN',
    state: 'OPEN',
    live: true,
    copy: 'A direct route to QS top-100 universities and CSC state scholarships.',
  },
  {
    name: 'Canada',
    code: 'CA',
    state: 'SOON',
    live: false,
    copy: 'The next waypoint on the NexTrip horizon. Join the waitlist.',
  },
  {
    name: 'Germany',
    code: 'DE',
    state: 'SOON',
    live: false,
    copy: 'A future route built on tuition-free excellence and research.',
  },
]

export function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })
      tl.fromTo(
        '[data-network-reveal]',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        0
      )
      tl.fromTo(
        '[data-network-globe]',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.1
      )
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="02 — Network"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="shrink-0 border-y border-[#14100a]/10 py-2 overflow-hidden">
        <div className="route-ticker" aria-hidden>
          {[...ROUTES, ...ROUTES].map((r, i) => (
            <span key={i} className="mx-4 ledger-label text-[#5f594d] whitespace-nowrap">
              {r} <span className="text-[#8a6d1f]">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="seal-stamp" aria-hidden>
                <span className="seal-char">途</span>
                <span className="seal-text">Route</span>
              </span>
              <p className="ledger-label text-[#8a6d1f]">Live network · Q3 2026</p>
            </div>

            <h2 data-network-reveal className="font-display text-3xl md:text-5xl text-[#14100a] leading-[1.1]">
              One file. <br />
              <span className="text-nx-coral">Every route on it.</span>
            </h2>

            <p data-network-reveal className="text-[#5f594d] text-sm md:text-base max-w-md leading-relaxed">
              NexTrip's partner network spans 500+ universities across China, with new routes opening
              to Canada and Germany.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {destinations.map((d) => (
                <div
                  key={d.code}
                  data-network-reveal
                  className={`rounded-xl border p-4 ${
                    d.live
                      ? 'border-[#8a6d1f]/40 bg-[#8a6d1f]/[0.06]'
                      : 'border-[#14100a]/10 bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#14100a] font-medium text-sm">{d.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[0.55rem] font-mono uppercase tracking-wide ${
                        d.live ? 'text-[#f4f4f4] bg-[#8a6d1f]' : 'text-[#5f594d] border border-[#14100a]/15'
                      }`}
                    >
                      {d.state}
                    </span>
                  </div>
                  <span className="text-[#5f594d] text-xs leading-relaxed">{d.copy}</span>
                </div>
              ))}
            </div>

            <div data-network-reveal className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/universities"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#8a6d1f] text-[#f4f4f4] px-5 py-2.5 text-sm font-semibold hover:bg-[#a5812a] transition-colors"
              >
                Explore the network <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div data-network-globe className="relative flex justify-center lg:justify-end">
            <CobeGlobe
              className="w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
              dark={1}
              baseColor={[0.95, 0.93, 0.87]}
              markerColor={[0.224, 0.702, 0.604]}
              glowColor={[0.224, 0.702, 0.604]}
              arcColor={[0.224, 0.702, 0.604]}
            />
            <span
              aria-hidden
              className="supergraphic absolute -bottom-6 right-0 text-[9rem] md:text-[12rem] text-[#14100a]/[0.05] select-none pointer-events-none"
            >
              途
            </span>
          </div>
        </div>
      </div>

      <p className="shrink-0 w-full max-w-6xl mx-auto px-6 pb-4 ledger-label text-[#5f594d]">
        REC. 02 · NETWORK · 3 CONTINENTS · 500+ UNIVERSITIES
      </p>
    </section>
  )
}
