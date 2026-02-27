"use client";

import React, { useState, useCallback } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { HexagramDisplay } from "./HexagramDisplay";
import { getHexagramByBinary } from "@/data/hexagrams";
import type { Hexagram } from "@/types/iching";

type Language = "en" | "zh";

interface LineResult {
  value: number;
  isChanging: boolean;
  display: string;
}

interface ChangingLineInfo {
  lineNum: number;
  text: string;
}

interface ReadingResult {
  primaryHexagram: Hexagram | null;
  transformedHexagram: Hexagram | null;
  lines: LineResult[];
  changingLines: ChangingLineInfo[];
  primaryBinary: string;
  transformedBinary: string;
}

const translations = {
  en: {
    title: "I Ching",
    questionPlaceholder: "Ask your question (optional)",
    throwCoins: "Throw Coins",
    revealReading: "Reveal Reading",
    newReading: "New Reading",
    yourQuestion: "Your Question",
    primaryHexagram: "Primary Hexagram",
    changingLines: "Changing Lines",
    transformedHexagram: "Transformed Hexagram",
    noChangingLines: "No changing lines",
    noTransformation: "No transformation",
    line: "Line",
    youngYang: "Young Yang",
    youngYin: "Young Yin",
    oldYang: "Old Yang",
    oldYin: "Old Yin",
    changing: "Changing",
    stable: "Stable",
    binaryLabel: "Binary",
  },
  zh: {
    title: "易经",
    questionPlaceholder: "输入您的问题（可选）",
    throwCoins: "掷币",
    revealReading: "揭示卦象",
    newReading: "新卦",
    yourQuestion: "您的问题",
    primaryHexagram: "本卦",
    changingLines: "变爻",
    transformedHexagram: "变卦",
    noChangingLines: "无变爻",
    noTransformation: "无变卦",
    line: "爻",
    youngYang: "少阳",
    youngYin: "少阴",
    oldYang: "老阳",
    oldYin: "老阴",
    changing: "变",
    stable: "静",
    binaryLabel: "二进制",
  },
};

