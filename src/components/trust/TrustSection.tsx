"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Compass, GraduationCap, ShieldCheck, ArrowRight } from "@phosphor-icons/react";
import "./trust.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const steps = [
  {
    id: 1,
    title: "Global Matchmaking",
    number: "01",
    icon: Compass,
    description: "Scan through 500+ accredited global institutions to find the exact university and program aligned with your future goals.",
    expandedDescription: "NexTrip matches your academic profile, budget, and location preferences with premier global institutions. Compare admission criteria, tuition fees, and scholarship availability instantly in one unified dashboard.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    stats: [
      { label: "Partner Universities", value: "500+" },
      { label: "Global Programs", value: "12,000+" },
    ],
    coordinates: { x: 20, y: 26 },
  },
  {
    id: 2,
    title: "Accredited Enrollment",
    number: "02",
    icon: GraduationCap,
    description: "Direct application channel with certified evaluation. Get verified directly by partner universities with our priority lane.",
    expandedDescription: "Skip the queues with our fast-tracked direct enrollment channel. We manage document certification, credit translation, and application review to secure your letter of acceptance with maximum speed.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    stats: [
      { label: "Application Fee Waiver", value: "100%" },
      { label: "Average Response Time", value: "7 Days" },
    ],
    coordinates: { x: 80, y: 49.125 },
  },
  {
    id: 3,
    title: "Embassy & Visa Success",
    number: "03",
    icon: ShieldCheck,
    description: "Navigate interview prep, document legalization, and secure your student visa with our audited 98% success rate.",
    expandedDescription: "Securing admission is only half the battle. Our legal team assists with financial proof requirements, certified translations, mock embassy interviews, and biometric appointments to assure a seamless transition.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
    stats: [
      { label: "Visa Success Rate", value: "98%" },
      { label: "Prepped Interviews", value: "1,500+" },
    ],
    coordinates: { x: 25, y: 73.125 },
  },
];

// Timeline total duration = 24.3s
// Segment 1 (Travel 1): 0s to 1.5s -> p = 0.062 (Plane reaches Card 1)
// Card 1 Zoom: 1.5s to 7.1s -> p = 0.062 to 0.292
// Segment 2 (Travel 2): 7.1s to 9.1s -> p = 0.375 (Plane reaches Card 2)
// Card 2 Zoom: 9.1s to 14.7s -> p = 0.375 to 0.605
// Segment 3 (Travel 3): 14.7s to 16.7s -> p = 0.687 (Plane reaches Card 3)
// Card 3 Zoom: 16.7s to 22.3s -> p = 0.687 to 0.918
// Segment 4 (Travel 4): 22.3s to 24.3s -> p = 1.0 (Plane flies off)
const ZOOM_WINDOWS = [
  { min: 0.06, max: 0.29 },
  { min: 0.37, max: 0.61 },
  { min: 0.69, max: 0.92 },
];

