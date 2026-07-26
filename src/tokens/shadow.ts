export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.15)",
  "3xl": "0 35px 60px -15px rgb(0 0 0 / 0.2)",

  // ── Semantic Shadows ──
  semantic: {
    card: "var(--shadow-card)",
    "card-hover": "var(--shadow-card-hover)",
    dropdown: "var(--shadow-dropdown)",
    modal: "var(--shadow-modal)",
    popover: "var(--shadow-popover)",
    tooltip: "var(--shadow-tooltip)",
    toast: "var(--shadow-toast)",
    navbar: "var(--shadow-navbar)",
    sidebar: "var(--shadow-sidebar)",
    button: "var(--shadow-button)",
    "button-hover": "var(--shadow-button-hover)",
    glow: {
      primary: "var(--shadow-glow-primary)",
      cyan: "var(--shadow-glow-cyan)",
      accent: "var(--shadow-glow-accent)",
    },
    glass: "var(--shadow-glass)",
    luxury: "var(--shadow-luxury)",
  },
} as const

export type ShadowKey = keyof typeof shadows
