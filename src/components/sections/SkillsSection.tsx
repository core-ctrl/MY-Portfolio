'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend', color: '#6a50ff' },
  { key: 'backend',  label: 'Backend',  color: '#C9A66B' },
  { key: 'database', label: 'Database', color: '#50a050' },
  { key: 'cloud',    label: 'Cloud & DevOps', color: '#50a0d0' },
  { key: 'creative', label: 'Creative', color: '#d050a0' },
] as const

export default function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null)
  const all = siteData.allSkills
  const row1 = all.slice(0, Math.ceil(all.length / 2))
  const row2 = all.slice(Math.ceil(all.length / 2))

  return (
    <section id="skills" className="relative py-32 bg-[var(--bg-surface)] border-t border-[var(--gold)]/10 overflow-hidden">

      {/* ── Marquee ticker rows ── */}
      <div className="w-full border-t border-b border-[var(--gold)]/10 py-4 mb-24 select-none overflow-hidden bg-[var(--bg-raised)]/40">
        <div className="marquee-container mb-3">
          <div className="marquee-content gap-10 flex items-center pr-10">
            {[...row1, ...row1].map((s, i) => (
              <span key={i} className="text-xs font-mono tracking-[0.25em] text-[var(--cream-dim)] uppercase whitespace-nowrap flex items-center gap-3">
                {s} <span className="text-[var(--gold)]">✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-content marquee-reverse gap-10 flex items-center pr-10">
            {[...row2, ...row2].map((s, i) => (
              <span key={i} className="text-xs font-mono tracking-[0.25em] text-[var(--cream-muted)] uppercase whitespace-nowrap flex items-center gap-3">
                {s} <span className="text-[var(--gold)]/50">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[var(--gold)]" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--gold)] uppercase">System Core</span>
          </div>
          <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(56px, 10vw, 140px)', lineHeight: 0.9 }}>
            <div className="text-[var(--cream)] overflow-hidden">
              <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                TECHNICAL
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                <span className="font-serif italic lowercase tracking-normal text-[var(--gold)]" style={{ WebkitTextStroke: '0px' }}>Arsenal</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Interactive typography wall */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="border border-[var(--gold)]/10 p-8 md:p-14 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 text-[9px] font-mono text-[var(--gold)]/40 tracking-widest">[ MATRIX_V2 ]</div>

          <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center items-center py-4">
            {all.map(skill => (
              <motion.span
                key={skill}
                onMouseEnter={() => setHovered(skill)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  color: hovered === skill ? 'var(--gold)' : 'rgba(200,186,160,0.25)',
                  scale: hovered === skill ? 1.12 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="cursor-default select-none uppercase"
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'clamp(22px, 3.5vw, 48px)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <p className="text-center mt-8 text-[8px] font-mono text-[var(--cream-muted)]/40 tracking-widest uppercase animate-pulse">
            Hover to illuminate
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const skills = siteData.skills[cat.key]
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="border border-[var(--gold)]/15 bg-[var(--bg-raised)] p-6 hover:border-[var(--gold)]/40 transition-all duration-300 group"
              >
                {/* Color dot + label */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <span className="text-[9px] font-mono tracking-widest text-[var(--cream-muted)] uppercase">{cat.label}</span>
                </div>

                {/* Skills list */}
                <div className="flex flex-col gap-2">
                  {skills.map(s => (
                    <div
                      key={s}
                      className="flex items-center gap-2 text-[11px] font-mono text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
