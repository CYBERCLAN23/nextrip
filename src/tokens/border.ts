export const border = {
  width: {
    none: "0px",
    hairline: "0.5px",
    thin: "1px",
    normal: "1.5px",
    medium: "2px",
    thick: "3px",
    heavy: "4px",
  },

  style: {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    none: "none",
  },

  // ── Semantic ──
  semantic: {
    default: "var(--border-default)",
    light: "var(--border-light)",
    medium: "var(--border-medium)",
    strong: "var(--border-strong)",
    focus: "var(--border-focus)",
    input: "var(--border-input)",
    divider: "var(--border-divider)",
  },
} as const

export type BorderKey = keyof typeof border
export type BorderWidthKey = keyof typeof border.width
