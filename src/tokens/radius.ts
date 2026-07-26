export const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "20px",
  "4xl": "24px",
  full: "9999px",

  // ── Semantic ──
  semantic: {
    none: "var(--radius-none)",
    xs: "var(--radius-xs)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    full: "var(--radius-full)",
    button: "var(--radius-button)",
    card: "var(--radius-card)",
    input: "var(--radius-input)",
    modal: "var(--radius-modal)",
    badge: "var(--radius-badge)",
  },
} as const

export type RadiusKey = keyof typeof radius
