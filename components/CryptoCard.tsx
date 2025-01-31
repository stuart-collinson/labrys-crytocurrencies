"use client";
import React from "react";

interface CryptoCardProps {
  rank: number;
  icon: string;
  name: string;
  volume: string;
  price: string;
  dailyPercentage: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  rank,
  icon,
  name,
  volume,
  price,
  dailyPercentage,
}) => {
  const isPositive = parseFloat(dailyPercentage) >= 0;

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-md w-full">
      {/* Left Side: Rank & Icon */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 font-bold text-lg">#{rank}</span>
        <img src={icon} alt={name} className="w-8 h-8 rounded-full" />
        <div>
          <p className="text-white font-bold text-lg">{name}</p>
          <p className="text-gray-400 text-sm">{volume} Bn</p>
        </div>
      </div>

      {/* Right Side: Price & Percentage */}
      <div className="flex items-center space-x-4">
        <p className="text-white font-bold text-lg">{price}</p>
        <span
          className={`text-sm font-bold px-2 py-1 rounded-md ${
            isPositive ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {isPositive ? "▲" : "▼"} {dailyPercentage}%
        </span>
      </div>
    </div>
  );
};

export default CryptoCard;
