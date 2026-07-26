// Hero Animations
import { gsap } from 'gsap'

export const createHeroTimeline = () => {
  return gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power3.out',
    },
  })
}

export const animateHeroElements = () => {
  const elements = {
    background: '.hero-bg',
    globe: '.hero-globe',
    heading: '.hero-heading',
    description: '.hero-description',
    primaryCta: '.hero-primary-cta',
    secondaryCta: '.hero-secondary-cta',
    stats: '.hero-stats',
  }

  const timeline = createHeroTimeline()
  
  timeline
    .fromTo(
      elements.background,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' },
      0
    )
    .fromTo(
      elements.globe,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 },
      0.3
    )
    .fromTo(
      elements.heading,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      0.7
    )
    .fromTo(
      elements.description,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.9
    )
    .fromTo(
      elements.primaryCta,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      1.2
    )
    .fromTo(
      elements.secondaryCta,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      1.3
    )
    .fromTo(
      elements.stats,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.5
    )

  return timeline
}

export const animateStatsCard = () => {
  const tl = gsap.timeline()
  
  tl.fromTo(
    '.stat-card',
    { scale: 0.8, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)' },
    0
  )
  
  return tl
}

export const animateGlobe = () => {
  const tl = gsap.timeline({ repeat: -1 })
  
  tl.to('.hero-globe', {
    rotationY: '+=' + Math.PI * 2,
    duration: 120,
    ease: 'none',
  })
  
  return tl
}