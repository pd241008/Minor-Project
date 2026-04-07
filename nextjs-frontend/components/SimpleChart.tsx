"use client";

import React, { useEffect, useRef } from "react";
import { FGSMResult, DefenceResult } from "../types";

interface SimpleChartProps {
  fgsm: FGSMResult | null;
  defence: DefenceResult | null;
}

export default function SimpleChart({ fgsm, defence }: SimpleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fgsm || !defence) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const values = [
      fgsm.original_accuracy,
      fgsm.adversarial_accuracy,
      defence.robust_accuracy,
    ];

    const labels = ["Clean", "After Attack", "After Defence"];
    const colors = ["#22c55e", "#ef4444", "#3b82f6"];

    const maxVal = Math.max(...values, 0.1);
    const barWidth = 80;
    const gap = 40;

    ctx.font = "12px sans-serif";

    values.forEach((val, i) => {
      const height = (val / maxVal) * 200;
      const x = 60 + i * (barWidth + gap);
      const y = 260 - height;

      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, barWidth, height);

      ctx.fillStyle = "#94a3b8";
      ctx.fillText(labels[i], x, 290);
      
      ctx.fillStyle = "#ffffff";
      ctx.fillText(val.toFixed(2), x + 20, y - 10);
    });
  }, [fgsm, defence]);

  return (
    <div className="card">
      <h2>Accuracy Comparison</h2>
      <canvas ref={canvasRef} width="420" height="320" className="w-full h-auto" />
    </div>
  );
}
