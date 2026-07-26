import type { colors } from "@/tokens/colors"
import type { spacing } from "@/tokens/spacing"
import type { typography } from "@/tokens/typography"
import type { radius } from "@/tokens/radius"
import type { shadows } from "@/tokens/shadow"
import type { motion } from "@/tokens/motion"
import type { zIndex } from "@/tokens/zIndex"
import type { breakpoints, mediaQueries } from "@/tokens/breakpoints"
import type { opacity } from "@/tokens/opacity"
import type { blur } from "@/tokens/blur"
import type { border } from "@/tokens/border"
import type { elevation } from "@/tokens/elevation"

export interface DesignTokens {
  colors: typeof colors
  spacing: typeof spacing
  typography: typeof typography
  radius: typeof radius
  shadows: typeof shadows
  motion: typeof motion
  zIndex: typeof zIndex
  breakpoints: typeof breakpoints
  mediaQueries: typeof mediaQueries
  opacity: typeof opacity
  blur: typeof blur
  border: typeof border
  elevation: typeof elevation
}

export interface Theme {
  name: "light" | "dark" | "custom"
  tokens: DesignTokens
}

export type ThemeMode = "light" | "dark" | "system"

export type CSSVariableValue = string | number

export type CSSVariableMap = Record<string, CSSVariableValue>

export interface TokenCategory<T> {
  primitive: T
  semantic: Record<string, string>
}

export type ResponsiveValue<T> = T | Partial<Record<keyof typeof breakpoints, T>>
