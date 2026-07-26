"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollAnimations() {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const raf = requestAnimationFrame(() => {
      ctxRef.current?.revert();

      ctxRef.current = gsap.context(() => {
        // ─────────────────────────────────────────
        // 1. Section entrance — zoom + translate + fade
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-section]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 80, scale: 0.95, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 2. Heading clip reveal — slide up + clip
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-heading]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 50, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.6,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 3. Grid stagger pop-in — cards zoom & fade
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-grid]").forEach((grid) => {
          const items = grid.querySelectorAll("[data-animate-item]");
          if (!items.length) return;

          gsap.fromTo(
            items,
            { y: 50, opacity: 0, scale: 0.92, rotateX: 5 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1.2,
              stagger: 0.1,
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
        // 4. Parallax backgrounds
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.animateParallax || "0.15");
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
        // 5. Fade up — simple & elegant
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-fade]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 6. Pop — scale bounce (badges, dots, icons)
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-pop]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.75,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 7. Staggered pop group (batch of pop elements)
        // ─────────────────────────────────────────
        gsap.utils
          .toArray<HTMLElement>("[data-animate-pop-group]")
          .forEach((group) => {
            const items = gsap.utils.toArray<HTMLElement>(
              group.querySelectorAll("[data-animate-pop]")
            );
            if (!items.length) return;

            gsap.fromTo(
              items,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.7,
                stagger: 0.09,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: group,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          });

        // ─────────────────────────────────────────
        // 8. Zoom in — subtle grow
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-zoom]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.85, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 9. Slide from left
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-slide-l]").forEach((el) => {
          gsap.fromTo(
            el,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 10. Slide from right
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-slide-r]").forEach((el) => {
          gsap.fromTo(
            el,
            { x: 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 11. Rotate in — playful twist
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-rotate]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotate: -12, opacity: 0, scale: 0.9 },
            {
              rotate: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 12. Blur in — cinematic reveal
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-blur]").forEach((el) => {
          gsap.fromTo(
            el,
            { filter: "blur(12px)", opacity: 0, y: 20 },
            {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 13. Stagger direct children generically
        // ─────────────────────────────────────────
        gsap.utils
          .toArray<HTMLElement>("[data-animate-stagger]")
          .forEach((container) => {
            const children = container.children;
            if (!children.length) return;

            const delay = parseFloat(
              container.dataset.animateStagger || "0.06"
            );
            gsap.fromTo(
              children,
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: delay,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          });

        // ─────────────────────────────────────────
        // 14. Clip horizontal reveal (left to right)
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 1.3,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 15. Counter — animate numbers
        // ─────────────────────────────────────────
        gsap.utils
          .toArray<HTMLElement>("[data-animate-counter]")
          .forEach((el) => {
            const raw = el.dataset.animateCounter || "0";
            const target = parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
            const suffix = el.dataset.counterSuffix || "";
            const prefix = el.dataset.counterPrefix || "";
            const obj = { val: 0 };

            gsap.to(obj, {
              val: target,
              duration: 2.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              onUpdate: () => {
                el.textContent =
                  prefix + Math.round(obj.val).toLocaleString() + suffix;
              },
            });
          });

        // ─────────────────────────────────────────
        // 16. Flair reveal — diagonal wipe
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-flair]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              opacity: 1,
              duration: 1.4,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ─────────────────────────────────────────
        // 17. Float in — light, airy rise
        // ─────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-animate-float]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.7,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctxRef.current?.revert();
    };
  }, []);

  return null;
}
