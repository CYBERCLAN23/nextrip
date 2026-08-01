'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('[data-cta-card]',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="08 — Begin"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center py-10"
    >
      <div aria-hidden className="supergraphic absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] text-[#14100a]/[0.05] select-none pointer-events-none">
        准
      </div>

      <div
        data-cta-card
        className="relative w-full max-w-4xl mx-auto px-6 text-center"
      >
        <div className="flex justify-center mb-6">
          <span className="seal-stamp seal-stamp--round" aria-hidden>
            <span className="seal-char">准</span>
            <span className="seal-text">Approved</span>
          </span>
        </div>

        <p className="ledger-label text-[#8a6d1f] mb-4">END OF LOG · YOUR ROUTE IS CLEAR</p>

        <h2 className="font-display text-4xl md:text-6xl text-[#14100a] leading-[1.05] mb-6">
          Your departure is <span className="text-nx-coral">already approved.</span>
        </h2>

        <p className="text-[#5f594d] text-sm md:text-base max-w-xl mx-auto mb-8">
          Start your free profile today. Our counsellors respond within 24 hours with your scholarship route.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/apply"
            className="rounded-full bg-[#8a6d1f] text-[#f4f4f4] px-7 py-3 text-sm font-semibold hover:bg-[#a5812a] transition-colors shadow-[0_8px_30px_-4px_rgba(138,109,31,0.4)]"
          >
            Start my application
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[#14100a]/20 text-[#14100a] px-7 py-3 text-sm font-medium hover:border-[#8a6d1f]/60 hover:text-[#8a6d1f] transition-colors"
          >
            Book a free consultation
          </Link>
        </div>

        <p className="mt-8 ledger-label text-[#5f594d]">
          REC. 08 · DEPARTURE · 2000+ STUDENTS SEALED
        </p>
      </div>
    </section>
  )
}
