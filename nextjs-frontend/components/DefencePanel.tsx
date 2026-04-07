"use client";

import React, { useState } from "react";
import { runDefence } from "../services/api";
import { DefenceResult, PanelProps } from "../types";

interface DefencePanelProps extends PanelProps {
  setDefenceGlobal: (data: DefenceResult) => void;
}

export default function DefencePanel({
  setDefenceGlobal,
  epsilonGlobal,
  setIsLoading,
  setLoadingMsg,
}: DefencePanelProps) {
  const [result, setResult] = useState<DefenceResult | null>(null);

  const applyDefence = async (type: "adversarial-training" | "ensemble") => {
    setIsLoading(true);
    setLoadingMsg(
      type === "adversarial-training"
        ? "Running Adversarial Training..."
        : "Applying Ensemble Defence..."
    );

    try {
      const data = await runDefence(type, epsilonGlobal);
      setResult(data);
      setDefenceGlobal(data);
    } catch (err) {
      console.error("Defence failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Defence Mechanisms</h2>

      <div className="button-group">
        <button
          className="btn-defence"
          onClick={() => applyDefence("adversarial-training")}
        >
          Adversarial Training
        </button>

        <button
          className="btn-ensemble"
          onClick={() => applyDefence("ensemble")}
        >
          Ensemble Defence
        </button>
      </div>

      {result && (
        <div className="result animate-fadeIn">
          <p><b>{result.defence_method}</b></p>
          <p>Robust Accuracy: {result.robust_accuracy}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}
