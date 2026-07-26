export const blur = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "40px",
  "4xl": "64px",

  // ── Semantic ──
  semantic: {
    background: "var(--blur-background)",
    overlay: "var(--blur-overlay)",
    modal: "var(--blur-modal-backdrop)",
    glass: "var(--blur-glass)",
  },
} as const

export type BlurKey = keyof typeof blur
