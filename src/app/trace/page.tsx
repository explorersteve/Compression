'use client'

import { useState, useEffect } from 'react'

interface OwnerInfo {
  address: string
  tokenCount: number
  tokenIds: string[]
}

export default function Trace() {
  const [owners, setOwners] = useState<OwnerInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalOwners: 0,
    contractAddress: '0x0c142C68D718791484284905C699Bec69bBBE423'
  })

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // First, get all NFTs from the contract
        const params = new URLSearchParams({
          contractAddress: stats.contractAddress,
          withMetadata: 'true',
          pageSize: '100'
        })

        const response = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/pIJsemLjqv--j987X_zM9TbCfG1HW9AK/getNFTsForContract?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('API Error:', errorData)
          throw new Error(`API Error: ${errorData.message || 'Failed to fetch tokens'}`)
        }

        const data = await response.json()
        console.log('API Response:', data)

        if (data.nfts) {
          // Process each token to get owner info
          const ownerMap = new Map<string, OwnerInfo>()
          
          for (const nft of data.nfts) {
            // Get owner using Alchemy's getOwnersForToken endpoint
            const ownerResponse = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/pIJsemLjqv--j987X_zM9TbCfG1HW9AK/getOwnersForToken?contractAddress=${nft.contract.address}&tokenId=${nft.id.tokenId}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              }
            })

            let owner = 'Unknown'
            if (ownerResponse.ok) {
              const ownerData = await ownerResponse.json()
              if (ownerData.owners && ownerData.owners.length > 0) {
                owner = ownerData.owners[0]
              }
            }

            // Convert token ID to decimal
            const tokenId = parseInt(nft.id.tokenId, 16).toString()

            if (!ownerMap.has(owner)) {
              ownerMap.set(owner, {
                address: owner,
                tokenCount: 0,
                tokenIds: []
              })
            }

            const ownerInfo = ownerMap.get(owner)!
            ownerInfo.tokenCount++
            ownerInfo.tokenIds.push(tokenId)
          }

          // Convert map to array and sort by token count
          const ownersArray = Array.from(ownerMap.values())
          ownersArray.sort((a, b) => b.tokenCount - a.tokenCount)

          setOwners(ownersArray)
          setStats(prev => ({
            ...prev,
            totalTokens: data.nfts.length,
            totalOwners: ownersArray.length
          }))
        } else {
          setError('No token data available')
        }
      } catch (err) {
        console.error('Error fetching tokens:', err)
        setError(err instanceof Error ? err.message : 'Failed to load token data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
    const interval = setInterval(fetchTokens, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [stats.contractAddress])

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono relative overflow-hidden">
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
        backgroundSize: '100% 2px'
      }} />
      
      {/* CRT glow effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
      }} />

      {/* Animated grid effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.3]" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'gridMove 10s linear infinite'
      }} />

      <style jsx global>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="relative h-[20vh] flex items-center justify-center bg-[#0a0a0a] border-b border-[#00ff00]/20">
          <div className="relative text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#00ff00] tracking-wider font-['Press_Start_2P']">
              TRACE
            </h1>
            <div className="flex items-center justify-center gap-4 text-xl md:text-2xl text-white/90 font-['VT323']">
              <span className="text-[#00ff00]">OWNERS</span>
              <span className="text-white/50">|</span>
              <span className="text-[#00ff00]">TOKENS OWNED</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/80 border border-[#00ff00]/20 p-4 text-center">
              <div className="text-[#00ff00] font-['Press_Start_2P'] text-sm mb-2">ARTWORKS CREATED</div>
              <div className="text-white/90 font-['VT323'] text-2xl">{stats.totalTokens}</div>
            </div>
            <div className="bg-black/80 border border-[#00ff00]/20 p-4 text-center">
              <div className="text-[#00ff00] font-['Press_Start_2P'] text-sm mb-2">OWNER COUNT</div>
              <div className="text-white/90 font-['VT323'] text-2xl">{stats.totalOwners}</div>
            </div>
            <div className="bg-black/80 border border-[#00ff00]/20 p-4 text-center">
              <div className="text-[#00ff00] font-['Press_Start_2P'] text-sm mb-2">CONTRACT</div>
              <a 
                href={`https://etherscan.io/address/${stats.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 font-['VT323'] text-2xl hover:text-[#00ff00] transition-colors"
              >
                {shortenAddress(stats.contractAddress)}
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-black/80 border border-[#00ff00]/20 p-8 backdrop-blur-sm">
            {isLoading ? (
              <div className="text-center text-[#00ff00] font-['VT323']">
                <p>LOADING TOKEN DATA...</p>
              </div>
            ) : error ? (
              <div className="text-center text-[#00ff00] font-['VT323']">
                <p>{error}</p>
              </div>
            ) : owners.length === 0 ? (
              <div className="text-center text-[#00ff00] font-['VT323']">
                <p>NO TOKENS FOUND</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-[#00ff00] font-['Press_Start_2P'] text-sm border-b border-[#00ff00]/20 pb-2">
                  <div>OWNER</div>
                  <div>TOKENS OWNED</div>
                </div>
                {owners.map((owner) => (
                  <div key={owner.address} className="grid grid-cols-2 gap-4 text-white/90 font-['VT323'] text-sm border-b border-[#00ff00]/20 pb-2">
                    <div className="truncate">{owner.address}</div>
                    <div>{owner.tokenCount}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
} 