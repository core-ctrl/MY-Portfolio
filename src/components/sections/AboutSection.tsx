'use client'

import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import { siteData } from '@/lib/data'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div
        className="glow-blob w-[400px] h-[400px] top-1/2 right-0 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.3em] text-brand-400 uppercase mb-4">— About</p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-16 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            <span className="text-white/90">Where code meets</span>
            <br />
            <em className="gradient-text not-italic">creativity</em>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — photo + stats */}
          <div>
            {/* Profile photo */}
            <SectionReveal delay={100}>
              <div className="relative mb-8">
                <div className="relative w-full max-w-xs mx-auto lg:mx-0">
                  {/* Glow ring */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-40"
                    style={{ background: 'linear-gradient(135deg, #6a50ff, #22d3ee)', filter: 'blur(12px)' }}
                  />
                  <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-surface-700">
                    <img
                      src={siteData.photos.primary}
                      alt="Sai Harshitha"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        // Fallback to secondary photo if .heic fails
                        ;(e.target as HTMLImageElement).src = siteData.photos.secondary
                      }}
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 lg:right-auto lg:left-full lg:ml-4 glass rounded-2xl px-4 py-3 hidden sm:block"
                >
                  <p className="text-xs font-mono text-white/40 mb-0.5">Powerlifter</p>
                  <p className="text-sm text-white/80">🏅 District Gold 2026</p>
                </motion.div>
              </div>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={160}>
              <div className="grid grid-cols-2 gap-4">
                {siteData.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-2xl p-5 glass-hover relative overflow-hidden"
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                    <p
                      className="text-3xl gradient-text mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/40 font-mono tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right — bio + education */}
          <div>
            <SectionReveal delay={120}>
              <p className="text-white/60 text-base leading-8 mb-6">
                I&apos;m <strong className="text-white/90">Sai Harshitha</strong>, a Computer Science & IT student at KL University who refuses to stay in one lane. I build full-stack products that actually ship, edit cinematic videos for brands and creators, and train as a competitive powerlifter.
              </p>
              <p className="text-white/60 text-base leading-8 mb-10">
                The discipline of lifting heavy translates directly to the patience and precision of writing good code. Everything I do is about pushing past limits — whether that&apos;s a personal record or a production deployment on AWS.
              </p>
            </SectionReveal>

            {/* Education timeline with logos */}
            <SectionReveal delay={150}>
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-6">
                Education
              </h3>
              <div className="relative pl-6">
                <div className="timeline-line" />
                <div className="space-y-5">
                  {siteData.education.map((edu, i) => (
                    <motion.div
                      key={edu.institution}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-[21px] top-4 w-2.5 h-2.5 rounded-full border border-brand-500 ${
                          edu.current
                            ? 'bg-brand-500 shadow-[0_0_8px_rgba(106,80,255,0.6)]'
                            : 'bg-surface-800'
                        }`}
                      />

                      <div className="glass rounded-2xl p-4 glass-hover flex items-center gap-4">
                        {/* Institution logo */}
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 overflow-hidden p-1">
                          <img
                            src={edu.logo}
                            alt={edu.institution}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-white/90 truncate">{edu.institution}</p>
                            {edu.current && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/20 shrink-0">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/45 mt-0.5 truncate">{edu.degree}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-mono text-white/25">{edu.period}</span>
                            {!edu.current && (
                              <span className="text-[10px] font-mono text-white/25">{edu.grade}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Clients */}
            <SectionReveal delay={200}>
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mt-8 mb-4">
                Clients & Collaborations
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteData.clients.map((client) => (
                  <div key={client.name} className="glass rounded-xl px-3 py-2 glass-hover">
                    <p className="text-xs font-medium text-white/70">{client.name}</p>
                    <p className="text-[10px] text-white/30 font-mono">{client.role}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
