'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const destinations = [
  {
    id: 'china',
    country: 'China',
    countryCode: 'CN',
    status: 'available',
    universities: '500+',
    scholarships: '30+',
    tagline: 'The World\'s Fastest-Growing Academic Superpower',
    accent: '#CA8A04',
    href: '/study-in-china',
    description: 'Home to 6 QS Top-100 universities, government-backed full scholarships, and a rapidly expanding international student ecosystem of over 500,000 learners.',
    metric: '#2 Global R&D Investment',
  },
  {
    id: 'turkey',
    country: 'Turkey',
    countryCode: 'TR',
    status: 'soon',
    universities: '—',
    scholarships: '—',
    tagline: 'Where East Meets West — Strategically Positioned',
    accent: '#78716C',
    href: '#',
    description: 'A Eurasian crossroads with 200+ universities and growing Türkiye Burslari scholarship access. Expansion launching Q4 2026.',
    metric: 'Launching Q4 2026',
  },
  {
    id: 'germany',
    country: 'Germany',
    countryCode: 'DE',
    status: 'soon',
    universities: '—',
    scholarships: '—',
    tagline: 'Tuition-Free Excellence, World-Leading Research',
    accent: '#78716C',
    href: '#',
    description: 'Public universities charge near-zero tuition. A powerhouse for engineering, sciences, and innovation with 80+ Nobel laureates on faculty rolls.',
    metric: 'Launching 2027',
  },
]

export function DestinationsSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const bridgeRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Bridge reveal from above
    gsap.fromTo(bridgeRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
      }
    )

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      }
    )

    const cards = cardsRef.current?.querySelectorAll('[data-dest-card]') ?? []
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="02 — Destinations"
      style={{ paddingBlock: '100px 120px', background: 'var(--color-black)', position: 'relative' }}
    >
      {/* Entry bridge — connects from Hero */}
      <div ref={bridgeRef} className="container" style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          paddingBottom: '24px', borderBottom: '1px solid rgba(202,138,4,0.12)',
        }}>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(202,138,4,0.5), transparent)' }} />
          <p style={{ fontSize: '13px', color: 'var(--color-stone-500)', fontStyle: 'italic', letterSpacing: '0.04em' }}>
            Because where you study shapes who you become — and we give you the best options on the planet.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Title */}
        <div ref={titleRef} style={{ marginBottom: '56px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            display: 'block', marginBottom: '12px',
          }}>
            Global Destinations
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            High-Impact Markets.<br />
            <span className="text-gold-gradient">Strategic Study Destinations.</span>
          </h2>
          <p style={{ color: 'var(--color-stone-400)', maxWidth: '60ch', marginTop: '16px', lineHeight: 1.7, fontSize: '16px' }}>
            We've done the research. These aren't random picks — they're the markets where international education ROI is highest, scholarship availability is widest, and career outcomes are strongest.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {destinations.map(dest => (
            <a
              key={dest.id}
              href={dest.href}
              data-dest-card
              data-cursor-hover
              style={{
                display: 'block', position: 'relative',
                padding: '36px',
                borderRadius: '20px',
                border: `1px solid ${dest.status === 'available' ? 'rgba(202,138,4,0.3)' : 'rgba(120,113,108,0.15)'}`,
                background: dest.status === 'available' ? 'rgba(28,25,23,0.9)' : 'rgba(28,25,23,0.4)',
                backdropFilter: 'blur(16px)',
                transition: 'transform 300ms ease, box-shadow 300ms ease',
                textDecoration: 'none',
                cursor: dest.status === 'available' ? 'pointer' : 'default',
                overflow: 'hidden',
              }}
            >
              {/* Glow for active card */}
              {dest.status === 'available' && (
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '200px', height: '200px',
                  background: 'radial-gradient(circle, rgba(202,138,4,0.12) 0%, transparent 70%)',
                  borderRadius: '50%', pointerEvents: 'none',
                }} />
              )}

              {/* Status badge */}
              {dest.status === 'soon' && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: 'rgba(120,113,108,0.15)', color: 'var(--color-stone-500)',
                  border: '1px solid rgba(120,113,108,0.25)', padding: '4px 10px', borderRadius: '100px',
                }}>
                  {dest.metric}
                </div>
              )}

              {dest.status === 'available' && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: 'rgba(202,138,4,0.12)', color: 'var(--color-gold)',
                  border: '1px solid rgba(202,138,4,0.3)', padding: '4px 10px', borderRadius: '100px',
                }}>
                  Now Open
                </div>
              )}

              {/* Country header */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem', fontWeight: 700,
                  color: dest.status === 'available' ? 'var(--color-white)' : 'var(--color-stone-500)',
                  marginBottom: '4px',
                }}>
                  {dest.country}
                </div>
                <div style={{
                  fontSize: '11px', color: dest.accent,
                  fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {dest.tagline}
                </div>
              </div>

              <p style={{
                fontSize: '14px', lineHeight: 1.7, marginBottom: '24px',
                color: dest.status === 'available' ? 'var(--color-stone-300)' : 'var(--color-stone-500)',
              }}>
                {dest.description}
              </p>

              {/* Metrics row (active only) */}
              {dest.status === 'available' && (
                <div style={{
                  display: 'flex', gap: '32px',
                  paddingTop: '20px', paddingBottom: '20px',
                  borderTop: '1px solid rgba(202,138,4,0.1)',
                  borderBottom: '1px solid rgba(202,138,4,0.1)',
                  marginBottom: '24px',
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#F59E0B' }}>{dest.universities}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-stone-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Universities</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#F59E0B' }}>{dest.scholarships}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-stone-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Scholarship Types</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#F59E0B' }}>100%</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-stone-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>English Programs</div>
                  </div>
                </div>
              )}

              {dest.status === 'available' && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: 'var(--color-gold)', fontSize: '13px', fontWeight: 600,
                  letterSpacing: '0.04em',
                }}>
                  Explore Opportunities
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Connector to next section */}
        <div style={{
          textAlign: 'center', marginTop: '80px', paddingTop: '60px',
          borderTop: '1px solid rgba(202,138,4,0.08)',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--color-stone-500)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Now that you know where — here's exactly what we do for you
          </p>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, rgba(202,138,4,0.5), transparent)', margin: '0 auto' }} />
        </div>
      </div>
    </section>
  )
}
