export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
  "4k": 2560,
} as const

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]}px)`,
  "3xl": `@media (min-width: ${breakpoints["3xl"]}px)`,
  "4k": `@media (min-width: ${breakpoints["4k"]}px)`,

  // Max-width queries
  "max-sm": `@media (max-width: ${breakpoints.sm - 1}px)`,
  "max-md": `@media (max-width: ${breakpoints.md - 1}px)`,
  "max-lg": `@media (max-width: ${breakpoints.lg - 1}px)`,
  "max-xl": `@media (max-width: ${breakpoints.xl - 1}px)`,
  "max-2xl": `@media (max-width: ${breakpoints["2xl"] - 1}px)`,

  // Reduced motion
  "reduced-motion": "@media (prefers-reduced-motion: reduce)",
  "any-hover": "@media (any-hover: hover)",
  "any-pointer-fine": "@media (any-pointer: fine)",
} as const

export type BreakpointKey = keyof typeof breakpoints
export type MediaQueryKey = keyof typeof mediaQueries
