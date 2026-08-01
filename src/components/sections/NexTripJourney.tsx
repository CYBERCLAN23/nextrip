'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, BadgeCheck, FileCheck2, SearchCheck, Waypoints } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const waypoints = [
  {
    number: '01',
    title: 'Plot your profile',
    copy: 'Share your academic history, ambitions, and target field.',
    icon: SearchCheck,
  },
  {
    number: '02',
    title: 'Match the route',
    copy: 'Explore universities and scholarships shortlisted for your profile.',
    icon: Waypoints,
  },
  {
    number: '03',
    title: 'Seal your application',
    copy: 'Gather documents, craft your statement, and submit on time.',
    icon: FileCheck2,
  },
]

const matchChips = ['QS #17 Peking', 'CSC Full-Ride', 'X1 Visa Track']

export function NexTripJourney() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '[data-journey-reveal]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
        }
      )
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="03 — Journey"
      className="bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="relative w-full max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="seal-stamp" aria-hidden>
                <span className="seal-char">途</span>
                <span className="seal-text">Route</span>
              </span>
              <p className="ledger-label text-[var(--nx-coral)]">Your route, clarified.</p>
            </div>

            <h2 data-journey-reveal className="font-display text-3xl md:text-5xl text-[var(--nx-ink)] leading-[1.12] mb-5">
              Every milestone, <span className="text-[var(--nx-coral)]">finally one direction.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {waypoints.map((w) => (
                <div
                  key={w.number}
                  data-journey-reveal
                  className="rounded-xl bg-white border border-[var(--nx-ink)]/10 p-4 shadow-[0_1px_0_rgba(20,16,10,0.06)]"
                >
                  <span className="inline-grid place-items-center w-8 h-8 rounded-md bg-[var(--nx-ink)] text-[var(--rice-paper)] mb-3">
                    <w.icon size={15} />
                  </span>
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--nx-ink)]/40 mb-1">
                    {w.number} / 03
                  </p>
                  <p className="text-sm font-semibold text-[var(--nx-ink)] mb-1">{w.title}</p>
                  <p className="text-xs text-[var(--nx-ink)]/60 leading-relaxed">{w.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            data-journey-reveal
            className="relative rounded-2xl bg-white border border-[#14100a]/10 text-[#14100a] p-6 md:p-8 overflow-hidden shadow-[0_8px_30px_-8px_rgba(20,16,10,0.12)]"
          >
            <span
              aria-hidden
              className="supergraphic absolute -right-4 -top-8 text-[11rem] text-[#14100a]/[0.05] select-none pointer-events-none"
            >
              查
            </span>

            <div className="relative flex flex-wrap items-center gap-3 mb-5">
              <span className="seal-stamp" aria-hidden>
                <span className="seal-char">查</span>
                <span className="seal-text">Query</span>
              </span>
              <p className="ledger-label text-[#8a6d1f]">NexTrip Intelligence</p>
            </div>

            <div className="relative aspect-[16/8] rounded-xl overflow-hidden mb-5">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70"
                alt="A student walking across a Chinese university campus"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100a]/60 to-transparent" />
              <p className="absolute bottom-3 left-4 ledger-label text-[#f4f4f4]">
                PEKING UNIVERSITY · CAMPUS
              </p>
            </div>

            <p className="relative text-sm text-[#14100a]/75 leading-relaxed mb-4">
              Input your academic profile — NexTrip's matching engine returns universities,
              scholarships, and visa tracks with the highest probability of acceptance.
            </p>

            <div className="relative flex flex-wrap gap-2 mb-5">
              {matchChips.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-full border border-[#8a6d1f]/40 bg-[#8a6d1f]/10 text-[#8a6d1f] text-[0.65rem] font-mono uppercase tracking-wide"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="relative flex items-center gap-2 mb-5 rounded-lg border border-[#1f7a68]/30 bg-[#1f7a68]/10 px-3 py-2.5">
              <BadgeCheck size={16} className="shrink-0 text-[#1f7a68]" />
              <p className="text-xs text-[#14100a]/80">
                Route sealed for <span className="text-[#1f7a68] font-semibold">Aminata Diallo</span> —
                full CSC scholarship confirmed.
              </p>
            </div>

            <div className="relative">
              <Link
                href="/universities"
                className="inline-flex items-center gap-2 rounded-full bg-[#8a6d1f] text-[#f4f4f4] px-6 py-3 text-sm font-semibold hover:bg-[#a5812a] transition-colors"
              >
                Find my university <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
