"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { resourceCategories } from "./ResourcesData"
import type { ResourceCategory } from "./ResourcesData"

interface FilterChipsProps {
  activeCategory: ResourceCategory | null
  onCategoryChange: (category: ResourceCategory | null) => void
}

const categoryIcons: Record<ResourceCategory, string> = {
  Scholarships: "S",
  Visa: "V",
  Admissions: "A",
  Countries: "C",
  Universities: "U",
  Career: "G",
}

export function FilterChips({ activeCategory, onCategoryChange }: FilterChipsProps) {
  const chipsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const chips = chipsRef.current?.querySelectorAll(".res-chip")
      if (!chips || chips.length === 0) return

      gsap.fromTo(
        chips,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chipsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, chipsRef)

    return () => ctx.revert()
  }, [])

  const handleClick = useCallback(
    (category: ResourceCategory) => {
      onCategoryChange(activeCategory === category ? null : category)
    },
    [activeCategory, onCategoryChange]
  )

  return (
    <div ref={chipsRef} className="res-chips" role="group" aria-label="Filter by category">
      {resourceCategories.map((category) => (
        <button
          key={category}
          type="button"
          className={`res-chip ${activeCategory === category ? "res-chip--active" : ""}`}
          onClick={() => handleClick(category)}
          aria-pressed={activeCategory === category}
        >
          <span className="res-chip-icon" aria-hidden="true">
            {categoryIcons[category]}
          </span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  )
}
