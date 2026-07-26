"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MagnifyingGlass, X } from "@phosphor-icons/react"

interface FAQSearchProps {
  value: string
  onChange: (value: string) => void
}

export function FAQSearch({ value, onChange }: FAQSearchProps) {
  const inputRef = useRef<HTMLDivElement>(null)
  const inputElRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inputRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: inputRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }, inputRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={inputRef} className="faq-search">
      <MagnifyingGlass size={18} weight="regular" className="faq-search-icon" />
      <input
        ref={inputElRef}
        type="text"
        className="faq-search-input"
        placeholder="Search a question..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search frequently asked questions"
      />
      {value && (
        <button
          type="button"
          className="faq-search-clear"
          onClick={() => {
            onChange("")
            inputElRef.current?.focus()
          }}
          aria-label="Clear search"
        >
          <X size={16} weight="bold" />
        </button>
      )}
    </div>
  )
}
