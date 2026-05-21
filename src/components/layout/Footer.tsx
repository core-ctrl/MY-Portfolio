'use client'

import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

const MARQUEE = 'SAI HARSHITHA ✦ CREATIVE DEVELOPER ✦ CYBERSECURITY ✦ POWERLIFTER ✦ DISTRICT GOLD ✦ KL UNIVERSITY ✦ '

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--gold)]/15 bg-[var(--black)] overflow-hidden select-none">

      {/* Big scrolling name marquee */}
      <div className="w-full overflow-hidden py-4 border-b border-[var(--gold)]/10">
        <div className="marquee-container">
          <div className="marquee-content gap-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(48px, 10vw, 120px)' }}
                className="whitespace-nowrap text-[var(--cream)]/5 tracking-tight leading-none pr-8"
              >
                {MARQUEE}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Name + tagline */}
        <div>
          <p
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1 }}
            className="text-[var(--cream)] tracking-tight uppercase"
          >
            Sai Harshitha
          </p>
          <p className="text-[10px] font-mono text-[var(--cream-muted)] tracking-[0.3em] uppercase mt-2">
            Systems &amp; Creativity Intersected
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {[
            { icon: Github,    href: siteData.contact.github,           label: 'GitHub' },
            { icon: Linkedin,  href: siteData.contact.linkedin,         label: 'LinkedIn' },
            { icon: Instagram, href: siteData.contact.instagram_edit,   label: 'Instagram' },
            { icon: Mail,      href: `mailto:${siteData.contact.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3 }}
              className="w-10 h-10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--cream-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)]/50 transition-all duration-200"
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>

        <p className="text-[9px] font-mono text-[var(--cream-muted)] tracking-widest uppercase">
          © {year} Sai Harshitha
        </p>
      </div>
    </footer>
  )
}