export function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blurOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia(containerRef);
    const expandedW = window.innerWidth > 768 ? "720px" : "90vw";

    mm.add("(min-width: 769px)", () => {
      // ── Helper: toggle card CSS classes based on timeline progress ──
      function syncClasses(tl: gsap.core.Timeline) {
        const p = tl.progress();
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const { min, max } = ZOOM_WINDOWS[i];
          card.classList.toggle("flight-journey__card--expanded", p >= min && p <= max);
        });
        // Blur overlay opacity driven by whether any card is active
        if (blurOverlayRef.current) {
          const anyActive = ZOOM_WINDOWS.some(({ min, max }) => p >= min && p <= max);
          blurOverlayRef.current.style.opacity = anyActive ? "1" : "0";
          blurOverlayRef.current.style.pointerEvents = anyActive ? "auto" : "none";
        }
      }

      const tl = gsap.timeline({
        onUpdate() { syncClasses(this as unknown as gsap.core.Timeline); },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Initialise dashed path with dynamically measured length to ensure exact synchronization with the plane
      const pathLength = pathRef.current ? pathRef.current.getTotalLength() : 2000;
      gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const c1 = cardRefs.current[0];
      const c2 = cardRefs.current[1];
      const c3 = cardRefs.current[2];

      // ── Segment 1: Plane ➜ Card 1 ──
      tl.to(planeRef.current, {
        motionPath: { path: pathRef.current!, align: pathRef.current!, alignOrigin: [0.5, 0.5], autoRotate: 90, start: 0, end: 0.062 },
        duration: 1.5, ease: "power1.inOut",
      }, 0);
      tl.to(pathRef.current, { strokeDashoffset: pathLength - (pathLength * 0.062), duration: 1.5, ease: "power1.inOut" }, 0);

      // Card 1 zoom in
      tl.to(c1, { width: expandedW, left: "50%", top: "50%", xPercent: -50, yPercent: -50, zIndex: 100, duration: 0.8, ease: "power2.out" });
      // Pause at Card 1
      tl.to(c1, { duration: 4.0 });
      // Card 1 zoom out
      tl.to(c1, { width: "300px", left: `${steps[0].coordinates.x}%`, top: `${steps[0].coordinates.y}%`, xPercent: -50, yPercent: -50, zIndex: 10, duration: 0.8, ease: "power2.in" });

      // ── Segment 2: Card 1 ➜ Card 2 ──
      tl.to(planeRef.current, {
        motionPath: { path: pathRef.current!, align: pathRef.current!, alignOrigin: [0.5, 0.5], autoRotate: 90, start: 0.062, end: 0.375 },
        duration: 2.0, ease: "power1.inOut",
      });
      tl.to(pathRef.current, { strokeDashoffset: pathLength - (pathLength * 0.375), duration: 2.0, ease: "power1.inOut" }, "<");

      // Card 2 zoom in
      tl.to(c2, { width: expandedW, left: "50%", top: "50%", xPercent: -50, yPercent: -50, zIndex: 100, duration: 0.8, ease: "power2.out" });
      // Pause at Card 2
      tl.to(c2, { duration: 4.0 });
      // Card 2 zoom out
      tl.to(c2, { width: "300px", left: `${steps[1].coordinates.x}%`, top: `${steps[1].coordinates.y}%`, xPercent: -50, yPercent: -50, zIndex: 10, duration: 0.8, ease: "power2.in" });

      // ── Segment 3: Card 2 ➜ Card 3 ──
      tl.to(planeRef.current, {
        motionPath: { path: pathRef.current!, align: pathRef.current!, alignOrigin: [0.5, 0.5], autoRotate: 90, start: 0.375, end: 0.687 },
        duration: 2.0, ease: "power1.inOut",
      });
      tl.to(pathRef.current, { strokeDashoffset: pathLength - (pathLength * 0.687), duration: 2.0, ease: "power1.inOut" }, "<");

      // Card 3 zoom in
      tl.to(c3, { width: expandedW, left: "50%", top: "50%", xPercent: -50, yPercent: -50, zIndex: 100, duration: 0.8, ease: "power2.out" });
      // Pause at Card 3
      tl.to(c3, { duration: 4.0 });
      // Card 3 zoom out
      tl.to(c3, { width: "300px", left: `${steps[2].coordinates.x}%`, top: `${steps[2].coordinates.y}%`, xPercent: -50, yPercent: -50, zIndex: 10, duration: 0.8, ease: "power2.in" });

      // ── Segment 4: Plane flies off ──
      tl.to(planeRef.current, {
        motionPath: { path: pathRef.current!, align: pathRef.current!, alignOrigin: [0.5, 0.5], autoRotate: 90, start: 0.687, end: 1.0 },
        duration: 2.0, ease: "power1.in",
      });
      tl.to(pathRef.current, { strokeDashoffset: 0, duration: 2.0, ease: "power1.in" }, "<");
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="flight-journey" aria-label="Strategic Journey">
      {/* Liquid-glass blur overlay */}
      <div ref={blurOverlayRef} className="flight-journey__blur-overlay" />

      <div className="flight-journey__container">
        {/* Header */}
        <div className="flight-journey__intro">
          <span className="flight-journey__eyebrow">Interactive Roadmap</span>
          <h2 className="flight-journey__heading">Your Strategic Flight Path</h2>
          <p className="flight-journey__subheading">
            Scroll to guide your flight across each milestone — from exploration to landing.
          </p>
        </div>

        {/* Arena */}
        <div className="flight-journey__space">
          {/* Animated SVG path */}
          <svg className="flight-journey__svg" viewBox="0 0 1000 800" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M 100,100 C 150,138 180,177 200,208 C 400,292 600,331 800,393 C 600,485 450,524 250,585 C 400,631 700,647 900,639"
              fill="none"
              stroke="rgba(10, 61, 145, 0.18)"
              strokeWidth="4"
              strokeDasharray="8,8"
            />
          </svg>

          {/* Plane */}
          <svg
            ref={planeRef}
            className="flight-journey__plane"
            viewBox="0 0 24 24"
            width="44"
            height="44"
          >
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L21 16z"
              fill="#0a3d91"
            />
          </svg>

          {/* Cards */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="flight-journey__card"
                style={{
                  left: `${step.coordinates.x}%`,
                  top: `${step.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Compact view — always visible */}
                <div className="flight-journey__card-header">
                  <span className="flight-journey__card-number">{step.number}</span>
                  <div className="flight-journey__card-icon">
                    <Icon size={24} weight="bold" />
                  </div>
                </div>
                <h3 className="flight-journey__card-title">{step.title}</h3>
                <p className="flight-journey__card-desc">{step.description}</p>

                {/* Expanded detail — shown via CSS when card has --expanded class */}
                <div className="flight-journey__card-detailed">
                  <div className="flight-journey__detailed-left">
                    <p className="flight-journey__detailed-long">{step.expandedDescription}</p>
                    <div className="flight-journey__detailed-stats">
                      {step.stats.map((stat, i) => (
                        <div key={i} className="flight-journey__stat-box">
                          <span className="flight-journey__stat-val">{stat.value}</span>
                          <span className="flight-journey__stat-lbl">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    <button className="flight-journey__detailed-btn">
                      <span>Get Started</span>
                      <ArrowRight size={16} weight="bold" />
                    </button>
                  </div>
                  <div className="flight-journey__detailed-right">
                    <img src={step.image} alt={step.title} className="flight-journey__detailed-img" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
