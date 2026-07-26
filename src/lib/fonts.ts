/**
 * Font utilities for the project.
 *
 * Oswald and Inter are loaded globally via a <link> tag in layout.tsx.
 * We expose a plain CSS class string here so components can apply the
 * font-family without triggering next/font's build-time download, which
 * fails in network-restricted environments.
 */

/** Applies `font-family: 'Oswald', sans-serif` */
export const oswald = {
  className: "font-oswald",
} as const;
