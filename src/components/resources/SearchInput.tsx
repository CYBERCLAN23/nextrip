"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MagnifyingGlass } from "@phosphor-icons/react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inputRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: inputRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, inputRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={inputRef} className="res-search">
      <MagnifyingGlass size={20} className="res-search-icon" />
      <input
        type="text"
        className="res-search-input"
        placeholder="Search resources..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search resources"
      />
      {value && (
        <button
          type="button"
          className="res-search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  )
}
