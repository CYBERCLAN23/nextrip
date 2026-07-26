export const colors = {
  // ── Primitive / Raw Palette ──
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
  current: "currentColor",

  // ── Primary (#0A3D91) ──
  primary: {
    50: "#EFF4FF",
    100: "#D6E4FF",
    200: "#B3CEFF",
    300: "#80ADFF",
    400: "#4D87FF",
    500: "#2563EB",
    600: "#0A3D91",
    700: "#082F72",
    800: "#062254",
    900: "#041636",
  },

  // ── Secondary (#1D5FD1) ──
  secondary: {
    50: "#F0F5FF",
    100: "#D9E7FF",
    200: "#B3CEFF",
    300: "#80ADFF",
    400: "#4D87FF",
    500: "#1D5FD1",
    600: "#164AA8",
    700: "#103680",
    800: "#0A2358",
    900: "#051130",
  },

  // ── Deep Navy (#071A52) ──
  deep: {
    50: "#EDEFF9",
    100: "#C9D0EC",
    200: "#A5B0DF",
    300: "#7183C9",
    400: "#3D5AB3",
    500: "#071A52",
    600: "#061542",
    700: "#041033",
    800: "#030B24",
    900: "#010615",
  },

  // ── Cyan (#00D9FF) ──
  cyan: {
    50: "#E0FCFF",
    100: "#B3F5FF",
    200: "#80EEFF",
    300: "#4DE6FF",
    400: "#1ADFFF",
    500: "#00D9FF",
    600: "#00B3CC",
    700: "#008C99",
    800: "#006566",
    900: "#003F40",
  },

  // ── Accent Red (#D81F2A) ──
  accent: {
    50: "#FEF2F2",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#D81F2A",
    600: "#B81822",
    700: "#90121A",
    800: "#680C12",
    900: "#40060A",
  },

  // ── Success (Green) ──
  success: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532",
  },

  // ── Warning (Amber) ──
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  // ── Danger (Red) ──
  danger: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
  },

  // ── Info (Blue) ──
  info: {
    50: "#EBF8FF",
    100: "#BEE3F8",
    200: "#90CDF4",
    300: "#63B3ED",
    400: "#4299E1",
    500: "#3182CE",
    600: "#2B6CB0",
    700: "#2C5282",
    800: "#2A4365",
    900: "#1A365D",
  },

  // ── Neutral / Gray ──
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },

  // ── Semantic / Functional ──
  semantic: {
    // Background
    bg: {
      primary: "var(--color-bg-primary)",
      secondary: "var(--color-bg-secondary)",
      tertiary: "var(--color-bg-tertiary)",
      inverse: "var(--color-bg-inverse)",
      elevated: "var(--color-bg-elevated)",
      overlay: "var(--color-bg-overlay)",
      accent: "var(--color-bg-accent)",
    },
    // Text / Foreground
    text: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      tertiary: "var(--color-text-tertiary)",
      inverse: "var(--color-text-inverse)",
      link: "var(--color-text-link)",
      success: "var(--color-text-success)",
      warning: "var(--color-text-warning)",
      danger: "var(--color-text-danger)",
      disabled: "var(--color-text-disabled)",
    },
    // Border
    border: {
      default: "var(--color-border-default)",
      light: "var(--color-border-light)",
      medium: "var(--color-border-medium)",
      strong: "var(--color-border-strong)",
      focus: "var(--color-border-focus)",
      success: "var(--color-border-success)",
      warning: "var(--color-border-warning)",
      danger: "var(--color-border-danger)",
    },
    // Interactive states
    interactive: {
      hover: "var(--color-interactive-hover)",
      active: "var(--color-interactive-active)",
      disabled: "var(--color-interactive-disabled)",
      focus: "var(--color-interactive-focus)",
    },
    // Surface
    surface: {
      card: "var(--color-surface-card)",
      modal: "var(--color-surface-modal)",
      dropdown: "var(--color-surface-dropdown)",
      tooltip: "var(--color-surface-tooltip)",
      input: "var(--color-surface-input)",
      navbar: "var(--color-surface-navbar)",
      sidebar: "var(--color-surface-sidebar)",
    },
    // Charts
    chart: {
      1: "var(--color-chart-1)",
      2: "var(--color-chart-2)",
      3: "var(--color-chart-3)",
      4: "var(--color-chart-4)",
      5: "var(--color-chart-5)",
      6: "var(--color-chart-6)",
      7: "var(--color-chart-7)",
    },
  },
} as const

export type ColorScale = keyof typeof colors
export type SemanticColorCategory = keyof typeof colors.semantic
export type SemanticColorPath =
  | `${SemanticColorCategory}.${string}`
  | `primary.${keyof typeof colors.primary & string}`
  | `secondary.${keyof typeof colors.secondary & string}`
  | `neutral.${keyof typeof colors.neutral & string}`
  | `success.${keyof typeof colors.success & string}`
  | `warning.${keyof typeof colors.warning & string}`
  | `danger.${keyof typeof colors.danger & string}`
  | `info.${keyof typeof colors.info & string}`
  | `cyan.${keyof typeof colors.cyan & string}`
  | `deep.${keyof typeof colors.deep & string}`
  | `accent.${keyof typeof colors.accent & string}`
