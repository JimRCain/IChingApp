"use client";

import React from "react";

interface CoinTossProps {
  tossNumber: number;
}

export const CoinToss: React.FC<CoinTossProps> = ({ tossNumber }) => {
  return (
    <div className="flex justify-center items-center gap-4 p-6">
      {[1, 2, 3].map((coin) => (
        <div
          key={coin}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg animate-pulse"
        />
      ))}
    </div>
  );
};