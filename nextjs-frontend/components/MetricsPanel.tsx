"use client";
// MetricsPanel.jsx
import React from "react";

export default function MetricsPanel({ fgsm, pgd, jsma, defence }: any) {
  return (
    <div className="card">
      <h2>Model Robustness Metrics</h2>

      {!fgsm && !pgd && !jsma && !defence && (
        <p style={{ color: "#9ca3af" }}>
          Run an attack or defence to see metrics
        </p>
      )}

      {/* Grid container for metrics */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        
        {fgsm && (
          <div className="result" style={{ flex: 1, minWidth: "200px" }}>
            <p><b>FGSM Metrics</b></p>
            <p>Clean Accuracy: {fgsm.original_accuracy}%</p>
            <p>Robust Accuracy: {fgsm.adversarial_accuracy}%</p>
            <p>ASR (Drop): {fgsm.success_rate ?? (fgsm.original_accuracy - fgsm.adversarial_accuracy).toFixed(2)}%</p>
          </div>
        )}

        {pgd && (
          <div className="result" style={{ flex: 1, minWidth: "200px" }}>
            <p><b>PGD Metrics</b></p>
            <p>Clean Accuracy: {pgd.original_accuracy}%</p>
            <p>Robust Accuracy: {pgd.adversarial_accuracy}%</p>
            <p>ASR (Drop): {pgd.success_rate}%</p>
          </div>
        )}
        
        {jsma && (
          <div className="result" style={{ flex: 1, minWidth: "200px" }}>
            <p><b>JSMA Metrics</b></p>
            <p>Perturbed Features: {jsma.perturbed_features}</p>
            <p>Confidence Drop: {jsma.confidence_drop}</p>
          </div>
        )}

        {defence && (
          <div className="result" style={{ flex: 1, minWidth: "200px" }}>
            <p><b>Defence Effectiveness</b></p>
            <p>Method: {defence.defence_method}</p>
            <p>Robust Accuracy: {defence.robust_accuracy}</p>
          </div>
        )}
      </div>

      {/* Visual Contrast: FGSM vs PGD */}
      {(fgsm || pgd) && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Attack Success Rate (ASR) Comparison</h3>
          
          {fgsm && (
            <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
              <span style={{ display: "inline-block", width: "50px" }}>FGSM:</span>
              <div style={{ flex: 1, background: "#333", borderRadius: "4px", overflow: "hidden", margin: "0 10px" }}>
                <div style={{ 
                  width: `${fgsm.success_rate ?? (fgsm.original_accuracy - fgsm.adversarial_accuracy)}%`, 
                  background: "#ef4444", height: "20px" 
                }}></div>
              </div>
              <span style={{ width: "50px", textAlign: "right" }}>
                {fgsm.success_rate ?? (fgsm.original_accuracy - fgsm.adversarial_accuracy).toFixed(1)}%
              </span>
            </div>
          )}

          {pgd && (
            <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
              <span style={{ display: "inline-block", width: "50px" }}>PGD:</span>
              <div style={{ flex: 1, background: "#333", borderRadius: "4px", overflow: "hidden", margin: "0 10px" }}>
                <div style={{ 
                  width: `${pgd.success_rate}%`, 
                  background: "#f97316", height: "20px" 
                }}></div>
              </div>
              <span style={{ width: "50px", textAlign: "right" }}>
                {pgd.success_rate}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
