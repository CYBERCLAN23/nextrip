"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function FAQHeader() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const label = headerRef.current?.querySelector(".faq-label")
      const headingLines = headerRef.current?.querySelectorAll(".faq-heading-line")
      const description = headerRef.current?.querySelector(".faq-description")

      if (!label || !headingLines || !description) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })

      tl.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
        .fromTo(headingLines, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.2")
        .fromTo(description, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={headerRef} className="faq-header">
      <span className="faq-label">FREQUENTLY ASKED QUESTIONS</span>
      <h2 className="faq-heading">
        <span className="faq-heading-line">Everything You</span>
        <span className="faq-heading-line">Need To Know</span>
      </h2>
      <p className="faq-description">
        Find answers to the most common questions about studying abroad with
        NexTrip, from admissions and scholarships to visas and travel
        preparation.
      </p>
    </div>
  )
}
