'use client'

import React, { useState } from 'react'

interface FilterBarProps {
  filters: Record<string, { label: string; options: string[] }>
  activeFilters: Record<string, string | null>
  onFilterChange: (group: string, value: string | null) => void
}

export function FilterBar({ filters, activeFilters, onFilterChange }: FilterBarProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  return (
    <div className="uni-filter-bar">
      {Object.entries(filters).map(([key, group]) => (
        <div key={key} className="uni-filter-group">
          <button
            className={`uni-filter-trigger ${activeFilters[key] ? 'uni-filter-active' : ''}`}
            onClick={() => setOpenGroup(openGroup === key ? null : key)}
            aria-expanded={openGroup === key}
            aria-haspopup="listbox"
          >
            <span>{activeFilters[key] || group.label}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              style={{ transform: openGroup === key ? 'rotate(180deg)' : 'none' }}
            >
              <path
                d="M3 5L6 8L9 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {openGroup === key && (
            <div className="uni-filter-dropdown" role="listbox">
              <button
                className="uni-filter-option"
                onClick={() => { onFilterChange(key, null); setOpenGroup(null) }}
                role="option"
                aria-selected={activeFilters[key] === null}
              >
                All {group.label}
              </button>
              {group.options.map((opt) => (
                <button
                  key={opt}
                  className={`uni-filter-option ${activeFilters[key] === opt ? 'uni-filter-option-selected' : ''}`}
                  onClick={() => { onFilterChange(key, opt); setOpenGroup(null) }}
                  role="option"
                  aria-selected={activeFilters[key] === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
