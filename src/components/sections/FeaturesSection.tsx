'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { WordsPullUpMultiStyle } from '@/components/ui/WordsPullUp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FEATURES = [
  {
    number: '01',
    title: 'Scholarship Match.',
    href: '/scholarships',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: [
      'CSC full-ride and provincial grants',
      'Merit-based tuition waivers',
      'Need-blind shortlisting',
      'Award-to-deposit tracking',
    ],
  },
  {
    number: '02',
    title: 'Visa Track.',
    href: '/admissions',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: [
      'X1 / X2 document checklists',
      'Embassy-ready dossier',
      'Timeline alerts at every step',
    ],
  },
  {
    number: '03',
    title: 'Arrival Cover.',
    href: '/contact',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: [
      'Dormitory matching and airport pickup',
      'Local SIM and city orientation',
      '24/7 in-country support',
    ],
  },
]

export function FeaturesSection() {
  return (
    <section
      data-section
      data-section-label="03 — Features"
      className="relative min-h-screen overflow-hidden bg-black px-4 py-20 font-almarai sm:py-28 md:px-6"
    >
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-[1400px]">
        <h2 className="mx-auto max-w-4xl text-center text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'The full route to your Chinese campus, in one place.',
                className: 'text-primary',
              },
              {
                text: 'Built for the journey. Powered by documentation.',
                className: 'text-gray-500',
              },
            ]}
          />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
          <motion.div
            className="relative min-h-[300px] overflow-hidden rounded-2xl lg:h-full"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-base sm:text-lg" style={{ color: '#E1E0CC' }}>
              Your campus, live.
            </p>
          </motion.div>

          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              className="relative flex min-h-[380px] flex-col justify-between rounded-2xl bg-[#212121] p-6 lg:h-full"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: (i + 1) * 0.15, ease: EASE }}
            >
              <div>
                <img
                  src={f.icon}
                  alt=""
                  loading="lazy"
                  className="mb-5 h-10 w-10 rounded-lg sm:h-12 sm:w-12"
                />
                <p className="mb-2 text-xs text-primary/70">{f.number}</p>
                <h3 className="mb-5 text-xl font-normal sm:text-2xl" style={{ color: '#E1E0CC' }}>
                  {f.title}
                </h3>
                <ul className="space-y-3">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                      <span className="text-xs text-gray-400 sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={f.href}
                className="mt-8 inline-flex items-center gap-2 text-xs text-primary/80 transition-colors hover:text-primary sm:text-sm"
              >
                Learn more
                <ArrowRight size={14} className="-rotate-45" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
