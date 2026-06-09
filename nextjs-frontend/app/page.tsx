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

import "../styles/Dashboard.css";

export default function Dashboard() {
  const [fgsm, setFgsm] = usePersistentState("fgsm", null);
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

  const hasResults = fgsm || jsma || defence;

  return (
    <div className="dashboard-container">
      {/* OVERLAY LOADER */}
      {isLoading && <Loader message={loadingMsg} />}

      <header className="dashboard-header">
        <h1>Adversarial Attack & Defence Framework</h1>
        <p>End-to-end adversarial robustness evaluation and monitoring</p>
      </header>

      <div className="dashboard-content">
        {/* TOP STATUS BAR */}
        <div className="top-bar">
          <ApiStatus />
          <div className="top-bar-controls">
            <SettingsPanel />
            <ClearSession onClear={() => window.location.reload()} />
          </div>
        </div>

        {/* MAIN CONTROLS: ATTACK & DEFENCE */}
        <div className="panel-grid">
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
          <div className="results-section">
            <div className="results-panel">
              <MetricsPanel
                fgsm={fgsm}
                jsma={jsma}
                defence={defence}
              />
            </div>

            {fgsm && defence && (
              <div className="results-panel">
                <SimpleChart
                  fgsm={fgsm}
                  defence={defence}
                />
              </div>
            )}

            <div className="panel-grid">
              <div className="results-panel">
                <RunComparison runs={logs} />
              </div>
              <div className="results-panel">
                <ExperimentLog logs={logs} />
              </div>
            </div>

            <div className="export-container">
              <ExportResults
                fgsm={fgsm}
                jsma={jsma}
                defence={defence}
              />
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>Run an attack or defence to generate metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
