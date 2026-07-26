'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredStory, supportingStories, TestimonialStory } from './TestimonialsData';
import { StoryModal } from './StoryModal';
import { Star, CheckCircle, ArrowRight, Quotes } from '@phosphor-icons/react';
import './testimonials.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`test-terminal ${className}`}
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

// Central Monogram Crest Badge matching ServicesSection
const CentralCrestBadge = () => (
  <div className="test-badge-wrapper my-6 flex justify-center">
    <div className="test-badge relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradTest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F5E6B8" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="57" stroke="url(#goldGradTest)" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="52" stroke="#0F172A" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        <circle cx="60" cy="60" r="48" fill="#F5F2ED" stroke="url(#goldGradTest)" strokeWidth="1.5" />
        <g fill="url(#goldGradTest)">
          <path d="M42 40 H47 L56 68 V40 H61 V80 H56 L47 52 V80 H42 V40 Z" opacity="0.9" />
          <path d="M58 44 H78 V49 H71 V80 H65 V49 H58 V44 Z" />
        </g>
      </svg>
    </div>
  </div>
);

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedStory, setSelectedStory] = useState<TestimonialStory | null>(null);

  const allStories = [featuredStory, ...supportingStories];

  // 3D Perspective Mouse Tilt Handler (Matching Section 3)
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

  // GSAP ScrollTrigger Entrance
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
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15,
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
  }, []);

  return (
    <section ref={sectionRef} className="test-section relative bg-[#F5F2ED] py-24 overflow-hidden" aria-label="Testimonials">
      {/* Editorial Noise Grain Texture */}
      <div className="test-bg-noise" />

      {/* Top Crosshair Divider */}
      <div className="test-crosshair-top">
        <DiamondTerminal className="test-terminal--left" />
        <div className="test-line-h" />
        <DiamondTerminal className="test-terminal--right" />
      </div>

      <div className="test-container max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Section Header */}
        <header className="test-header text-center max-w-3xl mx-auto mb-10">
          <span className={`test-eyebrow ${oswald.className}`} data-animate-slide-l>
            07 / REAL SCHOLAR IMPACT STORIES
          </span>
          <h2 className={`test-heading ${oswald.className}`} data-animate-heading>
            FROM GLOBAL ASPIRATIONS TO ADMISSION SUCCESS
          </h2>
          <div className="test-header-divider" data-animate-clip />
          <p className="test-subheading" data-animate-fade>
            Audited, verified success journeys of students admitted to world-leading universities.
          </p>
        </header>

        {/* Central Monogram Crest */}
        <CentralCrestBadge />

        {/* Testimonials Grid */}
        <div className="test-grid grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {allStories.map((story: TestimonialStory, index: number) => (
            <div
              key={story.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="test-card-3d-wrapper"
              onMouseMove={(e) =>
                cardRefs.current[index] && handleMouseMove(e, cardRefs.current[index]!)
              }
              onMouseLeave={() =>
                cardRefs.current[index] && handleMouseLeave(cardRefs.current[index]!)
              }
            >
              <article
                className="test-card group relative bg-white border border-slate-200/80 rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-amber-500/50 flex flex-col justify-between h-full"
                onClick={() => setSelectedStory(story)}
              >
                {/* Card Header Info */}
                <div>
                  <div className="test-card-top flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar Initials with Gradient */}
                      <div
                        className={`test-avatar ${oswald.className} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md`}
                        style={{ background: story.portraitGradient }}
                      >
                        {story.initials}
                      </div>
                      <div>
                        <h3 className={`test-name ${oswald.className} text-xl font-bold text-slate-900`}>
                          {story.name}
                        </h3>
                        <span className="test-uni block text-xs font-semibold text-amber-600 uppercase tracking-wider">
                          {story.university} · {story.country}
                        </span>
                      </div>
                    </div>

                    {/* Verified Seal */}
                    <div className="test-verified-seal flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                      <CheckCircle size={14} weight="fill" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} weight="fill" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quotes size={32} weight="fill" className="text-slate-200 absolute -top-3 -left-3 opacity-60" />
                    <p className="test-quote text-slate-700 text-base leading-relaxed italic relative z-10 pl-4 border-l-2 border-slate-200">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Footer Metric Tag & CTA */}
                <div className="test-card-footer pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="test-metric font-semibold text-slate-500 uppercase tracking-wider">
                    {story.successMetric}
                  </span>
                  <span className={`test-cta font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1 group-hover:text-amber-600 transition-colors ${oswald.className}`}>
                    <span>READ FULL STORY</span>
                    <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal View */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </section>
  );
}

export default TestimonialsSection;
