"use client";

import React from "react";

interface HexagramData {
  number: number;
  nameEn: string;
  nameCn: string;
  judgment: string;
  lines: string[];
  binary: string;
}

interface HexagramDisplayProps {
  title: string;
  hexagram: HexagramData;
  language: "en" | "zh";
}

export const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ title, hexagram, language }) => {
  const binaryToLines = (binary: string) => {
    return binary.split("").map((bit) => (bit === "1" ? "━━━" : "━ ━"));
  };

  const lines = binaryToLines(hexagram.binary);

  return (
    <div className="p-6 bg-[#1e1e1e] rounded-lg">
      <h3 className="text-sm text-[#3a5f6e] mb-2">{title}</h3>
      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-1 text-2xl font-serif">
          {lines.map((line, index) => (
            <div key={index} className="text-center w-20">
              {line}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-serif font-bold mb-2">
            {hexagram.number}. {language === "en" ? hexagram.nameEn : hexagram.nameCn}
          </h4>
          <p className="text-[#e0e0e0] font-serif italic">{hexagram.judgment}</p>
        </div>
      </div>
    </div>
  );
};