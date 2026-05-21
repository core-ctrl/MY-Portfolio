'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  glowColor?: string
}

export default function Card3D({ children, className = '', onClick, glowColor = 'rgba(216, 195, 165, 0.18)' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // Track mouse coordinates relative to the card dimensions
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth out coordinate tracking
  const springConfig = { stiffness: 150, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Transform coordinates into degrees of rotation (max 10 degrees)
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-10, 10])

  // Track mouse position on the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate percentage position from the center (-0.5 to 0.5)
    const relativeX = (mouseX / width) - 0.5
    const relativeY = (mouseY / height) - 0.5

    x.set(relativeX)
    y.set(relativeY)
  };

  const handleMouseEnter = () => {
    setHovered(true)
  };

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative cursor-none select-none rounded-3xl ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full rounded-3xl"
      >
        {/* Glow effect tracking the mouse */}
        <div
          className="absolute -inset-[1px] rounded-3xl transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 80%)`,
            opacity: hovered ? 1 : 0,
            zIndex: 1,
          }}
        />
        <div className="w-full h-full relative z-10" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
