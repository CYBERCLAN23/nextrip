'use client'

import React, { memo } from 'react'
import type { CountryInfo } from './DestinationData'

interface CountryCardProps {
  country: CountryInfo
  isActive: boolean
  onSelect: (country: CountryInfo) => void
}

export const CountryCard = memo(function CountryCard({
  country,
  isActive,
  onSelect,
}: CountryCardProps) {
  return (
    <div
      className={`country-card ${isActive ? 'country-card--active' : ''}`}
      data-country-card={country.id}
      role="button"
      tabIndex={0}
      aria-label={`View programs in ${country.name}`}
      aria-pressed={isActive}
      onClick={() => onSelect(country)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(country)
        }
      }}
    >
      <div className="country-card-top">
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          className="country-flag"
          width="40"
          height="28"
          loading="lazy"
        />
        <h3 className="country-name">{country.name}</h3>
      </div>

      <p className="country-desc">{country.description}</p>

      <div className="country-meta">
        <div className="country-meta-item">
          <span className="country-meta-label">Universities</span>
          <span className="country-meta-value">{country.universities}+</span>
        </div>
        <div className="country-meta-item">
          <span className="country-meta-label">Avg. Tuition</span>
          <span className="country-meta-value">{country.avgTuition}</span>
        </div>
      </div>

      <div className="country-programs">
        {country.popularPrograms.slice(0, 3).map((prog) => (
          <span key={prog} className="country-program-tag">
            {prog}
          </span>
        ))}
      </div>

      <button
        className="country-cta"
        onClick={(e) => {
          e.stopPropagation()
          onSelect(country)
        }}
        aria-label={`View programs in ${country.name}`}
      >
        View Programs
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
})
