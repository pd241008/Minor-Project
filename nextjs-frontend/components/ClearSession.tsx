"use client";

import React from "react";

export default function ClearSession({ onClear }: { onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-colors group"
    >
      <svg className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <span className="text-xs font-medium text-red-400">CLEAR</span>
    </button>
  );
}
