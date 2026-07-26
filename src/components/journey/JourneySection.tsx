'use client';

import React, { useEffect, useRef, useState } from 'react';
import { oswald } from "@/lib/fonts";
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeySteps, JourneyStepItem } from './JourneyStep';
import {
  MagnifyingGlass,
  ChatCircle,
  FileText,
  IdentificationCard,
  AirplaneTakeoff,
  GraduationCap,
  CheckCircle,
  Clock,
} from '@phosphor-icons/react';
import './journey.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const ICON_MAP = {
  magnifyingGlass: MagnifyingGlass,
  chatCircle: ChatCircle,
  fileText: FileText,
  identificationCard: IdentificationCard,
  airplaneTakeoff: AirplaneTakeoff,
  graduationCap: GraduationCap,
};

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep: JourneyStepItem = journeySteps[activeStepIndex];
  const activeTheme = activeStep.theme;
  const IconComp = ICON_MAP[activeStep.icon] || MagnifyingGlass;

  // Setup GSAP ScrollTrigger Pinned Scrub — stays stacked until user scrolls through ALL tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Restrict pinning to desktop viewports with reasonable height to prevent clipping
    mm.add('(min-width: 1024px) and (min-height: 800px)', () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${journeySteps.length * 600}`, // Stacks for 3600px of scroll length
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          // Precise index calculation ensuring all 6 steps are scrubbed through
          const rawIdx = Math.floor(self.progress * journeySteps.length);
          const stepIdx = Math.min(journeySteps.length - 1, Math.max(0, rawIdx));
          setActiveStepIndex(stepIdx);
        },
      });

      triggerRef.current = st;
    });

    return () => mm.revert();
  }, []);

  // Smooth scroll jump on manual tab click
  const handleTabClick = (index: number) => {
    setActiveStepIndex(index);
    if (triggerRef.current) {
      const st = triggerRef.current;
      const progressPerStep = 1 / journeySteps.length;
      const targetProgress = index * progressPerStep + progressPerStep / 2;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="beetogreen-section relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: activeTheme.bgColor }}
      aria-label="Roadmap to Scholarship and Admission"
    >
      {/* Background Soft Purple Blob Graphics transitioning with active theme */}
      <div
        className="beetogreen-blob beetogreen-blob-top transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeTheme.blob1} 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
      <div
        className="beetogreen-blob beetogreen-blob-bottom transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeTheme.blob2} 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />

      <div className="beetogreen-container">
        {/* Main Header */}
        <header className="beetogreen-header">
          <span
            className="beetogreen-eyebrow transition-colors duration-500"
            style={{
              color: activeTheme.accent,
              backgroundColor: activeTheme.accentLight,
            }}
          >
            04 / ROADMAP TO SCHOLARSHIP & ADMISSION
          </span>

          <h2
            className={`beetogreen-main-title ${oswald.className} transition-colors duration-500`}
            style={{ color: activeTheme.textDark }}
          >
            How do we guide your journey,{' '}
            <span
              className="beetogreen-title-accent italic transition-colors duration-500"
              style={{ color: activeTheme.accent }}
            >
              seamlessly?
            </span>
          </h2>

          <p className="beetogreen-subtitle">
            A structured, transparent step-by-step pathway crafted by global scholars and visa experts.
          </p>
        </header>

        {/* 3-Column Interactive Grid */}
        <div className="beetogreen-grid">
          
          {/* Left Column: Vertical Tab Navigation — Tab titles dynamic to theme */}
          <div className="beetogreen-col-left">
            <div className="beetogreen-tabs-list" role="tablist">
              {journeySteps.map((step, index) => {
                const isActive = index === activeStepIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleTabClick(index)}
                    className={`beetogreen-tab-item ${isActive ? 'active' : ''}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span
                      className={`beetogreen-tab-title ${oswald.className} transition-colors duration-400`}
                      style={{
                        color: isActive ? activeTheme.textDark : activeTheme.textMuted,
                      }}
                    >
                      {step.title}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="beetogreenTabIndicator"
                        className="beetogreen-tab-indicator"
                        style={{ backgroundColor: activeTheme.accent }}
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Portrait Frame with Popping & Fade GSAP-style Framer Entrance */}
          <div className="beetogreen-col-center">
            <div
              className="beetogreen-portrait-frame transition-all duration-500"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: `0 20px 45px ${activeTheme.accent}30`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, scale: 0.86, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.08, y: -15, filter: 'blur(4px)' }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                    mass: 0.8,
                  }}
                  className="beetogreen-portrait-inner"
                >
                  <img
                    src={activeStep.image}
                    alt={activeStep.title}
                    className="beetogreen-portrait-img"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Active Step Details Pane with Staggered Pop-in */}
          <div className="beetogreen-col-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="beetogreen-content-pane"
              >
                {/* Step Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="beetogreen-badge transition-colors duration-300"
                  style={{ color: activeTheme.accent }}
                >
                  Step {activeStep.number} &bull; {activeStep.tag}
                </motion.div>

                {/* Step Title & Icon Pop */}
                <div className="beetogreen-heading-row">
                  <h3
                    className={`beetogreen-step-title ${oswald.className} transition-colors duration-300`}
                    style={{ color: activeTheme.textDark }}
                  >
                    {activeStep.title}.
                  </h3>
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                    className="beetogreen-icon-badge transition-all duration-300"
                    style={{
                      backgroundColor: activeTheme.accentLight,
                      color: activeTheme.accent,
                    }}
                  >
                    <IconComp size={22} weight="bold" />
                  </motion.div>
                </div>

                <div
                  className="beetogreen-step-subtitle transition-colors duration-300"
                  style={{ color: activeTheme.accent }}
                >
                  {activeStep.subtitle}
                </div>

                {/* Description */}
                <p className="beetogreen-step-desc">
                  {activeStep.description}
                </p>

                {/* Deliverables List with staggered pop items */}
                <div className="beetogreen-deliverables">
                  <span className="beetogreen-deliv-title">
                    Key Deliverables:
                  </span>
                  <ul className="beetogreen-deliv-list">
                    {activeStep.deliverables.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + idx * 0.06 }}
                        className="beetogreen-deliv-item"
                        style={{ color: activeTheme.textDark }}
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.3, 1] }}
                          transition={{ delay: 0.14 + idx * 0.06 }}
                        >
                          <CheckCircle
                            size={17}
                            weight="fill"
                            className="beetogreen-check-icon"
                            style={{ color: activeTheme.accent }}
                          />
                        </motion.span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="beetogreen-timeline flex items-center gap-2"
                  style={{ color: activeTheme.accent }}
                >
                  <Clock size={16} weight="bold" style={{ color: activeTheme.accent }} />
                  <span>Timeline: {activeStep.duration}</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default JourneySection;
