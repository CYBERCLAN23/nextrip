"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, MotionConfig } from "motion/react"
import { Menu, X } from "lucide-react"

const Logo = ({ className }: { className?: string }) => {
  const id = React.useId().replace(/:/g, "nxr")
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill={`url(#${id})`} />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9966" />
          <stop offset="1" stopColor="#FF5E62" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const NAV_ITEMS = ["Home", "Pricing", "Docs", "Projects"]

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setIsOpen((open) => !open)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus()
    else toggleRef.current?.focus()
  }, [isOpen])

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex justify-center w-full py-6 px-4">
        <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 w-full max-w-3xl relative z-10">
          <div className="flex items-center">
            <motion.div
              className="w-8 h-8 mr-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Logo className="w-8 h-8" />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href="#"
                  className="block py-1 text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
                >
                  {item}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Get Started
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            ref={toggleRef}
            type="button"
            className="md:hidden flex items-center p-2 -mr-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            onClick={toggleMenu}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="navbar-1-mobile-menu"
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-6 w-6 text-gray-900" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="navbar-1-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-0 bg-white z-50 px-6 pb-8 pt-[max(6rem,calc(env(safe-area-inset-top)+1.5rem))] md:hidden flex flex-col"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Logo className="w-8 h-8" />
                </motion.div>
                <motion.button
                  ref={closeBtnRef}
                  type="button"
                  className="p-2.5 -mr-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <X className="h-6 w-6 text-gray-900" aria-hidden="true" />
                </motion.button>
              </div>

              <nav aria-label="Mobile navigation links" className="flex flex-col space-y-7">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <a
                      href="#"
                      className="block py-1 text-2xl text-gray-900 font-medium rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
                      onClick={closeMenu}
                    >
                      {item}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-auto pt-10"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-full px-5 py-3.5 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  onClick={closeMenu}
                >
                  Get Started
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export { Navbar1 }
