import React from 'react'

const routes: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [
  { from: { x: 230, y: 170 }, to: { x: 470, y: 82 } },
  { from: { x: 230, y: 170 }, to: { x: 720, y: 175 } },
  { from: { x: 180, y: 78 }, to: { x: 470, y: 82 } },
  { from: { x: 470, y: 82 }, to: { x: 510, y: 105 } },
  { from: { x: 485, y: 125 }, to: { x: 720, y: 175 } },
  { from: { x: 510, y: 105 }, to: { x: 720, y: 175 } },
]

function routePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  offset = 80
) {
  const cx = (from.x + to.x) / 2
  const cy = (from.y + to.y) / 2 - offset
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

export function FlightRoutes() {
  return (
    <svg
      className="flight-routes-svg"
      viewBox="0 0 1000 600"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A3D91" stopOpacity="0.06" />
          <stop offset="50%" stopColor="#1D5FD1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.06" />
        </linearGradient>
        {routes.map((_, i) => (
          <linearGradient key={`rg-${i}`} id={`rg-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A3D91" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#1D5FD1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.25" />
          </linearGradient>
        ))}
      </defs>

      {routes.map((route, i) => (
        <path
          key={`route-${i}`}
          d={routePath(route.from, route.to)}
          stroke={`url(#rg-${i})`}
          strokeWidth="1.5"
          fill="none"
          className="flight-route"
          strokeDasharray="4 6"
          data-flight-route={`${i}`}
        />
      ))}
    </svg>
  )
}
