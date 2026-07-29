/**
 * Anime.js Utilities — complementary animation helpers for GSAP.
 *
 * GSAP excels at timeline-based, scroll-driven, and complex sequence animations.
 * Anime.js shines at:
 *   - SVG morphing / line drawing
 *   - Spring-physics-based motion
 *   - Stagger with organic easing
 *   - Keyframe arrays in a single call
 *
 * Use these helpers for specific effects where Anime.js's API is more natural,
 * and let GSAP handle everything scroll-related.
 *
 * Anime.js v4 API: animate(targets, params)  — 2 required arguments.
 */

import { animate, createTimeline, utils as animeUtils } from "animejs";
import type { TargetsParam, AnimationParams } from "animejs";

/* ─── Re-exports ────────────────────────────────────────────────────── */

export { animate, createTimeline, animeUtils };
export type { TargetsParam, AnimationParams };

/* ─── Helpers ───────────────────────────────────────────────────────── */

/**
 * Stagger elements with organic easing.
 * Use this for lists, grids, and groups where each element
 * trails the previous one naturally.
 *
 * @example
 *   staggerIn('.card', { opacity: [0, 1], translateY: [20, 0], stagger: 80 })
 */
export function staggerIn(
  targets: TargetsParam,
  params: AnimationParams & { stagger?: number } = {},
) {
  return animate(targets, {
    stagger: 60,
    easing: "easeOutQuad",
    duration: 600,
    ...params,
  });
}

/**
 * Organic bounce — a gentle, spring-like scale animation.
 * Nice for call-to-action buttons, badges, or micro-interactions.
 *
 * @example
 *   organicBounce('.cta-button')
 */
export function organicBounce(
  targets: TargetsParam,
  params: AnimationParams = {},
) {
  return animate(targets, {
    scale: [0.85, 1.05, 1],
    easing: "spring",
    stiffness: 180,
    damping: 14,
    duration: 1000,
    ...params,
  });
}

/**
 * Create an anime.js timeline. Useful for sequencing
 * animations that don't need GSAP's scroll integration.
 *
 * @example
 *   const tl = sequence()
 *   tl.add('.a', { opacity: 0 })
 *   tl.add('.b', { opacity: 0 }, 500)
 */
export function sequence() {
  return createTimeline();
}
