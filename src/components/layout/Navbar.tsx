'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { animate } from 'animejs'
import { motion } from 'framer-motion'

const LINKS = [
  { id: '01', label: 'Universities', href: '/universities' },
  { id: '02', label: 'Scholarships', href: '/scholarships' },
  { id: '03', label: 'Admissions', href: '/admissions' },
  { id: '04', label: 'Contact', href: '/contact' },
]

const BRAND = 'NexTrip.'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)
  const caretRef = useRef<HTMLSpanElement>(null)
  const caretAnim = useRef<ReturnType<typeof animate> | null>(null)
  const lastY = useRef(0)

  // Lenis — smooth inertial scrolling
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y
      setScrolled(y > 24)
      if (y <= 24) {
        setVisible(true)
      } else if (delta > 2) {
        setVisible(false)
      } else if (delta < -2) {
        setVisible(true)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    gsap.set(headerRef.current, { yPercent: 0 })
  }, [])

  // GSAP slide + typewriter on reveal
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    if (visible) {
      gsap.to(el, { yPercent: 0, duration: 0.7, ease: 'expo.out', overwrite: 'auto' })

      const chars = brandRef.current
        ? Array.from(brandRef.current.querySelectorAll<HTMLElement>('[data-brand-char]'))
        : []
      gsap.set(chars, { opacity: 0 })
      const caret = caretRef.current
      if (caret) {
        gsap.set(caret, { opacity: 0 })
        caretAnim.current?.pause()
        caretAnim.current = animate(caret, {
          opacity: [0, 1, 0],
          duration: 900,
          loop: true,
          easing: 'easeInOutQuad',
        })
      }
      gsap.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.09,
        ease: 'none',
        onComplete: () => {
          caretAnim.current?.pause()
          if (caret) gsap.to(caret, { opacity: 0, duration: 0.35, ease: 'power2.out' })
        },
      })
    } else {
      gsap.to(el, { yPercent: -120, duration: 0.5, ease: 'expo.in', overwrite: 'auto' })
    }
  }, [visible])

  return (
    <header
      ref={headerRef}
      data-visible={visible ? 'true' : 'false'}
      className="fixed top-0 left-0 z-50 w-full border-b border-[#101010]/10 bg-[#f4f4f4] font-figtree text-[#101010] shadow-[0_1px_0_rgba(16,16,16,0.06)] will-change-transform"
    >
      <div
        className={`mx-auto max-w-[1340px] px-[15px] transition-[padding] duration-300 md-tablet:px-[18px] ${
          scrolled ? 'py-3.5' : 'py-6 md-tablet:py-7'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand — home (typewriter on reveal) */}
          <Link
            href="/"
            aria-label="NexTrip — home"
            className="nav-link-underline flex items-baseline gap-0 text-[15px] font-semibold uppercase tracking-[-0.14px]"
          >
            <span ref={brandRef} aria-hidden="true" className="inline-flex items-baseline">
              {BRAND.split('').map((ch, i) => (
                <span
                  key={i}
                  data-brand-char
                  className="inline-block opacity-0"
                  style={{ color: i === BRAND.length - 1 ? '#C0109E' : undefined }}
                >
                  {ch}
                </span>
              ))}
              <span
                ref={caretRef}
                aria-hidden="true"
                className="ml-[2px] inline-block w-[2px] translate-y-[2px] bg-[#C0109E]"
                style={{ height: '1em', opacity: 0 }}
              />
            </span>
          </Link>

          {/* Desktop / tablet links */}
          <nav aria-label="Primary" className="flex items-center gap-6 md-tablet:gap-4 mobile:hidden">
            {LINKS.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.id}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link-underline flex items-baseline gap-1.5 ${
                    active ? 'is-active text-[#C0109E]' : 'opacity-70 hover:opacity-100 transition-opacity'
                  }`}
                >
                  <span className="text-[8px] font-medium uppercase leading-3 tracking-[-0.08px] opacity-60">
                    {l.id} /
                  </span>
                  <span className="text-xs font-medium uppercase leading-4 tracking-[-0.12px]">
                    {l.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hidden cursor-pointer text-xs font-medium uppercase leading-4 tracking-[0.08em] mobile:block"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu — framer-motion expand/collapse */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="hidden overflow-hidden mobile:block"
      >
        <nav
          aria-label="Mobile"
          className="mx-[15px] mb-4 mt-1 overflow-hidden rounded-2xl border border-[#101010]/10 bg-white shadow-[0_32px_64px_rgba(16,16,16,0.16)]"
        >
          <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-5 px-6 pt-6 pb-6">
            {LINKS.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.id}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-baseline gap-3 text-[28px] font-medium uppercase leading-8 tracking-[-0.84px] ${
                    active ? 'text-[#C0109E]' : 'text-[#101010]'
                  }`}
                >
                  <span className="text-xs font-medium uppercase leading-4 tracking-[-0.12px] opacity-50">
                    {l.id} /
                  </span>
                  {l.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </motion.div>
    </header>
  )
}

export default Navbar
