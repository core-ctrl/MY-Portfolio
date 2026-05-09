'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import { siteData } from '@/lib/data'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ── Medal Photo Carousel ───────────────────────────────────────────────────
function MedalCarousel({ medals }: { medals: { lift: string; photo: string }[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="relative">
      {/* Main photo */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-700">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={medals[active].photo}
            alt={`${medals[active].lift} medal`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Lift label */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm text-yellow-400 border border-yellow-500/30">
            🥇 {medals[active].lift}
          </span>
        </div>

        {/* Prev / Next */}
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
          <button
            onClick={() => setActive((a) => (a - 1 + medals.length) % medals.length)}
            className="pointer-events-auto w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % medals.length)}
            className="pointer-events-auto w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {medals.map((m, i) => (
          <button
            key={m.lift}
            onClick={() => setActive(i)}
            className="relative flex-1 aspect-square rounded-xl overflow-hidden"
            style={{
              ring: i === active ? '2px solid #f59e0b' : 'none',
              outline: i === active ? '2px solid #f59e0b' : '2px solid transparent',
              outlineOffset: '2px',
            }}
          >
            <img
              src={m.photo}
              alt={m.lift}
              className={`w-full h-full object-cover transition-all duration-200 ${
                i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── AchievementsSection ────────────────────────────────────────────────────
export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden">
      <div
        className="glow-blob w-[400px] h-[400px] bottom-0 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.3em] text-brand-400 uppercase mb-4">
            — Achievements
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-14 max-w-xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            <span className="text-white/90">Beyond the</span>
            <br />
            <em className="gradient-text not-italic">screen</em>
          </h2>
        </SectionReveal>

        {siteData.achievements.map((achievement) => (
          <div key={achievement.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left — medal photo carousel */}
            <SectionReveal delay={100}>
              <MedalCarousel medals={achievement.medals} />
            </SectionReveal>

            {/* Right — achievement details */}
            <SectionReveal delay={140}>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative glass rounded-3xl p-8 overflow-hidden h-full"
                style={{ border: `1px solid ${achievement.color}25` }}
              >
                {/* Color accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${achievement.color}, transparent)` }}
                />

                {/* Glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${achievement.color}10, transparent)` }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl">{achievement.icon}</span>
                  <span className="text-xs font-mono text-white/30 bg-white/5 px-3 py-1.5 rounded-full">
                    {achievement.date}
                  </span>
                </div>

                <h3
                  className="text-3xl mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: achievement.color }}
                >
                  {achievement.title}
                </h3>
                <p className="text-sm text-white/50 font-mono mb-5">{achievement.subtitle}</p>
                <p className="text-sm text-white/55 leading-relaxed mb-8">{achievement.description}</p>

                {/* Three lift medals */}
                <div className="space-y-3">
                  <p className="text-[10px] font-mono tracking-widest text-white/25 uppercase">
                    Gold in all three lifts
                  </p>
                  {achievement.medals.map((medal, i) => (
                    <motion.div
                      key={medal.lift}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: achievement.color, boxShadow: `0 0 6px ${achievement.color}` }}
                      />
                      <span className="text-sm text-white/70">🥇 {medal.lift}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Discipline quote */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p
                    className="text-lg leading-snug text-white/40"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300 }}
                  >
                    "The bar doesn't care about excuses."
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        ))}
      </div>
    </section>
  )
}