const IChingApp: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState<LineResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [readyToReveal, setReadyToReveal] = useState(false);
  const [result, setResult] = useState<ReadingResult | null>(null);

  const t = translations[language];

  const generateLine = useCallback((): LineResult => {
    const coins = [
      Math.random() < 0.5 ? 2 : 3,
      Math.random() < 0.5 ? 2 : 3,
      Math.random() < 0.5 ? 2 : 3,
    ];
    const sum = coins.reduce((a, b) => a + b, 0);
    
    let value: number;
    let isChanging: boolean;
    let display: string;

    if (sum === 6) {
      value = 6;
      isChanging = true;
      display = language === "en" ? "Old Yin" : "老阴";
    } else if (sum === 7) {
      value = 7;
      isChanging = false;
      display = language === "en" ? "Young Yang" : "少阳";
    } else if (sum === 8) {
      value = 8;
      isChanging = false;
      display = language === "en" ? "Young Yin" : "少阴";
    } else {
      value = 9;
      isChanging = true;
      display = language === "en" ? "Old Yang" : "老阳";
    }

    return { value, isChanging, display };
  }, [language]);

  const handleThrow = useCallback(() => {
    if (lines.length < 6) {
      const newLine = generateLine();
      const newLines = [...lines, newLine];
      setLines(newLines);

      if (newLines.length === 6) {
        setReadyToReveal(true);
      }
    } else if (readyToReveal) {
      const primaryBinary = lines.map(line => line.value === 7 || line.value === 9 ? "1" : "0").join("");
      const transformedBinary = lines.map(line => {
        if (line.value === 6) return "1";
        if (line.value === 9) return "0";
        return line.value === 7 || line.value === 9 ? "1" : "0";
      }).join("");

      const primaryHexagram = getHexagramByBinary(primaryBinary);
      const transformedHexagram = primaryBinary !== transformedBinary 
        ? getHexagramByBinary(transformedBinary) 
        : null;

      // Extract changing line texts from the primary hexagram
      const changingLines: ChangingLineInfo[] = lines
        .map((line, index) => {
          if ((line.value === 6 || line.value === 9) && primaryHexagram) {
            return {
              lineNum: index + 1,
              text: primaryHexagram.lines[index] || "",
            };
          }
          return null;
        })
        .filter((lineInfo): lineInfo is ChangingLineInfo => lineInfo !== null);

      setResult({
        primaryHexagram: primaryHexagram || null,
        transformedHexagram,
        lines,
        changingLines,
        primaryBinary,
        transformedBinary,
      });
      setIsComplete(true);
      setReadyToReveal(false);
    }
  }, [lines, readyToReveal, generateLine]);

  const handleReset = useCallback(() => {
    setLines([]);
    setIsComplete(false);
    setReadyToReveal(false);
    setResult(null);
    setQuestion("");
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]">
      <div className="max-w-[900px] mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#3a5f6e]">{t.title}</h1>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </header>

        <div className="space-y-6">
          {!isComplete && (
            <div className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm mb-2 text-[#e0e0e0]">
                  {t.questionPlaceholder}
                </label>
                <input
                  id="question"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#3a5f6e] rounded-lg text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#3a5f6e]"
                  placeholder={t.questionPlaceholder}
                />
              </div>

              <button
                onClick={handleThrow}
                className="w-full min-h-[48px] bg-[#3a5f6e] hover:bg-[#2d4a56] disabled:bg-[#2a2a2a] disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {lines.length === 0 
                  ? t.throwCoins 
                  : readyToReveal 
                    ? t.revealReading 
                    : `${t.throwCoins} (${lines.length}/6)`}
              </button>

              {lines.length > 0 && (
                <div className="space-y-2">
                  {lines.map((line, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-lg">
                      <span className="text-sm text-[#3a5f6e]">{t.line} {index + 1}:</span>
                      <span className="font-serif">{line.display}</span>
                      <span className={`ml-auto px-2 py-1 rounded text-xs font-medium ${
                        line.isChanging 
                          ? "bg-[#3a5f6e] text-white" 
                          : "bg-[#2a2a2a] text-[#888]"
                      }`}>
                        {line.isChanging ? t.changing : t.stable}
                      </span>
                      <span className="text-2xl">
                        {line.value === 7 || line.value === 9 ? "━━━" : "━ ━"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isComplete && result && (
            <div className="space-y-6">
              {question && (
                <div className="p-4 bg-[#1e1e1e] rounded-lg">
                  <h3 className="text-sm text-[#3a5f6e] mb-1">{t.yourQuestion}</h3>
                  <p className="font-serif">{question}</p>
                </div>
              )}

              {result.primaryHexagram ? (
                <HexagramDisplay 
                  title={t.primaryHexagram} 
                  hexagram={result.primaryHexagram} 
                  language={language}
                />
              ) : (
                <div className="p-6 bg-[#1e1e1e] rounded-lg">
                  <h3 className="text-sm text-[#3a5f6e] mb-2">{t.primaryHexagram}</h3>
                  <p className="text-[#888]">Hexagram not found for binary: {result.primaryBinary}</p>
                </div>
              )}

              <div className="p-4 bg-[#1e1e1e] rounded-lg">
                <h3 className="text-sm text-[#3a5f6e] mb-2">{t.changingLines}</h3>
                {result.changingLines.length > 0 ? (
                  <div className="space-y-4">
                    {result.changingLines.map((lineInfo) => (
                      <div key={lineInfo.lineNum} className="space-y-2">
                        <p className="font-serif text-[#3a5f6e] font-medium">
                          {t.line} {lineInfo.lineNum}
                        </p>
                        <p className="font-serif text-[#e0e0e0] italic">
                          {lineInfo.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#888]">{t.noChangingLines}</p>
                )}
              </div>

              {result.transformedHexagram ? (
                <HexagramDisplay 
                  title={t.transformedHexagram} 
                  hexagram={result.transformedHexagram} 
                  language={language}
                />
              ) : (
                <div className="p-4 bg-[#1e1e1e] rounded-lg">
                  <h3 className="text-sm text-[#3a5f6e] mb-1">{t.transformedHexagram}</h3>
                  <p className="text-[#888]">{t.noTransformation}</p>
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full min-h-[48px] bg-[#3a5f6e] hover:bg-[#2d4a56] text-white font-medium rounded-lg transition-colors"
              >
                {t.newReading}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IChingApp;