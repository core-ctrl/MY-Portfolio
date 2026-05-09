'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── LoadingScreen ──────────────────────────────────────────────────────────
// Displays a cinematic loading animation, then fades out.
// Shows once per session using sessionStorage.
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only show loading screen once per session
    if (sessionStorage.getItem('loaded')) {
      setVisible(false)
      return
    }

    // Animate progress bar
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          sessionStorage.setItem('loaded', 'true')
        }, 400)
      }
      setProgress(Math.min(current, 100))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-900"
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background blobs */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #6a50ff, transparent)' }}
          />

          {/* Animated logo mark */}
          <motion.div
            className="relative mb-10"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer ring */}
            <motion.div
              className="w-20 h-20 rounded-full border border-brand-500/30 absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner ring */}
            <motion.div
              className="w-16 h-16 rounded-full border border-accent-400/40 absolute"
              style={{ top: 8, left: 8 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            {/* Center */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              <span
                className="text-2xl font-display font-light gradient-text"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                SH
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            className="loader-text mb-8 tracking-widest"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Sai Harshitha
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-px bg-surface-600 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #6a50ff, #22d3ee)',
                width: `${progress}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* Percent */}
          <motion.p
            className="mt-3 text-xs font-mono text-surface-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
