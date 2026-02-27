"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  rule: string;
}

interface ReadingResult {
  primaryHexagram: Hexagram | null;
  transformedHexagram: Hexagram | null;
  lines: LineResult[];
  changingLines: ChangingLineInfo[];
  primaryBinary: string;
  transformedBinary: string;
  changingLineCount: number;
  allLinesSpecial?: string;
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
    noChangingLines: "No changing lines - consult the Judgment and Image only",
    noTransformation: "No transformation",
    line: "Line",
    youngYang: "Young Yang",
    youngYin: "Young Yin",
    oldYang: "Old Yang",
    oldYin: "Old Yin",
    changing: "Changing",
    stable: "Stable",
    binaryLabel: "Binary",
    advice: "Advice",
    allLinesSpecial: "Special: All Lines Changing",
    viewLine: "View Line",
    hideLine: "Hide Line",
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
    noChangingLines: "无变爻 - 仅参考卦辞和象辞",
    noTransformation: "无变卦",
    line: "爻",
    youngYang: "少阳",
    youngYin: "少阴",
    oldYang: "老阳",
    oldYin: "老阴",
    changing: "变",
    stable: "静",
    binaryLabel: "二进制",
    advice: "建议",
    allLinesSpecial: "特例：六爻皆变",
    viewLine: "查看",
    hideLine: "隐藏",
  },
};

/**
 * Determines which line texts to display based on traditional I Ching rules
 * for changing lines (values 6 and 9).
 */
const getChangingLineTexts = (
  lines: LineResult[],
  primaryHexagram: Hexagram | null,
  transformedHexagram: Hexagram | null
): { changingLines: ChangingLineInfo[]; allLinesSpecial?: string } => {
  if (!primaryHexagram) {
    return { changingLines: [], allLinesSpecial: undefined };
  }

  // Find all changing lines (value 6 or 9)
  const changingIndices = lines
    .map((line, index) => (line.isChanging ? index : -1))
    .filter((index) => index !== -1);

  const changingLineCount = changingIndices.length;

  // Rule 7: 6 changing lines
  if (changingLineCount === 6) {
    // Special case for Hexagram 1 (all 9s) or Hexagram 2 (all 6s)
    const allNines = lines.every((line) => line.value === 9);
    const allSixes = lines.every((line) => line.value === 6);

    if (allNines && primaryHexagram.number === 1 && primaryHexagram.allLines) {
      return {
        changingLines: [],
        allLinesSpecial: primaryHexagram.allLines,
      };
    }

    if (allSixes && primaryHexagram.number === 2 && primaryHexagram.allLines) {
      return {
        changingLines: [],
        allLinesSpecial: primaryHexagram.allLines,
      };
    }

    // For 6 changing lines (not special case), show transformed hexagram only
    return { changingLines: [], allLinesSpecial: undefined };
  }

  // Rule 1: 0 changing lines
  if (changingLineCount === 0) {
    return { changingLines: [], allLinesSpecial: undefined };
  }

  // Rule 2: 1 changing line - display that specific line
  if (changingLineCount === 1) {
    const index = changingIndices[0];
    return {
      changingLines: [
        {
          lineNum: index + 1,
          text: primaryHexagram.lines[index] || "",
          rule: "One changing line",
        },
      ],
      allLinesSpecial: undefined,
    };
  }

  // Rule 3: 2 changing lines
  if (changingLineCount === 2) {
    const [firstIndex, secondIndex] = changingIndices;
    const firstLine = lines[firstIndex];
    const secondLine = lines[secondIndex];

    let selectedIndex: number;

    // Check if both lines are same type (both 6 or both 9)
    if (
      (firstLine.value === 6 && secondLine.value === 6) ||
      (firstLine.value === 9 && secondLine.value === 9)
    ) {
      // Same type: display the upper (higher position) line
      selectedIndex = Math.max(firstIndex, secondIndex);
    } else {
      // Different types: display the line with value 6
      selectedIndex = firstLine.value === 6 ? firstIndex : secondIndex;
    }

    return {
      changingLines: [
        {
          lineNum: selectedIndex + 1,
          text: primaryHexagram.lines[selectedIndex] || "",
          rule: "Two changing lines",
        },
      ],
      allLinesSpecial: undefined,
    };
  }

  // Rule 4: 3 changing lines - display the middle line
  if (changingLineCount === 3) {
    // The middle index of the three changing lines
    const middleIndex = changingIndices[1];
    return {
      changingLines: [
        {
          lineNum: middleIndex + 1,
          text: primaryHexagram.lines[middleIndex] || "",
          rule: "Three changing lines",
        },
      ],
      allLinesSpecial: undefined,
    };
  }

  // Rule 5: 4 changing lines - display the upper non-changing line
  if (changingLineCount === 4) {
    const nonChangingIndices = lines
      .map((line, index) => (!line.isChanging ? index : -1))
      .filter((index) => index !== -1);

    // Get the upper (highest position) non-changing line
    const upperNonChangingIndex = Math.max(...nonChangingIndices);

    return {
      changingLines: [
        {
          lineNum: upperNonChangingIndex + 1,
          text: primaryHexagram.lines[upperNonChangingIndex] || "",
          rule: "Four changing lines",
        },
      ],
      allLinesSpecial: undefined,
    };
  }

  // Rule 6: 5 changing lines - display the only non-changing line
  if (changingLineCount === 5) {
    const nonChangingIndex = lines.findIndex((line) => !line.isChanging);

    if (nonChangingIndex !== -1) {
      return {
        changingLines: [
          {
            lineNum: nonChangingIndex + 1,
            text: primaryHexagram.lines[nonChangingIndex] || "",
            rule: "Five changing lines",
          },
        ],
        allLinesSpecial: undefined,
      };
    }
  }

  return { changingLines: [], allLinesSpecial: undefined };
};

