'use client'

import React from 'react'
import { StatisticCard } from './StatisticCard'

const stats = [
  { id: 'trust-stat-1', value: 500, suffix: '+', label: 'Students Guided' },
  { id: 'trust-stat-2', value: 30, suffix: '+', label: 'Partner Universities' },
  { id: 'trust-stat-3', value: 15, suffix: '+', label: 'Countries' },
  { id: 'trust-stat-4', value: 98, suffix: '%', label: 'Success Rate' },
]

export function StatisticsGrid() {
  return (
    <div className="stats-grid" data-stats-grid="true">
      {stats.map((stat) => (
        <div key={stat.id} className="stats-grid-item">
          <StatisticCard value={stat.value} suffix={stat.suffix} label={stat.label} />
        </div>
      ))}
    </div>
  )
}
