'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { destinations } from './DestinationData';
import {
  GraduationCap, CurrencyDollar, MapPin,
  Compass, Sun, BookOpen, Buildings, Globe
} from '@phosphor-icons/react';
import './destinations.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DESTINATION_ICONS = [Compass, Sun, Buildings, BookOpen, Globe, GraduationCap];

const DiamondTerminal = ({ className }: { className: string }) => (
  <svg className={`dest-terminal ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="currentColor" />
  </svg>
);

export function DestinationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTweenRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      scrollTweenRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${destinations.length * 500}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const rawIdx = Math.floor(self.progress * destinations.length);
          setActiveIndex(Math.min(destinations.length - 1, Math.max(0, rawIdx)));
        },
      });
    });

    return () => mm.revert();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    if (sectionRef.current && typeof window !== 'undefined' && window.innerWidth > 768 && scrollTweenRef.current) {
      const st = scrollTweenRef.current;
      const progressPerStep = 1 / destinations.length;
      const targetProgress = index * progressPerStep + progressPerStep / 2;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="dest-section relative bg-[#0B111A] text-white min-h-screen overflow-hidden"
      aria-label="Destinations"
    >
      {/* Background Grain & Glow */}
      <div className="dest-bg-overlay" />

      {/* Top Crosshair Grid Line */}
      <div className="dest-crosshair-top">
        <DiamondTerminal className="dest-terminal--left" />
        <div className="dest-line-h" />
        <DiamondTerminal className="dest-terminal--right" />
      </div>

      {/* Section Header */}
      <header className="dest-header relative z-10 text-center max-w-4xl mx-auto pt-16 px-6">
        <span className={`dest-eyebrow ${oswald.className}`} data-animate-slide-l>
          06 / WORLD STUDY DESTINATIONS
        </span>
        <h2 className={`dest-heading ${oswald.className}`} data-animate-heading>
          DISCOVER YOUR GLOBAL CAMPUS HUB
        </h2>
        <div className="dest-header-divider" data-animate-clip />
        <p className="dest-subheading" data-animate-blur>
          Explore tuition costs, post-study visa pathways, and top accredited universities worldwide.
        </p>
      </header>

      {/* Interactive Selector */}
      <div className="dest-selector-wrap relative z-10 flex-1 flex items-center px-6 pb-16">
        <div className="dest-selector-track">
          {destinations.map((country, index) => {
            const isActive = index === activeIndex;
            const IconComp = DESTINATION_ICONS[index] || Compass;

            return (
              <div
                key={country.id}
                className={`dest-card ${isActive ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <Image
                  src={country.image}
                  alt={country.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="dest-card-bg"
                />
                <div className="dest-card-shadow" />

                {/* Icon */}
                <div className="dest-card-icon">
                  <IconComp size={24} weight="bold" />
                </div>

                {/* Active Info */}
                <div className="dest-card-info">
                  <h3 className={`dest-card-name ${oswald.className}`}>{country.name}</h3>
                  <p className="dest-card-desc">{country.description}</p>
                  <div className="dest-card-meta">
                    <span><GraduationCap size={14} weight="bold" /> {country.universities}+</span>
                    <span><CurrencyDollar size={14} weight="bold" /> {country.avgTuition}</span>
                    <span><MapPin size={14} weight="bold" /> {country.language}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step indicators */}
      <div className="dest-indicators">
        {destinations.map((_, index) => (
          <button
            key={index}
            className={`dest-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
            aria-label={`Go to destination ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default DestinationSection;
