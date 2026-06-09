"use client";
// MetricsPanel.jsx
import React from "react";

export default function MetricsPanel({ fgsm, pgd, jsma, defence }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Model Robustness Metrics</h2>

      {!fgsm && !pgd && !jsma && !defence && (
        <p className="text-slate-400">
          Run an attack or defence to see metrics
        </p>
      )}

      {/* Grid container for metrics */}
      <div className="flex flex-wrap gap-4">
        
        {fgsm && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-3 text-sm text-slate-300 flex-1 min-w-[200px]">
            <b className="text-slate-50 text-base mb-2 block">FGSM Metrics</b>
            <p>Clean Accuracy: {fgsm.original_accuracy}%</p>
            <p>Robust Accuracy: {fgsm.adversarial_accuracy}%</p>
            <p>ASR (Drop): {fgsm.success_rate ?? (fgsm.original_accuracy - fgsm.adversarial_accuracy).toFixed(2)}%</p>
          </div>
        )}

        {pgd && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-3 text-sm text-slate-300 flex-1 min-w-[200px]">
            <b className="text-slate-50 text-base mb-2 block">PGD Metrics</b>
            <p>Clean Accuracy: {pgd.original_accuracy}%</p>
            <p>Robust Accuracy: {pgd.adversarial_accuracy}%</p>
            <p>ASR (Drop): {pgd.success_rate}%</p>
          </div>
        )}
        
        {jsma && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-3 text-sm text-slate-300 flex-1 min-w-[200px]">
            <b className="text-slate-50 text-base mb-2 block">JSMA Metrics</b>
            <p>Perturbed Features: {jsma.perturbed_features}</p>
            <p>Confidence Drop: {jsma.confidence_drop}</p>
          </div>
        )}

        {defence && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-3 text-sm text-slate-300 flex-1 min-w-[200px]">
            <b className="text-slate-50 text-base mb-2 block">Defence Effectiveness</b>
            <p>Method: {defence.defence_method}</p>
            <p>Robust Accuracy: {defence.robust_accuracy}</p>
          </div>
        )}
      </div>

      {/* Visual Contrast: FGSM vs PGD */}
      {(fgsm || pgd) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Attack Success Rate (ASR) Comparison</h3>
          
          {fgsm && (
            <div className="mb-2 flex items-center">
              <span className="inline-block w-[50px] text-sm">FGSM:</span>
              <div className="flex-1 bg-slate-800 rounded-md overflow-hidden mx-3">
                <div 
                  className="bg-red-500 h-5"
                  style={{ width: `${fgsm.success_rate ?? (fgsm.original_accuracy - fgsm.adversarial_accuracy)}%` }}
                ></div>
              </div>
              <span className="w-[50px] text-right text-sm">
                {fgsm.success_rate ?? (fgsm.original_accuracy - fgsm.adversarial_accuracy).toFixed(1)}%
              </span>
            </div>
          )}

          {pgd && (
            <div className="mb-2 flex items-center">
              <span className="inline-block w-[50px] text-sm">PGD:</span>
              <div className="flex-1 bg-slate-800 rounded-md overflow-hidden mx-3">
                <div 
                  className="bg-orange-500 h-5"
                  style={{ width: `${pgd.success_rate}%` }}
                ></div>
              </div>
              <span className="w-[50px] text-right text-sm">
                {pgd.success_rate}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
