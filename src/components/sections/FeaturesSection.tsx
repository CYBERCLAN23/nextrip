'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, GraduationCap, Plane, Stamp } from 'lucide-react'
import { WordsPullUpMultiStyle } from '@/components/ui/WordsPullUp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FEATURES = [
  {
    number: '01',
    title: 'Scholarship Match.',
    href: '/scholarships',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=70',
    icon: GraduationCap,
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
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70',
    icon: Stamp,
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
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70',
    icon: Plane,
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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#f4f4f4] py-10 font-sans"
    >
      <div
        aria-hidden
        className="supergraphic pointer-events-none absolute -right-8 top-6 select-none text-[12rem] text-[#14100a]/[0.04]"
      >
        学
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="ledger-label mb-2 text-nx-coral">The route, in one file</p>
          <h2 className="font-display text-3xl leading-[1.12] text-[#14100a] md:text-4xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'The full infrastructure behind every', className: '' },
                { text: 'admission letter.', className: 'text-nx-coral' },
              ]}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:h-[480px]">
          <motion.div
            className="doc-frame relative min-h-[260px] overflow-hidden rounded-2xl lg:h-full"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70"
              alt="A student walking across a Chinese university campus"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100a]/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 flex items-center gap-2 font-display text-base text-[#f4f4f4] sm:text-lg">
              <BadgeCheck size={18} className="text-nx-coral" />
              Your campus, live.
            </p>
          </motion.div>

          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              className="doc-frame group relative flex min-h-[380px] flex-col justify-between rounded-2xl p-5 lg:h-full"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: (i + 1) * 0.15, ease: EASE }}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#14100a]/[0.06] text-nx-coral">
                    <f.icon size={18} />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#14100a]/40">
                    {f.number} / 03
                  </span>
                </div>

                <div className="relative mb-4 h-24 overflow-hidden rounded-xl">
                  <img
                    src={f.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100a]/30 to-transparent" />
                </div>

                <h3 className="mb-4 font-display text-lg leading-snug text-[#14100a]">
                  {f.title}
                </h3>

                <ul className="space-y-2.5">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <BadgeCheck size={15} className="mt-0.5 shrink-0 text-nx-coral" />
                      <span className="text-xs text-[#14100a]/70 sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={f.href}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#14100a] transition-colors group-hover:text-nx-coral sm:text-sm"
              >
                Learn more
                <ArrowRight size={14} className="-rotate-45 transition-transform duration-300 group-hover:-rotate-0" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 ledger-label text-[#5f594d]">
          REC. 03 · THE ROUTE · SCHOLARSHIPS · VISA · ARRIVAL
        </p>
      </div>
    </section>
  )
}
