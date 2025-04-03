'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bone">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-onyx">Something went wrong!</h1>
        <p className="text-graphite">{error.message}</p>
        <button
          onClick={reset}
          className="inline-block bg-onyx text-bone py-2 px-4 rounded-lg hover:bg-electric transition-colors duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  )
} 