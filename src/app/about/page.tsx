import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-[#00ff00] w-full animate-[scanline_3s_linear_infinite]"
            style={{
              top: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>

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
        {/* Header Section */}
        <section className="relative h-[20vh] flex items-center justify-center bg-[#0a0a0a] border-b border-[#00ff00]/20">
          <div className="relative text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#00ff00] tracking-wider font-['Press_Start_2P']">
              ABOUT
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-black/80 border border-[#00ff00]/20 p-8 backdrop-blur-sm">
            <div className="space-y-8 text-lg font-['VT323']">
              <p className="text-[#00ff00]/90 leading-relaxed">
                Compressionism is an emergent digital art movement on the blockchain that embraces file compression as a medium. By intentionally reducing file size, artists highlight the artifacts, pixelation, distortion, and algorithms that emerge which lean into the constraints that blockchains provide. Compression occurs at many steps in the process and can vary by many degrees. My implementation is just one of many ways to work as a self-proclaimed compressionist.
              </p>
              
              <p className="text-[#00ff00]/90 leading-relaxed">
                This site is my way of documenting the moment. I'm tired of asking for permission, and writing essays no one reads. I'm minting, indexing, and distributing the work as it pop into my brain. This is about moving the space forward—own it, cherish it, and help me push it further.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 