'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Alchemy, Network, Nft } from 'alchemy-sdk';

const CONTRACT_ADDRESS = '0xfd680E6ea493C7cB1e8a45ED54Cdd215F4846CeF';

interface Attribute {
  trait_type: string;
  value: string;
}

interface NFTMetadata {
  name?: string;
  image?: string;
  attributes?: Attribute[];
}

export default function Gallery() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const config = {
          apiKey: 'pIJsemLjqv--j987X_zM9TbCfG1HW9AK',
          network: Network.ETH_MAINNET,
        };
        const alchemy = new Alchemy(config);

        const response = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS);
        setNfts(response.nfts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch NFTs');
        setLoading(false);
        console.error('Error fetching NFTs:', err);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      {/* Scan lines overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* CRT glow effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-[20vh] flex items-center justify-center bg-[#0a0a0a] border-b border-[#00ff00]/20">
          <div className="relative text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#00ff00] tracking-wider font-['Press_Start_2P']">
              INDEX
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex-1">
          <section className="max-w-7xl mx-auto px-8 py-8">
            {loading ? (
              <div className="text-center text-[#00ff00] font-['VT323'] text-xl">
                Loading NFTs...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 font-['VT323'] text-xl">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nfts.map((nft) => {
                  const metadata = nft.raw?.metadata as NFTMetadata | undefined;
                  return (
                    <div
                      key={nft.tokenId}
                      className="bg-[#0a0a0a] border border-[#00ff00]/20 p-4 rounded-lg hover:border-[#00ff00] transition-colors"
                    >
                      <div className="relative w-full h-[300px] mb-4">
                        <Image
                          src={metadata?.image || '/placeholder.png'}
                          alt={metadata?.name || `NFT #${nft.tokenId}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain rounded-lg"
                          priority={false}
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-[#00ff00] font-['Press_Start_2P'] text-sm">
                          {metadata?.name || `NFT #${nft.tokenId}`}
                        </h3>
                        <p className="text-white/70 font-['VT323'] text-sm">
                          Token ID: {nft.tokenId}
                        </p>
                        {metadata?.attributes?.map((attr: Attribute, index: number) => (
                          <p key={index} className="text-white/70 font-['VT323'] text-sm">
                            {attr.trait_type}: {attr.value}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
