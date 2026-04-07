"use client";

import React from "react";
import { FGSMResult, JSMAResult, DefenceResult } from "../types";

interface ExportResultsProps {
  fgsm: FGSMResult | null;
  jsma: JSMAResult | null;
  defence: DefenceResult | null;
}

export default function ExportResults({ fgsm, jsma, defence }: ExportResultsProps) {
  const exportCSV = () => {
    const rows = [
      ["Metric", "Value"],
      ...(fgsm
        ? [
            ["FGSM Original Accuracy", fgsm.original_accuracy],
            ["FGSM Adversarial Accuracy", fgsm.adversarial_accuracy],
            ["FGSM Accuracy Drop", fgsm.original_accuracy - fgsm.adversarial_accuracy],
          ]
        : []),
      ...(jsma
        ? [
            ["JSMA Perturbed Features", jsma.perturbed_features],
            ["JSMA Confidence Drop", jsma.confidence_drop],
          ]
        : []),
      ...(defence
        ? [
            ["Defence Method", defence.defence_method],
            ["Robust Accuracy", defence.robust_accuracy],
          ]
        : []),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "adversarial_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card">
      <h2>Export Results</h2>
      <button
        className="btn-ensemble w-full"
        onClick={exportCSV}
        disabled={!fgsm && !jsma && !defence}
      >
        Download Results (CSV)
      </button>
    </div>
  );
}
