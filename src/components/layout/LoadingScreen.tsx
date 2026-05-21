'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Scramble effect hook
function useScramble(target: string, active: boolean, speed = 40) {
  const [display, setDisplay] = useState('')
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const frame = useRef(0)
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!active) { setDisplay(''); return }
    frame.current = 0
    const tick = () => {
      const progress = Math.min(frame.current / (target.length * 2), 1)
      const revealed = Math.floor(progress * target.length)
      let out = ''
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') { out += ' '; continue }
        if (i < revealed) out += target[i]
        else out += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
      setDisplay(out)
      frame.current++
      if (progress < 1) raf.current = setTimeout(tick, speed)
      else setDisplay(target)
    }
    tick()
    return () => { if (raf.current) clearTimeout(raf.current) }
  }, [target, active, speed])

  return display
}

const ROLES = ['EDITOR', 'ENGINEER', 'CREATIVE DEVELOPER']

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [roleIdx, setRoleIdx] = useState(0)
  const [phase, setPhase] = useState<'roles' | 'name'>('roles')
  const [nameActive, setNameActive] = useState(false)

  const roleText = useScramble(ROLES[roleIdx], phase === 'roles')
  const nameText = useScramble('SAI HARSHITHA', nameActive)

  useEffect(() => {
    if (sessionStorage.getItem('sh_loaded')) { setVisible(false); return }

    // Progress ticker
    let p = 0
    const progTick = setInterval(() => {
      p += Math.random() * 8 + 4
      if (p >= 100) {
        p = 100
        clearInterval(progTick)
        setTimeout(() => {
          setVisible(false)
          sessionStorage.setItem('sh_loaded', '1')
        }, 800)
      }
      setProgress(Math.min(p, 100))
    }, 90)

    // Role cycling
    let ri = 0
    const cycleTick = setInterval(() => {
      ri++
      if (ri < ROLES.length) {
        setRoleIdx(ri)
      } else {
        clearInterval(cycleTick)
        setTimeout(() => {
          setPhase('name')
          setNameActive(true)
        }, 400)
      }
    }, 900)

    return () => { clearInterval(progTick); clearInterval(cycleTick) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-[var(--black)] flex flex-col overflow-hidden"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* ── Scan line effect ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,166,107,0.015) 2px, rgba(201,166,107,0.015) 4px)',
            }}
          />

          {/* ── Top bar ── */}
          <div className="flex justify-between items-center px-8 pt-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[9px] font-mono tracking-[0.5em] text-[var(--gold)] uppercase"
            >
              SH_PORTFOLIO
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="text-[9px] font-mono text-[var(--cream-muted)] tracking-widest">V 2.0.26</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            </motion.div>
          </div>

          {/* ── Center stage ── */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">

            {/* Live system log lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-sm space-y-1 mb-6"
            >
              {['INITIALIZING SYSTEMS...', 'LOADING ASSETS...', 'COMPILING IDENTITY...'].map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: progress > i * 30 ? 0.5 : 0, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="text-[8px] font-mono text-[var(--gold)]/50 tracking-widest"
                >
                  &gt; {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Role / Name display */}
            <div className="text-center" style={{ minHeight: '15vw' }}>
              <AnimatePresence mode="wait">
                {phase === 'roles' && (
                  <motion.div
                    key={`role-${roleIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontSize: 'clamp(36px, 8vw, 96px)',
                      lineHeight: 0.9,
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(201,166,107,0.4)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {roleText || ROLES[roleIdx]}
                  </motion.div>
                )}

                {phase === 'name' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-hero)',
                        fontSize: 'clamp(44px, 10vw, 130px)',
                        lineHeight: 0.88,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      <span style={{ color: 'var(--cream)' }}>
                        {nameText.split(' ')[0] || 'SAI'}
                      </span>
                      {' '}
                      <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--gold)' }}>
                        {nameText.split(' ')[1] || ''}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Descriptor row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'name' ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              {['Editor', 'Engineer', 'Creative'].map((r, i) => (
                <span key={r} className="flex items-center gap-4">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-[var(--cream-muted)] uppercase">{r}</span>
                  {i < 2 && <span className="text-[var(--gold)]/30 text-xs">✦</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Bottom: progress ── */}
          <div className="px-8 pb-10 space-y-3">
            {/* Segmented bar */}
            <div className="flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => {
                const threshold = (i + 1) * 5
                return (
                  <motion.div
                    key={i}
                    className="h-0.5 flex-1"
                    animate={{
                      backgroundColor: progress >= threshold
                        ? 'var(--gold)'
                        : 'rgba(201,166,107,0.12)',
                    }}
                    transition={{ duration: 0.2 }}
                  />
                )
              })}
            </div>

            <div className="flex justify-between">
              <span className="text-[8px] font-mono text-[var(--cream-muted)] tracking-widest uppercase">
                {progress < 100 ? 'Loading experience' : 'Ready'}
              </span>
              <span className="text-[8px] font-mono text-[var(--gold)] tracking-widest tabular-nums">
                {Math.round(progress).toString().padStart(3, '0')}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
