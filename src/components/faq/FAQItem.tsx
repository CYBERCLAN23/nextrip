"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Plus, Minus } from "@phosphor-icons/react"
import type { FAQItemData } from "./FAQData"

interface FAQItemProps {
  item: FAQItemData
  isOpen: boolean
  onToggle: (id: string) => void
  index: number
}

export function FAQItem({ item, isOpen, onToggle, index }: FAQItemProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.08 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [index])

  useEffect(() => {
    if (!contentRef.current || !answerRef.current || !cardRef.current) return

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(contentRef.current, { clearProps: "height" })
      },
    })

    if (isOpen) {
      gsap.set(contentRef.current, { height: "auto" })
      const h = contentRef.current.offsetHeight
      gsap.set(contentRef.current, { height: 0 })

      tl.to(contentRef.current, {
        height: h,
        duration: 0.4,
        ease: "power3.inOut",
      })
        .to(
          answerRef.current,
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.15"
        )
        .to(
          iconRef.current,
          { rotation: 45, duration: 0.35, ease: "back.out(1.7)" },
          "-=0.2"
        )
        .to(
          cardRef.current,
          {
            borderColor: "#1D5FD1",
            boxShadow:
              "0 20px 50px rgba(15,23,42,0.08), 0 0 0 1px rgba(29,95,209,0.12)",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        )
    } else {
      tl.to(contentRef.current, {
        height: 0,
        duration: 0.35,
        ease: "power3.inOut",
      })
        .to(
          answerRef.current,
          { opacity: 0, y: -8, duration: 0.2, ease: "power2.in" },
          0
        )
        .to(
          iconRef.current,
          { rotation: 0, duration: 0.3, ease: "power2.out" },
          "-=0.15"
        )
        .to(
          cardRef.current,
          {
            borderColor: "#E5E7EB",
            boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2"
        )
    }

    tl.play()
    timelineRef.current = tl

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isOpen])

  const handleToggle = useCallback(() => {
    onToggle(item.id)
  }, [onToggle, item.id])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleToggle()
      }
    },
    [handleToggle]
  )

  return (
    <div
      ref={cardRef}
      className="faq-card"
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${item.id}`}
      id={`faq-question-${item.id}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <div className="faq-card-header">
        <h3 className="faq-card-question">{item.question}</h3>
        <div ref={iconRef} className="faq-card-icon">
          {isOpen ? (
            <Minus size={20} weight="bold" />
          ) : (
            <Plus size={20} weight="bold" />
          )}
        </div>
      </div>
      <div
        ref={contentRef}
        className="faq-card-content"
        role="region"
        id={`faq-answer-${item.id}`}
        aria-labelledby={`faq-question-${item.id}`}
        style={{ height: 0, overflow: "hidden" }}
      >
        <div ref={answerRef} className="faq-card-answer">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  )
}
