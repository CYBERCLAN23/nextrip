'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'admissions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Admissions Strategy',
    tagline: 'Precision application management',
    description: 'From pre-application profiling to submission tracking, your application is optimized for acceptance.',
    href: '/admissions',
  },
  {
    id: 'scholarships',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: 'Scholarships & Funding',
    tagline: 'Full-ride pursuit',
    description: 'CSC, provincial, and university grants pursued end-to-end — from eligibility to award.',
    href: '/scholarships',
  },
  {
    id: 'documents',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8m8 4H8m2-8H8" />
      </svg>
    ),
    title: 'Document Preparation',
    tagline: 'Submission-ready files',
    description: 'Certificates, translations, and notarizations prepared to university and embassy standards.',
    href: '/documents',
  },
  {
    id: 'visa',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Visa & Consular Guidance',
    tagline: 'From approval to X1',
    description: 'Embassy scheduling, form completion, and interview coaching until your X1 student visa lands.',
    href: '/visa',
  },
  {
    id: 'reception',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-7-4.35-9.5-8.5C.8 9.6 2.4 6 6 6c2.2 0 3.7 1.2 6 3.5C14.3 7.2 15.8 6 18 6c3.6 0 5.2 3.6 3.5 6.5C19 16.65 12 21 12 21z" />
      </svg>
    ),
    title: 'Arrival & Integration',
    tagline: 'Land, settled, enrolled',
    description: 'Airport pickup, campus orientation, bank setup, and registration handled on the ground in China.',
    href: '/support',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-service-card]') ?? []
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

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="04 — Services"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center py-10"
    >
      <div aria-hidden className="supergraphic absolute -right-10 top-1/2 -translate-y-1/2 text-[15rem] md:text-[22rem] text-[#14100a]/[0.05] select-none pointer-events-none">
        行
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="seal-stamp" aria-hidden>
            <span className="seal-char">行</span>
            <span className="seal-text">Voyage</span>
          </span>
          <div>
            <p className="ledger-label text-[#8a6d1f] mb-1">Every step, executed.</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#14100a]">
              The full infrastructure <span className="text-nx-coral">behind every admission letter.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {services.map((s) => (
            <Link
              key={s.id}
              data-service-card
              href={s.href}
              className="group flex flex-col rounded-xl border border-[#14100a]/10 bg-white p-4 hover:bg-white hover:border-[#8a6d1f]/50 transition-colors shadow-[0_1px_0_rgba(20,16,10,0.06)]"
            >
              <span className="w-9 h-9 grid place-items-center rounded-lg bg-[#8a6d1f]/10 text-[#8a6d1f] mb-3">{s.icon}</span>
              <span className="text-[#8a6d1f] text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-1">{s.tagline}</span>
              <span className="text-[#14100a] font-medium leading-tight text-sm mb-1">{s.title}</span>
              <span className="text-[#5f594d] text-xs leading-relaxed">{s.description}</span>
            </Link>
          ))}
        </div>

        <p className="mt-6 ledger-label text-[#5f594d]">
          REC. 04 · CONCIERGE · FULL-RIDE TRACK
        </p>
      </div>
    </section>
  )
}
