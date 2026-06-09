"use client";
// SettingsPanel.jsx
// location: frontend/src/components/SettingsPanel.jsx

import React, { useState } from "react";

export default function SettingsPanel() {
  const [epsilon, setEpsilon] = useState(0.1);

  return (
    <div className="flex flex-col justify-center items-end bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg">
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-slate-300">
          FGSM Epsilon: <b className="text-slate-50">{epsilon}</b>
        </label>
        <input
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
          className="accent-slate-400 w-24"
        />
      </div>
    </div>
  );
}
