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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Defence Mechanisms</h2>

      <div className="flex gap-3 mb-4">
        <button
          className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all hover:-translate-y-[1px] hover:opacity-90 bg-green-600 text-white"
          onClick={() => applyDefence("adversarial-training")}>
          Adversarial Training
        </button>

        <button
          className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all hover:-translate-y-[1px] hover:opacity-90 bg-emerald-500 text-white"
          onClick={() => applyDefence("ensemble")}>
          Ensemble Defence
        </button>
      </div>

      {result && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 mt-3 text-sm text-slate-300">
          <p>
            <b className="text-slate-50">{result.defence_method}</b>
          </p>
          <p>Robust Accuracy: {result.robust_accuracy}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}
