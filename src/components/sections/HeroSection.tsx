'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const ROLES = ['POWERLIFTER', 'DEVELOPER', 'CREATOR', 'SAI HARSHITHA']
const ROLE_DURATION = 600

// Replaced useViewportFontSize with pure CSS clamp

function BackgroundParticles() {
  const [elements, setElements] = useState<{ id: number; x: number; y: number; size: number; duration: number; type: number }[]>([])
  
  useEffect(() => {
    const arr = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 20 + 20,
      type: Math.floor(Math.random() * 3)
    }))
    setElements(arr)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-[var(--gold)]/30 flex items-center justify-center"
          style={{ left: `${el.x}%`, top: `${el.y}%`, width: el.size, height: el.size }}
          animate={{
            y: [0, -400],
            rotate: el.type === 1 ? [0, 180] : [0, 90],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {el.type === 0 && <div className="w-1 h-1 rounded-full bg-current" />}
          {el.type === 1 && <span className="text-xs font-mono">+</span>}
          {el.type === 2 && <div className="w-2 h-2 border border-current" />}
        </motion.div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [roleIdx, setRoleIdx] = useState(0)
  const [phase, setPhase] = useState(0) // 0 = animating, 1 = completed
  const [ready, setReady] = useState(false)

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  // Mouse parallax for ambient glow
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })

  // Dynamic font sizing via CSS clamp in the render block instead of JS

  useEffect(() => {
    const delay = setTimeout(() => {
      setReady(true)
      let idx = 0
      const cycle = setInterval(() => {
        idx++
        if (idx < ROLES.length) {
          setRoleIdx(idx)
        } else {
          clearInterval(cycle)
          setPhase(1)
        }
      }, ROLE_DURATION)
    }, 200)
    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      mx.set((e.clientX / width - 0.5) * 40)
      my.set((e.clientY / height - 0.5) * 30)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[var(--black)]"
    >
      <BackgroundParticles />

      <motion.div
        style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
        className="absolute inset-0 flex flex-col justify-between"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ x: sx, y: sy }}
        >
          <div
            className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,166,107,0.06) 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,166,107,0.04) 0%, transparent 70%)' }}
          />
        </motion.div>

        {/* ── TOP META ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 px-6 md:px-8 pt-28 flex justify-between items-start"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--cream)] uppercase opacity-80">
                I AM
              </span>
              <div className="border border-[var(--gold)] px-3 py-1 flex items-center justify-center bg-[var(--gold)]/10 backdrop-blur-sm">
                <span className="text-[9px] font-mono tracking-[0.3em] text-[var(--gold)] font-bold uppercase transition-all duration-300 shadow-[var(--gold)] drop-shadow-md">
                  {ROLES[roleIdx]}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-[var(--cream-muted)] uppercase">KL University · AP, India</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono tracking-[0.3em] text-[var(--cream-muted)] uppercase">Est. 2024</span>
          </div>
        </motion.div>

        {/* ── MAIN TYPOGRAPHY STAGE ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden pointer-events-none">
          
          {ready && (
            <div className="absolute w-full px-4 md:px-8 flex justify-center pointer-events-auto overflow-hidden">
              <motion.div
                initial={{ y: '120%', filter: 'blur(8px)' }}
                animate={{ y: '0%', filter: 'blur(0px)' }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'clamp(3rem, 12vw, 15rem)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  textAlign: 'center'
                }}
                className="group cursor-default"
              >
                {roleIdx < 3 ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[var(--gold)] opacity-80 text-xl md:text-4xl font-serif italic mb-[-2vw] tracking-wider z-10">I am</span>
                    <div
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: 'max(1.5px, 0.2vw) rgba(201,166,107,0.5)',
                      }}
                    >
                      {ROLES[roleIdx]}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[var(--gold)] opacity-80 text-xl md:text-4xl font-serif italic mb-[-2vw] tracking-wider z-10">I am</span>
                    <div className="relative inline-block w-full">
                      {/* Back layer */}
                      <div 
                        className="absolute inset-0 flex justify-center items-center pointer-events-none group-hover:blur-sm transition-all duration-700"
                        style={{ color: 'transparent', WebkitTextStroke: 'max(1.5px, 0.2vw) rgba(201,166,107,0.4)' }}
                      >
                        SAI HARSHITHA
                      </div>
                      {/* Front interactive layer */}
                      <div 
                        className="relative z-10 flex justify-center items-center overflow-hidden"
                        style={{ color: 'var(--cream)', transition: 'color 0.5s ease' }}
                      >
                        {Array.from("SAI HARSHITHA").map((char, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ 
                              y: -10, 
                              color: 'var(--gold)',
                              transition: { duration: 0.1 }
                            }}
                            className="inline-block transition-colors duration-500"
                            style={char === ' ' ? { width: '0.2em' } : {}}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}


        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 px-6 md:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pointer-events-auto"
        >
          <p className="text-sm text-[var(--cream-dim)] max-w-xs leading-relaxed">
            Building cinematic digital experiences at the intersection of{' '}
            <span className="font-serif italic text-lg lowercase tracking-normal text-[var(--gold)]">code</span>,{' '}
            <span className="font-serif italic text-lg lowercase tracking-normal text-[var(--gold)]">security</span> &{' '}
            <span className="font-serif italic text-lg lowercase tracking-normal text-[var(--gold)]">discipline</span>.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--cream-muted)] hover:text-[var(--gold)] transition-colors"
            >
              <span className="w-10 h-px bg-current group-hover:w-16 transition-all duration-300" />
              Scroll
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                <ArrowDown size={11} />
              </motion.span>
            </button>

            <a
              href="#contact"
              className="px-6 py-3 bg-[var(--gold)] text-[var(--black)] text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-[var(--gold-light)] transition-transform hover:scale-105 active:scale-95 block"
            >
              Hire Me
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
