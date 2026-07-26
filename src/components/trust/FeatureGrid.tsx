import React from 'react'
import { FeatureCard } from './FeatureCard'

const features = [
  {
    id: 'trust-feat-1',
    icon: 'compass' as const,
    title: 'Expert Guidance',
    description: 'Personalized support from application to arrival.',
  },
  {
    id: 'trust-feat-2',
    icon: 'graduationCap' as const,
    title: 'Verified Universities',
    description: 'Work with trusted international institutions.',
  },
  {
    id: 'trust-feat-3',
    icon: 'identificationCard' as const,
    title: 'Visa Assistance',
    description: 'Professional help with documentation and visa preparation.',
  },
  {
    id: 'trust-feat-4',
    icon: 'shieldCheck' as const,
    title: 'End-to-End Support',
    description: 'Support before departure and after arrival.',
  },
]

export function FeatureGrid() {
  return (
    <div className="features-grid" data-features-grid="true">
      {features.map((feature) => (
        <div key={feature.id} className="features-grid-item">
          <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
        </div>
      ))}
    </div>
  )
}
