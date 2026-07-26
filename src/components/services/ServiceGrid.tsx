'use client'

import React from 'react'
import { ServiceCard } from './ServiceCard'
import { services } from './ServiceData'

export function ServiceGrid() {
  return (
    <div className="service-grid" data-service-grid="true">
      {services.map((svc, index) => (
        <ServiceCard
          key={svc.id}
          icon={svc.icon}
          title={svc.title}
          description={svc.description}
          index={index}
        />
      ))}
    </div>
  )
}
