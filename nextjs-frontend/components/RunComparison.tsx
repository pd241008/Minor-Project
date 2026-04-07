import React from "react";
import { LogEntry } from "../types";

interface RunComparisonProps {
  runs: LogEntry[];
}

export default function RunComparison({ runs }: RunComparisonProps) {
  if (runs.length === 0) {
    return (
      <div className="card">
        <h2>Run Comparison</h2>
        <p className="text-gray-500 italic">No runs available for comparison</p>
      </div>
    );
  }

  const avg = (arr: number[]) =>
    arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(3) : "0.000";

  const fgsmDrops = runs
    .filter((r) => r.type === "FGSM")
    .map((r) => parseFloat(r.value as string));

  const defenceAcc = runs
    .filter((r) => r.type === "Defence")
    .map((r) => parseFloat(r.value as string));

  return (
    <div className="card h-full">
      <h2>Run Performance Summary</h2>

      <div className="space-y-4">
        {fgsmDrops.length > 0 && (
          <div className="result">
            <p className="text-red-400 font-bold mb-1">FGSM Accuracy Drop</p>
            <div className="grid grid-cols-3 gap-2 text-center bg-black/20 p-2 rounded">
              <div>
                <p className="text-xs text-gray-500">AVG</p>
                <p className="font-mono">{avg(fgsmDrops)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">MIN</p>
                <p className="font-mono">{Math.min(...fgsmDrops)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">MAX</p>
                <p className="font-mono">{Math.max(...fgsmDrops)}</p>
              </div>
            </div>
          </div>
        )}

        {defenceAcc.length > 0 && (
          <div className="result">
            <p className="text-green-400 font-bold mb-1">Defence Robust Accuracy</p>
            <div className="grid grid-cols-3 gap-2 text-center bg-black/20 p-2 rounded">
              <div>
                <p className="text-xs text-gray-500">AVG</p>
                <p className="font-mono">{avg(defenceAcc)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">MIN</p>
                <p className="font-mono">{Math.min(...defenceAcc)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">MAX</p>
                <p className="font-mono">{Math.max(...defenceAcc)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
