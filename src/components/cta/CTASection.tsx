'use client';

import React, { useRef, useState, useCallback } from 'react';
import { oswald } from "@/lib/fonts";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, CheckCircle, CalendarCheck, PaperPlaneTilt } from '@phosphor-icons/react';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import './cta.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const DiamondTerminal = ({ className }: { className: string }) => (
  <svg
    className={`cta-terminal ${className}`}
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

// Central Monogram Crest Badge matching Hero / Services
const CentralCrestBadge = () => (
  <div className="cta-badge-wrapper my-6 flex justify-center">
    <div className="cta-badge relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradCTA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F5E6B8" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="57" stroke="url(#goldGradCTA)" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="52" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        <circle cx="60" cy="60" r="48" fill="#0B111A" stroke="url(#goldGradCTA)" strokeWidth="1.5" />
        <g fill="url(#goldGradCTA)">
          <path d="M42 40 H47 L56 68 V40 H61 V80 H56 L47 52 V80 H42 V40 Z" opacity="0.9" />
          <path d="M58 44 H78 V49 H71 V80 H65 V49 H58 V44 Z" />
        </g>
      </svg>
    </div>
  </div>
);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // 3D Perspective Mouse Parallax (Matching Hero)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = sectionRef.current;
    if (!hero) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = hero.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(tiltRef.current, {
      x: x * 15,
      y: y * 15,
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 1000,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(tiltRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="cta-section relative bg-[#0B111A] text-white py-32 overflow-hidden"
      aria-label="Call to Action"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-animate-section
    >
      {/* Floating 3D Orbs — decorative Three.js scene */}
      <FloatingOrbs className="absolute inset-0 z-0" canvasOpacity={0.35} count={10} />

      {/* Background Radial Glow & Noise */}
      <div className="cta-bg-overlay" />

      {/* Top Crosshair Divider */}
      <div className="cta-crosshair-top">
        <DiamondTerminal className="cta-terminal--left" />
        <div className="cta-line-h" />
        <DiamondTerminal className="cta-terminal--right" />
      </div>

      <div className="cta-container max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* 3D Tilt Container */}
        <div ref={tiltRef} className="cta-tilt-wrapper">
          {/* Eyebrow */}
          <span className={`cta-eyebrow ${oswald.className}`} data-animate-slide-l>
            10 / INITIATE YOUR GLOBAL ADMISSION JOURNEY
          </span>

          {/* Headline */}
          <h2 className={`cta-heading ${oswald.className}`} data-animate-heading>
            READY TO STUDY AT A TOP GLOBAL UNIVERSITY?
          </h2>

          <div className="cta-header-divider" data-animate-clip />

          {/* Monogram Crest */}
          <div data-animate-pop>
            <CentralCrestBadge />
          </div>

          <p className="cta-subheading" data-animate-blur>
            Schedule a 1-on-1 strategy session with a senior global education advisor. We evaluate your profile, shortlist top universities, and map out your scholarship path.
          </p>

          {/* Form or Success State */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="cta-form max-w-xl mx-auto mt-10 flex flex-col sm:flex-row gap-4" data-animate-fade>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 px-6 py-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm font-medium text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
              />
              <button
                type="submit"
                className={`cta-submit-btn px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl flex-shrink-0 ${oswald.className}`}
              >
                <span>BOOK FREE ADVISORY</span>
                <ArrowRight size={18} weight="bold" />
              </button>
            </form>
          ) : (
            <div className="cta-success max-w-md mx-auto mt-10 p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl backdrop-blur-md flex items-center justify-center gap-3 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <CheckCircle size={24} weight="fill" />
              <span>CONSULTATION REQUEST RECEIVED. OUR TEAM WILL CONTACT YOU WITHIN 24 HOURS.</span>
            </div>
          )}

          {/* Trust Metrics */}
          <div className="cta-trust-grid grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-semibold" data-animate-stagger="0.12">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={18} className="text-amber-400" />
              <span>98% VISA APPROVAL RATE</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CalendarCheck size={18} className="text-amber-400" />
              <span>100% SCHOLARSHIP AUDIT</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PaperPlaneTilt size={18} className="text-amber-400" />
              <span>500+ PARTNER UNIVERSITIES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
