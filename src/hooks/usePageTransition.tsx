"use client";

/**
 * usePageTransition — GSAP-powered page-transition hook.
 *
 * This is the Barba.js alternative for Next.js App Router.
 * Since App Router handles client-side navigation natively,
 * this hook provides GSAP-based entrance/exit animations when
 * routes change, giving that "barba-like" feel.
 *
 * Usage:
 *   const { animateIn, animateOut } = usePageTransition()
 *   // Call animateOut() before navigating, then animateIn() after
 *
 * Or use the <PageTransitionWrap> component for automatic wrapping.
 */

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─── Types ─────────────────────────────────────────────────────────── */

export interface TransitionOptions {
  /** Duration of the exit animation (ms). Default 400 */
  exitDuration?: number;
  /** Duration of the entrance animation (ms). Default 600 */
  enterDuration?: number;
  /** Easing for exit. Default "power2.inOut" */
  exitEase?: string;
  /** Easing for entrance. Default "power3.out" */
  enterEase?: string;
  /** Container selector to animate. Default "[data-page-container]" */
  containerSelector?: string;
}

/* ─── Hook ──────────────────────────────────────────────────────────── */

export function usePageTransition(options: TransitionOptions = {}) {
  const {
    exitDuration = 400,
    enterDuration = 600,
    exitEase = "power2.inOut",
    enterEase = "power3.out",
    containerSelector = "[data-page-container]",
  } = options;

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Animate the current page out.
   * Returns a promise that resolves when the exit animation completes.
   */
  const animateOut = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const container = document.querySelector(containerSelector);
      if (!container) {
        resolve();
        return;
      }

      tlRef.current = gsap.timeline({
        onComplete: () => resolve(),
      });

      tlRef.current.to(container, {
        opacity: 0,
        y: -20,
        scale: 0.97,
        filter: "blur(6px)",
        duration: exitDuration / 1000,
        ease: exitEase,
      });
    });
  }, [containerSelector, exitDuration, exitEase]);

  /**
   * Animate the new page in.
   * Call this after the route has changed.
   */
  const animateIn = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const container = document.querySelector(containerSelector);
      if (!container) {
        resolve();
        return;
      }

      // Set initial hidden state (no clearProps — we want to start from here)
      gsap.set(container, {
        opacity: 0,
        y: 30,
        scale: 0.98,
        filter: "blur(4px)",
      });

      // Animate to visible
      tlRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { clearProps: "all" });
          resolve();
        },
      });

      tlRef.current.to(container, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: enterDuration / 1000,
        ease: enterEase,
      });
    });
  }, [containerSelector, enterDuration, enterEase]);

  /**
   * Navigate to a new route with a full page transition.
   * Uses the Next.js router to navigate after the exit animation.
   */
  const navigateWithTransition = useCallback(
    async (router: { push: (url: string) => void }, href: string) => {
      await animateOut();
      router.push(href);
    },
    [animateOut]
  );

  return {
    animateIn,
    animateOut,
    navigateWithTransition,
  };
}

/* ─── Transition Wrapper Component ──────────────────────────────────── */

interface PageTransitionWrapProps {
  children: React.ReactNode;
  /** Whether to automatically animate in on mount. Default true */
  autoAnimateIn?: boolean;
  /** Container selector for animation target. Default "[data-page-container]" */
  containerSelector?: string;
}

/**
 * Wrap your page content with this component to automatically
 * animate it in on mount with a GSAP entrance animation.
 *
 * @example
 *   // app/page.tsx
 *   export default function Home() {
 *     return (
 *       <PageTransitionWrap>
 *         <YourPageContent />
 *       </PageTransitionWrap>
 *     )
 *   }
 */
export function PageTransitionWrap({
  children,
  autoAnimateIn = true,
}: PageTransitionWrapProps) {
  const { animateIn } = usePageTransition();

  // Animate in on mount — proper React lifecycle
  useEffect(() => {
    if (!autoAnimateIn) return;

    const frame = requestAnimationFrame(() => {
      const container = document.querySelector("[data-page-container]");
      if (container) {
        gsap.set(container, { opacity: 0, y: 30 });
        animateIn();
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [autoAnimateIn, animateIn]);

  return <div data-page-container>{children}</div>;
}
