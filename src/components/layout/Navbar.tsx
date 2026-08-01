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
  const [time, setTime] = useState('--:--:--')
  const pathname = usePathname()

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Shanghai',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="absolute top-0 left-0 z-10 w-full font-figtree text-[#f4f4f4]">
      <div className="mx-auto max-w-[1340px] px-[15px] py-9 md-tablet:px-[18px] md-tablet:py-[30px]">
        <div className="flex items-center justify-between gap-4">
          {/* Desktop / tablet links */}
          <nav aria-label="Primary" className="hidden items-center gap-6 md-tablet:gap-4 mobile:hidden">
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

          {/* Right — email + live clock + mobile toggle */}
          <div className="flex items-center gap-4 md-tablet:gap-4">
            <a
              href="mailto:contact@nextrip-global.com"
              className="nav-link-underline hidden text-xs font-medium uppercase leading-4 tracking-[-0.12px] mobile:hidden"
            >
              contact@nextrip-global.com
            </a>

            <span className="flex items-baseline gap-1.5 tabular-nums text-xs font-medium uppercase leading-4 tracking-[-0.12px]">
              <span className="opacity-70">PEK</span>
              <span aria-label="Beijing time">{time}</span>
            </span>

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

        {/* Mobile CSS-grid menu */}
        <div
          className={`grid transition-[grid-template-rows] duration-[420ms] ease-spring mobile:grid hidden ${
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav aria-label="Mobile" className="flex flex-col gap-6 pt-7 pb-5">
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
              <a
                href="mailto:contact@nextrip-global.com"
                className="pt-3 text-xs font-medium uppercase leading-4 tracking-[-0.12px] opacity-70"
              >
                contact@nextrip-global.com
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
