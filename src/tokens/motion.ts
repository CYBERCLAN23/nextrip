export const motion = {
  // ── Durations ──
  duration: {
    instant: "0ms",
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    luxury: "700ms",
    deliberate: "1000ms",

    // Semantic
    "enter-fast": "var(--motion-enter-fast)",
    enter: "var(--motion-enter)",
    "exit-fast": "var(--motion-exit-fast)",
    exit: "var(--motion-exit)",
    expand: "var(--motion-expand)",
    collapse: "var(--motion-collapse)",
    spring: "var(--motion-spring)",
  },

  // ── Easing Curves ──
  easing: {
    linear: "linear",
    "in-quad": "cubic-bezier(0.11, 0, 0.5, 0)",
    "in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
    "in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
    "in-quint": "cubic-bezier(0.64, 0, 0.78, 0)",
    "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
    "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
    "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
    "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
    "in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
    "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
    "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
    "in-out-quint": "cubic-bezier(0.87, 0, 0.13, 1)",
    "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
    "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
    "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
    "spring-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",

    // Semantic
    "enter": "var(--motion-easing-enter)",
    exit: "var(--motion-easing-exit)",
    emphasize: "var(--motion-easing-emphasize)",
    "emphasize-decelerate": "var(--motion-easing-emphasize-decelerate)",
    "emphasize-accelerate": "var(--motion-easing-emphasize-accelerate)",
    spring: "var(--motion-easing-spring)",
  },

  // ── Scale ──
  scale: {
    "enter-sm": "var(--motion-scale-enter-sm)",
    "enter-md": "var(--motion-scale-enter-md)",
    "exit-sm": "var(--motion-scale-exit-sm)",
    "exit-md": "var(--motion-scale-exit-md)",
  },

  // ── Translate ──
  translate: {
    "enter-up": "var(--motion-translate-enter-up)",
    "enter-down": "var(--motion-translate-enter-down)",
    "exit-up": "var(--motion-translate-exit-up)",
    "exit-down": "var(--motion-translate-exit-down)",
  },

  // ── Blur (used in transitions) ──
  blur: {
    enter: "var(--motion-blur-enter)",
    exit: "var(--motion-blur-exit)",
  },
} as const

export type MotionKey = keyof typeof motion
export type EasingKey = keyof typeof motion.easing
export type DurationKey = keyof typeof motion.duration
