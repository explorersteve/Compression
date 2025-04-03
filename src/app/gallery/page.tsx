import Image from 'next/image'

const images = [
  { id: 1, title: 'Urban Reflections' },
  { id: 2, title: "Nature's Patterns" },
  { id: 3, title: 'Abstract Forms' },
  { id: 4, title: 'City Lights' },
  { id: 5, title: 'Minimalist Landscapes' },
  { id: 6, title: 'Architectural Details' },
]

export default function Gallery() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <div className="relative h-64">
              <Image
                src={`/placeholder-gallery-${image.id}.jpg`}
                alt={image.title}
                fill
                className="object-cover rounded-lg transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 