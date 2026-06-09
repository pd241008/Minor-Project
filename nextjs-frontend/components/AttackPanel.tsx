"use client";
import React, { useState } from "react";
import { post } from "../services/api";

export default function AttackPanel({
  setFgsmGlobal,
  setJsmaGlobal,
  setPgdGlobal,
  setEpsilonGlobal,
  epsilonGlobal,
  setIsLoading,
  setLoadingMsg,
}: any) {
  const [fgsm, setFgsm] = useState<any>(null);
  const [jsma, setJsma] = useState<any>(null);
  const [pgd, setPgd] = useState<any>(null);
  
  const [attackType, setAttackType] = useState("fgsm");
  const [alpha, setAlpha] = useState(0.01);
  const [steps, setSteps] = useState(40);

  const runAttack = async (type: string) => {
    setIsLoading(true);
    setLoadingMsg(
      type === "fgsm" ? "Generating FGSM Adversarial Examples..."
      : type === "pgd" ? "Running PGD Iterative Attack..."
      : "Computing JSMA Saliency Maps..."
    );

    try {
      let data;
      if (type === "fgsm") {
        data = await post("/attack/fgsm", { epsilon: epsilonGlobal });
        setFgsm(data);
        setFgsmGlobal(data);
      } else if (type === "pgd") {
        data = await post("/attack/pgd", { epsilon: epsilonGlobal, alpha, steps });
        setPgd(data);
        setPgdGlobal(data);
      } else {
        data = await post("/attack/jsma");
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
      <h2>Attack Parameters</h2>
      
      <div style={{ marginBottom: "1.5rem" }}>
        <label><b>Select Attack: </b></label>
        <select 
          value={attackType} 
          onChange={(e) => setAttackType(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px", borderRadius: "6px", border: "1px solid #444", background: "#111", color: "white" }}
        >
          <option value="fgsm">FGSM (Fast Gradient Sign)</option>
          <option value="pgd">PGD (Projected Gradient Descent)</option>
          <option value="jsma">JSMA (Jacobian-based Saliency)</option>
        </select>
      </div>

      {(attackType === "fgsm" || attackType === "pgd") && (
        <div className="slider-container" style={{ marginBottom: "1rem" }}>
          <p><b>Epsilon:</b> {epsilonGlobal}</p>
          <input
            type="range" min="0.05" max="0.15" step="0.01" value={epsilonGlobal}
            onChange={(e) => setEpsilonGlobal(parseFloat(e.target.value))}
          />
          <small>Higher epsilon increases perturbation strength</small>
        </div>
      )}

      {attackType === "pgd" && (
        <>
          <div className="slider-container" style={{ marginBottom: "1rem" }}>
            <p><b>Alpha (Step Size):</b> {alpha}</p>
            <input
              type="number" min="0.001" max="0.05" step="0.001" value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              style={{ padding: "5px", borderRadius: "4px", background: "#222", border: "1px solid #444", color: "white", width: "100px" }}
            />
          </div>
          <div className="slider-container" style={{ marginBottom: "1rem" }}>
            <p><b>Iterations:</b> {steps}</p>
            <input
              type="number" min="10" max="100" step="10" value={steps}
              onChange={(e) => setSteps(parseInt(e.target.value))}
              style={{ padding: "5px", borderRadius: "4px", background: "#222", border: "1px solid #444", color: "white", width: "100px" }}
            />
          </div>
        </>
      )}

      <div className="button-group" style={{ marginTop: "1.5rem" }}>
        <button
          className={attackType === "jsma" ? "btn-jsma" : "btn-attack"}
          onClick={() => runAttack(attackType)}
          style={{ width: "100%" }}
        >
          Run {attackType.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
