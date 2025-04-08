'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Artwork {
  id: string;
  title: string;
  image: string;
  tokenId: string;
  contract: string;
  status: string;
  dataSize: string;
  description: string;
}

interface Filters {
  availability: string;
  dataSize: string;
}

export default function Gallery() {
  const [filters, setFilters] = useState<Filters>({
    availability: 'all',
    dataSize: 'all',
  });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Mock data - replace with your actual data
  const artworks: Artwork[] = [
    {
      id: '1',
      title: 'Digital Artwork 1',
      image: '/placeholder-gallery-1.jpg',
      tokenId: '1234',
      contract: '0x1234...5678',
      status: 'Available',
      dataSize: 'small',
      description:
        'A unique digital artwork exploring the boundaries of compression.',
    },
    {
      id: '2',
      title: 'Digital Artwork 2',
      image: '/placeholder-gallery-2.jpg',
      tokenId: '1235',
      contract: '0x1234...5679',
      status: 'Available',
      dataSize: 'medium',
      description: 'Exploring the intersection of digital and physical spaces.',
    },
    {
      id: '3',
      title: 'Digital Artwork 3',
      image: '/placeholder-gallery-3.jpg',
      tokenId: '1236',
      contract: '0x1234...5680',
      status: 'Sold',
      dataSize: 'large',
      description: 'A study in digital minimalism and compression.',
    },
  ];

  const filteredArtworks = artworks.filter((artwork) => {
    if (
      filters.availability !== 'all' &&
      artwork.status.toLowerCase() !== filters.availability
    ) {
      return false;
    }
    if (filters.dataSize !== 'all' && artwork.dataSize !== filters.dataSize) {
      return false;
    }
    return true;
  });

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
            <div className="flex items-center justify-center gap-4 text-xl md:text-2xl text-white/90 font-['VT323']">
              <span className="text-[#00ff00]">AVAILABLE</span>
              <span className="text-white/50">|</span>
              <span className="text-[#00ff00]">AUCTIONED</span>
              <span className="text-white/50">|</span>
              <span className="text-[#00ff00]">ARCHIVED</span>
            </div>
          </div>
        </section>

        {/* Main Content with Filters */}
        <div className="flex">
          {/* Fixed Filters Sidebar */}
          <div className="w-64 fixed left-0 h-[calc(100vh-20vh)] overflow-y-auto bg-[#0a0a0a] border-r border-[#00ff00]/20 p-6">
            <h2 className="text-lg font-semibold text-[#00ff00] mb-6 font-['Press_Start_2P'] tracking-wider">
              FILTERS
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#00ff00] mb-2">
                  Availability
                </label>
                <select
                  className="w-full bg-black/50 border border-[#00ff00] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ff00]"
                  value={filters.availability}
                  onChange={(e) =>
                    setFilters({ ...filters, availability: e.target.value })
                  }
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#00ff00] mb-2">
                  Data Size
                </label>
                <select
                  className="w-full bg-black/50 border border-[#00ff00] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ff00]"
                  value={filters.dataSize}
                  onChange={(e) =>
                    setFilters({ ...filters, dataSize: e.target.value })
                  }
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-8 py-8">
              {filteredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative w-full pb-[100%] bg-[#0a0a0a]">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                      <div className="text-center space-y-2">
                        <p className="text-[#00ff00] font-['VT323']">
                          Token ID: #{artwork.tokenId}
                        </p>
                        <p className="text-[#00ff00] font-['VT323']">
                          Contract: {artwork.contract}
                        </p>
                        <p className="text-[#00ff00] font-['VT323']">
                          Status: {artwork.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="font-bold text-[#00ff00] font-['Press_Start_2P'] text-sm">
                      STEPHEN SANTORO
                    </p>
                    <p className="text-white/90 font-['VT323']">
                      The Start of the New Age, 2025
                    </p>
                    <p className="text-white/70 font-['VT323'] text-sm">
                      Photoshop and ChatGPT
                    </p>
                    <p className="text-white/70 font-['VT323'] text-sm">
                      2,000 x 2,000
                    </p>
                    <p className="text-white/70 font-['VT323'] text-sm">10kb</p>
                    <p className="text-white/70 font-['VT323'] text-sm">
                      1.05 gwei
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      {/* Artwork Popup */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
          <div className="relative max-w-6xl w-full bg-[#0a0a0a] border border-[#00ff00] p-8">
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 text-[#00ff00] hover:text-white transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative aspect-square">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#00ff00]">
                  {selectedArtwork.title}
                </h2>
                <div className="space-y-3">
                  <p className="text-white/80 text-lg">
                    <span className="text-[#00ff00]">Token ID:</span>{' '}
                    {selectedArtwork.tokenId}
                  </p>
                  <p className="text-white/80 text-lg">
                    <span className="text-[#00ff00]">Contract:</span>{' '}
                    {selectedArtwork.contract}
                  </p>
                  <p className="text-white/80 text-lg">
                    <span className="text-[#00ff00]">Status:</span>{' '}
                    {selectedArtwork.status}
                  </p>
                  <p className="text-white/80 text-lg">
                    <span className="text-[#00ff00]">Data Size:</span>{' '}
                    {selectedArtwork.dataSize}
                  </p>
                </div>
                <p className="text-white/80 text-lg">
                  {selectedArtwork.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
