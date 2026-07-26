'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './services.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const QUADRANTS = [
  {
    id: 'top-left',
    title: 'TIME-SAVING',
    lines: [
      'Deep research. Verified programs.',
      'Direct university portals. We aggregate it all.',
      'You get what matters.',
    ],
    positionClass: 'quadrant--top-left',
  },
  {
    id: 'top-right',
    title: 'HAND-CURATED',
    lines: [
      'Global admissions criteria and scholarship opportunities',
      'curated into practical, actionable study pathways.',
    ],
    positionClass: 'quadrant--top-right',
  },
  {
    id: 'bottom-left',
    title: 'BEYOND ADMISSIONS',
    lines: [
      'Full visa assistance, flight booking support,',
      'and pre-departure routines inspired',
      'by top global scholars.',
    ],
    positionClass: 'quadrant--bottom-left',
  },
  {
    id: 'bottom-right',
    title: 'EVIDENCE-BASED',
    lines: [
      'Data-driven research and emerging global trends,',
      'refined into clear, easy-to-digest insights',
      'for your academic future.',
    ],
    positionClass: 'quadrant--bottom-right',
  },
];

// Star/Diamond terminal component
const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`quadrant-terminal ${className}`}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
      fill="currentColor"
    />
  </svg>
);

// Central NexTrip Monogram Crest Badge
const CentralCrestBadge = () => (
  <div className="quadrant-badge-wrapper">
    <div className="quadrant-badge">
      <svg
        className="quadrant-badge-svg"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Beveled Rings */}
        <circle cx="60" cy="60" r="57" stroke="url(#goldGrad)" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        <circle cx="60" cy="60" r="48" fill="url(#bgInnerGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
        
        {/* Fine Inner Accent Ring */}
        <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

        {/* Monogram Crest Text - NT */}
        <g fill="url(#goldGrad)">
          {/* N */}
          <path d="M42 40 H47 L56 68 V40 H61 V80 H56 L47 52 V80 H42 V40 Z" opacity="0.9" />
          {/* T - Layered */}
          <path d="M58 44 H78 V49 H71 V80 H65 V49 H58 V44 Z" />
        </g>

        {/* Star accents */}
        <path d="M60 22 L61.5 25.5 L65 27 L61.5 28.5 L60 32 L58.5 28.5 L55 27 L58.5 25.5 Z" fill="url(#goldGrad)" opacity="0.8" />
        <path d="M60 88 L61.5 91.5 L65 93 L61.5 94.5 L60 98 L58.5 94.5 L55 93 L58.5 91.5 Z" fill="url(#goldGrad)" opacity="0.8" />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F3E5AB" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          <radialGradient id="bgInnerGrad" cx="60" cy="60" r="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C2434" />
            <stop offset="100%" stopColor="#0B111A" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
);

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineHLeftRef = useRef<HTMLDivElement>(null);
  const lineHRightRef = useRef<HTMLDivElement>(null);
  const lineVTopRef = useRef<HTMLDivElement>(null);
  const lineVBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Central Badge Reveal
      tl.fromTo(
        '.quadrant-badge-wrapper',
        { scale: 0, rotate: -120, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.6)',
        },
        0
      );

      // 2. Crosshair Lines Drawing
      tl.fromTo(
        lineHLeftRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
        0.2
      );
      tl.fromTo(
        lineHRightRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
        0.2
      );
      tl.fromTo(
        lineVTopRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.7, ease: 'power3.inOut' },
        0.2
      );
      tl.fromTo(
        lineVBottomRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.7, ease: 'power3.inOut' },
        0.2
      );

      // 3. Diamond Terminals Pop In
      tl.fromTo(
        '.quadrant-terminal',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' },
        0.6
      );

      // 4. Staggered Content Quadrant Text Fade & Lift
      tl.fromTo(
        '.quadrant-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power3.out',
        },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="quadrant-section" aria-label="NexTrip Core Values" data-animate-section>
      <div className="quadrant-container">
        
        {/* Crosshair Lines */}
        <div className="quadrant-lines-wrapper">
          {/* Top Vertical Line */}
          <div ref={lineVTopRef} className="quadrant-line quadrant-line--v-top">
            <DiamondTerminal className="quadrant-terminal--top" />
          </div>

          {/* Bottom Vertical Line */}
          <div ref={lineVBottomRef} className="quadrant-line quadrant-line--v-bottom">
            <DiamondTerminal className="quadrant-terminal--bottom" />
          </div>

          {/* Left Horizontal Line */}
          <div ref={lineHLeftRef} className="quadrant-line quadrant-line--h-left">
            <DiamondTerminal className="quadrant-terminal--left" />
          </div>

          {/* Right Horizontal Line */}
          <div ref={lineHRightRef} className="quadrant-line quadrant-line--h-right">
            <DiamondTerminal className="quadrant-terminal--right" />
          </div>
        </div>

        {/* Central Monogram Crest */}
        <div ref={badgeRef}>
          <CentralCrestBadge />
        </div>

        {/* 4 Quadrants Grid */}
        <div className="quadrant-grid">
          {QUADRANTS.map((q) => (
            <div key={q.id} className={`quadrant-item ${q.positionClass}`}>
              <h3 className="quadrant-title">{q.title}</h3>
              <div className="quadrant-desc">
                {q.lines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
