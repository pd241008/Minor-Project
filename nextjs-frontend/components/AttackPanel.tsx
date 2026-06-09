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
        setFgsmGlobal(data);
      } else if (type === "pgd") {
        data = await post("/attack/pgd", { epsilon: epsilonGlobal, alpha, steps });
        setPgdGlobal(data);
      } else {
        data = await post("/attack/jsma");
        setJsmaGlobal(data);
      }
    } catch (error) {
      console.error("Attack failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Attack Parameters</h2>
      
      <div className="mb-6">
        <label className="font-semibold text-slate-200">Select Attack: </label>
        <select 
          value={attackType} 
          onChange={(e) => setAttackType(e.target.value)}
          className="ml-2.5 p-2 rounded-md border border-slate-700 bg-slate-950 text-white outline-none focus:border-slate-500"
        >
          <option value="fgsm">FGSM (Fast Gradient Sign)</option>
          <option value="pgd">PGD (Projected Gradient Descent)</option>
          <option value="jsma">JSMA (Jacobian-based Saliency)</option>
        </select>
      </div>

      {(attackType === "fgsm" || attackType === "pgd") && (
        <div className="mb-4 flex flex-col gap-1">
          <p className="font-semibold text-slate-200">Epsilon: <span className="font-normal">{epsilonGlobal}</span></p>
          <input
            type="range" min="0.05" max="0.15" step="0.01" value={epsilonGlobal}
            onChange={(e) => setEpsilonGlobal(parseFloat(e.target.value))}
            className="w-full accent-red-500"
          />
          <small className="text-slate-400 text-xs mt-1">Higher epsilon increases perturbation strength</small>
        </div>
      )}

      {attackType === "pgd" && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-slate-200">Alpha (Step Size):</p>
            <input
              type="number" min="0.001" max="0.05" step="0.001" value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="p-1.5 rounded-md bg-slate-950 border border-slate-700 text-white w-24 outline-none focus:border-slate-500"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-slate-200">Iterations:</p>
            <input
              type="number" min="10" max="100" step="10" value={steps}
              onChange={(e) => setSteps(parseInt(e.target.value))}
              className="p-1.5 rounded-md bg-slate-950 border border-slate-700 text-white w-24 outline-none focus:border-slate-500"
            />
          </div>
        </>
      )}

      <div className="mt-6">
        <button
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all hover:-translate-y-[1px] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white ${attackType === "jsma" ? "bg-orange-500" : "bg-red-600"}`}
          onClick={() => runAttack(attackType)}
        >
          Run {attackType.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
