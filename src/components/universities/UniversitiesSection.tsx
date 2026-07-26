'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { universities, University } from './UniversityData';
import { UniversityCard } from './UniversityCard';
import { UniversityModal } from './UniversityModal';
import './universities.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`uni-terminal ${className}`}
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

export function UniversitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedUniId, setSelectedUniId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Ivy League & Elite', 'STEM Leaders', 'Business & Tech', 'Europe Top'];

  // 3D Perspective Mouse Tilt Handler (Matching Sections 1-3)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback((card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  // GSAP ScrollTrigger Entrance Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: (index % 3) * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="uni-section relative py-24 overflow-hidden" aria-label="Universities">
      {/* Background Subtle Grain Texture */}
      <div className="uni-bg-noise" />

      {/* Top Crosshair Grid Divider */}
      <div className="uni-crosshair-top">
        <DiamondTerminal className="uni-terminal--left" />
        <div className="uni-line-h" />
        <DiamondTerminal className="uni-terminal--right" />
      </div>

      <div className="uni-container max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Header */}
        <header className="uni-header text-center max-w-3xl mx-auto mb-14">
          <span className={`uni-eyebrow ${oswald.className}`} data-animate-slide-l>
            05 / GLOBAL CAMPUS CATALOG & ADMISSIONS
          </span>
          <h2 className={`uni-heading ${oswald.className}`} data-animate-heading>
            EXPLORE 500+ ACCREDITED UNIVERSITIES
          </h2>
          <div className="uni-header-divider" data-animate-clip />
          <p className="uni-subheading" data-animate-fade>
            Direct admission channels, verified program criteria, and guaranteed scholarship waivers.
          </p>
        </header>

        {/* Category Filter Pills */}
        <div className="uni-filter-bar flex flex-wrap justify-center gap-3 mb-14" data-animate-stagger="0.04">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`uni-filter-btn ${oswald.className} ${
                activeCategory === cat ? 'uni-filter-btn--active' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Universities Grid with 3D Mouse Parallax */}
        <div ref={gridRef} className="uni-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni: University, index: number) => (
            <div
              key={uni.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="uni-card-3d-wrapper"
              onMouseMove={(e) =>
                cardRefs.current[index] && handleMouseMove(e, cardRefs.current[index]!)
              }
              onMouseLeave={() =>
                cardRefs.current[index] && handleMouseLeave(cardRefs.current[index]!)
              }
            >
              <UniversityCard university={uni} onSelect={(id) => setSelectedUniId(id)} />
            </div>
          ))}
        </div>
      </div>

      {/* University Interactive Modal View */}
      {selectedUniId && (
        <UniversityModal universityId={selectedUniId} onClose={() => setSelectedUniId(null)} />
      )}
    </section>
  );
}

export default UniversitiesSection;
