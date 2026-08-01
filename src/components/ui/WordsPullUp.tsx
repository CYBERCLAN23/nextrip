'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
}

export function WordsPullUp({ text, className, showAsterisk }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              {isLast && showAsterisk ? (
                <span className="relative inline-block">
                  {word.slice(0, -1)}
                  <span aria-hidden className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">
                    *
                  </span>
                  {word.slice(-1)}
                </span>
              ) : (
                word
              )}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  containerClassName?: string
}

export function WordsPullUpMultiStyle({ segments, containerClassName }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const words: { word: string; className?: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => words.push({ word: w, className: seg.className }))
  })

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName ?? ''}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${w.className ?? ''}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          >
            {w.word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
