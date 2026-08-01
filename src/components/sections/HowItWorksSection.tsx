'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: '01',
    title: 'Discovery & Profiling',
    subtitle: 'Understand your advantage',
    description: 'A structured consultation maps your academic history, field, language, budget, and career goals.',
    time: 'Day 1–3',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Institution & Funding Match',
    subtitle: 'Precision placement',
    description: 'Shortlisted institutions and scholarships with the highest probability of acceptance. No spray-and-pray.',
    time: 'Day 4–10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Application Assembly',
    subtitle: 'Every file, submission-ready',
    description: 'Your statement, credentials, and documents are compiled and reviewed against university requirements.',
    time: 'Day 11–20',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Submission & Tracking',
    subtitle: 'Deadlines never missed',
    description: 'Applications are submitted through the portal and tracked until an offer letter is issued.',
    time: 'Day 21–35',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-step-card]') ?? []
    gsap.fromTo(
      cards,
      { y: 22, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="05 — How it works"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center py-10"
    >
      <div aria-hidden className="supergraphic absolute -left-8 top-1/2 -translate-y-1/2 text-[15rem] md:text-[22rem] text-[#14100a]/[0.05] select-none pointer-events-none">
        程
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="seal-stamp" aria-hidden>
            <span className="seal-char">程</span>
            <span className="seal-text">Course</span>
          </span>
          <div>
            <p className="ledger-label text-[#8a6d1f] mb-1">Four stages, one clear route.</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#14100a]">
              How <span className="text-nx-coral">NexTrip</span> works.
            </h2>
          </div>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s) => (
            <li
              key={s.id}
              data-step-card
              className="group flex flex-col rounded-xl border border-[#14100a]/10 bg-white p-4 hover:border-[#8a6d1f]/50 hover:bg-white transition-colors shadow-[0_1px_0_rgba(20,16,10,0.06)]"
            >
              <span className="font-mono text-[#8a6d1f] text-xs tracking-[0.2em] mb-2">{s.id} / 04</span>
              <span className="text-[#14100a] font-medium text-sm mb-1">{s.title}</span>
              <span className="text-[#8a6d1f] text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-2">{s.time}</span>
              <span className="text-[#5f594d] text-xs leading-relaxed">{s.description}</span>
            </li>
          ))}
        </ol>

        <p className="mt-6 ledger-label text-[#5f594d]">
          REC. 05 · PROCESS · DISCOVERY → OFFER
        </p>
      </div>
    </section>
  )
}
