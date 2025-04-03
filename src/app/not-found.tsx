import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bone">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-onyx">404</h1>
        <h2 className="text-2xl font-semibold text-graphite">Page Not Found</h2>
        <p className="text-graphite">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block bg-onyx text-bone py-2 px-4 rounded-lg hover:bg-electric transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 