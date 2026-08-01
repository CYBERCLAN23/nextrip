'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: 'Aminata Diallo',
    role: 'Medical Student — CSC Full Scholarship',
    country: 'Senegal',
    university: 'Peking University',
    program: 'MBBS (English-medium)',
    year: 'Class of 2024',
    avatar: 'AD',
    quote: 'I had a 3.8 GPA and a clear medical ambition — but no idea how to translate that into a QS Top-20 acceptance from Dakar. NexTrip profiled my academic background, identified the CSC scholarship track, and executed my application with precision. I now study medicine at Peking University. Fully funded.',
    outcome: 'Full CSC Government Scholarship',
    route: 'DAKAR → BEIJING',
    rating: 5,
  },
  {
    id: 2,
    name: 'Kofi Mensah',
    role: 'CS Graduate — Tsinghua University',
    country: 'Ghana',
    university: 'Tsinghua University',
    program: 'MSc Computer Science (English-medium)',
    year: 'Class of 2023',
    avatar: 'KM',
    quote: 'What convinced me was the transparency. Every document, every deadline, every status update was tracked in a portal I could see myself. I always knew exactly where my application stood. Tsinghua accepted me in three weeks.',
    outcome: 'Full Scholarship + Stipend',
    route: 'ACCRA → BEIJING',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatima Zahra',
    role: 'Finance Student — Fudan University',
    country: 'Morocco',
    university: 'Fudan University',
    program: 'BSc Finance (English-medium)',
    year: 'Class of 2025',
    avatar: 'FZ',
    quote: 'I had given up on studying abroad after two failed attempts with other agencies. NexTrip rebuilt my entire profile from scratch, rewrote my statement, and secured a provincial scholarship. They treated my application like their own.',
    outcome: 'Provincial Scholarship',
    route: 'CASABLANCA → SHANGHAI',
    rating: 5,
  },
  {
    id: 4,
    name: 'Chinedu Okonkwo',
    role: 'Engineering Student — Zhejiang University',
    country: 'Nigeria',
    university: 'Zhejiang University',
    program: 'MEng Mechanical Engineering',
    year: 'Class of 2024',
    avatar: 'CO',
    quote: 'The visa phase is where most students get stuck. NexTrip handled my consulate appointment, document authentication, and interview prep. My X1 visa was issued in under ten days.',
    outcome: 'X1 Student Visa · 5 Days',
    route: 'LAGOS → HANGZHOU',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  const t = testimonials[index]

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef)
    const animate = () => {
      gsap.fromTo(
        q('[data-testimonial-content]'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
    animate()
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(id)
  }, { scope: sectionRef, dependencies: [index] })

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="07 — Testimonials"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center py-10"
    >
      <div aria-hidden className="supergraphic absolute -left-8 top-1/2 -translate-y-1/2 text-[15rem] md:text-[22rem] text-[#14100a]/[0.05] select-none pointer-events-none">
        签
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="seal-stamp" aria-hidden>
            <span className="seal-char">签</span>
            <span className="seal-text">Seal</span>
          </span>
          <div>
            <p className="ledger-label text-[#8a6d1f] mb-1">Voyage logs, signed.</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#14100a]">
              Real students. <span className="text-nx-coral">Real routes.</span>
            </h2>
          </div>
        </div>

        <div key={index} data-testimonial-content className="rounded-2xl border border-[#14100a]/10 bg-white p-6 md:p-8 shadow-[0_8px_30px_-8px_rgba(20,16,10,0.12)]">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-[#8a6d1f]/15 text-[#8a6d1f] font-mono text-sm">
              {t.avatar}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[#14100a] font-medium text-sm">{t.name}</p>
              <p className="text-[#5f594d] text-xs truncate">{t.role}</p>
            </div>
            <div className="flex items-center gap-1 text-[#8a6d1f]" aria-label={`${t.rating} star rating`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </div>
          </div>

          <blockquote className="text-[#14100a]/85 text-sm md:text-base leading-relaxed mb-6">
            “{t.quote}”
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#14100a]/10 pt-4">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="ledger-label text-[#8a6d1f]">{t.route}</span>
              <span className="ledger-label text-[#5f594d]">{t.university}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#1f7a68]/10 border border-[#1f7a68]/25 text-[#1f7a68] text-[0.6rem] font-mono uppercase tracking-wide">
              {t.outcome}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="ledger-label text-[#5f594d]">
            REC. 07 · TESTIMONIALS · {String(index + 1).padStart(2, '0')}/{String(testimonials.length).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-[#8a6d1f]' : 'w-1.5 bg-[#14100a]/20 hover:bg-[#14100a]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
