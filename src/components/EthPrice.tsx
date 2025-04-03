'use client'

import { useState, useEffect } from 'react'

export default function EthPrice() {
  const [ethPrice, setEthPrice] = useState<string>('--')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        const data = await response.json()
        setEthPrice(data.ethereum.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
      } catch (error) {
        console.error('Error fetching ETH price:', error)
        setEthPrice('--')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEthPrice()
    const interval = setInterval(fetchEthPrice, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <svg className="w-4 h-4 text-graphite" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#627EEA"/>
        <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.602"/>
        <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white"/>
        <path d="M12.3735 16.476V20.9963L18 13.212L12.3735 16.476Z" fill="white" fillOpacity="0.602"/>
        <path d="M12.3735 20.9963V16.4753L6.75 13.212L12.3735 20.9963Z" fill="white"/>
        <path d="M12.3735 15.4298L17.9963 12.165L12.3735 9.654V15.4298Z" fill="white" fillOpacity="0.2"/>
        <path d="M6.75 12.165L12.3735 15.4298V9.654L6.75 12.165Z" fill="white" fillOpacity="0.602"/>
      </svg>
      <span className="text-electric">{isLoading ? '--' : ethPrice}</span>
    </div>
  )
} 