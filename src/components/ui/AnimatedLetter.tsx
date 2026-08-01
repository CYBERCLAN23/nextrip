'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

export function AnimatedLetter({ char, index, total, progress }: AnimatedLetterProps) {
  const p = index / total
  const opacity = useTransform(progress, [p - 0.1, p + 0.05], [0.2, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}
