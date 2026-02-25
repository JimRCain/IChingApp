"use client";

import React from "react";

interface LanguageToggleProps {
  language: "en" | "zh";
  setLanguage: (lang: "en" | "zh") => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <button
      onClick={() => setLanguage(language === "en" ? "zh" : "en")}
      className="px-4 py-2 bg-[#1e1e1e] border border-[#3a5f6e] rounded-lg text-[#e0e0e0] hover:bg-[#2a2a2a] transition-colors min-h-[48px]"
    >
      {language === "en" ? "中文" : "English"}
    </button>
  );
};