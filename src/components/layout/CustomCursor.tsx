'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hoveredType, setHoveredType] = useState<'default' | 'link' | 'button' | 'view' | 'text' | 'play'>('default')
  const [hoveredText, setHoveredText] = useState('')
  
  // Primary cursor coordinates (rigid, follow mouse immediately)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring animations for the smooth physical trailing lag
  const cursorSpringConfig = { stiffness: 400, damping: 28, mass: 0.2 }
  const trailSpringConfig = { stiffness: 100, damping: 18, mass: 0.8 }

  const cursorX = useSpring(mouseX, cursorSpringConfig)
  const cursorY = useSpring(mouseY, cursorSpringConfig)

  const trailX = useSpring(mouseX, trailSpringConfig)
  const trailY = useSpring(mouseY, trailSpringConfig)

  // Track cursor velocity/rotation for organic responsiveness
  const [speed, setSpeed] = useState(0)
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)

      // Calculate simple velocity/speed for rotation/scaling effects
      const now = performance.now()
      const dt = now - lastMousePos.current.time
      if (dt > 10) {
        const dx = e.clientX - lastMousePos.current.x
        const dy = e.clientY - lastMousePos.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const currentSpeed = Math.min(dist / dt, 10) // clamp speed
        setSpeed(currentSpeed)
        
        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now }
      }
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, [data-cursor], [data-cursor-text]')
      
      if (interactiveEl) {
        const cursorAttr = interactiveEl.getAttribute('data-cursor')
        const cursorTextAttr = interactiveEl.getAttribute('data-cursor-text')
        
        if (cursorTextAttr) {
          setHoveredType('text')
          setHoveredText(cursorTextAttr)
        } else if (cursorAttr === 'view' || interactiveEl.classList.contains('project-card') || interactiveEl.closest('.project-card')) {
          setHoveredType('view')
          setHoveredText('VIEW')
        } else if (cursorAttr === 'play' || interactiveEl.classList.contains('video-card') || interactiveEl.closest('.video-card') || interactiveEl.closest('[data-cursor="play"]')) {
          setHoveredType('play')
          setHoveredText('PLAY')
        } else if (interactiveEl.tagName === 'A' || interactiveEl.tagName === 'BUTTON' || interactiveEl.getAttribute('role') === 'button') {
          setHoveredType('link')
        } else if (interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA') {
          setHoveredType('text')
          setHoveredText('WRITE')
        }
      } else {
        setHoveredType('default')
        setHoveredText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, visible])

  if (!visible) return null

  // Crosshair configuration styles based on state
  const isSpecialHover = hoveredType === 'view' || hoveredType === 'play' || hoveredType === 'text'
  const isAnyHover = hoveredType !== 'default'

  // Colors
  const accentColor = '#D8C3A5'
  const darkColor = '#0B0B0B'
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
      aria-hidden="true"
    >
      {/* 1. Rigid Central Pointer (Dot & Small Crosshair) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          position: 'fixed',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Tiny center dot */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#D8C3A5] shadow-[0_0_8px_rgba(216,195,165,0.6)]"
          animate={{
            scale: isAnyHover ? 1.5 : 1,
            backgroundColor: hoveredType === 'link' ? '#F3EBDD' : accentColor,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* 2. Smooth Physical Trailing Reticle & Brackets */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          position: 'fixed',
          top: 0,
          left: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          {/* Top Line */}
          <motion.line
            x1="50"
            y1="38"
            x2="50"
            y2="20"
            stroke={accentColor}
            strokeWidth="1"
            opacity="0.8"
            animate={{
              y1: isSpecialHover ? 32 : isAnyHover ? 35 : 38,
              y2: isSpecialHover ? 12 : isAnyHover ? 15 : 20,
              strokeWidth: isAnyHover ? 1.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />

          {/* Bottom Line */}
          <motion.line
            x1="50"
            y1="62"
            x2="50"
            y2="80"
            stroke={accentColor}
            strokeWidth="1"
            opacity="0.8"
            animate={{
              y1: isSpecialHover ? 68 : isAnyHover ? 65 : 62,
              y2: isSpecialHover ? 88 : isAnyHover ? 85 : 80,
              strokeWidth: isAnyHover ? 1.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />

          {/* Left Line */}
          <motion.line
            x1="38"
            y1="50"
            x2="20"
            y2="50"
            stroke={accentColor}
            strokeWidth="1"
            opacity="0.8"
            animate={{
              x1: isSpecialHover ? 32 : isAnyHover ? 35 : 38,
              x2: isSpecialHover ? 12 : isAnyHover ? 15 : 20,
              strokeWidth: isAnyHover ? 1.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />

          {/* Right Line */}
          <motion.line
            x1="62"
            y1="50"
            x2="80"
            y2="50"
            stroke={accentColor}
            strokeWidth="1"
            opacity="0.8"
            animate={{
              x1: isSpecialHover ? 68 : isAnyHover ? 65 : 62,
              x2: isSpecialHover ? 88 : isAnyHover ? 85 : 80,
              strokeWidth: isAnyHover ? 1.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />

          {/* Corner Brackets Viewport (Target frame box) */}
          <motion.g
            animate={{
              rotate: isSpecialHover ? 95 : isAnyHover ? 45 : 0,
              scale: isSpecialHover ? 1.3 : isAnyHover ? 1.15 : 1,
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            style={{ originX: '50px', originY: '50px' }}
          >
            {/* Top-Left Bracket */}
            <path
              d="M 32 38 L 32 32 L 38 32"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Top-Right Bracket */}
            <path
              d="M 68 38 L 68 32 L 62 32"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Bottom-Left Bracket */}
            <path
              d="M 32 62 L 32 68 L 38 68"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Bottom-Right Bracket */}
            <path
              d="M 68 62 L 68 68 L 62 68"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              opacity="0.5"
            />
          </motion.g>

          {/* Glowing target circle around center when hovering key elements */}
          <motion.circle
            cx="50"
            cy="50"
            r="16"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeDasharray="4 4"
            opacity="0"
            animate={{
              opacity: isSpecialHover ? 0.6 : isAnyHover ? 0.3 : 0,
              scale: isSpecialHover ? 1.4 : 1,
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              rotate: { repeat: Infinity, duration: 15, ease: 'linear' },
            }}
            style={{ originX: '50px', originY: '50px' }}
          />
        </svg>

        {/* 3. Immersive Floating Tooltip Label (Beige capsule) */}
        <AnimatePresence>
          {isSpecialHover && hoveredText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 28, y: 10 }}
              animate={{ opacity: 1, scale: 1, x: 34, y: 14 }}
              exit={{ opacity: 0, scale: 0.8, x: 28, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none flex items-center gap-1.5 bg-[#D8C3A5] px-2 py-0.5 rounded border border-[#C9B18A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              {/* Retro Blinking Red Dot inside target tag */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
              </span>
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#0B0B0B] whitespace-nowrap">
                {hoveredText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}