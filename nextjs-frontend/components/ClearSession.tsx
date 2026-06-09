"use client";
import React from "react";

export default function ClearSession({ onClear }: any) {
  const clearAll = () => {
    localStorage.clear();
    onClear();
  };

  return (
    <button className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-all hover:-translate-y-[1px]" onClick={clearAll}>
      Clear Session
    </button>
  );
}