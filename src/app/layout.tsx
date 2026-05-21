import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import SmoothScroll from '@/components/layout/SmoothScroll'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import PixelCat from '@/components/ui/PixelCat'

export const metadata: Metadata = {
  title: 'Sai Harshitha — Developer · Video Editor · Powerlifter',
  description:
    'CS & IT student building real-world tech products, crafting cinematic video edits, and competing in powerlifting. Full-stack developer at KL University.',
  keywords: ['Sai Harshitha', 'Portfolio', 'Full-Stack Developer', 'Video Editor', 'KL University', 'React'],
  authors: [{ name: 'Parupalli Sai Harshitha' }],
  openGraph: {
    title: 'Sai Harshitha — Developer · Editor · Powerlifter',
    description: 'Living at the intersection of code, creativity, and discipline.',
    type: 'website',
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=JetBrains+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden min-h-screen">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <PixelCat />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
