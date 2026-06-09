"use client";
import React, { useState } from "react";
import { post } from "../services/api";

export default function AttackPanel({
  setFgsmGlobal,
  setJsmaGlobal,
  setEpsilonGlobal,
  epsilonGlobal, // Using global epsilon for the slider
  setIsLoading, // Controls the global blur overlay
  setLoadingMsg, // Updates the text on the loader
}: any) {
  const [fgsm, setFgsm] = useState<any>(null);
  const [jsma, setJsma] = useState<any>(null);

  const runAttack = async (type: string) => {
    // Turn ON global loader
    setIsLoading(true);
    setLoadingMsg(
      type === "fgsm"
        ? "Generating FGSM Adversarial Examples..."
        : "Computing JSMA Saliency Maps...",
    );

    try {
      let data;

      if (type === "fgsm") {
        data = await post("/attack/fgsm", { epsilon: epsilonGlobal });
        setFgsm(data);
        setFgsmGlobal(data);
      } else {
        data = await post("/attack/jsma");
        setJsma(data);
        setJsmaGlobal(data);
      }
    } catch (error) {
      console.error("Attack failed:", error);
    } finally {
      // Turn OFF global loader
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Adversarial Attacks</h2>

      {/* Epsilon Slider */}
      <div className="slider-container">
        <p>
          <b>FGSM Epsilon:</b> {epsilonGlobal}
        </p>
        <input
          type="range"
          min="0.05"
          max="0.15"
          step="0.01"
          value={epsilonGlobal}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setEpsilonGlobal(val);
          }}
        />
        <small>Higher epsilon increases perturbation strength</small>
      </div>

      <div className="button-group">
        <button
          className="btn-attack"
          onClick={() => runAttack("fgsm")}>
          Run FGSM
        </button>

        <button
          className="btn-jsma"
          onClick={() => runAttack("jsma")}>
          Run JSMA
        </button>
      </div>

      {fgsm && (
        <div className="result">
          <p>
            <b>FGSM Result</b>
          </p>
          <p>Original Accuracy: {fgsm.original_accuracy}</p>
          <p>Adversarial Accuracy: {fgsm.adversarial_accuracy}</p>
          <p>Epsilon: {fgsm.epsilon}</p>
        </div>
      )}

      {jsma && (
        <div className="result">
          <p>
            <b>JSMA Result</b>
          </p>
          <p>Perturbed Features: {jsma.perturbed_features}</p>
          <p>Confidence Drop: {jsma.confidence_drop}</p>
        </div>
      )}
    </div>
  );
}
