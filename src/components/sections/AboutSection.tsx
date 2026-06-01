'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion'
import { siteData } from '@/lib/data'

const FACTS = [
  {
    num: '01',
    tag: 'Developer',
    title: 'I BUILD\nPRODUCTS',
    body: 'CS & IT student at KL University. I build full-stack apps — from secure REST APIs to cinematic Next.js interfaces. React, TypeScript, MongoDB, Docker — the real stack, deployed.',
  },
  {
    num: '02',
    tag: 'Powerlifter',
    title: 'I LIFT\nHEAVY',
    body: '3× District Gold Medalist 2026. Powerlifting gave me the discipline that drives my code — consistent, deliberate, and built to last under pressure.',
  },
  {
    num: '03',
    tag: 'Editor',
    title: 'I EDIT\nFILM',
    body: 'DaVinci Resolve editor producing promo reels for Vijayawada City Police, KL CIIE, and beyond. Color grading and motion timing shape the way I design every interface.',
  },
]

const CLIENTS = [
  { name: 'KL CIIE', role: 'Video Editor (2025) & Broadcasting Lead (2026)' },
  { name: 'KL EFIT', role: 'Broadcaster & Editor' },
  { name: 'KL Radio', role: 'Video Editor' },
  { name: 'KL Esports', role: 'Broadcaster & Video Editor' }
]

export default function AboutSection() {
  const imgRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const mRadius = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 16 })
  const sy = useSpring(my, { stiffness: 40, damping: 16 })
  const sRadius = useSpring(mRadius, { stiffness: 40, damping: 16 })
  const clip = useMotionTemplate`circle(${sRadius}px at ${sx}px ${sy}px)`

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const r = imgRef.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section id="about" className="relative bg-[var(--black)] border-t border-[var(--gold)]/10 py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* ── Section label ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[var(--gold)]" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--gold)] uppercase">
              Origin
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(56px, 10vw, 140px)', lineHeight: 0.9 }}
          >
            <div className="text-[var(--cream)] overflow-hidden">
              <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                GENESIS OF A
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                <span className="font-serif italic lowercase tracking-normal text-[var(--gold)]" style={{ WebkitTextStroke: '0px' }}>Creator</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Two columns: portrait left, facts right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Portrait */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              ref={imgRef}
              onPointerMove={onMove}
              onPointerEnter={() => mRadius.set(140)}
              onPointerLeave={() => mRadius.set(0)}
              className="relative overflow-hidden cursor-crosshair"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Base */}
              <img
                src={siteData.photos.primary}
                alt="Sai Harshitha"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-[var(--gold)]/5 mix-blend-overlay pointer-events-none" />

              {/* Hover reveal */}
              <motion.div style={{ clipPath: clip }} className="absolute inset-0 z-10 pointer-events-none">
                <img
                  src="https://res.cloudinary.com/dkrvtfbor/image/upload/v1778848190/1_oozjae.jpg"
                  alt="Sai Harshitha Hover"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/60 via-transparent to-transparent z-20 pointer-events-none" />

              {/* Name overlay */}
              <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
                <p className="text-[8px] font-mono tracking-[0.3em] text-[var(--gold)] uppercase">Sai Harshitha</p>
                <motion.p style={{ opacity: useTransform(sRadius, [0, 140], [1, 0]) }} className="text-[8px] font-mono text-[var(--cream-muted)]/60 tracking-widest">Hover to reveal</motion.p>
              </div>
            </motion.div>
          </div>

          {/* Facts */}
          <div className="lg:col-span-8 flex flex-col gap-0">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t border-[var(--gold)]/15 py-10 flex flex-col md:flex-row gap-6 md:gap-10 hover:border-[var(--gold)]/40 transition-colors duration-500"
              >
                {/* Number + tag */}
                <div className="flex md:flex-col gap-3 md:gap-1 md:w-32 shrink-0">
                  <span className="text-[9px] font-mono text-[var(--gold)]/50 tracking-widest">{f.num}</span>
                  <span className="text-[9px] font-mono text-[var(--cream-muted)] tracking-[0.3em] uppercase">{f.tag}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontSize: 'clamp(28px, 4vw, 52px)',
                      lineHeight: 0.9,
                      color: 'var(--cream)',
                      whiteSpace: 'pre-line',
                    }}
                    className="mb-4 group-hover:text-[var(--gold)] transition-colors duration-500"
                  >
                    {f.title}
                  </div>
                  <p className="text-[var(--cream-muted)] text-sm leading-7 font-light max-w-lg border-l border-[var(--gold)]/20 pl-4">
                    {f.body}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Bottom border */}
            <div className="border-t border-[var(--gold)]/15 pt-16 mt-8">
              <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--cream-muted)] uppercase mb-8">Clients & Collaborations</p>
              
              <div className="flex flex-wrap gap-4">
                {CLIENTS.map((client, i) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border border-[var(--gold)]/15 bg-[var(--bg-raised)] rounded-2xl px-6 py-5 hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5 transition-colors cursor-default"
                  >
                    <p className="text-sm font-semibold text-[var(--cream)] mb-1">{client.name}</p>
                    <p className="text-[10px] font-mono tracking-wide text-[var(--cream-muted)] uppercase">{client.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
