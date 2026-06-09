"use client";
import React from "react";

export default function ExperimentLog({ logs }: any) {
  return (
    <div className="card">
      <h2>Experiment Log</h2>

      {logs.length === 0 && (
        <p style={{ color: "#9ca3af" }}>
          No experiments logged yet
        </p>
      )}

      {logs.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #334155" }}>
              <th align="left">Type</th>
              <th align="left">Metric</th>
              <th align="left">Value</th>
              <th align="left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log: any, idx: number) => (
              <tr key={idx} style={{ borderBottom: "1px solid #1e293b" }}>
                <td>{log.type}</td>
                <td>{log.metric}</td>
                <td>{log.value}</td>
                <td>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}