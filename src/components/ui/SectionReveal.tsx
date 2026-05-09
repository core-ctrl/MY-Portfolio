'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number  // ms
}

// ── SectionReveal ──────────────────────────────────────────────────────────
// Wraps any content; applies the CSS .reveal class which starts the element
// invisible and translated down. The .visible class is added via
// IntersectionObserver, triggering the CSS transition.
// This approach is performant — it's pure CSS transitions, no JS animation loop.
export default function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
