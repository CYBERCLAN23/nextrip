'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const universities = [
  { name: 'Peking University', city: 'Beijing', rank: 'QS #17 Asia', specialties: ['Medicine', 'Law', 'AI'], scholarship: true, founded: '1898' },
  { name: 'Tsinghua University', city: 'Beijing', rank: 'QS #12 Asia', specialties: ['Engineering', 'CS', 'Architecture'], scholarship: true, founded: '1911' },
  { name: 'Fudan University', city: 'Shanghai', rank: 'QS #34 Asia', specialties: ['Finance', 'Medicine', 'Chemistry'], scholarship: true, founded: '1905' },
  { name: 'Zhejiang University', city: 'Hangzhou', rank: 'QS #44 Asia', specialties: ['Engineering', 'Agriculture', 'IT'], scholarship: true, founded: '1897' },
  { name: 'Shanghai Jiao Tong', city: 'Shanghai', rank: 'QS #51 Asia', specialties: ['Engineering', 'MBA', 'Medicine'], scholarship: false, founded: '1896' },
  { name: 'Wuhan University', city: 'Wuhan', rank: 'QS #64 Asia', specialties: ['Law', 'Surveying', 'Remote Sensing'], scholarship: true, founded: '1893' },
]

const specialties = ['All', 'Medicine', 'Engineering', 'Computer Science', 'Finance', 'Law']

const getSpecialtyClasses = (spec: string) => {
  switch (spec.toLowerCase()) {
    case 'medicine':
      return 'text-[#a8302a] bg-[#a8302a]/10 border-[#a8302a]/25 border'
    case 'law':
      return 'text-[#5b3fae] bg-[#5b3fae]/10 border-[#5b3fae]/25 border'
    case 'ai':
    case 'cs':
    case 'it':
      return 'text-[#1f7a68] bg-[#1f7a68]/10 border-[#1f7a68]/25 border'
    case 'engineering':
      return 'text-[#8a6d1f] bg-[#8a6d1f]/10 border-[#8a6d1f]/25 border'
    case 'finance':
      return 'text-[#a56a50] bg-[#a56a50]/10 border-[#a56a50]/25 border'
    default:
      return 'text-[#5f594d] bg-[#14100a]/[0.04] border-[#14100a]/10 border'
  }
}

const matchesFilter = (spec: string, filter: string) => {
  if (filter === 'All') return true
  if (filter === 'Computer Science') return ['CS', 'AI', 'IT'].includes(spec)
  return spec === filter
}

export function UniversitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-uni-card]') ?? []
    gsap.fromTo(
      cards,
      { y: 22, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      }
    )
  }, { scope: sectionRef })

  const filtered = universities.filter((u) =>
    u.specialties.some((s) => matchesFilter(s, activeFilter))
  )

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="06 — Universities"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center py-10"
    >
      <div aria-hidden className="supergraphic absolute -right-10 top-1/2 -translate-y-1/2 text-[15rem] md:text-[22rem] text-[#14100a]/[0.05] select-none pointer-events-none">
        校
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="seal-stamp" aria-hidden>
              <span className="seal-char">校</span>
              <span className="seal-text">Campus</span>
            </span>
            <div>
              <p className="ledger-label text-[#8a6d1f] mb-1">QS-certified routes.</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#14100a]">
                500+ partner <span className="text-nx-coral">universities.</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setActiveFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide transition-colors border ${
                  activeFilter === s
                    ? 'bg-[#8a6d1f] text-[#f4f4f4] border-[#8a6d1f]'
                    : 'text-[#5f594d] border-[#14100a]/10 hover:border-[#8a6d1f]/50 hover:text-[#8a6d1f]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((u) => (
            <Link
              key={u.name}
              data-uni-card
              href="/universities"
              className="group flex flex-col rounded-xl border border-[#14100a]/10 bg-white p-4 hover:border-[#8a6d1f]/50 hover:bg-white transition-colors shadow-[0_1px_0_rgba(20,16,10,0.06)]"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[#14100a] font-medium leading-tight text-sm">{u.name}</span>
                {u.scholarship && (
                  <span className="shrink-0 ml-2 px-1.5 py-0.5 rounded text-[0.55rem] font-mono uppercase tracking-wide text-[#f4f4f4] bg-[#8a6d1f]">
                    Funded
                  </span>
                )}
              </div>
              <span className="text-[#5f594d] text-xs mb-2">{u.city} · {u.rank} · est. {u.founded}</span>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {u.specialties.map((s) => (
                  <span
                    key={s}
                    className={`px-2 py-0.5 rounded-full text-[0.6rem] font-mono ${getSpecialtyClasses(s)}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 ledger-label text-[#5f594d]">
          REC. 06 · PARTNERS · QS TOP-100 & CSC FUNDED
        </p>
      </div>
    </section>
  )
}
