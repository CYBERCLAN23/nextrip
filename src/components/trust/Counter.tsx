'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function Counter({ target, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        setCount(Math.round(obj.val))
      },
    })
  }, [target, duration])

  return (
    <span ref={ref} data-counter="true">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
