import Image from 'next/image'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/placeholder-about.jpg"
            alt="About Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-onyx bg-opacity-70" />
        </div>
        <div className="relative text-center text-bone">
          <h1 className="text-4xl font-bold mb-4">About Compressionism</h1>
        </div>
      </section>

      <section className="prose prose-lg mx-auto">
        <p className="text-graphite">
          Welcome to Compressionism, where art meets technology. Founded by Steve, this platform showcases a unique blend of digital art and photography that explores the intersection of compression and artistic expression.
        </p>
        
        <h2 className="text-onyx font-bold">Our Vision</h2>
        <p className="text-graphite">
          We believe in pushing the boundaries of digital art through innovative techniques and creative exploration. Our work focuses on the beauty that emerges from the compression of digital information.
        </p>

        <h2 className="text-onyx font-bold">The Process</h2>
        <p className="text-graphite">
          Each piece is carefully crafted using a combination of traditional photography and digital manipulation techniques. We experiment with various compression algorithms to create unique visual effects that challenge conventional perceptions of digital art.
        </p>
      </section>
    </div>
  )
} 