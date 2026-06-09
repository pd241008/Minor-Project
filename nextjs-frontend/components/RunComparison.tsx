"use client";
// RunComparison.jsx
// location: frontend/src/components/RunComparison.jsx

import React from "react";

export default function RunComparison({ runs }: any) {
  if (runs.length === 0) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md h-full">
        <h2 className="text-xl font-bold mb-4">Run Comparison</h2>
        <p className="text-slate-400">No runs available for comparison</p>
      </div>
    );
  }

  const avg = (arr: number[]) =>
    (arr.reduce((a: number, b: number) => a + b, 0) / arr.length).toFixed(3);

  const fgsmDrops = runs
    .filter((r: any) => r.type === "FGSM")
    .map((r: any) => parseFloat(r.value));

  const defenceAcc = runs
    .filter((r: any) => r.type === "Defence")
    .map((r: any) => parseFloat(r.value));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Run Comparison Summary</h2>

      {fgsmDrops.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-3 text-sm text-slate-300">
          <b className="text-slate-50 text-base mb-2 block">FGSM Accuracy Drop</b>
          <p>Average: {avg(fgsmDrops)}</p>
          <p>Best (Min): {Math.min(...fgsmDrops)}</p>
          <p>Worst (Max): {Math.max(...fgsmDrops)}</p>
        </div>
      )}

      {defenceAcc.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-3 text-sm text-slate-300">
          <b className="text-slate-50 text-base mb-2 block">Defence Robust Accuracy</b>
          <p>Average: {avg(defenceAcc)}</p>
          <p>Best: {Math.max(...defenceAcc)}</p>
          <p>Worst: {Math.min(...defenceAcc)}</p>
        </div>
      )}
    </div>
  );
}
