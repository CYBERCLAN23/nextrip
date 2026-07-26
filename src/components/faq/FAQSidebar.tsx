"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Globe,
  CheckCircle,
  ArrowRight,
  ChatDots,
  GraduationCap,
  Handshake,
} from "@phosphor-icons/react"

export function FAQSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const textEl = sidebarRef.current?.querySelector(".faq-sidebar-text")
      const helpEl = sidebarRef.current?.querySelector(".faq-sidebar-help")
      const trustItems = sidebarRef.current?.querySelectorAll(".faq-sidebar-trust-item")

      if (!textEl || !helpEl || !trustItems) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      tl.fromTo(globeRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" })
        .fromTo(textEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(helpEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .fromTo(ctaRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.15")
        .fromTo(trustItems, { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.2")
    }, sidebarRef)

    return () => ctx.revert()
  }, [])

  const handleCtaHover = (entering: boolean) => {
    gsap.to(ctaRef.current, {
      scale: entering ? 1.04 : 1,
      duration: 0.35,
      ease: "power2.out",
    })
  }

  const handleCtaClick = () => {
    gsap.timeline()
      .to(ctaRef.current, { scale: 0.95, duration: 0.1, ease: "power2.in" })
      .to(ctaRef.current, { scale: 1.04, duration: 0.2, ease: "power2.out" })
      .to(ctaRef.current, { scale: 1, duration: 0.15, ease: "power2.in" })
  }

  return (
    <div ref={sidebarRef} className="faq-sidebar">
      <div ref={globeRef} className="faq-sidebar-globe" aria-hidden="true">
        <div className="faq-sidebar-globe-ring" />
        <div className="faq-sidebar-globe-ring faq-sidebar-globe-ring--inner" />
        <Globe size={56} weight="duotone" className="faq-sidebar-globe-icon" />
      </div>

      <p className="faq-sidebar-text">
        Every student&apos;s journey is unique. Our experienced advisors take the
        time to understand your goals, preferences, and circumstances before
        recommending the best path forward.
      </p>

      <div className="faq-sidebar-help">
        <ChatDots size={20} weight="fill" />
        <span>Need more help?</span>
      </div>

      <button
        ref={ctaRef}
        type="button"
        className="faq-sidebar-cta"
        onMouseEnter={() => handleCtaHover(true)}
        onMouseLeave={() => handleCtaHover(false)}
        onClick={handleCtaClick}
      >
        Talk To An Advisor
        <ArrowRight size={18} weight="bold" />
      </button>

      <div className="faq-sidebar-trust">
        <div className="faq-sidebar-trust-item">
          <CheckCircle size={16} weight="fill" />
          <span>Free Consultation</span>
        </div>
        <div className="faq-sidebar-trust-item">
          <GraduationCap size={16} weight="fill" />
          <span>Expert Guidance</span>
        </div>
        <div className="faq-sidebar-trust-item">
          <Handshake size={16} weight="fill" />
          <span>Personalized Support</span>
        </div>
      </div>
    </div>
  )
}
