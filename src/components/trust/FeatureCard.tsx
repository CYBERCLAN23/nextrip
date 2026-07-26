'use client'

import React from 'react'
import {
  Compass,
  GraduationCap,
  IdentificationCard,
  ShieldCheck,
} from '@phosphor-icons/react'

const iconMap = {
  compass: Compass,
  graduationCap: GraduationCap,
  identificationCard: IdentificationCard,
  shieldCheck: ShieldCheck,
} as const

interface FeatureCardProps {
  icon: keyof typeof iconMap
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <div className="feature-card" data-feature-card="true">
      <div className="feature-icon-wrapper" data-feature-icon="true">
        <IconComponent size={28} color="#0A3D91" weight="bold" />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  )
}
