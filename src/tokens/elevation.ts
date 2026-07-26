export const elevation = {
  flat: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 32,
  7: 64,
  8: 128,

  // ── Semantic ──
  semantic: {
    card: "var(--elevation-card)",
    "card-hover": "var(--elevation-card-hover)",
    navbar: "var(--elevation-navbar)",
    sidebar: "var(--elevation-sidebar)",
    dropdown: "var(--elevation-dropdown)",
    modal: "var(--elevation-modal)",
    tooltip: "var(--elevation-tooltip)",
    toast: "var(--elevation-toast)",
    overlay: "var(--elevation-overlay)",
  },
} as const

export type ElevationKey = keyof typeof elevation
