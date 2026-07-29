"use client";

/**
 * LenisProvider — Global smooth-scroll engine integrated with GSAP ScrollTrigger.
 *
 * This component:
 *   1. Creates a single Lenis instance at the root.
 *   2. Wires it to GSAP's ticker so ScrollTrigger reads Lenis's scroll position.
 *   3. Exposes the Lenis instance via context for manual control.
 *
 * Usage:
 *   <LenisProvider>
 *     <YourApp />
 *   </LenisProvider>
 *
 * Access:
 *   const { lenis } = useLenis()
 *   lenis.scrollTo('#section-2')
 */

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Types ─────────────────────────────────────────────────────────── */

interface LenisInstance {
  raf: (time: number) => void;
  on: (event: string, callback: () => void) => void;
  destroy: () => void;
}

interface LenisContextValue {
  lenis: LenisInstance | null;
}

/* ─── Context ───────────────────────────────────────────────────────── */

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

/* ─── Provider ──────────────────────────────────────────────────────── */

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    let destroyed = false;
    let gsapTickRemover: (() => void) | null = null;

    // ── 1. Dynamically import Lenis & create instance ─────────────
    async function initLenis() {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;

        if (destroyed) return;

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          infinite: false,
        }) as unknown as LenisInstance;

        if (destroyed) {
          lenis.destroy();
          return;
        }

        lenisRef.current = lenis;

        // ── 2. Wire Lenis to GSAP ScrollTrigger ──────────────────
        lenis.on("scroll", () => ScrollTrigger.update());

        gsap.ticker.lagSmoothing(0);

        gsapTickRemover = gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        // ── 3. Force ScrollTrigger refresh after Lenis settles ──
        setTimeout(() => {
          if (!destroyed) {
            ScrollTrigger.refresh();
          }
        }, 150);
      } catch (err) {
        console.warn("[LenisProvider] Failed to load Lenis:", err);
      }
    }

    initLenis();

    // ── 4. Re-sync ScrollTrigger on resize ───────────────────────
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    // ── 5. Cleanup ───────────────────────────────────────────────
    return () => {
      destroyed = true;
      window.removeEventListener("resize", handleResize);
      if (gsapTickRemover) gsapTickRemover();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
