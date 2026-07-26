'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { UniversityCard } from './UniversityCard'
import { universities } from './UniversityData'

interface UniversityCarouselProps {
  onSelectUniversity: (id: string) => void
}

export function UniversityCarousel({ onSelectUniversity }: UniversityCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: false,
    breakpoints: {
      '(max-width: 767px)': { dragFree: true },
    },
  })

  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        emblaApi.scrollNext()
      }, 4000)
    }

    const stopAutoScroll = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
        scrollIntervalRef.current = null
      }
    }

    startAutoScroll()

    emblaApi.on('pointerDown', stopAutoScroll)
    emblaApi.on('pointerUp', startAutoScroll)
    emblaApi.on('settle', () => {
      if (!scrollIntervalRef.current) startAutoScroll()
    })

    return () => {
      stopAutoScroll()
    }
  }, [emblaApi])

  return (
    <div className="uni-carousel-wrapper">
      <div className="uni-carousel-viewport" ref={emblaRef}>
        <div className="uni-carousel-container">
          {universities.map((uni) => (
            <div key={uni.id} className="uni-carousel-slide">
              <UniversityCard
                university={uni}
                onSelect={onSelectUniversity}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="uni-carousel-controls">
        <button
          className="uni-carousel-btn"
          onClick={scrollPrev}
          aria-label="Previous universities"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12 4L6 10L12 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="uni-carousel-btn"
          onClick={scrollNext}
          aria-label="Next universities"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M8 4L14 10L8 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
