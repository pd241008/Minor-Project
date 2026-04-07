import React from "react";

export default function ClearSession({ onClear }) {
  const clearAll = () => {
    localStorage.clear();
    onClear();
  };

  return (
    <div className="card">
      <h2>Session Controls</h2>
      <button className="btn-attack" onClick={clearAll}>
        Clear All Experiments
      </button>
    </div>
  );
}