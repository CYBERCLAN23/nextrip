'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { WordsPullUpMultiStyle } from '@/components/ui/WordsPullUp'
import { AnimatedLetter } from '@/components/ui/AnimatedLetter'

const ABOUT_TEXT =
  'For every departure we draw the full file — your university, your scholarship, your visa track, your arrival date — sealed and stamped at every milestone, from Dakar to Beijing.'

function ScrollRevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const total = text.length

  return (
    <p
      ref={ref}
      className="max-w-xl text-sm leading-relaxed text-[#14100a]/70 md:text-base"
    >
      {text.split('').map((ch, i) => (
        <AnimatedLetter key={i} char={ch} index={i} total={total} progress={scrollYProgress} />
      ))}
    </p>
  )
}

export function AboutSection() {
  return (
    <section
      data-section
      data-section-label="02 — About"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#f4f4f4] py-10 font-sans"
    >
      <div
        aria-hidden
        className="supergraphic pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[14rem] text-[#14100a]/[0.04]"
      >
        录
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="seal-stamp" aria-hidden>
              <span className="seal-char">录</span>
              <span className="seal-text">File</span>
            </span>
            <p className="ledger-label text-nx-coral">Study in China, clarified</p>
          </div>

          <h2 className="mb-6 font-display text-3xl leading-[1.12] text-[#14100a] md:text-5xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'NexTrip is a route,', className: '' },
                { text: 'not a pitch.', className: 'text-nx-coral' },
                { text: 'Every milestone documented.', className: '' },
              ]}
            />
          </h2>

          <ScrollRevealParagraph text={ABOUT_TEXT} />

          <p className="mt-8 ledger-label text-[#5f594d]">
            REC. 02 · THE FILE · OPEN
          </p>
        </div>

        <div className="doc-frame relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70"
              alt="A student walking across a Chinese university campus"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100a]/55 to-transparent" />
            <p className="absolute bottom-3 left-4 ledger-label text-[#f4f4f4]">
              PEKING UNIVERSITY · CAMPUS
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-[#14100a]/10 px-5 py-3">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#14100a]/50">
              FILE NO. 2026-CN-001
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-nx-coral">
              <span className="live-dot" /> Open
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
