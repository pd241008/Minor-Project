import React from "react";
import { FGSMResult, JSMAResult, DefenceResult } from "../types";

interface MetricsPanelProps {
  fgsm: FGSMResult | null;
  jsma: JSMAResult | null;
  defence: DefenceResult | null;
}

export default function MetricsPanel({ fgsm, jsma, defence }: MetricsPanelProps) {
  return (
    <div className="card">
      <h2>Model Robustness Metrics</h2>

      {!fgsm && !jsma && !defence && (
        <p className="text-gray-500 italic">
          Run an attack or defence to see metrics
        </p>
      )}

      {fgsm && (
        <div className="result">
          <p><b>FGSM Metrics</b></p>
          <p>Clean Accuracy: {fgsm.original_accuracy}</p>
          <p>Adversarial Accuracy: {fgsm.adversarial_accuracy}</p>
          <p>
            Accuracy Drop:{" "}
            {(fgsm.original_accuracy - fgsm.adversarial_accuracy).toFixed(2)}
          </p>
        </div>
      )}

      {jsma && (
        <div className="result">
          <p><b>JSMA Metrics</b></p>
          <p>Perturbed Features: {jsma.perturbed_features}</p>
          <p>Confidence Drop: {jsma.confidence_drop}</p>
        </div>
      )}

      {defence && (
        <div className="result">
          <p><b>Defence Effectiveness</b></p>
          <p>Method: {defence.defence_method}</p>
          <p>Robust Accuracy: {defence.robust_accuracy}</p>
        </div>
      )}
    </div>
  );
}
