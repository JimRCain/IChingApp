"use client";

import { useState } from "react";
import ichingData from "@/data/iching-data.json";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CoinToss {
  value: number;
  isChanging: boolean;
}

interface LineResult {
  value: number;
  isChanging: boolean;
}

type Hexagram = (typeof ichingData.hexagrams)[0];

const IChingApp = () => {
  const [lines, setLines] = useState<LineResult[]>([]);
  const [currentToss, setCurrentToss] = useState(0);
  const [result, setResult] = useState<Hexagram | null>(null);
  const [transformedHexagram, setTransformedHexagram] = useState<Hexagram | null>(null);
  const [isDivining, setIsDivining] = useState(false);

  const tossCoins = (): CoinToss => {
    const value = Math.random() < 0.5 ? 2 : 3;
    return {
      value,
      isChanging: false,
    };
  };

  const handleToss = () => {
    if (currentToss >= 6) return;

    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += tossCoins().value;
    }

    let lineValue: number;
    let isChanging = false;

    if (sum === 6) {
      lineValue = 6;
      isChanging = true;
    } else if (sum === 7) {
      lineValue = 7;
    } else if (sum === 8) {
      lineValue = 8;
    } else {
      lineValue = 9;
      isChanging = true;
    }

    const newLines = [...lines, { value: lineValue, isChanging }];
    setLines(newLines);
    setCurrentToss(currentToss + 1);

    if (currentToss + 1 === 6) {
      let hexNumber = 0;
      let transformedNumber = 0;

      for (let i = 0; i < 6; i++) {
        const line = newLines[i];
        const primaryBit = line.value === 7 || line.value === 9 ? 1 : 0;
        let transformedBit = primaryBit;
        if (line.value === 6) {
          transformedBit = 1;
        } else if (line.value === 9) {
          transformedBit = 0;
        }

        hexNumber += primaryBit * Math.pow(2, i);
        transformedNumber += transformedBit * Math.pow(2, i);
      }

      const primaryHexagram = ichingData.hexagrams.find((h) => h.number === hexNumber + 1);
      const transformedHex = ichingData.hexagrams.find((h) => h.number === transformedNumber + 1);

      setResult(primaryHexagram || null);
      setTransformedHexagram(transformedHex || null);
      setIsDivining(false);
    }
  };

  const startDivination = () => {
    setLines([]);
    setCurrentToss(0);
    setResult(null);
    setTransformedHexagram(null);
    setIsDivining(true);
  };

  const getLineDisplay = (line: LineResult) => {
    if (line.value === 6) return "⚋ ⚋";
    if (line.value === 7) return "⚊⚊⚊";
    if (line.value === 8) return "⚋ ⚋";
    if (line.value === 9) return "⚊⚊⚊";
    return "";
  };

  const getLineLabel = (line: LineResult) => {
    if (line.value === 6) return "Old Yin (changing)";
    if (line.value === 7) return "Young Yang";
    if (line.value === 8) return "Young Yin";
    if (line.value === 9) return "Old Yang (changing)";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
          I Ching Oracle
        </h1>
        <p className="text-center text-slate-300 mb-8">
          The Book of Changes - Ancient Wisdom for Modern Times
        </p>

        {!isDivining && !result && (
          <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur">
            <div className="text-center">
              <p className="text-lg mb-6 text-slate-300">
                Focus on your question and consult the oracle
              </p>
              <Button
                onClick={startDivination}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-6 text-lg"
              >
                Begin Divination
              </Button>
            </div>
          </Card>
        )}

        {isDivining && (
          <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur">
            <div className="text-center">
              <p className="text-xl mb-4">
                Toss {currentToss + 1} of 6
              </p>
              <p className="text-slate-400 mb-6">
                Focus on your question...
              </p>
              <Button
                onClick={handleToss}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
              >
                Toss the Coins
              </Button>

              <div className="mt-8 space-y-2">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className="text-2xl font-mono text-amber-300"
                  >
                    Line {6 - index}: {getLineDisplay(line)} {line.isChanging ? "✦" : ""}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur">
              <h2 className="text-2xl font-bold mb-2 text-amber-300">
                Hexagram {result.number}: {result.name}
              </h2>
              <p className="text-slate-400 italic mb-4">{result.ancient.chinese}</p>
              <p className="text-slate-300 mb-4">{result.ancient.rendering}</p>

              <div className="flex justify-center my-6">
                <div className="space-y-1">
                  {[...Array(6)].map((_, i) => {
                    const line = lines[5 - i];
                    const isYang = line.value === 7 || line.value === 9;
                    return (
                      <div
                        key={i}
                        className={`text-3xl font-mono ${line.isChanging ? "text-amber-400" : "text-slate-300"}`}
                      >
                        {isYang ? "⚊⚊⚊" : "⚋ ⚋"} {line.isChanging ? "✦" : ""}
                      </div>
                    );
                  })}
                </div>
              </div>

              {lines.some((l) => l.isChanging) && transformedHexagram && (
                <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
                  <p className="text-sm text-slate-400 mb-2">Transforms to:</p>
                  <p className="text-lg text-amber-300">
                    Hexagram {transformedHexagram.number}: {transformedHexagram.name}
                  </p>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3 text-amber-200">The Heart</h3>
              <p className="text-slate-300 leading-relaxed">{result.heart}</p>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3 text-amber-200">Judgment</h3>
              <p className="text-slate-300 leading-relaxed">{result.judgment}</p>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3 text-amber-200">Image</h3>
              <p className="text-slate-300 leading-relaxed">{result.image}</p>
            </Card>

            {lines.some((l) => l.isChanging) && (
              <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur">
                <h3 className="text-xl font-semibold mb-3 text-amber-200">Changing Lines</h3>
                <div className="space-y-3">
                  {lines.map((line, index) =>
                    line.isChanging ? (
                      <div key={index} className="p-3 bg-purple-900/30 rounded-lg">
                        <p className="text-amber-300 font-medium mb-1">
                          Line {6 - index}: {getLineLabel(line)}
                        </p>
                        <p className="text-slate-300">{result.lines[index]}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </Card>
            )}

            <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3 text-amber-200">Taoist Reflection</h3>
              <p className="text-slate-300 leading-relaxed italic">{result.taoist_reflection}</p>
            </Card>

            <div className="text-center">
              <Button
                onClick={startDivination}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Consult Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IChingApp;