"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import { Funnel, FunnelSimple } from "@phosphor-icons/react"
import { FAQItem } from "./FAQItem"
import { FAQSearch } from "./FAQSearch"
import { faqItems, faqCategories } from "./FAQData"

interface FAQAccordionProps {
  onOpenChange?: (isOpen: boolean) => void
}

export function FAQAccordion({ onOpenChange }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const noResultsRef = useRef<HTMLDivElement>(null)

  const filteredItems = useMemo(() => {
    let result = faqItems

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      )
    }

    return result
  }, [activeCategory, searchQuery])

  const handleToggle = useCallback(
    (id: string) => {
      const next = openId === id ? null : id
      setOpenId(next)
      onOpenChange?.(next !== null)
    },
    [openId, onOpenChange]
  )

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat)
    setOpenId(null)
  }, [])

  return (
    <div className="faq-accordion">
      <div className="faq-accordion-toolbar">
        <FAQSearch value={searchQuery} onChange={setSearchQuery} />
        <div className="faq-category-chips" role="tablist" aria-label="Filter by category">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`faq-chip ${
                activeCategory === cat.id ? "faq-chip--active" : ""
              }`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.id === "all" ? (
                <FunnelSimple size={16} weight="duotone" />
              ) : (
                <Funnel size={16} weight="duotone" />
              )}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="faq-accordion-list" role="tablist" aria-label="Frequently asked questions">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={handleToggle}
              index={index}
            />
          ))
        ) : (
          <div ref={noResultsRef} className="faq-no-results">
            <p>No questions match your search. Try a different keyword or browse all questions.</p>
          </div>
        )}
      </div>
    </div>
  )
}
