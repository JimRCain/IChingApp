"use client";

import React from "react";
import type { Hexagram } from "@/types/iching";

interface HexagramDisplayProps {
  title: string;
  hexagram: Hexagram;
  language: "en" | "zh";
}

export const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ title, hexagram, language }) => {
  return (
    <div className="p-6 bg-[#1e1e1e] rounded-lg space-y-4">
      <h3 className="text-sm text-[#3a5f6e] mb-2">{title}</h3>
      
      <div className="flex items-start gap-6 mb-4">
        <div className="flex flex-col gap-1 text-2xl font-serif">
          {hexagram.lines.map((_, index) => (
            <div key={index} className="text-center w-20 text-[#e0e0e0]">
              {hexagram.binary.split("")[index] === "1" ? "━━━" : "━ ━"}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-serif font-bold mb-2">
            {hexagram.number}. {hexagram.name}
          </h4>
          <p className="text-[#3a5f6e] text-lg font-serif mb-2">{hexagram.ancient.chinese}</p>
          <p className="text-[#888] text-xs italic">{hexagram.ancient.rendering}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-semibold text-[#3a5f6e] mb-1">Heart:</h5>
          <p className="text-[#e0e0e0] font-serif italic">{hexagram.heart}</p>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold text-[#3a5f6e] mb-1">Judgment:</h5>
          <p className="text-[#e0e0e0] font-serif">{hexagram.judgment}</p>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold text-[#3a5f6e] mb-1">Image:</h5>
          <p className="text-[#e0e0e0] font-serif">{hexagram.image}</p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-[#3a5f6e] mb-1">Trigrams:</h5>
          <div className="text-[#e0e0e0] font-serif space-y-2">
            <p><span className="text-[#3a5f6e]">Upper:</span> {hexagram.trigrams.upper.name} - {hexagram.trigrams.upper.nature}</p>
            <p><span className="text-[#3a5f6e]">Lower:</span> {hexagram.trigrams.lower.name} - {hexagram.trigrams.lower.nature}</p>
            <p className="italic text-[#888]">{hexagram.trigrams.description}</p>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-[#3a5f6e] mb-1">Taoist Reflection:</h5>
          <p className="text-[#e0e0e0] font-serif italic">{hexagram.taoist_reflection}</p>
        </div>
      </div>
    </div>
  );
};