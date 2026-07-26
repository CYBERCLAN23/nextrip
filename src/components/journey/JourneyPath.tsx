'use client'

import React, { forwardRef } from 'react'
import { VIEWBOX, buildPathD, getStepX, getStepY } from './JourneyStep'

interface JourneyPathProps {
  activeIndex?: number
}

export const JourneyPath = forwardRef<SVGPathElement, JourneyPathProps>(
  function JourneyPath({ activeIndex = 0 }, ref) {
    const d = buildPathD()

    return (
      <svg
        className="journey-svg"
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="journey-gradient-glow"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#1D5FD1" />
            <stop offset="100%" stopColor="#0A3D91" />
          </linearGradient>
          
          <filter id="journey-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background path track */}
        <path
          d={d}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active animated stroke path */}
        <path
          ref={ref}
          d={d}
          fill="none"
          stroke="url(#journey-gradient-glow)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#journey-neon-glow)"
        />

        {/* Dynamic Waypoint Milestone Nodes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const cx = getStepX(i)
          const cy = getStepY(i)
          const isPassed = i <= activeIndex

          return (
            <g key={i} className={`journey-milestone ${isPassed ? 'journey-milestone--active' : ''}`}>
              {/* Outer pulsing aura */}
              <circle
                cx={cx}
                cy={cy}
                r={isPassed ? "22" : "16"}
                className="journey-dot-outer"
              />
              {/* Ring */}
              <circle
                cx={cx}
                cy={cy}
                r="12"
                className="journey-dot-ring"
              />
              {/* Core center dot */}
              <circle
                cx={cx}
                cy={cy}
                r="6"
                className="journey-dot-core"
              />
            </g>
          )
        })}
      </svg>
    )
  }
)
