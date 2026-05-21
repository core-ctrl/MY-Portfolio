import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoSection from '@/components/sections/VideoSection'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Cinematic Gallery | Sai Harshitha',
  description: 'A collection of cinematic video edits, motion graphics, and event reels by Sai Harshitha.',
}

export default function VideoPage() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      
      <main className="min-h-screen bg-[var(--black)] pt-24 pb-12 relative">
        <div className="max-w-screen-xl mx-auto px-6 mb-8 mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase hover:text-[var(--cream)] transition-colors">
            <ArrowLeft size={14} /> Back to Origin
          </Link>
        </div>

        <VideoSection />
      </main>

      <Footer />
    </>
  )
}
