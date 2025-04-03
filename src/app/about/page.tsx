import Image from 'next/image'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">About Compressionism</h1>
      
      <div className="relative h-96 w-full">
        <Image
          src="/placeholder-about.jpg"
          alt="About Image"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg">
        <h2>Artist Statement</h2>
        <p>
          Compressionism is an artistic exploration of the intersection between
          traditional photography and digital manipulation. Through careful
          composition and post-processing techniques, I create works that
          challenge the viewer's perception of reality while maintaining the
          emotional core of the original subject.
        </p>

        <h2>Background</h2>
        <p>
          With over a decade of experience in both traditional and digital
          photography, I've developed a unique style that combines technical
          precision with artistic expression. My work has been featured in
          various exhibitions and publications, showcasing the evolving nature
          of contemporary photography.
        </p>
      </div>
    </div>
  )
} 