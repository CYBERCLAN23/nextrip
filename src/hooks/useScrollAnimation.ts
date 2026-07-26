"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PinSectionOptions {
  start?: string;
  end?: string;
  pin?: boolean;
  anticipatePin?: number;
  scrub?: boolean | number;
  markers?: boolean;
}

export function useScrollPin(
  triggerRef: React.RefObject<HTMLElement | null>,
  options: PinSectionOptions = {}
) {
  const ctxRef = useRef<gsap.Context | null>(null);
  const {
    start = "top top",
    end = "+=100%",
    pin = true,
    scrub = false,
  } = options;

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    ctxRef.current = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start,
        end,
        pin,
        scrub,
        anticipatePin: 1,
      });
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [triggerRef, start, end, pin, scrub]);

  return ctxRef;
}

export interface StaggerRevealOptions {
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

export function useStaggerReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  options: StaggerRevealOptions = {}
) {
  const ctxRef = useRef<gsap.Context | null>(null);
  const {
    stagger = 0.1,
    duration = 0.8,
    delay = 0,
    ease = "power3.out",
    start = "top 80%",
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    ctxRef.current = gsap.context(() => {
      const items = container.querySelectorAll("[data-stagger-item]");

      if (items.length) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration,
            stagger,
            delay,
            ease,
            scrollTrigger: {
              trigger: container,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [containerRef, stagger, duration, delay, ease, start]);

  return ctxRef;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: "x" | "y";
  start?: string;
  end?: string;
}

export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const ctxRef = useRef<gsap.Context | null>(null);
  const {
    speed = 0.5,
    direction = "y",
    start = "top bottom",
    end = "bottom top",
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    ctxRef.current = gsap.context(() => {
      gsap.to(element, {
        [direction]: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      });
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [elementRef, speed, direction, start, end]);

  return ctxRef;
}