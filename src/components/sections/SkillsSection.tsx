'use client'

import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import { siteData } from '@/lib/data'

// Skill category card
function SkillCategory({
  title,
  skills,
  color,
  delay = 0,
}: {
  title: string
  skills: string[]
  color: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="glass glass-hover rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Color dot indicator */}
      <div
        className="w-2 h-2 rounded-full mb-4"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <h3 className="text-sm font-medium text-white/70 mb-4 font-mono tracking-wide">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1.5 rounded-xl bg-white/4 border border-white/8 text-white/60 hover:text-white/90 hover:bg-white/8 transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// Single marquee skill chip
function SkillChip({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl border border-white/6 shrink-0">
      <span className="text-base leading-none">{icon}</span>
      <span className="text-sm text-white/60 font-mono whitespace-nowrap">{name}</span>
    </div>
  )
}

export default function SkillsSection() {
  const { allSkills, skills } = siteData

  // Duplicate for seamless loop
  const doubled = [...allSkills, ...allSkills]

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.3em] text-brand-400 uppercase mb-4">
            — Skills
          </p>
        </SectionReveal>
        <SectionReveal delay={80}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 max-w-xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            <span className="text-white/90">The tools of</span>
            <br />
            <em className="gradient-text not-italic">my craft</em>
          </h2>
        </SectionReveal>
      </div>

      {/* ── Marquee rows ─────────────────── */}
      <div className="mt-10 mb-14 space-y-4 overflow-hidden">
        {/* Row 1 — left to right */}
        <div className="marquee-container">
          <div className="marquee-track">
            {doubled.map((s, i) => (
              <SkillChip key={`a-${i}`} name={s.name} icon={s.icon} />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="marquee-container">
          <div className="marquee-track marquee-track-reverse">
            {[...doubled].reverse().map((s, i) => (
              <SkillChip key={`b-${i}`} name={s.name} icon={s.icon} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Category cards grid ───────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkillCategory
            title="Frontend"
            skills={skills.frontend}
            color="#6a50ff"
            delay={0}
          />
          <SkillCategory
            title="Backend & DB"
            skills={skills.backend}
            color="#22d3ee"
            delay={0.08}
          />
          <SkillCategory
            title="Cloud & DevOps"
            skills={skills.cloud}
            color="#f59e0b"
            delay={0.16}
          />
          <SkillCategory
            title="Creative Tools"
            skills={skills.creative}
            color="#f43f5e"
            delay={0.24}
          />
        </div>
      </div>
    </section>
  )
}
