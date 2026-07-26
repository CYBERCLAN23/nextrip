'use client'

import React from 'react'
import { Counter } from './Counter'

interface StatisticCardProps {
  value: number
  suffix: string
  label: string
}

export function StatisticCard({ value, suffix, label }: StatisticCardProps) {
  return (
    <div className="stat-card" data-stat-card="true">
      <div className="stat-value" data-stat-value="true">
        <Counter target={value} suffix={suffix} duration={2} />
      </div>
      <div className="stat-label" data-stat-label="true">{label}</div>
    </div>
  )
}
