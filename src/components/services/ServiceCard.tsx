'use client'

import React, { memo } from 'react'
import {
  GraduationCap,
  CurrencyCircleDollar,
  IdentificationCard,
  House,
  AirplaneTakeoff,
  Briefcase,
} from '@phosphor-icons/react'
import type { ServiceIconName } from './ServiceData'

const iconMap = {
  graduationCap: GraduationCap,
  currencyCircleDollar: CurrencyCircleDollar,
  identificationCard: IdentificationCard,
  house: House,
  airplaneTakeoff: AirplaneTakeoff,
  briefcase: Briefcase,
} as const

interface ServiceCardProps {
  icon: ServiceIconName
  title: string
  description: string
  index: number
}

export const ServiceCard = memo(function ServiceCard({
  icon,
  title,
  description,
  index,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon]
  const animationDelay = `${0.12 * index}s`

  return (
    <div
      className="service-card"
      data-service-card={icon}
      style={{ animationDelay }}
    >
      <div className="service-icon-wrap">
        <IconComponent size={28} weight="bold" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <span className="service-link">
        Learn More
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 3.5L9 7L5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
})
