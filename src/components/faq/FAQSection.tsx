'use client';

import React, { useEffect, useRef, useState } from 'react';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqItems, faqCategories, FAQItemData } from './FAQData';
import { CaretDown, MagnifyingGlass } from '@phosphor-icons/react';
import './faq.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`faq-terminal ${className}`}
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

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('choose-university');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = faqItems.filter((item: FAQItemData) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: (index % 4) * 0.1,
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
  }, [activeCategory, searchQuery]);

  return (
    <section ref={sectionRef} className="faq-section relative bg-[#F5F2ED] py-24 overflow-hidden" aria-label="FAQ">
      {/* Background Editorial Noise */}
      <div className="faq-bg-noise" />

      {/* Top Crosshair Line */}
      <div className="faq-crosshair-top">
        <DiamondTerminal className="faq-terminal--left" />
        <div className="faq-line-h" />
        <DiamondTerminal className="faq-terminal--right" />
      </div>

      <div className="faq-container max-w-5xl mx-auto px-6 relative z-10">
        {/* Editorial Section Header */}
        <header className="faq-header text-center max-w-3xl mx-auto mb-14">
          <span className={`faq-eyebrow ${oswald.className}`} data-animate-slide-l>
            09 / TRANSPARENT ADMISSION ANSWERS
          </span>
          <h2 className={`faq-heading ${oswald.className}`} data-animate-heading>
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="faq-header-divider" data-animate-clip />
          <p className="faq-subheading" data-animate-fade>
            Clear, honest answers regarding university requirements, scholarships, visas, and living costs.
          </p>
        </header>

        {/* Search & Category Filter */}
        <div className="faq-controls flex flex-col md:flex-row items-center justify-between gap-6 mb-12" data-animate-fade>
          {/* Category Chips */}
          <div className="faq-categories flex flex-wrap justify-center gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`faq-cat-chip ${oswald.className} ${
                  activeCategory === cat.id ? 'faq-cat-chip--active' : ''
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="faq-search-wrap relative w-full md:w-64">
            <MagnifyingGlass size={18} weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300/80 rounded-full text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900 transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list space-y-4">
          {filteredFaqs.map((item: FAQItemData, index: number) => {
            const isOpen = openId === item.id;
            const indexStr = String(index + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`faq-item group bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'faq-item--open border-blue-900/40 shadow-xl' : 'hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Question Accordion Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="faq-question-btn w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className={`faq-index ${oswald.className} text-lg font-bold text-amber-600`}>
                      {indexStr}
                    </span>
                    <h3 className={`faq-question-text ${oswald.className} text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors`}>
                      {item.question}
                    </h3>
                  </div>

                  <div className={`faq-toggle-icon w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-900 text-white' : ''}`}>
                    <CaretDown size={18} weight="bold" />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="faq-answer-wrap px-6 pb-6 pt-2 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
