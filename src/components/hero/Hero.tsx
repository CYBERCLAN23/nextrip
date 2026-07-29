'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { oswald } from "@/lib/fonts";
import { CaretDown } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/ui/text-reveal';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { organicBounce } from '@/lib/anime';
import './hero.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Video config ─────────────────────────────────────────────────── */
const VIDEO_SRC =
  "https://stream.mux.com/2S00piWWpXmZIsFF4RdUmCNVepGsDgQpf/high.mp4";
const VIDEO_POSTER =
  "https://cdn.coverr.co/videos/coverr-students-walking-to-class-8974/thumbnail?width=1920";

/* ─── Hero ──────────────────────────────────────────────────────────── */

const Hero = () => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [headlineReady, setHeadlineReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Trigger TextReveal & anime.js micro-interaction after mount
  useEffect(() => {
    const t = setTimeout(() => setHeadlineReady(true), 200);

    // Anime.js spring bounce on the scroll indicator (decorative, fire-and-forget)
    const animeTimer = setTimeout(() => {
      organicBounce('.hero-scroll', {
        duration: 1200,
        stiffness: 160,
        damping: 12,
      });
    }, 1200);

    return () => {
      clearTimeout(t);
      clearTimeout(animeTimer);
    };
  }, []);

  // Video ended → GSAP crossfade to static banner image
  const handleVideoEnded = useCallback(() => {
    if (videoEnded) return;
    setVideoEnded(true);

    gsap.to(videoRef.current, {
      opacity: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.style.display = 'none';
        }
      },
    });
  }, [videoEnded]);

  // Video error → immediately fall back to poster
  const handleVideoError = useCallback(() => {
    if (videoEnded || hasVideoError) return;
    setHasVideoError(true);
    setVideoEnded(true);

    if (videoRef.current) {
      videoRef.current.style.display = 'none';
    }
  }, [videoEnded, hasVideoError]);

  // 1. GSAP ScrollTrigger Entrance & Exit Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero exit timeline: scale down, fade, slide elements as we scroll away
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      tl.to(containerRef.current, { scale: 0.9, opacity: 0, y: -50, ease: 'none' }, 0);
      tl.to(bgRef.current, { scale: 1.15, ease: 'none' }, 0);
      tl.to('[data-hero-overlay]', { opacity: 0.85, ease: 'none' }, 0);
      tl.to(footerRef.current, { y: 40, opacity: 0, ease: 'none' }, 0);

      // Footer entrance
      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. 3D Hover & Mouse Parallax Handler
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const hero = sectionRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();

      // Normalize mouse coordinates relative to the center of the hero (-0.5 to 0.5)
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      // Animate background image slightly in the OPPOSITE direction to create parallax depth
      gsap.to(bgMediaRef.current, {
        x: -x * 35,
        y: -y * 35,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Animate the center tilt-wrapper in the SAME direction with 3D rotation
      gsap.to(tiltRef.current, {
        x: x * 20,
        y: y * 20,
        rotateY: x * 12, // Rotate around Y-axis
        rotateX: -y * 12, // Rotate around X-axis (invert to match movement)
        transformPerspective: 1000,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      // Smoothly return background and tilt container to neutral state
      gsap.to(bgMediaRef.current, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      gsap.to(tiltRef.current, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero relative overflow-hidden" aria-label="Hero">
      {/* Floating 3D Orbs — decorative Three.js scene behind everything */}
      <FloatingOrbs className="absolute inset-0 z-[1]" canvasOpacity={0.3} count={8} color="#00D9FF" accentColor="#D4AF37" />

      {/* Background Media Container */}
      <div ref={bgRef} className="hero-bg">
        <div ref={bgMediaRef} className="hero-bg-media">
          {/* Hero video — plays once, then GSAP-fades to static banner image below */}
          <video
            ref={videoRef}
            className="hero-video"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            aria-hidden="true"
          />
        </div>
        <div className="hero-overlay" data-hero-overlay />
      </div>

      <div ref={containerRef} className="hero-container flex flex-col justify-between w-full h-full relative z-10">
        {/* Top spacing to offset global Navbar */}
        <div className="hero-nav-spacer h-24" />

        {/* Center Text with 3D perspective */}
        <div className="hero-center flex-grow flex items-center justify-center text-center">
          <div ref={tiltRef} className="hero-tilt-wrapper">
            {/* Main headline — word-by-word fade-in-blur via TextReveal */}
            <TextReveal
              as="h1"
              per="word"
              preset="fade-in-blur"
              trigger={headlineReady}
              delay={0}
              speedReveal={0.9}
              speedSegment={1.4}
              className={`hero-headline ${oswald.className}`}
              segmentTransition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              YOUR GATEWAY TO GLOBAL EDUCATION
            </TextReveal>

            {/* Subheadline — slides in slightly after headline */}
            <TextReveal
              as="p"
              per="line"
              preset="slide"
              trigger={headlineReady}
              delay={0.6}
              speedReveal={1}
              speedSegment={1.2}
              className="hero-subheadline"
              segmentTransition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              500+ universities · Expert visa guidance · One seamless journey
            </TextReveal>
          </div>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className="hero-footer">
          <div className="hero-footer-left" />

          <div
            className="hero-scroll"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className={oswald.className}>SCROLL</span>
            <CaretDown size={24} weight="bold" color="#ffffff" />
          </div>

          <button
            className="hero-pause"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              if (video.paused) {
                video.play().catch(() => {
                  setHasVideoError(true);
                  setVideoEnded(true);
                });
                setIsVideoPaused(false);
              } else {
                video.pause();
                setIsVideoPaused(true);
              }
            }}
            disabled={videoEnded || hasVideoError}
          >
            {videoEnded ? 'explore' : isVideoPaused ? 'play video' : 'pause video'}
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Hero;
export { Hero };
