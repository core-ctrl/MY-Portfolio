'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData } from '@/lib/data'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Videos', href: '#videos' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

// ── Navbar ─────────────────────────────────────────────────────────────────
// Transparent when at the top, frosted glass when scrolled.
// Includes a hamburger menu for mobile.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-500 rounded-2xl px-5 py-3 ${
          scrolled
            ? 'glass border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group magnetic"
          aria-label="Go to top"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xs font-mono font-medium text-white shadow-glow-brand">
            SH
          </div>
          <span
            className="text-sm font-medium text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sai Harshitha
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1)
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`relative px-4 py-2 text-sm rounded-xl transition-all duration-200 magnetic ${
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-white/6 border border-white/8"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            )
          })}
        </nav>

        {/* CTA */}
        <a
          href={`mailto:${siteData.contact.email}`}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-brand-500/10 border border-brand-500/25 text-brand-300 hover:bg-brand-500/20 hover:border-brand-500/50 transition-all duration-200 magnetic"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-surface-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="w-5 h-px bg-white"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="w-5 h-px bg-white"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="w-5 h-px bg-white"
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 max-w-6xl mx-auto glass rounded-2xl p-4 border border-white/5"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.button
                key={href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNavClick(href)}
                className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                {label}
              </motion.button>
            ))}
            <div className="border-t border-white/5 mt-2 pt-2">
              <a
                href={`mailto:${siteData.contact.email}`}
                className="block px-4 py-3 text-sm font-medium text-brand-400"
              >
                Hire Me →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
