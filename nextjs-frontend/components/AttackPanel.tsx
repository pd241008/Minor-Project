"use client";

import React, { useState } from "react";
import { runFGSM, runJSMA } from "../services/api";
import { FGSMResult, JSMAResult, PanelProps } from "../types";

interface AttackPanelProps extends PanelProps {
  setFgsmGlobal: (data: FGSMResult) => void;
  setJsmaGlobal: (data: JSMAResult) => void;
}

export default function AttackPanel({
  setFgsmGlobal,
  setJsmaGlobal,
  setEpsilonGlobal,
  epsilonGlobal,
  setIsLoading,
  setLoadingMsg,
}: AttackPanelProps) {
  const [fgsm, setFgsm] = useState<FGSMResult | null>(null);
  const [jsma, setJsma] = useState<JSMAResult | null>(null);

  const runAttack = async (type: "fgsm" | "jsma") => {
    setIsLoading(true);
    setLoadingMsg(
      type === "fgsm"
        ? "Generating FGSM Adversarial Examples..."
        : "Computing JSMA Saliency Maps..."
    );

    try {
      if (type === "fgsm") {
        const data = await runFGSM(epsilonGlobal);
        setFgsm(data);
        setFgsmGlobal(data);
      } else {
        const data = await runJSMA();
        setJsma(data);
        setJsmaGlobal(data);
      }
    } catch (error) {
      console.error("Attack failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Adversarial Attacks</h2>

      <div className="slider-container my-4">
        <p className="mb-2">
          <b>FGSM Epsilon:</b> {epsilonGlobal}
        </p>
        <input
          type="range"
          min="0.05"
          max="0.15"
          step="0.01"
          value={epsilonGlobal}
          onChange={(e) => setEpsilonGlobal?.(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <small className="text-gray-400 block mt-1">
          Higher epsilon increases perturbation strength
        </small>
      </div>

      <div className="button-group">
        <button className="btn-attack" onClick={() => runAttack("fgsm")}>
          Run FGSM
        </button>

        <button className="btn-jsma" onClick={() => runAttack("jsma")}>
          Run JSMA
        </button>
      </div>

      {fgsm && (
        <div className="result animate-fadeIn">
          <p><b>FGSM Result</b></p>
          <p>Original Accuracy: {fgsm.original_accuracy}</p>
          <p>Adversarial Accuracy: {fgsm.adversarial_accuracy}</p>
          <p>Epsilon: {fgsm.epsilon}</p>
        </div>
      )}

      {jsma && (
        <div className="result animate-fadeIn">
          <p><b>JSMA Result</b></p>
          <p>Perturbed Features: {jsma.perturbed_features}</p>
          <p>Confidence Drop: {jsma.confidence_drop}</p>
        </div>
      )}
    </div>
  );
}
