'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredResource, resources, resourceCategories, Resource } from './ResourcesData';
import { Clock, ArrowUpRight, MagnifyingGlass } from '@phosphor-icons/react';
import './resources.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`res-terminal ${className}`}
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

export function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredResources = resources.filter((item: Resource) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: (index % 3) * 0.12,
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
    <section ref={sectionRef} className="res-section relative bg-white py-24 overflow-hidden" aria-label="Resources">
      {/* Background Subtle Grain */}
      <div className="res-bg-noise" />

      {/* Top Crosshair Divider */}
      <div className="res-crosshair-top">
        <DiamondTerminal className="res-terminal--left" />
        <div className="res-line-h" />
        <DiamondTerminal className="res-terminal--right" />
      </div>

      <div className="res-container max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Section Header */}
        <header className="res-header text-center max-w-3xl mx-auto mb-14">
          <span className={`res-eyebrow ${oswald.className}`}>
            08 / KNOWLEDGE HUB & ADMISSION GUIDES
          </span>
          <h2 className={`res-heading ${oswald.className}`}>
            EXPERT INSIGHTS FOR SCHOLARS WORLDWIDE
          </h2>
          <div className="res-header-divider" />
          <p className="res-subheading">
            Curated visa walkthroughs, scholarship playbooks, and university admission strategies.
          </p>
        </header>

        {/* Search & Category Filter Bar */}
        <div className="res-controls flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          {/* Category Pills */}
          <div className="res-categories flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`res-cat-pill ${oswald.className} ${
                activeCategory === 'All' ? 'res-cat-pill--active' : ''
              }`}
            >
              ALL ARTICLES
            </button>
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`res-cat-pill ${oswald.className} ${
                  activeCategory === cat ? 'res-cat-pill--active' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="res-search-input-wrap relative w-full md:w-72">
            <MagnifyingGlass size={18} weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900 transition-colors"
            />
          </div>
        </div>

        {/* Featured Resource Banner (If 'All' is selected) */}
        {activeCategory === 'All' && !searchQuery && (
          <div className="res-featured-wrap mb-12">
            <article className="res-featured-card relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row gap-8 items-center justify-between">
              <div className="max-w-2xl relative z-10">
                <span className={`inline-block px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider mb-4 ${oswald.className}`}>
                  FEATURED PLAYBOOK
                </span>
                <h3 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight mb-4 ${oswald.className}`}>
                  {featuredResource.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  {featuredResource.description}
                </p>
                <div className="flex items-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {featuredResource.readingTime}</span>
                  <span>{featuredResource.publishDate}</span>
                  <span className="text-amber-400 font-semibold">{featuredResource.author}</span>
                </div>
              </div>
              <button className={`px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-lg flex-shrink-0 ${oswald.className}`}>
                <span>{featuredResource.cta}</span>
                <ArrowUpRight size={18} weight="bold" />
              </button>
            </article>
          </div>
        )}

        {/* Resources Grid */}
        <div className="res-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((item: Resource, index: number) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="res-card-3d-wrapper"
              onMouseMove={(e) =>
                cardRefs.current[index] && handleMouseMove(e, cardRefs.current[index]!)
              }
              onMouseLeave={() =>
                cardRefs.current[index] && handleMouseLeave(cardRefs.current[index]!)
              }
            >
              <article className="res-card group relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-400 hover:border-amber-500/50 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="res-card-cat px-3 py-1 bg-blue-50 text-blue-900 text-xs font-bold rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Clock size={14} /> {item.readingTime}
                    </span>
                  </div>

                  <h3 className={`res-card-title ${oswald.className} text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-amber-600 transition-colors`}>
                    {item.title}
                  </h3>

                  <p className="res-card-desc text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="res-card-footer pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 uppercase tracking-wider">
                  <span>{item.author}</span>
                  <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-600" />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResourcesSection;
