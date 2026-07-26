"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function HorizontalScroll({
  children,
  className,
  speed = 1,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    ctxRef.current = gsap.context(() => {
      const getScrollAmount = () => {
        const containerWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(containerWidth - viewportWidth);
      };

      const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth * speed}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => tween.kill();
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height: "100vh" } as React.CSSProperties}
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </section>
  );
}

export default HorizontalScroll;