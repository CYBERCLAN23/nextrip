"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  X,
  MapPin,
  GraduationCap,
  CalendarBlank,
  Clock,
  CheckCircle,
  Globe,
  Rocket,
  Airplane,
  House,
  Heart,
  Compass,
  ArrowUpRight,
} from "@phosphor-icons/react"
import type { TestimonialStory } from "./TestimonialsData"

interface StoryModalProps {
  story: TestimonialStory | null
  onClose: () => void
}

export function StoryModal({ story, onClose }: StoryModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const prevActiveRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!story) return

    prevActiveRef.current = document.activeElement as HTMLElement

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      )
    })

    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      ctx.revert()
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
      prevActiveRef.current?.focus()
    }
  }, [story, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  if (!story) return null

  return (
    <div
      ref={backdropRef}
      className="test-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Full story of ${story.name}`}
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className="test-modal">
        <button
          type="button"
          className="test-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} weight="bold" />
        </button>

        <div className="test-modal-hero">
          <div
            className="test-modal-hero-bg"
            style={{ background: story.portraitGradient }}
            aria-hidden="true"
          >
            <span className="test-modal-hero-initials">{story.initials}</span>
          </div>
          <div className="test-modal-hero-overlay" />
          <div className="test-modal-hero-content">
            <div className="test-modal-hero-badge">
              <CheckCircle weight="fill" size={12} />
              <span>Verified Student</span>
            </div>
            <h2 className="test-modal-hero-name">{story.name}</h2>
            <p className="test-modal-hero-subtitle">
              {story.degree} &mdash; {story.university}
            </p>
            <div className="test-modal-hero-stats">
              <div className="test-modal-hero-stat">
                <MapPin size={14} weight="fill" />
                <span>{story.country}</span>
              </div>
              <div className="test-modal-hero-stat">
                <GraduationCap size={14} weight="fill" />
                <span>{story.program}</span>
              </div>
              <div className="test-modal-hero-stat">
                <CalendarBlank size={14} weight="fill" />
                <span>Enrolled {story.enrollmentYear}</span>
              </div>
              <div className="test-modal-hero-stat">
                <Clock size={14} weight="fill" />
                <span>{story.programDuration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="test-modal-body">
          <div className="test-modal-section">
            <div className="test-modal-section-header">
              <Globe size={18} weight="fill" />
              <h3 className="test-modal-section-title">Before NexTrip</h3>
            </div>
            <p className="test-modal-text">{story.beforeNexTrip}</p>
          </div>

          <div className="test-modal-section">
            <div className="test-modal-section-header">
              <Heart size={18} weight="fill" />
              <h3 className="test-modal-section-title">Challenges</h3>
            </div>
            <p className="test-modal-text">{story.challenges}</p>
          </div>

          <div className="test-modal-section">
            <div className="test-modal-section-header">
              <Rocket size={18} weight="fill" />
              <h3 className="test-modal-section-title">Application Journey</h3>
            </div>
            <p className="test-modal-text">{story.applicationJourney}</p>
          </div>

          <div className="test-modal-section">
            <div className="test-modal-section-header">
              <Airplane size={18} weight="fill" />
              <h3 className="test-modal-section-title">Visa Experience</h3>
            </div>
            <p className="test-modal-text">{story.visaExperience}</p>
          </div>

          <div className="test-modal-section">
            <div className="test-modal-section-header">
              <House size={18} weight="fill" />
              <h3 className="test-modal-section-title">Arrival Experience</h3>
            </div>
            <p className="test-modal-text">{story.arrivalExperience}</p>
          </div>

          <div className="test-modal-section">
            <div className="test-modal-section-header">
              <Compass size={18} weight="fill" />
              <h3 className="test-modal-section-title">Current Life</h3>
            </div>
            <p className="test-modal-text">{story.currentLife}</p>
          </div>

          <div className="test-modal-section test-modal-section--highlight">
            <div className="test-modal-section-header">
              <ArrowUpRight size={18} weight="fill" />
              <h3 className="test-modal-section-title">Career Aspirations</h3>
            </div>
            <p className="test-modal-text">{story.careerAspirations}</p>
          </div>

          <div className="test-modal-footer">
            <div className="test-modal-footer-item">
              <span className="test-modal-footer-label">University</span>
              <span className="test-modal-footer-value">{story.university}</span>
            </div>
            <div className="test-modal-footer-item">
              <span className="test-modal-footer-label">Program</span>
              <span className="test-modal-footer-value">{story.program}</span>
            </div>
            <div className="test-modal-footer-item">
              <span className="test-modal-footer-label">Status</span>
              <span className="test-modal-footer-value">{story.graduateStatus}</span>
            </div>
            <div className="test-modal-footer-item">
              <span className="test-modal-footer-label">Achievement</span>
              <span className="test-modal-footer-value">{story.successMetric}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
