"use client";
import React, { useState } from "react";
import { post } from "../services/api";

export default function DefencePanel({
  setDefenceGlobal,
  epsilonGlobal,
  setIsLoading, // Controls the global blur overlay
  setLoadingMsg, // Updates the text on the loader
}: any) {
  const [result, setResult] = useState<any>(null);

  const applyDefence = async (type: string) => {
    // Turn ON global loader
    setIsLoading(true);
    setLoadingMsg(
      type === "adversarial-training"
        ? "Running Adversarial Training..."
        : "Applying Ensemble Defence...",
    );

    try {
      const data = await post(`/defence/${type}`, {
        epsilon: epsilonGlobal,
      });

      setResult(data);
      setDefenceGlobal(data);
    } catch (err) {
      console.error("Defence failed:", err);
    } finally {
      // Turn OFF global loader
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Defence Mechanisms</h2>

      <div className="button-group">
        <button
          className="btn-defence"
          onClick={() => applyDefence("adversarial-training")}>
          Adversarial Training
        </button>

        <button
          className="btn-ensemble"
          onClick={() => applyDefence("ensemble")}>
          Ensemble Defence
        </button>
      </div>

      {result && (
        <div className="result">
          <p>
            <b>{result.defence_method}</b>
          </p>
          <p>Robust Accuracy: {result.robust_accuracy}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}
