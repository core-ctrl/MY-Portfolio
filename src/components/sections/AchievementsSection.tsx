'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData } from '@/lib/data'
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react'

function MedalCarousel({ medals }: { medals: { lift: string; photo: string }[] }) {
  const [idx, setIdx] = useState(0)

  return (
    <div className="relative w-full">
      {/* Offset shadow frame */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 border border-[var(--gold)]/30 pointer-events-none" />

      <div className="relative aspect-square overflow-hidden border border-[var(--gold)]/20">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={medals[idx].photo}
            alt={medals[idx].lift}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gold tint */}
        <div className="absolute inset-0 bg-[var(--gold)]/8 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent" />

        {/* Lift badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[8px] font-mono tracking-widest px-3 py-1.5 bg-[var(--black)]/90 border border-[var(--gold)]/40 text-[var(--gold)] uppercase">
            🥇 {medals[idx].lift.toUpperCase()}
          </span>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => setIdx(i => (i - 1 + medals.length) % medals.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--black)]/70 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--cream-muted)] hover:text-[var(--gold)] transition-colors cursor-pointer z-10"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => setIdx(i => (i + 1) % medals.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--black)]/70 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--cream-muted)] hover:text-[var(--gold)] transition-colors cursor-pointer z-10"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {medals.map((m, i) => (
          <button
            key={m.lift}
            onClick={() => setIdx(i)}
            className={`flex-1 aspect-square overflow-hidden border transition-all cursor-pointer ${
              i === idx ? 'border-[var(--gold)]' : 'border-[var(--gold)]/15 opacity-50 hover:opacity-80'
            }`}
          >
            <img src={m.photo} alt={m.lift} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 px-6 bg-[var(--black)] border-t border-[var(--gold)]/10 overflow-hidden">

      {/* Background word */}
      <div
        className="absolute -bottom-8 right-0 pointer-events-none select-none opacity-[0.03]"
        style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(80px, 18vw, 260px)', lineHeight: 1, color: 'var(--cream)', whiteSpace: 'nowrap' }}
      >
        CHAMPION
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">

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
            <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--gold)] uppercase">Physical Discipline</span>
          </div>
          <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9 }}>
            <div className="text-[var(--cream)]">DISTRICT</div>
            <div style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--gold)' }}>CHAMPION</div>
          </div>
        </motion.div>

        {siteData.achievements.map(a => (
          <div key={a.title} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left — photo carousel */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <MedalCarousel medals={a.medals} />
              </motion.div>
            </div>

            {/* Right — details */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="border border-[var(--gold)]/15 p-8 md:p-10 relative"
              >
                <div className="absolute top-3 left-4 text-[8px] font-mono text-[var(--gold)]/30 tracking-widest">[ RECORD FILE ]</div>

                <div className="flex justify-between items-start mb-8">
                  <span className="text-[9px] font-mono tracking-widest text-[var(--gold)] border border-[var(--gold)]/30 px-3 py-1 uppercase">
                    {a.date.toUpperCase()}
                  </span>
                </div>

                <div
                  style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 0.9, color: 'var(--cream)' }}
                  className="mb-3"
                >
                  {a.title}
                </div>
                <p className="text-[10px] font-mono text-[var(--gold)]/70 tracking-widest uppercase mb-6 border-l border-[var(--gold)]/30 pl-3">
                  {a.subtitle}
                </p>

                <p className="text-[var(--cream-dim)] text-sm leading-8 mb-10">{a.description}</p>

                {/* Medal grid */}
                <div className="border-t border-[var(--gold)]/15 pt-8">
                  <p className="text-[9px] font-mono tracking-widest text-[var(--gold)]/60 uppercase mb-5">Lifts Secured</p>
                  <div className="grid grid-cols-3 gap-3">
                    {a.medals.map(m => (
                      <div key={m.lift} className="border border-[var(--gold)]/20 p-4 hover:border-[var(--gold)]/50 transition-colors">
                        <Trophy size={12} className="text-[var(--gold)] mb-2" />
                        <p className="text-[9px] font-mono text-[var(--cream-dim)] uppercase tracking-wider">{m.lift}</p>
                        <p className="text-[8px] font-mono text-[var(--gold)]/50 mt-1">GOLD</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="border-t border-[var(--gold)]/15 pt-8 mt-8 flex gap-4">
                  <span className="text-[var(--gold)]/40 font-serif text-4xl leading-none">"</span>
                  <p className="text-xs text-[var(--cream-muted)] italic leading-7">
                    The iron never lies to you. 200kg will always be 200kg. That objective feedback mirrors code — it either works or it breaks.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
