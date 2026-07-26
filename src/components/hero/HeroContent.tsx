"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "../ui/CTAButton";

/**
 * Framer Motion token-aligned durations.
 * Pulled conceptually from --duration-luxury (700ms) and
 * --ease-expo-out for the spring-like feel.
 */
const EASE = [0.16, 1, 0.3, 1] as const; // matches --ease-expo-out
const STAGGER_DELAY = 0.12;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function HeroContent() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="hero-content"
      variants={prefersReduced ? undefined : containerVariants}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : "visible"}
    >
      {/* Headline */}
      <motion.h1
        className="hero-headline"
        variants={prefersReduced ? undefined : itemVariants}
        data-hero-heading="true"
      >
        Your Gateway
        <br />
        <span className="hero-headline-accent">To Global Education</span>
      </motion.h1>

      {/* Subcopy */}
      <motion.p
        className="hero-subcopy"
        variants={prefersReduced ? undefined : itemVariants}
        data-hero-description="true"
      >
        Discover world-class universities, scholarships, and opportunities
        worldwide with personalized guidance throughout your journey.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="hero-actions"
        variants={prefersReduced ? undefined : itemVariants}
        data-hero-buttons="true"
      >
        <CTAButton variant="primary" size="large" data-primary-cta="true">
          Start Your Journey
        </CTAButton>
        <CTAButton variant="secondary" size="large" data-secondary-cta="true">
          Explore Destinations
        </CTAButton>
      </motion.div>
    </motion.div>
  );
}

export { HeroContent };
