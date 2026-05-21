'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData } from '@/lib/data'

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Videos',       href: '#videos' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const goTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[500] px-6 md:px-10 py-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`max-w-screen-xl mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-3 px-6 bg-[var(--black)]/90 backdrop-blur-sm border border-[var(--gold)]/10' : ''
        } rounded-full`}>

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono tracking-[0.3em] text-[var(--gold)] uppercase hover:opacity-70 transition-opacity"
          >
            SH / 2026
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const isActive = active === href.slice(1)
              return (
                <button
                  key={href}
                  onClick={() => goTo(href)}
                  className={`relative text-[11px] font-mono tracking-[0.2em] uppercase transition-colors duration-200 ${
                    isActive ? 'text-[var(--gold)]' : 'text-[var(--cream-muted)] hover:text-[var(--cream)]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--gold)]"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteData.contact.email}`}
              className="hidden md:block text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--black)] bg-[var(--gold)] px-5 py-2.5 hover:bg-[var(--gold-light)] transition-colors duration-200"
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                className="block w-full h-px bg-[var(--cream)]"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block w-full h-px bg-[var(--cream)]"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                className="block w-full h-px bg-[var(--cream)]"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[499] bg-[var(--black)] flex flex-col justify-end px-8 pb-16"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => goTo(href)}
                  className="text-left text-5xl font-hero tracking-tight text-[var(--cream)] hover:text-[var(--gold)] transition-colors py-1"
                  style={{ fontFamily: 'var(--font-hero)' }}
                >
                  {label}
                </motion.button>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-[var(--gold)]/20"
            >
              <a
                href={`mailto:${siteData.contact.email}`}
                className="text-xs font-mono tracking-widest text-[var(--gold)] uppercase"
              >
                {siteData.contact.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
