"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./liquid-transition.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * LiquidTransition — scroll-driven background fill
 *
 * As the user scrolls through this zone the background colour
 * rises from the bottom like liquid pouring into a glass.
 * Uses a polygon clip-path with a curved top edge that flattens
 * as it fills, creating an organic liquid feel.
 */
export function LiquidTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(fillRef.current, { clipPath: "inset(0% 0 0 0)" });
        return;
      }

      // Main liquid fill — clip-path rises from bottom
      gsap.fromTo(
        fillRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "70% 50%",
            scrub: 0.8,
          },
        }
      );

      // Glow pulse at the liquid surface
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, y: 0 },
        {
          opacity: 1,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "60% 50%",
            scrub: 0.5,
          },
        }
      );

      // Fade glow out near the end
      gsap.to(glowRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "60% 50%",
          end: "80% 50%",
          scrub: 0.5,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="liquid-transition" aria-hidden="true">
      {/* The liquid fill layer */}
      <div ref={fillRef} className="liquid-transition__fill">
        {/* Glow effect at the liquid surface */}
        <div ref={glowRef} className="liquid-transition__glow" />
      </div>
    </div>
  );
}
