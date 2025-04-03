'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Pixel rain effect
    const pixels: { x: number; y: number; speed: number }[] = []
    const pixelSize = 3
    const pixelCount = 300 // Increased number of pixels

    // Initialize pixels
    for (let i = 0; i < pixelCount; i++) {
      pixels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1
      })
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // Increased fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pixels.forEach((pixel) => {
        // Update position
        pixel.y += pixel.speed
        if (pixel.y > canvas.height) {
          pixel.y = 0
          pixel.x = Math.random() * canvas.width
        }

        // Draw pixel with increased opacity
        ctx.fillStyle = 'rgba(0, 255, 0, 0.4)' // Increased pixel opacity
        ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize)
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] text-white font-mono">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Compressionism"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
        backgroundSize: '100% 2px'
      }} />
      
      {/* CRT glow effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-10" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
      }} />

      {/* Pixel Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-20"
        style={{ 
          mixBlendMode: 'lighten',
          opacity: 0.8
        }}
      />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col">
        <section className="flex-1 flex items-center justify-center relative">
          <div className="relative text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wider font-['Press_Start_2P'] text-[#00ff00]">
              Compressionism
            </h1>
            <div className="relative">
              <p className="text-2xl md:text-3xl mb-6 text-[#00ff00] font-['VT323']">
                by <span className="glitch-text" data-text="Stephen Santoro">Stephen Santoro</span>
              </p>
              <style jsx>{`
                .glitch-text {
                  position: relative;
                  display: inline-block;
                  animation: glitch 0.3s infinite;
                }
                .glitch-text::before,
                .glitch-text::after {
                  content: attr(data-text);
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: transparent;
                  opacity: 0.7;
                }
                .glitch-text::before {
                  left: 1px;
                  text-shadow: -1px 0 rgba(255, 0, 255, 0.5);
                  animation: glitch-anim 0.3s infinite linear alternate-reverse;
                }
                .glitch-text::after {
                  left: -1px;
                  text-shadow: 1px 0 rgba(0, 255, 255, 0.5);
                  animation: glitch-anim2 0.3s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                  0% {
                    clip: rect(0, 9999px, 20px, 0);
                    transform: skew(0.2deg);
                  }
                  20% {
                    clip: rect(0, 9999px, 40px, 0);
                    transform: skew(-0.2deg);
                  }
                  40% {
                    clip: rect(0, 9999px, 60px, 0);
                    transform: skew(0.3deg);
                  }
                  60% {
                    clip: rect(0, 9999px, 80px, 0);
                    transform: skew(-0.3deg);
                  }
                  80% {
                    clip: rect(0, 9999px, 100px, 0);
                    transform: skew(0.2deg);
                  }
                  100% {
                    clip: rect(0, 9999px, 120px, 0);
                    transform: skew(-0.2deg);
                  }
                }
                @keyframes glitch-anim2 {
                  0% {
                    clip: rect(0, 9999px, 20px, 0);
                    transform: skew(-0.2deg);
                  }
                  20% {
                    clip: rect(0, 9999px, 40px, 0);
                    transform: skew(0.2deg);
                  }
                  40% {
                    clip: rect(0, 9999px, 60px, 0);
                    transform: skew(-0.3deg);
                  }
                  60% {
                    clip: rect(0, 9999px, 80px, 0);
                    transform: skew(0.3deg);
                  }
                  80% {
                    clip: rect(0, 9999px, 100px, 0);
                    transform: skew(-0.2deg);
                  }
                  100% {
                    clip: rect(0, 9999px, 120px, 0);
                    transform: skew(0.2deg);
                  }
                }
              `}</style>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-['VT323']">
              An emergent movement, immutably encoded and permanently compressed.
            </p>
            <a
              href="/gallery"
              className="inline-block px-8 py-3 border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors font-['VT323'] animate-pulse"
            >
              Enter Index
            </a>
          </div>
        </section>
      </div>
    </div>
  )
} 