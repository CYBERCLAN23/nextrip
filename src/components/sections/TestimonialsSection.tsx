'use client'

import { CircularTestimonials } from '@/components/ui/circular-testimonials'

const testimonials = [
  {
    quote:
      'I had a 3.8 GPA and a clear medical ambition — but no idea how to translate that into a QS Top-20 acceptance from Dakar. NexTrip profiled my academic background, identified the CSC scholarship track, and executed my application with precision. I now study medicine at Peking University. Fully funded.',
    name: 'Aminata Diallo',
    designation: 'Medical Student · Peking University · Senegal',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'What convinced me was the transparency. Every document, every deadline, every status update was tracked in a portal I could see myself. I always knew exactly where my application stood. Tsinghua accepted me in three weeks.',
    name: 'Kofi Mensah',
    designation: 'CS Graduate · Tsinghua University · Ghana',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'I had given up on studying abroad after two failed attempts with other agencies. NexTrip rebuilt my entire profile from scratch, rewrote my statement, and secured a provincial scholarship. They treated my application like their own.',
    name: 'Fatima Zahra',
    designation: 'Finance Student · Fudan University · Morocco',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'The visa phase is where most students get stuck. NexTrip handled my consulate appointment, document authentication, and interview prep. My X1 visa was issued in under ten days.',
    name: 'Chinedu Okonkwo',
    designation: 'Engineering Student · Zhejiang University · Nigeria',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  },
]

export function TestimonialsSection() {
  return (
    <section
      data-section
      data-section-label="07 — Testimonials"
      className="relative bg-[#f4f4f4] overflow-hidden min-h-screen flex flex-col justify-center py-20"
    >
      <div aria-hidden className="supergraphic absolute -left-8 top-1/2 -translate-y-1/2 text-[15rem] md:text-[22rem] text-[#14100a]/[0.05] select-none pointer-events-none">
        签
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-4 mb-10">
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

        <div className="flex justify-center">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: '#14100a',
              designation: '#5f594d',
              testimony: '#14100a',
              arrowBackground: '#14100a',
              arrowForeground: '#f4f4f4',
              arrowHoverBackground: '#c93a2e',
            }}
            fontSizes={{
              name: '1.75rem',
              designation: '1rem',
              quote: '1.125rem',
            }}
          />
        </div>
      </div>
    </section>
  )
}
