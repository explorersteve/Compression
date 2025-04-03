import Image from 'next/image'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/placeholder-hero.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Compressionism</h1>
          <p className="text-xl">Art and Photography by Steve</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="relative h-64">
            <Image
              src={`/placeholder-${item}.jpg`}
              alt={`Featured Image ${item}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </section>
    </div>
  )
} 