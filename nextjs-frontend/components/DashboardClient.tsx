"use client";
import React, { useState } from "react";
import AttackPanel from "../components/AttackPanel";
import DefencePanel from "../components/DefencePanel";
import MetricsPanel from "../components/MetricsPanel";
import SimpleChart from "../components/SimpleChart";
import ExportResults from "../components/ExportResults";
import ExperimentLog from "../components/ExperimentLog";
import RunComparison from "../components/RunComparison";
import ApiStatus from "../components/ApiStatus";
import SettingsPanel from "../components/SettingsPanel";
import ClearSession from "../components/ClearSession";
import Loader from "../components/Loader";
import usePersistentState from "../hooks/usePersistentState";

// CSS removed
export default function Dashboard() {
  const [fgsm, setFgsm] = usePersistentState("fgsm", null);
  const [pgd, setPgd] = usePersistentState("pgd", null);
  const [jsma, setJsma] = usePersistentState("jsma", null);
  const [defence, setDefence] = usePersistentState("defence", null);
  const [logs, setLogs] = usePersistentState<any[]>("logs", []);

  const [epsilonGlobal, setEpsilonGlobal] = usePersistentState("epsilon", 0.1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Initializing...");

  const logEvent = (type: any, metric: any, value: any) => {
    setLogs((prev) => [
      {
        type,
        metric,
        value,
        epsilon: epsilonGlobal,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  const hasResults = fgsm || pgd || jsma || defence;

  return (
    <div className="min-h-screen py-10 px-5 bg-[#0b0f19]">
      {/* OVERLAY LOADER */}
      {isLoading && <Loader message={loadingMsg} />}

      <header className="text-center mb-10">
        <h1 className="text-4xl text-white mb-2 font-bold">Adversarial Attack &amp; Defence Framework</h1>
        <p className="text-slate-400 text-lg m-0">End-to-end adversarial robustness evaluation and monitoring</p>
      </header>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-center bg-slate-900 px-6 py-4 rounded-xl border border-slate-800 flex-wrap gap-4">
          <ApiStatus />
          <div className="flex gap-4">
            <SettingsPanel />
            <ClearSession onClear={() => window.location.reload()} />
          </div>
        </div>

        {/* MAIN CONTROLS: ATTACK & DEFENCE */}
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-6">
          <AttackPanel
            epsilonGlobal={epsilonGlobal}
            setEpsilonGlobal={setEpsilonGlobal}
            setIsLoading={setIsLoading}
            setLoadingMsg={setLoadingMsg}
            setFgsmGlobal={(data: any) => {
              setFgsm(data);
              logEvent(
                "FGSM",
                "Accuracy Drop",
                (data.original_accuracy - data.adversarial_accuracy).toFixed(3),
              );
            }}
            setPgdGlobal={(data: any) => {
              setPgd(data);
              logEvent(
                "PGD",
                "Accuracy Drop",
                (data.original_accuracy - data.adversarial_accuracy).toFixed(3),
              );
            }}
            setJsmaGlobal={(data: any) => {
              setJsma(data);
              logEvent("JSMA", "Confidence Drop", data.confidence_drop);
            }}
          />

          <DefencePanel
            epsilonGlobal={epsilonGlobal}
            setIsLoading={setIsLoading}
            setLoadingMsg={setLoadingMsg}
            setDefenceGlobal={(data: any) => {
              setDefence(data);
              logEvent("Defence", data.defence_method, data.robust_accuracy);
            }}
          />
        </div>

        {/* CONDITIONALLY RENDERED RESULTS */}
        {hasResults ? (
          <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-in-out]">
            <MetricsPanel
              fgsm={fgsm}
              pgd={pgd}
              jsma={jsma}
              defence={defence}
            />

            {fgsm && defence && (
              <SimpleChart
                fgsm={fgsm}
                defence={defence}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-6">
              <RunComparison runs={logs} />
              <ExperimentLog logs={logs} />
            </div>

            <div className="flex justify-end pt-2">
              <ExportResults
                fgsm={fgsm}
                pgd={pgd}
                jsma={jsma}
                defence={defence}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-20 px-5 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-500 text-lg mt-5">
            <p>Run an attack or defence to generate metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
