"use client";

import React, { useState } from "react";
import usePersistentState from "../../hooks/usePersistentState";
import { FGSMResult, JSMAResult, DefenceResult, LogEntry } from "../../types";

// Components
import AttackPanel from "../../components/AttackPanel";
import DefencePanel from "../../components/DefencePanel";
import MetricsPanel from "../../components/MetricsPanel";
import SimpleChart from "../../components/SimpleChart";
import ExportResults from "../../components/ExportResults";
import ExperimentLog from "../../components/ExperimentLog";
import RunComparison from "../../components/RunComparison";
import ApiStatus from "../../components/ApiStatus";
import SettingsPanel from "../../components/SettingsPanel";
import ClearSession from "../../components/ClearSession";
import Loader from "../../components/Loader";

export default function DashboardPage() {
  const [fgsm, setFgsm] = usePersistentState<FGSMResult | null>("fgsm", null);
  const [jsma, setJsma] = usePersistentState<JSMAResult | null>("jsma", null);
  const [defence, setDefence] = usePersistentState<DefenceResult | null>("defence", null);
  const [logs, setLogs] = usePersistentState<LogEntry[]>("logs", []);

  const [epsilonGlobal, setEpsilonGlobal] = usePersistentState<number>("epsilon", 0.1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Initializing...");

  const logEvent = (type: string, metric: string, value: string | number) => {
    const newLog: LogEntry = {
      type,
      metric,
      value,
      epsilon: epsilonGlobal,
      time: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const hasResults = fgsm || jsma || defence;

  return (
    <div className="dashboard-container">
      {/* OVERLAY LOADER */}
      {isLoading && <Loader message={loadingMsg} />}

      <header className="dashboard-header mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Adversarial Monitoring
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Secure, monitor, and evaluate ML models against adversarial perturbations
        </p>
      </header>

      <div className="dashboard-content max-w-7xl mx-auto">
        {/* TOP STATUS BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <ApiStatus />
          <div className="flex items-center gap-4">
            <SettingsPanel />
            <ClearSession onClear={() => window.location.reload()} />
          </div>
        </div>

        {/* MAIN CONTROLS: ATTACK & DEFENCE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <AttackPanel
            epsilonGlobal={epsilonGlobal}
            setEpsilonGlobal={setEpsilonGlobal}
            setIsLoading={setIsLoading}
            setLoadingMsg={setLoadingMsg}
            setFgsmGlobal={(data) => {
              setFgsm(data);
              logEvent(
                "FGSM",
                "Accuracy Drop",
                (data.original_accuracy - data.adversarial_accuracy).toFixed(3)
              );
            }}
            setJsmaGlobal={(data) => {
              setJsma(data);
              logEvent("JSMA", "Confidence Drop", data.confidence_drop);
            }}
          />

          <DefencePanel
            epsilonGlobal={epsilonGlobal}
            setIsLoading={setIsLoading}
            setLoadingMsg={setLoadingMsg}
            setDefenceGlobal={(data) => {
              setDefence(data);
              logEvent("Defence", data.defence_method, data.robust_accuracy);
            }}
          />
        </div>

        {/* CONDITIONALLY RENDERED RESULTS */}
        {hasResults ? (
          <div className="results-section space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <MetricsPanel fgsm={fgsm} jsma={jsma} defence={defence} />
              </div>
              <div className="lg:col-span-2">
                {fgsm && defence && (
                  <SimpleChart fgsm={fgsm} defence={defence} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <RunComparison runs={logs} />
               <ExperimentLog logs={logs} />
            </div>

            <div className="flex justify-center pt-8">
              <ExportResults fgsm={fgsm} jsma={jsma} defence={defence} />
            </div>
          </div>
        ) : (
          <div className="empty-state border-2 border-dashed border-gray-800 rounded-2xl p-20 text-gray-500">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-xl">System Standby: Run an attack or defence to generate intelligence metrics.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
