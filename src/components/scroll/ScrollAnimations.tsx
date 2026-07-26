"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollAnimations — global scroll-driven effects.
 *
 * Mounts once at page level. Registers GSAP ScrollTrigger animations
 * on every major section using data-attributes so we don't couple
 * animation logic to individual component files.
 *
 * Effects:
 *  ① Section-level zoom + fade entrance
 *  ② Heading text reveals (clip + translate)
 *  ③ Card / grid-item stagger pop-ins
 *  ④ Parallax on decorative backgrounds
 *  ⑤ Fade-in elements
 */
export function ScrollAnimations() {
  const ctxRef = useRef<gsap.Context | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Give the DOM a tick to render all sections
    rafRef.current = requestAnimationFrame(() => {
      // Revert any existing context before creating a new one (Strict Mode safety)
      ctxRef.current?.revert();

      ctxRef.current = gsap.context(() => {
        // ─────────────────────────────────────────
        // ① Section-level zoom + translate entrance
        // ─────────────────────────────────────────
        const sections = gsap.utils.toArray<HTMLElement>(
          "[data-scroll-section]"
        );

        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { y: 80, scale: 0.97, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                end: "top 45%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // ② Heading text reveals — slide up + clip
        // ─────────────────────────────────────────
        const headings = gsap.utils.toArray<HTMLElement>(
          "[data-scroll-heading]"
        );

        headings.forEach((heading) => {
          gsap.fromTo(
            heading,
            { y: 40, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // ③ Card / grid stagger pop-ins
        // ─────────────────────────────────────────
        const grids = gsap.utils.toArray<HTMLElement>("[data-scroll-grid]");

        grids.forEach((grid) => {
          const items = grid.querySelectorAll("[data-scroll-item]");
          if (!items.length) return;

          gsap.fromTo(
            items,
            { y: 50, opacity: 0, scale: 0.93, rotateX: 6 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: grid,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // ④ Parallax backgrounds
        // ─────────────────────────────────────────
        const parallaxEls = gsap.utils.toArray<HTMLElement>(
          "[data-scroll-parallax]"
        );

        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.scrollParallax || "0.15");
          gsap.to(el, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // ─────────────────────────────────────────
        // ⑤ Fade-in elements (simpler animation)
        // ─────────────────────────────────────────
        const fadeIns = gsap.utils.toArray<HTMLElement>("[data-scroll-fade]");

        fadeIns.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  return null; // Render nothing — purely side-effect
}
