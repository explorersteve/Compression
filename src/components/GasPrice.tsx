'use client';

import { useState, useEffect } from 'react';

export default function GasPrice() {
  const [gasPrice, setGasPrice] = useState<string>('--');
  const [isLoading, setIsLoading] = useState(true);

  const fetchGasPrice = async () => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=SEFN52ZG3AGY9B6HSD2QIFHKJEN23V4FXD`
      );
      const data = await response.json();
      if (data.status === '1' && data.result) {
        // Ensure we only show 2 decimal places
        const price = Number(data.result.SafeGasPrice).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        setGasPrice(price);
      }
    } catch (error) {
      console.error('Error fetching gas price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-[#00ff00] font-['VT323']">
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 22H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 22V4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium">{isLoading ? '--' : gasPrice} gwei</span>
    </div>
  );
}
