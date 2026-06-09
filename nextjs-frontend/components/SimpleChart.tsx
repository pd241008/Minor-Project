"use client";
// SimpleChart.jsx
import React, { useEffect, useRef } from "react";

export default function SimpleChart({ fgsm, defence }: any) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!fgsm || !defence) return;

    const canvas: HTMLCanvasElement | null = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const values = [
      fgsm.original_accuracy,
      fgsm.adversarial_accuracy,
      defence.robust_accuracy,
    ];

    const labels = ["Clean", "After Attack", "After Defence"];
    const colors = ["#22c55e", "#ef4444", "#3b82f6"];

    const maxVal = Math.max(...values);
    const barWidth = 80;
    const gap = 40;

    values.forEach((val, i) => {
      const height = (val / maxVal) * 200;
      const x = 60 + i * (barWidth + gap);
      const y = 260 - height;

      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, barWidth, height);

      ctx.fillStyle = "#e5e7eb";
      ctx.fillText(labels[i], x, 290);
      ctx.fillText(val.toFixed(2), x + 20, y - 10);
    });
  }, [fgsm, defence]);

  return (
    <div className="card">
      <h2>Accuracy Comparison</h2>
      <canvas ref={canvasRef} width="420" height="320" />
    </div>
  );
}
