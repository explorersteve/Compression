'use client';

import { useState, useEffect } from 'react';

export default function EthPrice() {
  const [ethPrice, setEthPrice] = useState<string>('--');
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
          {
            headers: {
              Accept: 'application/json',
              'Cache-Control': 'no-cache',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data?.ethereum?.usd) {
          setEthPrice(
            data.ethereum.usd.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })
          );
        }
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        if (retryCount < 3) {
          setTimeout(
            () => {
              setRetryCount((prev) => prev + 1);
            },
            1000 * (retryCount + 1)
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [retryCount]);

  return (
    <div className="flex items-center gap-2 text-[#00ff00] font-['VT323']">
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
      </svg>
      <span className="font-medium">{isLoading ? '--' : ethPrice}</span>
    </div>
  );
}
