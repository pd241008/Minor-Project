"use client";
import React from "react";

export default function ExperimentLog({ logs }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Experiment Log</h2>

      {logs.length === 0 && (
        <p className="text-slate-400">
          No experiments logged yet
        </p>
      )}

      {logs.length > 0 && (
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 font-semibold text-slate-300">Type</th>
              <th className="py-2 font-semibold text-slate-300">Metric</th>
              <th className="py-2 font-semibold text-slate-300">Value</th>
              <th className="py-2 font-semibold text-slate-300">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log: any, idx: number) => (
              <tr key={idx} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                <td className="py-2 text-slate-300">{log.type}</td>
                <td className="py-2 text-slate-300">{log.metric}</td>
                <td className="py-2 font-medium text-slate-50">{log.value}</td>
                <td className="py-2 text-slate-400 text-xs">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}