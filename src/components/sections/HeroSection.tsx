'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { siteData } from '@/lib/data'
import { ArrowDown, Github, Linkedin, Instagram } from 'lucide-react'

// ── HeroSection ────────────────────────────────────────────────────────────
// Full-viewport landing section with:
//   - Mouse-follow gradient (subtle radial that tracks cursor)
//   - Animated background blobs
//   - Staggered text entrance (display → subtitle → bio → CTAs)
//   - Floating UI chip elements
//   - Parallax grid background
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse-follow gradient position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const stagger = {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
    },
    item: {
      hidden: { opacity: 0, y: 32 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 grid-bg"
    >
      {/* Mouse-follow radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: 'transparent',
        }}
      />
      <motion.div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #6a50ff, transparent 70%)',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Static ambient blobs */}
      <div
        className="glow-blob w-[500px] h-[500px] bg-brand-600 top-1/4 right-[-100px]"
        aria-hidden="true"
      />
      <div
        className="glow-blob w-[400px] h-[400px] bg-accent-600 bottom-1/4 left-[-80px]"
        aria-hidden="true"
        style={{ animationDelay: '2s' }}
      />

      {/* Content */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow tag */}
        <motion.div variants={stagger.item} className="flex justify-center mb-6">
          <span className="tag-pill">
            ✦ Available for freelance & collaboration
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={stagger.item}
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
        >
          <span className="text-white/90">Sai</span>
          <br />
          <em className="gradient-text not-italic">Harshitha</em>
        </motion.h1>

        {/* Role tags */}
        <motion.div
          variants={stagger.item}
          className="flex flex-wrap justify-center gap-2 mb-7"
        >
          {['Full-Stack Developer', 'Video Editor', 'Powerlifter'].map((role) => (
            <span
              key={role}
              className="px-3 py-1 rounded-full text-xs font-mono tracking-wider border border-white/10 text-white/50 bg-white/3"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={stagger.item}
          className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {siteData.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={stagger.item}
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="magnetic relative px-6 py-3 rounded-xl text-sm font-medium text-white overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #6a50ff, #4f3acc)' }}
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">View Projects →</span>
          </motion.button>

          <motion.a
            href={`mailto:${siteData.contact.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="magnetic px-6 py-3 rounded-xl text-sm font-medium text-white/70 glass border border-white/10 hover:border-brand-500/40 hover:text-white transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social row */}
        <motion.div
          variants={stagger.item}
          className="flex items-center justify-center gap-4 mt-10"
        >
          {[
            { icon: Github, href: siteData.contact.github, label: 'GitHub' },
            { icon: Linkedin, href: siteData.contact.linkedin, label: 'LinkedIn' },
            { icon: Instagram, href: siteData.contact.instagram_edit, label: 'Instagram' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating chips — desktop only */}
      <div className="hidden lg:block" aria-hidden="true">
        <motion.div
          className="absolute top-32 left-12 glass rounded-2xl px-4 py-3 float-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-xs text-white/40 font-mono mb-0.5">Stack</p>
          <p className="text-sm text-white/80">React · AWS · SQL</p>
        </motion.div>

        <motion.div
          className="absolute top-48 right-16 glass rounded-2xl px-4 py-3 float-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <p className="text-xs text-white/40 font-mono mb-0.5">Achievement</p>
          <p className="text-sm text-white/80">🏅 District Gold — Powerlifting</p>
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-20 glass rounded-2xl px-4 py-3 float-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <p className="text-xs text-white/40 font-mono mb-0.5">University</p>
          <p className="text-sm text-white/80">KL University — B.Tech CS&IT</p>
        </motion.div>

        <motion.div
          className="absolute bottom-56 right-24 glass rounded-2xl px-4 py-3 float-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <p className="text-xs text-white/40 font-mono mb-0.5">Clients</p>
          <p className="text-sm text-white/80">6+ brands served</p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
