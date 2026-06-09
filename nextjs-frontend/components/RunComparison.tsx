"use client";
// RunComparison.jsx
// location: frontend/src/components/RunComparison.jsx

import React from "react";

export default function RunComparison({ runs }: any) {
  if (runs.length === 0) {
    return (
      <div className="card">
        <h2>Run Comparison</h2>
        <p style={{ color: "#9ca3af" }}>No runs available for comparison</p>
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
    <div className="card">
      <h2>Run Comparison Summary</h2>

      {fgsmDrops.length > 0 && (
        <div className="result">
          <p><b>FGSM Accuracy Drop</b></p>
          <p>Average: {avg(fgsmDrops)}</p>
          <p>Best (Min): {Math.min(...fgsmDrops)}</p>
          <p>Worst (Max): {Math.max(...fgsmDrops)}</p>
        </div>
      )}

      {defenceAcc.length > 0 && (
        <div className="result">
          <p><b>Defence Robust Accuracy</b></p>
          <p>Average: {avg(defenceAcc)}</p>
          <p>Best: {Math.max(...defenceAcc)}</p>
          <p>Worst: {Math.min(...defenceAcc)}</p>
        </div>
      )}
    </div>
  );
}
