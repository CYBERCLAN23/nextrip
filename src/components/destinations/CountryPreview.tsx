'use client'

import React, { memo } from 'react'
import type { CountryInfo } from './DestinationData'

interface CountryPreviewProps {
  country: CountryInfo | null
}

export const CountryPreview = memo(function CountryPreview({
  country,
}: CountryPreviewProps) {
  if (!country) {
    return (
      <div className="country-preview country-preview--empty" data-country-preview="empty">
        <div className="country-preview-placeholder">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="22" stroke="#DCE6F2" strokeWidth="2" />
            <circle cx="24" cy="24" r="8" fill="#DCE6F2" />
            <path
              d="M24 2L28 14L24 12L20 14Z"
              fill="#DCE6F2"
              transform="translate(0, 18)"
            />
          </svg>
          <p className="country-preview-placeholder-text">
            Select a destination to explore
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="country-preview country-preview--active"
      data-country-preview={country.id}
      key={country.id}
    >
      <div className="country-preview-image-wrap">
        <img
          src={country.image}
          alt={`Study in ${country.name}`}
          className="country-preview-image"
          loading="lazy"
        />
        <div className="country-preview-image-overlay" />
        <div className="country-preview-image-content">
          <div className="country-preview-flag-name">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="country-preview-flag"
              width="32"
              height="22"
            />
            <h3 className="country-preview-name">{country.name}</h3>
          </div>
        </div>
      </div>

      <div className="country-preview-body">
        <div className="country-preview-facts">
          {country.quickFacts.slice(0, 3).map((fact) => (
            <div key={fact} className="country-preview-fact">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="4" fill="#0A3D91" opacity="0.3" />
                <circle cx="6" cy="6" r="2" fill="#0A3D91" />
              </svg>
              <span>{fact}</span>
            </div>
          ))}
        </div>

        <div className="country-preview-grid">
          <div className="country-preview-grid-item">
            <span className="country-preview-grid-label">Key Cities</span>
            <span className="country-preview-grid-value">
              {country.popularCities.slice(0, 3).join(', ')}
            </span>
          </div>
          <div className="country-preview-grid-item">
            <span className="country-preview-grid-label">Visa Difficulty</span>
            <span className="country-preview-grid-value">
              {country.visaDifficulty}
            </span>
          </div>
          <div className="country-preview-grid-item">
            <span className="country-preview-grid-label">Language</span>
            <span className="country-preview-grid-value">{country.language}</span>
          </div>
          <div className="country-preview-grid-item">
            <span className="country-preview-grid-label">Avg. Living Cost</span>
            <span className="country-preview-grid-value">
              {country.avgLivingCost}
            </span>
          </div>
        </div>

        <div className="country-preview-universities">
          <span className="country-preview-grid-label">Top Universities</span>
          <div className="country-preview-uni-list">
            {country.topUniversities.map((uni) => (
              <span key={uni} className="country-preview-uni-tag">
                {uni}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})
