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
      className="mx-auto max-w-2xl text-xs leading-relaxed text-[#14100a]/70 sm:text-sm md:text-base"
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
      className="relative bg-[#f4f4f4] px-4 py-20 font-almarai sm:py-28 md:px-6"
    >
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white px-6 py-16 text-center sm:px-12 sm:py-24">
        <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-[#c93a2e] sm:text-xs">
          Study in China, clarified
        </p>

        <h2
          className="mx-auto max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: '#14100a' }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'NexTrip is a route,', className: 'font-normal' },
              { text: 'not a pitch.', className: 'italic font-instrument' },
              { text: 'Every milestone documented.', className: 'font-normal' },
            ]}
          />
        </h2>

        <div className="mt-12 sm:mt-16">
          <ScrollRevealParagraph text={ABOUT_TEXT} />
        </div>
      </div>
    </section>
  )
}
