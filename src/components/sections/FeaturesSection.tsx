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
    icon: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=70',
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
    icon: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=70',
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
    icon: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=400&q=70',
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
      className="relative min-h-screen overflow-hidden bg-[#f4f4f4] px-4 py-20 font-almarai sm:py-28 md:px-6"
    >
      <div className="relative mx-auto max-w-[1400px]">
        <h2 className="mx-auto max-w-4xl text-center text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'The full route to your Chinese campus, in one place.',
                className: 'text-[#14100a]',
              },
              {
                text: 'Built for the journey. Powered by documentation.',
                className: 'text-[#5f594d]',
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
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70"
              alt="A student walking across a Chinese university campus"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100a]/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-base sm:text-lg" style={{ color: '#f4f4f4' }}>
              Your campus, live.
            </p>
          </motion.div>

          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              className="relative flex min-h-[380px] flex-col justify-between rounded-2xl border border-[#14100a]/10 bg-white p-6 lg:h-full"
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
                  className="mb-5 h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14"
                />
                <p className="mb-2 text-xs text-[#14100a]/40">{f.number}</p>
                <h3 className="mb-5 text-xl font-normal sm:text-2xl" style={{ color: '#14100a' }}>
                  {f.title}
                </h3>
                <ul className="space-y-3">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#c93a2e]" />
                      <span className="text-xs text-[#14100a]/70 sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={f.href}
                className="mt-8 inline-flex items-center gap-2 text-xs text-[#14100a]/70 transition-colors hover:text-[#c93a2e] sm:text-sm"
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
