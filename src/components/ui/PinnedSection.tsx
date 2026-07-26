"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  pinOptions?: {
    start?: string;
    end?: string;
    pin?: boolean;
    scrub?: boolean | number;
  };
}

export function PinnedSection({
  children,
  className,
  pinOptions = {},
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const {
    start = "top top",
    end = "+=100%",
    pin = true,
    scrub = false,
  } = pinOptions;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    ctxRef.current = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start,
        end,
        pin,
        scrub,
        anticipatePin: 1,
        onUpdate: (self) => {
          section.style.setProperty(
            "--scroll-progress",
            String(self.progress)
          );
        },
      });

      return () => trigger.kill();
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [start, end, pin, scrub]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      style={{ minHeight: "100vh" } as React.CSSProperties}
    >
      {children}
    </section>
  );
}

export default PinnedSection;