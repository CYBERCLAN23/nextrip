"use client";

import { motion, useReducedMotion } from "framer-motion";

const STATS = [
  { value: "500+", label: "Students Guided", id: "stat-students" },
  { value: "30+", label: "Partner Universities", id: "stat-universities" },
  { value: "15+", label: "Countries", id: "stat-countries" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8, // stats appear after headline cascade
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function HeroStats() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="hero-stats-row" data-hero-stats="true">
      <motion.div
        className="hero-stats-grid"
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? undefined : "hidden"}
        animate={prefersReduced ? undefined : "visible"}
      >
        {STATS.map((stat) => (
          <motion.article
            key={stat.id}
            className="hero-stat-card"
            variants={prefersReduced ? undefined : cardVariants}
            data-stat-card="true"
          >
            <div className="hero-stat-value" data-stat-value="true">
              {stat.value}
            </div>
            <div className="hero-stat-label" data-stat-label="true">
              {stat.label}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}

export { HeroStats };
