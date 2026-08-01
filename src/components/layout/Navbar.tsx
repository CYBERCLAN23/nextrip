'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { id: '01', label: 'Universities', href: '/universities' },
  { id: '02', label: 'Scholarships', href: '/scholarships' },
  { id: '03', label: 'Admissions', href: '/admissions' },
  { id: '04', label: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full font-figtree text-[#f4f4f4] transition-[padding,background-color,box-shadow,border-color] duration-500 ease-spring ${
        scrolled
          ? 'border-b border-white/10 bg-[#0a0f20]/80 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        className={`mx-auto max-w-[1340px] px-[15px] transition-[padding] duration-500 ease-spring md-tablet:px-[18px] ${
          scrolled ? 'py-4 md-tablet:py-4' : 'py-9 md-tablet:py-[30px]'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand — home */}
          <Link
            href="/"
            aria-label="NexTrip — home"
            className="nav-link-underline flex items-baseline gap-1.5 text-sm font-semibold uppercase leading-4 tracking-[-0.14px]"
          >
            NexTrip<span className="text-[#F598F2]">.</span>
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
                    active ? 'is-active' : 'opacity-80 hover:opacity-100 transition-opacity'
                  }`}
                >
                  <span className="text-[8px] font-medium uppercase leading-3 tracking-[-0.08px] opacity-70">
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

      {/* Mobile CSS-grid menu — floating panel detached from the hero */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-[420ms] ease-spring mobile:grid hidden ${
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            aria-label="Mobile"
            className="mx-[15px] mt-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#151f42]/95 to-[#090e1e]/95 shadow-[0_32px_64px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-6 px-6 pt-7 pb-6">
              {LINKS.map((l) => {
                const active = pathname === l.href
                return (
                  <Link
                    key={l.id}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-baseline gap-3 text-[28px] font-medium uppercase leading-8 tracking-[-0.84px] ${
                      active ? 'text-[#F598F2]' : 'text-[#f4f4f4]'
                    }`}
                  >
                    <span className="text-xs font-medium uppercase leading-4 tracking-[-0.12px] opacity-70">
                      {l.id} /
                    </span>
                    {l.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
