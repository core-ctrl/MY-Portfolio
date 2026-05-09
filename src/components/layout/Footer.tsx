'use client'

import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12 px-6 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6a50ff, transparent)' }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p
            className="text-lg gradient-text-warm"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Parupalli Sai Harshitha
          </p>
          <p className="text-xs text-white/30 mt-1 font-mono tracking-wide">
            Code · Creativity · Discipline
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: siteData.contact.github, label: 'GitHub' },
            { icon: Linkedin, href: siteData.contact.linkedin, label: 'LinkedIn' },
            { icon: Instagram, href: siteData.contact.instagram_edit, label: 'Instagram' },
            { icon: Mail, href: `mailto:${siteData.contact.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white/80 hover:border-brand-500/30 transition-colors"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-white/20 font-mono">
          © {year} — Built with Next.js & ❤
        </p>
      </div>
    </footer>
  )
}
