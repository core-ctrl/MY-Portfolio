'use client'

import { useEffect, useRef } from 'react'

const S = 3 // px per pixel cell

const COLOR: Record<number, string> = {
  1: '#0f172a',
  2: '#e0f2fe',
  3: '#22d3ee',
}

const ARROW: number[][] = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
  [1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
  [1, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0],
  [1, 2, 2, 1, 2, 2, 1, 0, 0, 0, 0],
  [1, 2, 1, 0, 1, 2, 2, 1, 0, 0, 0],
  [1, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
]

const POINTER: number[][] = [
  [0, 0, 3, 1, 0, 0, 0, 0, 0],
  [0, 1, 2, 2, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 1, 1, 0, 0, 0],
  [0, 1, 2, 2, 2, 2, 1, 0, 0],
  [0, 1, 2, 2, 2, 2, 2, 1, 0],
  [1, 1, 2, 2, 2, 2, 2, 1, 0],
  [1, 2, 2, 2, 2, 2, 2, 1, 0],
  [1, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 1, 0, 0],
  [0, 1, 2, 2, 2, 2, 1, 0, 0],
  [0, 0, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0],
]

function PixelShape({ grid }: { grid: number[][] }) {
  const w = grid[0].length * S
  const h = grid.length * S
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {grid.flatMap((row, r) =>
        row.map((v, c) =>
          v ? (
            <rect key={`${r},${c}`} x={c * S} y={r * S} width={S} height={S} fill={COLOR[v]} />
          ) : null
        )
      )}
    </svg>
  )
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)
  const isHover = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Inject global cursor:none
    const styleEl = document.createElement('style')
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(styleEl)

    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      // ARROW  hotspot → top-left tip pixel, offset = (0, 0)
      // POINTER hotspot → fingertip at col 2,  offset = (-2*S, 0)
      const offsetX = isHover.current ? S * 2 : 0
      cursorRef.current.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY}px)`
    }

    const show = (hover: boolean) => {
      isHover.current = hover
      if (arrowRef.current) arrowRef.current.style.display = hover ? 'none' : 'block'
      if (pointerRef.current) pointerRef.current.style.display = hover ? 'block' : 'none'
    }

    const onEnter = () => show(true)
    const onLeave = () => show(false)

    const hoverEls = document.querySelectorAll(
      'a, button, [data-hover], input, textarea, label, select'
    )
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.head.removeChild(styleEl)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        filter: 'drop-shadow(0 0 3px #22d3ee)',
        // Start off-screen
        transform: 'translate(-300px, -300px)',
      }}
    >
      <div ref={arrowRef}>
        <PixelShape grid={ARROW} />
      </div>
      <div ref={pointerRef} style={{ display: 'none' }}>
        <PixelShape grid={POINTER} />
      </div>
    </div>
  )
}
