'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const styleEl = document.createElement('style')
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(styleEl)

    let mouseX = -300, mouseY = -300
    let ringX = -300, ringY = -300
    let hovering = false
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    const hoverEls = document.querySelectorAll('a, button, [data-hover], input, textarea, label, select')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(${hovering ? 0 : 1})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${hovering ? 1.6 : 1})`
        ringRef.current.style.borderColor = hovering ? '#6a50ff' : '#22d3ee'
        ringRef.current.style.backgroundColor = hovering ? 'rgba(106,80,255,0.08)' : 'transparent'
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.head.removeChild(styleEl)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: '#22d3ee',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'transform 0.1s ease, opacity 0.2s ease',
          boxShadow: '0 0 8px #22d3ee',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid #22d3ee',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'border-color 0.3s ease, background-color 0.3s ease, transform 0.15s ease',
        }}
      />
    </>
  )
}