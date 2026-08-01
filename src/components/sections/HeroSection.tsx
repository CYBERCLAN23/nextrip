'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const VIDEOS = [
  'https://videos.pexels.com/video-files/3695994/3695994-hd_1920_1080_24fps.mp4',
  'https://cdn.pixabay.com/video/2020/02/22/32708-394004598_medium.mp4',
  'https://cdn.pixabay.com/video/2024/06/06/215475_medium.mp4',
]

const ROUTES = [
  { id: '01', label: 'Dakar → Beijing' },
  { id: '02', label: 'Lagos → Shanghai' },
  { id: '03', label: 'Accra → Hangzhou' },
]

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const vids = Array.from(section.querySelectorAll('video'))
    vids.forEach((v) => {
      v.play().catch(() => {})
    })
  }, [activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const els = Array.from(section.querySelectorAll('[data-hero-reveal]'))
    if (els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const accent = activeIndex === 0 ? '#F598F2' : '#f4f4f4'

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="01 — Hero"
      aria-label="NexTrip — admission to Chinese campuses"
      className="relative min-h-screen overflow-hidden bg-black text-[#f4f4f4] font-figtree"
    >
      {/* Background video layers — crossfade 1200ms, only active layer visible */}
      {VIDEOS.map((src, i) => (
        <div key={src} className="video-fade-in absolute inset-0" aria-hidden="true">
          <video
            tabIndex={-1}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={src}
            className={`h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              activeIndex === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      ))}
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-black/40" />

      {/* Hero content */}
      <div className="relative z-[2] mx-auto flex min-h-screen w-full max-w-[1340px] flex-col items-end justify-end gap-[150px] px-[15px] pt-[190px] mobile:gap-[72px] mobile:items-start mobile:justify-end mobile:px-[18px] mobile:pt-[140px]">
        {/* Top row — route switcher + intake availability */}
        <div className="flex w-full items-end gap-10 mobile:items-start" data-hero-reveal="up">
          <div className="flex-[4] flex flex-col gap-5" role="group" aria-label="Choose departure route">
            {ROUTES.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={activeIndex === i}
                className={`flex items-baseline gap-3 text-left transition-opacity duration-300 cursor-pointer ${
                  activeIndex === i ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-[#f4f4f4]/85">
                  {r.id} /
                </span>
                <span className="role-link text-xl font-medium uppercase tracking-[-0.02em] md-tablet:text-lg mobile:text-base">
                  {r.label}
                </span>
              </button>
            ))}
          </div>

          <div
            className="flex-1 flex items-center gap-3 pb-1.5"
            aria-label="Intake availability: open for 2026"
          >
            <span className="relative grid h-[7px] w-[7px] place-items-center">
              <span
                className="dot-pulse absolute inset-0 rounded-full"
                style={{ background: accent, boxShadow: `0 0 12px 1px ${accent}` }}
              />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#f4f4f4]">
              Available for 2026 intake
            </span>
          </div>
        </div>

        {/* Bottom row — giant name + copy + CTA */}
        <div className="flex w-full items-end gap-8 pb-14 md-tablet:gap-[28px] md-tablet:pb-[52px] mobile:flex-col mobile:gap-8 mobile:pb-11">
          <h1
            data-hero-reveal="right"
            className="flex-[2] font-semibold uppercase text-[200px] leading-[81%] tracking-[-6px] text-[#f4f4f4] md-tablet:text-[129.6px] md-tablet:leading-[113.4px] md-tablet:tracking-[-7.7px] mobile:text-[clamp(68px,21vw,80px)] mobile:leading-[96px] mobile:tracking-[-4.8px]"
          >
            NexTrip<span style={{ color: accent }}>.</span>
          </h1>

          <div className="flex flex-1 flex-col items-start gap-6 pl-[50px] md-tablet:pl-[24px] mobile:pl-0 mobile:max-w-[420px]">
            <p data-hero-reveal="up" className="max-w-[420px] text-[15px] leading-relaxed text-[#f4f4f4] md-tablet:text-sm mobile:text-xs mobile:leading-relaxed mobile:text-[#f4f4f4]/90">
              We chart your route from Africa to Chinese campuses — university, scholarship, visa,
              arrival — documented and stamped at every milestone.
            </p>

            <Link
              href="/apply"
              data-hero-reveal="button"
              className="hero-cta inline-flex items-center px-7 py-3.5 text-sm uppercase tracking-[0.08em]"
            >
              <span>start your application</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
