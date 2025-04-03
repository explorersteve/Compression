import Image from 'next/image'

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/placeholder-hero.jpg"
            alt="Contact Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-onyx bg-opacity-70" />
        </div>
        <div className="relative text-center text-bone">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with us for inquiries, collaborations, or just to say hello!</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-onyx">Contact Information</h2>
          <div className="space-y-2">
            <p className="text-graphite">
              <span className="font-semibold text-onyx">Email:</span> info@compressionism.com
            </p>
            <p className="text-graphite">
              <span className="font-semibold text-onyx">Location:</span> Based in the Digital Realm
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-onyx mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-fog rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-onyx mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-fog rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-onyx mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-fog rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-onyx text-bone py-2 px-4 rounded-lg hover:bg-electric transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  )
} 