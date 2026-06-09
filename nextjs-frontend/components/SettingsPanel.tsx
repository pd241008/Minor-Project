"use client";
// SettingsPanel.jsx
// location: frontend/src/components/SettingsPanel.jsx

import React, { useState } from "react";

export default function SettingsPanel() {
  const [epsilon, setEpsilon] = useState(0.1);

  return (
    <div className="card">
      <h2>Attack Parameters</h2>

      <label style={{ display: "block", marginBottom: "8px" }}>
        FGSM Epsilon: <b>{epsilon}</b>
      </label>

      <input
        type="range"
        min="0.01"
        max="0.5"
        step="0.01"
        value={epsilon}
        onChange={(e) => setEpsilon(parseFloat(e.target.value))}
        style={{ width: "100%" }}
      />

      <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "10px" }}>
        Higher epsilon increases perturbation strength
      </p>
    </div>
  );
}
