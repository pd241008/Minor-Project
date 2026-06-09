"use client";
import React from "react";
// Custom CSS replaced by Tailwind

export default function Loader({ message = "Processing..." }: any) {
  return (
    <div className="fixed inset-0 bg-[#0a0f1e]/75 backdrop-blur-md flex flex-col justify-center items-center z-[9999] text-white">
      {/* Visual Indicator */}
      <div className="w-[50px] h-[50px] bg-emerald-400 rounded-full shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-heartbeat mb-[25px]"></div>

      {/* Text Context */}
      <h3 className="text-2xl font-semibold mb-2 tracking-wide">{message}</h3>
      <p className="text-[0.95rem] text-slate-400">
        Please wait while the backend computes tensors...
      </p>
    </div>
  );
}
