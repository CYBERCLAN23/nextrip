export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  18: "4.5rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",

  // ── Semantic Spacing ──
  section: {
    xs: "var(--spacing-section-xs)",
    sm: "var(--spacing-section-sm)",
    md: "var(--spacing-section-md)",
    lg: "var(--spacing-section-lg)",
    xl: "var(--spacing-section-xl)",
  },
  container: {
    sm: "var(--spacing-container-sm)",
    md: "var(--spacing-container-md)",
    lg: "var(--spacing-container-lg)",
    xl: "var(--spacing-container-xl)",
  },
  grid: {
    gutter: "var(--spacing-grid-gutter)",
    gap: "var(--spacing-grid-gap)",
  },
  card: {
    padding: "var(--spacing-card-padding)",
    gap: "var(--spacing-card-gap)",
  },
  form: {
    gap: "var(--spacing-form-gap)",
    label: "var(--spacing-form-label)",
  },
} as const

export type SpacingKey = keyof typeof spacing
export type SemanticSpacingCategory = {
  [K in keyof typeof spacing]: (typeof spacing)[K] extends Record<string, string> ? K : never
}[keyof typeof spacing]
