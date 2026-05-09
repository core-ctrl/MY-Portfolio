'use client'

// ── ScrollProgress ─────────────────────────────────────────────────────────
// A thin gradient bar at the top of the viewport that fills
// as the user scrolls. Width is driven by the CSS variable
// --scroll-progress set in page.tsx via a scroll listener.
export default function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />
}