const IChingApp: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState<LineResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [readyToReveal, setReadyToReveal] = useState(false);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [expandedLines, setExpandedLines] = useState<number[]>([]);

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

  // Auto-expand the correct changing lines when result is ready
  useEffect(() => {
    if (result && result.changingLines.length > 0) {
      const lineNumbers = result.changingLines.map((cl) => cl.lineNum);
      setExpandedLines(lineNumbers);
    } else if (result && result.allLinesSpecial) {
      // For special case, expand all lines
      setExpandedLines([1, 2, 3, 4, 5, 6]);
    } else {
      setExpandedLines([]);
    }
  }, [result]);

  const toggleLine = useCallback((lineNum: number) => {
    setExpandedLines((prev) =>
      prev.includes(lineNum)
        ? prev.filter((n) => n !== lineNum)
        : [...prev, lineNum]
    );
  }, []);

  const handleThrow = useCallback(() => {
    if (lines.length < 6) {
      const newLine = generateLine();
      const newLines = [...lines, newLine];
      setLines(newLines);

      if (newLines.length === 6) {
        setReadyToReveal(true);
      }
    } else if (readyToReveal) {
      // Binary is stored top-to-bottom (line 6 to line 1) in data files
      // lines array is bottom-to-top (line 1 to line 6)
      // So we need to reverse the order when building binary
      const primaryBinary = lines
        .map((line) => (line.value === 7 || line.value === 9 ? "1" : "0"))
        .reverse()
        .join("");
      
      const transformedBinary = lines
        .map((line) => {
          if (line.value === 6) return "1";
          if (line.value === 9) return "0";
          return line.value === 7 || line.value === 9 ? "1" : "0";
        })
        .reverse()
        .join("");

      const primaryHexagram = getHexagramByBinary(primaryBinary);
      const transformedHexagram =
        primaryBinary !== transformedBinary
          ? getHexagramByBinary(transformedBinary)
          : null;

      // Get changing line texts based on traditional rules
      const { changingLines, allLinesSpecial } = getChangingLineTexts(
        lines,
        primaryHexagram || null,
        transformedHexagram || null
      );

      const changingLineCount = lines.filter((line) => line.isChanging).length;

      setResult({
        primaryHexagram: primaryHexagram || null,
        transformedHexagram,
        lines,
        changingLines,
        primaryBinary,
        transformedBinary,
        changingLineCount,
        allLinesSpecial,
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
    setExpandedLines([]);
    setQuestion("");
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]">
      <div className="max-w-[900px] mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#3a5f6e]">
            {t.title}
          </h1>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </header>

        <div className="space-y-6">
          {!isComplete && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="question"
                  className="block text-sm mb-2 text-[#e0e0e0]"
                >
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
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-lg"
                    >
                      <span className="text-sm text-[#3a5f6e]">
                        {t.line} {index + 1}:
                      </span>
                      <span className="font-serif">{line.display}</span>
                      <span
                        className={`ml-auto px-2 py-1 rounded text-xs font-medium ${
                          line.isChanging
                            ? "bg-[#3a5f6e] text-white"
                            : "bg-[#2a2a2a] text-[#888]"
                        }`}
                      >
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
                  <h3 className="text-sm text-[#3a5f6e] mb-1">
                    {t.yourQuestion}
                  </h3>
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
                  <h3 className="text-sm text-[#3a5f6e] mb-2">
                    {t.primaryHexagram}
                  </h3>
                  <p className="text-[#888]">
                    Hexagram not found for binary: {result.primaryBinary}
                  </p>
                </div>
              )}

              <div className="p-4 bg-[#1e1e1e] rounded-lg">
                <h3 className="text-sm text-[#3a5f6e] mb-3">
                  {t.changingLines} ({result.changingLineCount})
                </h3>
                
                {result.allLinesSpecial ? (
                  <div className="space-y-2">
                    <p className="font-serif text-[#3a5f6e] font-medium">
                      {t.allLinesSpecial}
                    </p>
                    <p className="font-serif text-[#e0e0e0] italic">
                      {result.allLinesSpecial}
                    </p>
                  </div>
                ) : result.primaryHexagram ? (
                  <div className="space-y-3">
                    {/* Display all 6 lines as interactive buttons - reversed order (line 6 at top, line 1 at bottom) */}
                    {[...result.primaryHexagram.lines].reverse().map((lineText, reverseIndex) => {
                      const lineNum = 6 - reverseIndex; // Convert reversed index back to line number (6, 5, 4, 3, 2, 1)
                      const lineResult = result.lines[lineNum - 1]; // Get the line result (0-indexed)
                      const isExpanded = expandedLines.includes(lineNum);
                      const isChanging = lineResult?.isChanging;
                      const isRecommended = result.changingLines.some(
                        (cl) => cl.lineNum === lineNum
                      );

                      return (
                        <div
                          key={lineNum}
                          className={`border rounded-lg overflow-hidden ${
                            isChanging
                              ? "border-[#3a5f6e]"
                              : "border-[#2a2a2a]"
                          }`}
                        >
                          <button
                            onClick={() => toggleLine(lineNum)}
                            className={`w-full flex items-center justify-between p-3 transition-colors ${
                              isExpanded
                                ? "bg-[#2a2a2a]"
                                : "bg-[#1e1e1e] hover:bg-[#252525]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`font-serif ${
                                  isChanging ? "font-bold text-[#3a5f6e]" : ""
                                }`}
                              >
                                {t.line} {lineNum}
                              </span>
                              {isChanging && (
                                <span className="px-2 py-0.5 bg-[#3a5f6e] text-white text-xs rounded font-medium">
                                  {t.changing}
                                </span>
                              )}
                              {isRecommended && !isChanging && (
                                <span className="px-2 py-0.5 bg-[#2a4a56] text-white text-xs rounded font-medium">
                                  {t.advice}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-[#888]">
                              {isExpanded ? t.hideLine : t.viewLine}
                            </span>
                          </button>
                          {isExpanded && (
                            <div className="p-4 bg-[#1a1a1a] border-t border-[#2a2a2a]">
                              <p className="font-serif text-[#e0e0e0] italic">
                                {lineText}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                  <h3 className="text-sm text-[#3a5f6e] mb-1">
                    {t.transformedHexagram}
                  </h3>
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