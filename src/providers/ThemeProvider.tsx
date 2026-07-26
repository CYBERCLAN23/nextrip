"use client"

if (typeof window === "undefined") {
  const mockStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
  if (typeof globalThis !== "undefined") {
    if (!globalThis.localStorage || typeof globalThis.localStorage.getItem !== "function") {
      Object.defineProperty(globalThis, "localStorage", {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    }
    if (!globalThis.sessionStorage || typeof globalThis.sessionStorage.getItem !== "function") {
      Object.defineProperty(globalThis, "sessionStorage", {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    }
  }
}

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { ThemeMode } from "@/types/design-tokens"

interface ThemeContextValue {
  mode: ThemeMode
  resolved: "light" | "dark"
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getStoredMode(): ThemeMode {
  if (
    typeof window === "undefined" ||
    typeof localStorage === "undefined" ||
    typeof localStorage.getItem !== "function"
  ) {
    return "system"
  }
  try {
    return (localStorage.getItem("ds-theme") as ThemeMode) ?? "system"
  } catch {
    return "system"
  }
}

function resolveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode === "system") return getSystemTheme()
  return mode as "light" | "dark"
}

export function ThemeProvider({
  children,
  defaultMode = "system",
  attribute = "class",
  enableSystem = true,
}: {
  children: React.ReactNode
  defaultMode?: ThemeMode
  attribute?: "class" | "data-theme"
  enableSystem?: boolean
}) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode)
  const [resolved, setResolved] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback(
    (newResolved: "light" | "dark") => {
      setResolved(newResolved)
      const root = document.documentElement

      if (attribute === "class") {
        root.classList.remove("light", "dark")
        root.classList.add(newResolved)
      } else {
        root.setAttribute("data-theme", newResolved)
      }
    },
    [attribute]
  )

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      const effective = resolveTheme(newMode)
      setModeState(newMode)
      applyTheme(effective)
      try {
        if (typeof localStorage !== "undefined" && typeof localStorage.setItem === "function") {
          localStorage.setItem("ds-theme", newMode)
        }
      } catch {
        // Node.js 22+ localStorage ignore
      }
    },
    [applyTheme]
  )

  const toggle = useCallback(() => {
    setMode(resolved === "light" ? "dark" : "light")
  }, [resolved, setMode])

  useEffect(() => {
    setMounted(true)
    const stored = getStoredMode()
    const initial = resolveTheme(stored)
    setModeState(stored)
    applyTheme(initial)

    if (!enableSystem) return

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (getStoredMode() === "system") {
        applyTheme(getSystemTheme())
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [applyTheme, enableSystem])

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ mode, resolved, setMode, toggle }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
