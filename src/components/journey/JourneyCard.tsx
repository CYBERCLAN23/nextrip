'use client'

import React, { memo } from 'react'
import {
  MagnifyingGlass,
  ChatCircle,
  FileText,
  IdentificationCard,
  AirplaneTakeoff,
  GraduationCap,
  CheckCircle,
  Clock,
  ArrowRight,
} from '@phosphor-icons/react'
import type { JourneyStepItem } from './JourneyStep'

const iconMap = {
  magnifyingGlass: MagnifyingGlass,
  chatCircle: ChatCircle,
  fileText: FileText,
  identificationCard: IdentificationCard,
  airplaneTakeoff: AirplaneTakeoff,
  graduationCap: GraduationCap,
} as const

interface JourneyCardProps {
  step: JourneyStepItem
  index: number
  isActive: boolean
  onClick?: () => void
}

export const JourneyCard = memo(function JourneyCard({
  step,
  index,
  isActive,
  onClick,
}: JourneyCardProps) {
  const IconComponent = iconMap[step.icon]

  return (
    <div
      className={`journey-card ${isActive ? 'journey-card--active' : ''}`}
      data-journey-card={index}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      {/* Ambient Glow Background Accent */}
      <div className="journey-card__glow-bg" />

      {/* Top Header Bar */}
      <div className="journey-card__header">
        <div className="journey-card__step-meta">
          <span className="journey-card__badge">{step.tag}</span>
          <span className="journey-card__duration">
            <Clock size={14} weight="bold" />
            {step.duration}
          </span>
        </div>
        <span className="journey-card__number" aria-hidden="true">
          {step.number}
        </span>
      </div>

      {/* Title & Icon Row */}
      <div className="journey-card__title-row">
        <div className="journey-card__icon-wrap">
          <IconComponent size={24} weight="bold" />
        </div>
        <div>
          <span className="journey-card__subtitle">{step.subtitle}</span>
          <h3 className="journey-card__title">{step.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="journey-card__description">{step.description}</p>

      {/* Key Deliverables Pills */}
      <div className="journey-card__deliverables">
        <span className="journey-card__deliverables-label">Key Milestones:</span>
        <ul className="journey-card__deliverables-list">
          {step.deliverables.map((item, dIdx) => (
            <li key={dIdx} className="journey-card__deliverable-item">
              <CheckCircle size={14} weight="fill" className="journey-card__check-icon" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div className="journey-card__footer">
        <span className="journey-card__action">
          Explore Phase
          <ArrowRight size={16} weight="bold" className="journey-card__arrow" />
        </span>
      </div>
    </div>
  )
})
