export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    serif: ["Instrument Serif", "Georgia", "serif"],
    mono: ["SF Mono", "Monaco", "Consolas", "Courier New", "monospace"],
  },

  fontSize: {
    "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "400" }],
    "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "400" }],
    "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "400" }],
    "heading-xl": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
    "heading-lg": ["2rem", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "700" }],
    "heading-md": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
    "heading-sm": ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.005em", fontWeight: "600" }],
    "body-xl": ["1.25rem", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
    "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
    "body-md": ["1rem", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
    "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0em", fontWeight: "400" }],
    "body-xs": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0em", fontWeight: "400" }],
    caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
    overline: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "600" }],
    button: ["0.9375rem", { lineHeight: "1", letterSpacing: "0.01em", fontWeight: "600" }],
    "button-sm": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.01em", fontWeight: "600" }],
    "button-lg": ["1.0625rem", { lineHeight: "1", letterSpacing: "0.01em", fontWeight: "600" }],
    label: ["0.875rem", { lineHeight: "1.2", letterSpacing: "0em", fontWeight: "500" }],
    "label-sm": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0em", fontWeight: "500" }],
  },

  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  lineHeight: {
    none: "1",
    tight: "1.15",
    snug: "1.3",
    normal: "1.5",
    relaxed: "1.625",
    loose: "1.75",
    body: "1.6",
  },

  letterSpacing: {
    tighter: "-0.03em",
    tight: "-0.02em",
    normal: "0em",
    wide: "0.02em",
    wider: "0.05em",
    widest: "0.08em",
  },

  // ── Semantic Text Styles ──
  semantic: {
    display: {
      xl: "var(--typo-display-xl)",
      lg: "var(--typo-display-lg)",
      md: "var(--typo-display-md)",
    },
    heading: {
      xl: "var(--typo-heading-xl)",
      lg: "var(--typo-heading-lg)",
      md: "var(--typo-heading-md)",
      sm: "var(--typo-heading-sm)",
    },
    body: {
      xl: "var(--typo-body-xl)",
      lg: "var(--typo-body-lg)",
      md: "var(--typo-body-md)",
      sm: "var(--typo-body-sm)",
      xs: "var(--typo-body-xs)",
    },
    ui: {
      caption: "var(--typo-caption)",
      overline: "var(--typo-overline)",
      button: "var(--typo-button)",
      "button-sm": "var(--typo-button-sm)",
      "button-lg": "var(--typo-button-lg)",
      label: "var(--typo-label)",
      "label-sm": "var(--typo-label-sm)",
    },
  },
} as const

export type TypographyCategory = keyof typeof typography
export type FontSizeKey = keyof typeof typography.fontSize
export type FontWeight = keyof typeof typography.fontWeight
