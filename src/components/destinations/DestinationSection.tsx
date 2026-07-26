'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { destinations, CountryInfo } from './DestinationData';
import { CountryPreview } from './CountryPreview';
import { ArrowRight } from '@phosphor-icons/react';
import './destinations.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`dest-terminal ${className}`}
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

export function DestinationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);

  // 3D Perspective Mouse Tilt Handler (Matching Hero)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 12,
      transformPerspective: 1000,
      duration: 0.6,
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

  // GSAP Horizontal Scrub Pinning Animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="dest-section relative bg-[#0B111A] text-white min-h-screen flex flex-col justify-between overflow-hidden" aria-label="Destinations">
      {/* Editorial Noise Grain & Background Overlay */}
      <div className="dest-bg-overlay" />

      {/* Top Crosshair Grid Line */}
      <div className="dest-crosshair-top">
        <DiamondTerminal className="dest-terminal--left" />
        <div className="dest-line-h" />
        <DiamondTerminal className="dest-terminal--right" />
      </div>

      {/* Section Header */}
      <header className="dest-header relative z-10 text-center max-w-4xl mx-auto pt-16 px-6">
        <span className={`dest-eyebrow ${oswald.className}`}>
          06 / WORLD STUDY DESTINATIONS
        </span>
        <h2 className={`dest-heading ${oswald.className}`}>
          DISCOVER YOUR GLOBAL CAMPUS HUB
        </h2>
        <div className="dest-header-divider" />
        <p className="dest-subheading">
          Explore tuition costs, post-study visa pathways, and top accredited universities worldwide.
        </p>
      </header>

      {/* GSAP Horizontal Track Container */}
      <div className="dest-horizontal-wrapper relative z-10 py-12 overflow-hidden flex-1 flex items-center">
        <div ref={trackRef} className="dest-track flex gap-8 px-12 items-center">
          {destinations.map((country: CountryInfo, index: number) => (
            <div
              key={country.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="dest-card-3d-wrapper flex-shrink-0 w-[360px] sm:w-[420px]"
              onMouseMove={(e) =>
                cardRefs.current[index] && handleMouseMove(e, cardRefs.current[index]!)
              }
              onMouseLeave={() =>
                cardRefs.current[index] && handleMouseLeave(cardRefs.current[index]!)
              }
            >
              <article
                className="dest-card group relative bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-amber-500/50"
                onClick={() => setSelectedCountry(country)}
              >
                {/* Country Campus Image */}
                <div className="dest-card-image-wrap relative h-64 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={`${country.name} study destination`}
                    fill
                    sizes="420px"
                    className="dest-card-image object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="dest-card-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Flag Pill */}
                  <div className="dest-card-flag-badge absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-full border border-slate-700/60 text-xs font-semibold">
                    <img src={country.flag} alt={`${country.name} flag`} className="w-5 h-3.5 object-cover rounded-sm" />
                    <span className="uppercase tracking-wider">{country.code}</span>
                  </div>

                  <div className={`dest-card-uni-count absolute top-4 right-4 ${oswald.className} px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase`}>
                    {country.universities}+ UNIVERSITIES
                  </div>
                </div>

                {/* Card Content */}
                <div className="dest-card-body p-6">
                  <h3 className={`dest-card-title ${oswald.className} text-2xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-amber-400 transition-colors`}>
                    {country.name}
                  </h3>
                  <p className="dest-card-desc text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6">
                    {country.description}
                  </p>

                  {/* Quick Stats Grid */}
                  <div className="dest-card-stats grid grid-cols-2 gap-3 py-3 border-y border-slate-800 text-xs text-slate-300 mb-6">
                    <div>
                      <span className="block text-slate-500 uppercase tracking-wider text-[10px]">AVG TUITION</span>
                      <span className={`font-bold text-emerald-400 text-sm ${oswald.className}`}>{country.avgTuition}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 uppercase tracking-wider text-[10px]">LIVING COST</span>
                      <span className={`font-bold text-amber-400 text-sm ${oswald.className}`}>{country.avgLivingCost}</span>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className={`dest-card-cta flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-white transition-colors ${oswald.className}`}>
                    <span>VIEW DESTINATION GUIDE & VISA PATHWAY</span>
                    <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Country Preview Drawer / Modal */}
      {selectedCountry && (
        <CountryPreview country={selectedCountry} />
      )}
    </section>
  );
}

export default DestinationSection;
