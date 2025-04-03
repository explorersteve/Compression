import React from 'react'
import type { Metadata } from 'next'
import { VT323, Press_Start_2P } from 'next/font/google'
import './globals.css'
import GasPrice from '@/components/GasPrice'
import EthPrice from '@/components/EthPrice'
import Link from 'next/link'

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
})

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
})

export const metadata: Metadata = {
  title: 'Compressionism',
  description: 'Digital Art and Photography by Stephen Santoro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${pressStart2P.variable}`}>
      <body className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Scan lines overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
          backgroundSize: '100% 2px'
        }} />
        
        {/* CRT glow effect */}
        <div className="fixed inset-0 pointer-events-none opacity-5" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
        }} />

        <div className="relative z-10">
          <nav className="bg-black border-b border-[#333] py-4">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-xl font-bold hover:text-[#ff69b4] transition-colors font-['Press_Start_2P']">
                  Compressionism
                </a>
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-bone hover:text-electric transition-colors">
                    Home
                  </Link>
                  <Link href="/gallery" className="text-bone hover:text-electric transition-colors">
                    Index
                  </Link>
                  <Link href="/about" className="text-bone hover:text-electric transition-colors">
                    About
                  </Link>
                  <div className="flex items-center gap-6">
                    <GasPrice />
                    <EthPrice />
                  </div>
                  <a
                    href="https://x.com/compressionism"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone hover:text-electric transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <footer className="bg-black border-t border-[#333] py-8">
            <div className="container mx-auto px-4 text-center text-white/70 font-['VT323']">
              <p>&copy; {new Date().getFullYear()} Compressionism. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 