import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sai Harshitha — Developer · Video Editor · Powerlifter',
  description:
    'CS & IT student building real-world tech products, crafting cinematic video edits, and competing in powerlifting. Full-stack developer at KL University.',
  keywords: ['Sai Harshitha', 'Portfolio', 'Full-Stack Developer', 'Video Editor', 'KL University', 'React', 'AWS'],
  authors: [{ name: 'Parupalli Sai Harshitha' }],
  openGraph: {
    title: 'Sai Harshitha — Developer · Editor · Powerlifter',
    description: 'Living at the intersection of code, creativity, and discipline.',
    type: 'website',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preload Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
